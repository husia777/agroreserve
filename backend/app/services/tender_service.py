"""
Сервис работы с тендерами (госзакупки ЕИС).

UC-13: Парсер ЕИС — поиск и хранение тендеров.
UC-42: Калькулятор тендера — расчёт нашей ставки.
"""

import random
from datetime import datetime, timedelta, timezone
from typing import List, Optional

import structlog

from app.models.tender import Tender, TenderItem

logger = structlog.get_logger(__name__)

# Список возможных заказчиков для генерации тестовых тендеров
_SAMPLE_CUSTOMERS = [
    "МБОУ СОШ № 1 г. Тобольск",
    "МБОУ СОШ № 5 г. Тобольск",
    "МБДОУ «Детский сад № 12»",
    "МКУ «Центр питания» г. Тобольск",
    "ГБУЗ ТО «Тобольская городская больница»",
    "МБДОУ «Детский сад Берёзка»",
    "МБОУ Гимназия № 2 г. Тобольск",
    "МКУ «Управление социальной защиты»",
]

_SAMPLE_CATEGORIES = {
    "Овощи": [
        ("Картофель свежий продовольственный", "кг"),
        ("Морковь свежая", "кг"),
        ("Лук репчатый", "кг"),
        ("Капуста белокочанная свежая", "кг"),
        ("Свёкла столовая свежая", "кг"),
        ("Чеснок свежий", "кг"),
    ],
    "Фрукты": [
        ("Яблоки свежие", "кг"),
        ("Апельсины свежие", "кг"),
        ("Бананы свежие", "кг"),
        ("Лимоны свежие", "кг"),
        ("Груши свежие", "кг"),
    ],
    "Бакалея": [
        ("Изюм (сухофрукты)", "кг"),
        ("Курага (абрикос сушёный)", "кг"),
        ("Чернослив сушёный", "кг"),
        ("Орехи грецкие очищенные", "кг"),
        ("Мёд натуральный цветочный", "кг"),
    ],
}


def _generate_mock_tender(
    keywords: List[str],
    region: str,
    max_price: float,
    index: int = 0,
) -> dict:
    """
    Генерирует тестовый тендер (имитация ответа ЕИС).

    Args:
        keywords: Ключевые слова поиска
        region: Регион
        max_price: Максимальная НМЦК
        index: Индекс для разнообразия данных

    Returns:
        Словарь с данными тендера
    """
    now = datetime.now(timezone.utc)
    deadline = now + timedelta(days=random.randint(3, 21))
    delivery_date = (now + timedelta(days=random.randint(30, 90))).date()

    customer = _SAMPLE_CUSTOMERS[index % len(_SAMPLE_CUSTOMERS)]

    # Выбираем позиции на основе ключевых слов
    items = []
    all_items = []
    for category, products in _SAMPLE_CATEGORIES.items():
        for kw in keywords:
            if kw.lower() in category.lower() or any(kw.lower() in p[0].lower() for p in products):
                all_items.extend(products)

    if not all_items:
        # Если ничего не нашли — берём овощи по умолчанию
        all_items = _SAMPLE_CATEGORIES["Овощи"]

    # Берём случайные 3-6 позиций
    selected = random.sample(all_items, min(
        random.randint(3, 6), len(all_items)))
    total_max_price = 0.0

    for name, unit in selected:
        qty = round(random.uniform(50, 500), 0)
        unit_price = round(random.uniform(30, 200), 2)
        item_max_price = round(qty * unit_price, 2)
        total_max_price += item_max_price
        items.append(
            {
                "name": name,
                "qty": qty,
                "unit": unit,
                "max_price": item_max_price,
            }
        )

    # Масштабируем под max_price
    if total_max_price > 0:
        scale = min(max_price, total_max_price) / total_max_price
        for item in items:
            cur_price: float = item["max_price"]  # type: ignore[assignment]
            item["max_price"] = round(cur_price * scale, 2)
        actual_price = round(total_max_price * scale, 2)
    else:
        actual_price = float(max_price) * 0.8

    eis_number = f"0167200{random.randint(1000000, 9999999)}"

    return {
        "eis_number": eis_number,
        "title": f"Поставка продовольственных товаров ({', '.join(keywords[:2])}) для нужд {customer}",
        "customer": customer,
        "region": region,
        "max_price": actual_price,
        "items": items,
        "deadline": deadline.isoformat(),
        "delivery_deadline": str(delivery_date),
        "source_url": f"https://zakupki.gov.ru/epz/order/notice/ea44/view/common-info.html?regNumber={eis_number}",
        "status": "new",
        "is_relevant": True,
    }


