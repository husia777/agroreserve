"""
Сервис закупок.

Отвечает за:
- Рекомендации к закупке товаров (на основе остатков и расхода)
- Расчёт среднего расхода товара
- Генерацию заявки поставщику (PDF)
"""

from datetime import UTC, datetime, timedelta
from typing import Any

import structlog
from beanie import PydanticObjectId

from app.models.product import Product

logger = structlog.get_logger(__name__)


async def calculate_avg_consumption(product_id: str, days: int = 30) -> float:
    """
    Рассчитывает средний суточный расход товара за указанный период.

    Метод: считает количество товара в ДОСТАВЛЕННЫХ заказах за период.

    Args:
        product_id: ID товара (строка)
        days: Период расчёта в днях

    Returns:
        Средний суточный расход (в единицах товара)
    """
    from app.models.order import Order

    since = datetime.now(UTC) - timedelta(days=days)

    # Получаем все доставленные заказы за период
    delivered_orders = await Order.find(
        {
            "status": "delivered",
            "created_at": {"$gte": since},
        }
    ).to_list()

    total_consumed = 0.0
    for order in delivered_orders:
        for item in order.items:
            if item.product_id == product_id:
                qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
                total_consumed += qty

    avg_daily = total_consumed / days if days > 0 else 0.0

    logger.debug(
        "Средний расход товара рассчитан",
        product_id=product_id,
        days=days,
        total_consumed=total_consumed,
        avg_daily=avg_daily,
    )

    return round(avg_daily, 3)


async def get_purchase_recommendations() -> list[dict[str, Any]]:
    """
    Формирует рекомендации по закупке товаров (UC-27).

    Алгоритм для каждого активного товара:
    1. Текущий остаток (current_stock)
    2. Минимальный остаток (min_stock)
    3. Средний расход за 7 дней (avg_daily_7d)
    4. Средний расход за 30 дней (avg_daily_30d)
    5. Открытые заказы — зарезервировано (reserved_qty)
    6. Рекомендуемое количество к закупке:
       max(0, min_stock + avg_weekly * 2 - current_stock + reserved)

    Returns:
        Список рекомендаций с деталями
    """
    # Загружаем все активные товары
    products = await Product.find({"is_active": True}).to_list()

    # Считаем зарезервированные количества из активных заказов
    from app.models.order import Order

    active_statuses = ["new", "confirmed", "assembling", "assembled"]
    active_orders = await Order.find({"status": {"$in": active_statuses}}).to_list()

    # Агрегируем зарезервированное количество по product_id
    reserved_by_product: dict[str, float] = {}
    for order in active_orders:
        for item in order.items:
            pid = item.product_id
            reserved_by_product[pid] = reserved_by_product.get(pid, 0.0) + item.ordered_qty

    recommendations = []

    for product in products:
        product_id_str = str(product.id)
        current_stock = product.stock_qty
        min_stock = product.min_stock_qty
        reserved = reserved_by_product.get(product_id_str, 0.0)

        # Средний расход за 7 и 30 дней
        avg_daily_7d = await calculate_avg_consumption(product_id_str, days=7)
        avg_daily_30d = await calculate_avg_consumption(product_id_str, days=30)
        avg_weekly = avg_daily_7d * 7  # недельный расход

        # Рекомендуемое количество к закупке
        # Формула: max(0, min_stock + avg_weekly * 2 - current_stock + reserved)
        recommended_qty = max(0.0, min_stock + avg_weekly * 2 - current_stock + reserved)
        recommended_qty = round(recommended_qty, 2)

        # Уровень срочности
        if current_stock <= 0 or (avg_daily_7d > 0 and current_stock / avg_daily_7d < 3):
            urgency = "critical"  # Критически низкий остаток (< 3 дней)
        elif current_stock < min_stock:
            urgency = "high"  # Ниже минимума
        elif recommended_qty > 0:
            urgency = "medium"  # Рекомендуется дозакупить
        else:
            urgency = "ok"  # Запасов достаточно

        recommendations.append(
            {
                "product_id": product_id_str,
                "product_name": product.name,
                "unit": product.unit,
                "current_stock": round(current_stock, 3),
                "min_stock": min_stock,
                "reserved_qty": round(reserved, 3),
                "avg_daily_7d": avg_daily_7d,
                "avg_daily_30d": avg_daily_30d,
                "avg_weekly": round(avg_weekly, 3),
                "recommended_qty": recommended_qty,
                "urgency": urgency,
                "cost_price": product.cost_price,
                "estimated_purchase_cost": round(recommended_qty * product.cost_price, 2),
            }
        )

    # Сортируем: сначала критические и высокие, потом по рекомендуемому количеству
    urgency_order = {"critical": 0, "high": 1, "medium": 2, "ok": 3}
    recommendations.sort(key=lambda x: (urgency_order.get(x["urgency"], 4), -x["recommended_qty"]))

    logger.info(
        "Рекомендации по закупке сформированы",
        total_products=len(recommendations),
        critical=sum(1 for r in recommendations if r["urgency"] == "critical"),
        high=sum(1 for r in recommendations if r["urgency"] == "high"),
    )

    return recommendations


