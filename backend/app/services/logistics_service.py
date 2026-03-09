"""
Сервис логистики.

Отвечает за:
- Формирование маршрутного листа на день
- Расчёт общего веса и сумм по заказам
- Генерацию PDF маршрутного листа
"""
from datetime import date, datetime, timezone
from typing import Any, Dict, List, Optional

import structlog
from beanie import PydanticObjectId

logger = structlog.get_logger(__name__)


async def get_route_sheet(delivery_date: date) -> Dict[str, Any]:
    """
    Формирует маршрутный лист на указанную дату.

    Группирует заказы по временным слотам.
    Для каждого заказа: адрес, товары, сумма, способ оплаты, вес.

    Args:
        delivery_date: Дата доставки

    Returns:
        Структура маршрутного листа
    """
    from app.models.order import Order

    # Статусы, включаемые в маршрутный лист
    active_statuses = ["confirmed", "assembling", "assembled", "delivering"]

    orders = await Order.find(
        {
            "delivery_date": delivery_date,
            "status": {"$in": active_statuses},
        }
    ).sort(Order.delivery_slot).to_list()

    if not orders:
        return {
            "date": str(delivery_date),
            "total_orders": 0,
            "total_weight_kg": 0.0,
            "total_amount": 0.0,
            "by_slot": [],
            "generated_at": datetime.now(timezone.utc).isoformat(),
        }

    # Агрегируем по слотам
    slots: Dict[str, List[Dict[str, Any]]] = {}
    total_weight = 0.0
    total_amount = 0.0

    for order in orders:
        slot = order.delivery_slot or "без слота"
        if slot not in slots:
            slots[slot] = []

        # Рассчитываем вес заказа
        order_weight = 0.0
        for item in order.items:
            # Используем фактическое или заказанное количество
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            if item.unit == "kg":
                order_weight += qty
            elif item.unit == "pcs":
                # Штуки конвертируем приблизительно (1 шт = 0.5 кг по умолчанию)
                order_weight += qty * 0.5

        order_weight = round(order_weight, 2)
        total_weight += order_weight
        total_amount += order.total

        # Получаем client_id строкой
        client_id_str = (
            str(order.client_id.id)
            if hasattr(order.client_id, "id")
            else str(order.client_id)
        )

        slots[slot].append({
            "order_id": str(order.id),
            "order_number": order.order_number,
            "client_id": client_id_str,
            "client_name": order.client_name,
            "client_phone": order.client_phone,
            "delivery_address": order.delivery_address,
            "status": order.status.value if hasattr(order.status, "value") else order.status,
            "payment_method": (
                order.payment_method.value
                if hasattr(order.payment_method, "value")
                else order.payment_method
            ),
            "payment_status": (
                order.payment_status.value
                if hasattr(order.payment_status, "value")
                else order.payment_status
            ),
            "total": order.total,
            "paid_amount": order.paid_amount,
            "items": [
                {
                    "product_name": item.product_name,
                    "qty": item.actual_qty if item.actual_qty is not None else item.ordered_qty,
                    "unit": item.unit,
                    "price": item.price,
                    "total": item.total,
                }
                for item in order.items
            ],
            "weight_kg": order_weight,
            "note": order.note,
            "admin_note": order.admin_note,
        })

    # Сортируем слоты в хронологическом порядке
    slot_order = ["08:00-11:00", "11:00-14:00", "14:00-17:00"]
    by_slot = []
    for slot_key in slot_order:
        if slot_key in slots:
            slot_orders = slots.pop(slot_key)
            by_slot.append({
                "slot": slot_key,
                "orders_count": len(slot_orders),
                "slot_weight_kg": round(sum(o["weight_kg"] for o in slot_orders), 2),
                "slot_amount": round(sum(o["total"] for o in slot_orders), 2),
                "orders": slot_orders,
            })

    # Добавляем заказы без слота
    for remaining_slot, remaining_orders in slots.items():
        by_slot.append({
            "slot": remaining_slot,
            "orders_count": len(remaining_orders),
            "slot_weight_kg": round(sum(o["weight_kg"] for o in remaining_orders), 2),
            "slot_amount": round(sum(o["total"] for o in remaining_orders), 2),
            "orders": remaining_orders,
        })

    logger.info(
        "Маршрутный лист сформирован",
        date=str(delivery_date),
        total_orders=len(orders),
        total_weight=round(total_weight, 2),
        slots=len(by_slot),
    )

    return {
        "date": str(delivery_date),
        "total_orders": len(orders),
        "total_weight_kg": round(total_weight, 2),
        "total_amount": round(total_amount, 2),
        "by_slot": by_slot,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


async def generate_route_sheet_pdf(delivery_date: date) -> bytes:
    """
    Генерирует PDF маршрутного листа на указанную дату.

    Args:
        delivery_date: Дата доставки

    Returns:
        PDF в виде байтов (или HTML как fallback)
    """
    route_data = await get_route_sheet(delivery_date)

    # Генерируем HTML маршрутного листа
    slots_html = ""
    for slot_data in route_data["by_slot"]:
        orders_html = ""
        for order in slot_data["orders"]:
            items_text = "; ".join(
                f"{item['product_name']} {item['qty']} {item['unit']}"
                for item in order["items"]
            )

            # Статус оплаты по-русски
            payment_labels = {
                "pending": "Не оплачен",
                "partial": "Частично",
                "paid": "Оплачен",
                "overdue": "Просрочен",
            }
            payment_status_label = payment_labels.get(order["payment_status"], order["payment_status"])

            # Способ оплаты по-русски
            method_labels = {
                "bank_transfer": "Безнал",
                "cash": "Наличные",
                "card_on_delivery": "Карта",
                "prepayment": "Предоплата",
            }
            method_label = method_labels.get(order["payment_method"], order["payment_method"])

            orders_html += f"""
            <tr>
                <td>{order['order_number']}</td>
                <td>
                    <strong>{order['client_name']}</strong><br>
                    {order['client_phone']}<br>
                    {order['delivery_address']}
                </td>
                <td style="font-size:10px">{items_text}</td>
                <td class="text-center">{order['weight_kg']} кг</td>
                <td class="text-right">{order['total']:.2f} ₽</td>
                <td class="text-center">{method_label}</td>
                <td class="text-center">{payment_status_label}</td>
                <td></td>
            </tr>
            """

        slots_html += f"""
        <div class="slot-block">
            <h3>Слот {slot_data['slot']} ({slot_data['orders_count']} заказа, {slot_data['slot_weight_kg']} кг)</h3>
            <table>
                <thead>
                    <tr>
                        <th style="width:120px">Заказ</th>
                        <th>Клиент / Адрес</th>
                        <th>Товары</th>
                        <th style="width:70px">Вес</th>
                        <th style="width:90px">Сумма</th>
                        <th style="width:80px">Оплата</th>
                        <th style="width:80px">Статус</th>
                        <th style="width:80px">Подпись</th>
                    </tr>
                </thead>
                <tbody>
                    {orders_html}
                </tbody>
            </table>
        </div>
        """

    html_content = f"""
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8">
        <title>Маршрутный лист {delivery_date}</title>
        <style>
            @page {{ size: A4 landscape; margin: 10mm 15mm; }}
            body {{ font-family: Arial, sans-serif; font-size: 11px; }}
            h1 {{ text-align: center; font-size: 14px; margin-bottom: 5px; }}
            h2 {{ font-size: 12px; }}
            h3 {{ font-size: 11px; background: #e0e0e0; padding: 4px; margin: 10px 0 5px 0; }}
            table {{ width: 100%; border-collapse: collapse; margin-bottom: 10px; }}
            th, td {{ border: 1px solid #999; padding: 4px 6px; vertical-align: top; }}
            th {{ background: #f0f0f0; text-align: left; }}
            .text-center {{ text-align: center; }}
            .text-right {{ text-align: right; }}
            .summary {{ margin-bottom: 15px; padding: 5px; background: #f9f9f9; border: 1px solid #ddd; }}
            .slot-block {{ margin-bottom: 20px; }}
        </style>
    </head>
    <body>
        <h1>МАРШРУТНЫЙ ЛИСТ</h1>
        <h2>Дата доставки: {delivery_date.strftime('%d.%m.%Y')}</h2>

        <div class="summary">
            <strong>Итого:</strong>
            Заказов: {route_data['total_orders']} |
            Общий вес: {route_data['total_weight_kg']} кг |
            Сумма: {route_data['total_amount']:.2f} ₽
        </div>

        {slots_html}

        <p style="margin-top: 20px; font-size: 10px;">
            Сформирован: {datetime.now(timezone.utc).strftime('%d.%m.%Y %H:%M')} UTC
        </p>
    </body>
    </html>
    """

    # Пробуем сгенерировать PDF через WeasyPrint
    try:
        import weasyprint

        pdf_bytes = weasyprint.HTML(string=html_content).write_pdf()
        logger.info(
            "PDF маршрутного листа сгенерирован",
            date=str(delivery_date),
            orders=route_data["total_orders"],
        )
        return pdf_bytes
    except ImportError:
        logger.warning("WeasyPrint не установлен, возвращаем HTML маршрутный лист")
        return html_content.encode("utf-8")
    except Exception as e:
        logger.error("Ошибка генерации PDF маршрутного листа", error=str(e))
        return html_content.encode("utf-8")