async def search_eis_tenders(
    keywords: List[str],
    region: str,
    max_price: float,
) -> List[dict]:
    """
    UC-13: Поиск тендеров (заглушка — имитация ЕИС).

    В production здесь должен быть реальный парсинг zakupki.gov.ru
    через Selenium/Playwright или официальный API ЕИС.

    Args:
        keywords: Ключевые слова (["овощи", "фрукты", "продукты"])
        region: Регион ("Тобольск", "Тюменская")
        max_price: Максимальная НМЦК (600000)

    Returns:
        Список найденных тендеров (ещё не сохранённых в БД)
    """
    logger.info(
        "Поиск тендеров (заглушка)",
        keywords=keywords,
        region=region,
        max_price=max_price,
    )

    # Генерируем 3-7 тестовых тендеров
    count = random.randint(3, 7)
    mock_tenders = [_generate_mock_tender(
        keywords, region, max_price, i) for i in range(count)]

    # Сохраняем в БД (пропускаем дубликаты по eis_number)
    saved = []
    for tender_data in mock_tenders:
        eis_number = tender_data["eis_number"]

        existing = await Tender.find_one(Tender.eis_number == eis_number)
        if existing:
            logger.debug("Тендер уже существует", eis_number=eis_number)
            continue

        items = [TenderItem(**item) for item in tender_data.pop("items")]
        deadline = datetime.fromisoformat(tender_data.pop("deadline"))
        delivery_deadline = None
        dd = tender_data.pop("delivery_deadline", None)
        if dd:
            from datetime import date

            delivery_deadline = date.fromisoformat(dd)

        tender = Tender(
            **tender_data,
            items=items,
            deadline=deadline,
            delivery_deadline=delivery_deadline,
        )
        await tender.insert()

        saved.append(
            {
                "id": str(tender.id),
                "eis_number": tender.eis_number,
                "title": tender.title,
                "customer": tender.customer,
                "max_price": tender.max_price,
                "deadline": tender.deadline.isoformat(),
                "status": tender.status,
            }
        )

        logger.info(
            "Тендер сохранён",
            eis_number=eis_number,
            title=tender.title,
            max_price=tender.max_price,
        )

    return saved