async def generate_purchase_order_pdf(supplier_id: str, items: list[dict[str, Any]]) -> bytes:
    """
    Генерирует PDF заявки поставщику.

    Args:
        supplier_id: ID поставщика
        items: Список позиций [{product_name, qty, unit, price}]

    Returns:
        PDF в виде байтов (или HTML как fallback)
    """
    from app.models.supplier import Supplier

    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        supplier = None

    if not supplier:
        raise ValueError(f"Поставщик с ID {supplier_id} не найден")

    # Рассчитываем итоги
    total_amount = sum(item.get("qty", 0) * item.get("price", 0) for item in items)

    # Получаем реквизиты компании
    try:
        from app.models.settings import SystemSettings

        system_settings = await SystemSettings.find_one()
        company_name = getattr(system_settings, "company_name", "ИП Агрорезерв")
        company_inn = getattr(system_settings, "inn", "")
        company_phone = getattr(system_settings, "phone", "")
    except Exception:
        company_name = "ИП Агрорезерв"
        company_inn = ""
        company_phone = ""

    now = datetime.now(UTC)

    # Генерируем HTML заявки
    items_rows = ""
    for idx, item in enumerate(items, 1):
        item_total = round(item.get("qty", 0) * item.get("price", 0), 2)
        items_rows += f"""
        <tr>
            <td class="text-center">{idx}</td>
            <td>{item.get('product_name', '')}</td>
            <td class="text-center">{item.get('qty', 0)}</td>
            <td class="text-center">{item.get('unit', 'кг')}</td>
            <td class="text-right">{item.get('price', 0):.2f}</td>
            <td class="text-right">{item_total:.2f}</td>
        </tr>
        """

    html_content = f"""
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8">
        <title>Заявка поставщику</title>
        <style>
            @page {{ size: A4; margin: 20mm; }}
            body {{ font-family: Arial, sans-serif; font-size: 12px; }}
            h1 {{ text-align: center; font-size: 16px; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
            th, td {{ border: 1px solid #000; padding: 5px 8px; }}
            th {{ background: #f0f0f0; text-align: center; }}
            .text-center {{ text-align: center; }}
            .text-right {{ text-align: right; }}
            .total-row {{ font-weight: bold; }}
            .info-table td {{ border: none; padding: 3px 5px; }}
            .footer {{ margin-top: 30px; display: flex; justify-content: space-between; }}
            .sign-block {{ width: 45%; }}
        </style>
    </head>
    <body>
        <h1>ЗАЯВКА НА ПОСТАВКУ ТОВАРОВ</h1>
        <p>Дата: {now.strftime('%d.%m.%Y')}</p>

        <table class="info-table">
            <tr><td><strong>Покупатель:</strong></td><td>{company_name}</td></tr>
            <tr><td><strong>ИНН:</strong></td><td>{company_inn}</td></tr>
            <tr><td><strong>Телефон:</strong></td><td>{company_phone}</td></tr>
            <tr><td><strong>Поставщик:</strong></td><td>{supplier.name}</td></tr>
            <tr><td><strong>Контактное лицо:</strong></td><td>{supplier.contact_person}</td></tr>
            <tr><td><strong>Телефон:</strong></td><td>{supplier.phone}</td></tr>
        </table>

        <table>
            <thead>
                <tr>
                    <th style="width:40px">№</th>
                    <th>Наименование товара</th>
                    <th style="width:80px">Кол-во</th>
                    <th style="width:60px">Ед.</th>
                    <th style="width:100px">Цена, ₽</th>
                    <th style="width:120px">Сумма, ₽</th>
                </tr>
            </thead>
            <tbody>
                {items_rows}
                <tr class="total-row">
                    <td colspan="5" class="text-right">ИТОГО:</td>
                    <td class="text-right">{total_amount:.2f}</td>
                </tr>
            </tbody>
        </table>

        <div class="footer">
            <div class="sign-block">
                <p>Покупатель: ___________________</p>
                <p>({company_name})</p>
            </div>
            <div class="sign-block">
                <p>Поставщик: ___________________</p>
                <p>({supplier.name})</p>
            </div>
        </div>
    </body>
    </html>
    """

    # Пробуем сгенерировать PDF через WeasyPrint
    try:
        import weasyprint

        pdf_bytes = bytes(weasyprint.HTML(string=html_content).write_pdf())
        logger.info(
            "PDF заявки поставщику сгенерирован",
            supplier_id=supplier_id,
            items_count=len(items),
            total_amount=total_amount,
        )
        return pdf_bytes
    except ImportError:
        # Fallback: возвращаем HTML
        logger.warning(
            "WeasyPrint не установлен, возвращаем HTML заявку",
            supplier_id=supplier_id,
        )
        return html_content.encode("utf-8")
    except Exception as e:
        logger.error("Ошибка генерации PDF заявки", error=str(e))
        return html_content.encode("utf-8")