async def calculate_tender_bid(
    tender_id: str,
    margin_percent: float,
    logistics_fixed: float = 500.0,
    logistics_per_km: float = 10.0,
    distance_km: float = 0.0,
) -> dict:
    """
    UC-42: Расчёт нашей ставки для участия в тендере.

    Для каждой позиции:
    - Себестоимость (из cost_price товара по базе)
    - Логистика: фиксированная часть + за км
    - Наценка (%)

    Итого:
    - Наша цена по позициям
    - Общая сумма
    - Маржа %
    - Маржа ₽
    - Сравнение с НМЦК (% снижения)

    Args:
        tender_id: ID тендера
        margin_percent: Желаемая наценка (%)
        logistics_fixed: Фиксированная часть логистики (₽)
        logistics_per_km: Стоимость за км (₽)
        distance_km: Расстояние до заказчика (км)

    Returns:
        Словарь с расчётом ставки
    """
    from beanie import PydanticObjectId
    from app.models.product import Product

    try:
        tender = await Tender.get(PydanticObjectId(tender_id))
    except Exception:
        raise ValueError(f"Тендер с ID {tender_id} не найден")

    if not tender:
        raise ValueError(f"Тендер с ID {tender_id} не найден")

    # Рассчитываем логистику
    total_logistics = logistics_fixed + logistics_per_km * distance_km

    # Расчёт по позициям
    bid_items = []
    total_cost = 0.0
    total_our_price = 0.0

    for item in tender.items:
        # Ищем товар в базе по названию (нечёткий поиск)
        cost_price = 0.0
        matched_product_name = "не найден"

        # Поиск по частичному совпадению названия
        products = (
            await Product.find(
                {"name": {"$regex": item.name[:10], "$options": "i"}},
            )
            .limit(1)
            .to_list()
        )

        if products:
            cost_price = products[0].cost_price
            matched_product_name = products[0].name
        else:
            # Используем примерную себестоимость (50% от НМЦК позиции)
            if item.max_price and item.qty > 0:
                cost_price = round(item.max_price / item.qty * 0.5, 2)
            else:
                cost_price = 50.0  # ₽/кг по умолчанию

        # Стоимость логистики на единицу
        logistics_per_unit = round(
            total_logistics / max(sum(i.qty for i in tender.items), 1), 4)

        # Себестоимость с логистикой
        cost_with_logistics = round(cost_price + logistics_per_unit, 2)

        # Наша цена = себестоимость × (1 + наценка%)
        our_unit_price = round(cost_with_logistics *
                               (1 + margin_percent / 100), 2)
        our_total = round(our_unit_price * item.qty, 2)
        item_cost = round(cost_with_logistics * item.qty, 2)

        item_margin = round(our_total - item_cost, 2)
        item_margin_pct = round(
            item_margin / our_total * 100, 1) if our_total > 0 else 0.0

        total_cost += item_cost
        total_our_price += our_total

        # Сравнение с НМЦК позиции
        reduction_from_nmck = 0.0
        if item.max_price and item.max_price > 0:
            reduction_from_nmck = round(
                (1 - our_total / item.max_price) * 100, 1)

        bid_items.append(
            {
                "name": item.name,
                "qty": item.qty,
                "unit": item.unit,
                "cost_price": cost_price,
                "logistics_per_unit": logistics_per_unit,
                "cost_with_logistics": cost_with_logistics,
                "our_unit_price": our_unit_price,
                "our_total": our_total,
                "nmck": item.max_price,
                "margin_rub": item_margin,
                "margin_pct": item_margin_pct,
                "reduction_from_nmck_pct": reduction_from_nmck,
                "matched_product": matched_product_name,
            }
        )

    total_margin = round(total_our_price - total_cost, 2)
    total_margin_pct = round(
        total_margin / total_our_price * 100, 1) if total_our_price > 0 else 0.0
    reduction_from_nmck = round(
        (1 - total_our_price / tender.max_price) * 100, 1) if tender.max_price > 0 else 0.0

    # Проверяем рентабельность
    is_profitable = total_margin_pct >= 10.0  # Минимум 10% маржи

    result = {
        "tender_id": tender_id,
        "tender_title": tender.title,
        "nmck": tender.max_price,
        "margin_percent_requested": margin_percent,
        "logistics": {
            "fixed": logistics_fixed,
            "per_km": logistics_per_km,
            "distance_km": distance_km,
            "total": total_logistics,
        },
        "items": bid_items,
        "summary": {
            "total_cost": round(total_cost, 2),
            "total_our_price": round(total_our_price, 2),
            "total_margin_rub": total_margin,
            "total_margin_pct": total_margin_pct,
            "reduction_from_nmck_pct": reduction_from_nmck,
            "is_profitable": is_profitable,
        },
        "recommendation": (
            f"Рекомендуем участвовать — маржа {total_margin_pct}%, снижение от НМЦК {reduction_from_nmck}%"
            if is_profitable and reduction_from_nmck > 0
            else f"Невыгодно: маржа {total_margin_pct}%, проверьте себестоимость"
        ),
    }

    # Обновляем тендер с нашей ценой
    tender.our_price = round(total_our_price, 2)
    tender.margin_estimate = total_margin
    await tender.save()

    logger.info(
        "Расчёт тендерной ставки выполнен",
        tender_id=tender_id,
        our_price=total_our_price,
        margin_pct=total_margin_pct,
        reduction=reduction_from_nmck,
    )

    return result


async def get_tender_analytics() -> dict:
    """
    Статистика по тендерам.

    Returns:
        Словарь с аналитикой по тендерам
    """
    from datetime import date

    all_tenders = await Tender.find().to_list()

    total = len(all_tenders)
    by_status: dict = {}
    for tender in all_tenders:
        status = tender.status
        by_status[status] = by_status.get(status, 0) + 1

    won = [t for t in all_tenders if t.status == "won"]
    bid_submitted = [t for t in all_tenders if t.status == "bid_submitted"]
    active = [t for t in all_tenders if t.status in ["new", "analyzing"]]

    total_nmck = sum(t.max_price for t in all_tenders)
    won_amount = sum(t.our_price or t.max_price for t in won)
    won_margin = sum(t.margin_estimate or 0 for t in won)

    win_rate = round(len(won) / max(len(won) +
                     len([t for t in all_tenders if t.status == "lost"]), 1) * 100, 1)

    today = date.today()
    upcoming_deadlines = [
        {
            "id": str(t.id),
            "title": t.title[:50],
            "deadline": t.deadline.isoformat(),
            "days_left": (t.deadline.date() - today).days if t.deadline else None,
            "max_price": t.max_price,
        }
        for t in all_tenders
        if t.status in ["new", "analyzing"] and t.deadline and t.deadline.date() >= today
    ]
    upcoming_deadlines.sort(key=lambda x: x["deadline"])

    return {
        "total": total,
        "by_status": by_status,
        "active_count": len(active),
        "bid_submitted_count": len(bid_submitted),
        "won_count": len(won),
        "win_rate_pct": win_rate,
        "total_nmck": round(total_nmck, 2),
        "won_amount": round(won_amount, 2),
        "won_margin": round(won_margin, 2),
        "upcoming_deadlines": upcoming_deadlines[:5],
    }
