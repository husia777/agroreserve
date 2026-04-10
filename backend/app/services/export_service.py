"""
Сервис экспорта данных в Excel/CSV (UC-83).
Выгрузка продуктов, остатков, цен.
"""

import io
from datetime import datetime, timezone
from typing import Optional

import structlog
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

from typing import Any

from app.models.product import Product, Category

logger = structlog.get_logger(__name__)


# --- Маппинг единиц измерения на русский ---
UNIT_LABELS = {
    "kg": "кг",
    "pcs": "шт",
    "l": "л",
    "box": "ящик",
    "bag": "мешок",
}


async def export_products_excel(
    include_purchase_price: bool = True,
    only_active: bool = False,
    category_id: Optional[str] = None,
) -> io.BytesIO:
    """
    Экспорт товаров в Excel (.xlsx).

    Колонки:
    - Название, Категория, Ед. изм., Остаток, Мин. остаток,
      Цена опт, Цена закупки (опционально), Страна, Условия хранения, Статус
    """
    # Получаем товары
    query: dict[str, Any] = {}
    if only_active:
        query["is_active"] = True
    if category_id:
        query["category_id"] = category_id

    products = await Product.find(query).sort("name").to_list()

    # Получаем категории для маппинга
    categories = await Category.find_all().to_list()
    cat_map = {str(c.id): c.name for c in categories}

    # Создаём книгу Excel
    wb = Workbook()
    ws = wb.active
    ws.title = "Товары"

    # Стили
    header_font = Font(name="Arial", bold=True, size=11, color="FFFFFF")
    header_fill = PatternFill(start_color="16A34A", end_color="16A34A", fill_type="solid")
    header_alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    cell_font = Font(name="Arial", size=10)
    thin_border = Border(
        left=Side(style="thin", color="D1D5DB"),
        right=Side(style="thin", color="D1D5DB"),
        top=Side(style="thin", color="D1D5DB"),
        bottom=Side(style="thin", color="D1D5DB"),
    )

    # Заголовок документа
    ws.merge_cells("A1:H1")
    title_cell = ws["A1"]
    title_cell.value = f"Агрорезерв — Каталог товаров ({datetime.now(timezone.utc).strftime('%d.%m.%Y')})"
    title_cell.font = Font(name="Arial", bold=True, size=14, color="16A34A")
    title_cell.alignment = Alignment(horizontal="left", vertical="center")
    ws.row_dimensions[1].height = 30

    # Заголовки колонок
    headers = [
        ("Название", 35),
        ("Категория", 20),
        ("Ед. изм.", 10),
        ("Остаток", 12),
        ("Мин. остаток", 14),
        ("Цена опт, ₽", 14),
    ]
    if include_purchase_price:
        headers.append(("Цена закупки, ₽", 16))
    headers.extend(
        [
            ("Страна", 15),
            ("Условия хранения", 25),
            ("Статус", 12),
        ]
    )

    for col_idx, (header_text, width) in enumerate(headers, 1):
        cell = ws.cell(row=3, column=col_idx, value=header_text)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = header_alignment
        cell.border = thin_border
        ws.column_dimensions[get_column_letter(col_idx)].width = width

    ws.row_dimensions[3].height = 28

    # Данные
    for row_idx, product in enumerate(products, 4):
        cat_name = cat_map.get(str(product.category_id), "—")
        unit_label = UNIT_LABELS.get(product.unit, product.unit)

        row_data = [
            product.name,
            cat_name,
            unit_label,
            product.stock_qty,
            product.min_stock_qty,
            product.price_wholesale,
        ]
        if include_purchase_price:
            row_data.append(product.cost_price or 0)
        row_data.extend(
            [
                product.origin_country or "—",
                product.storage_conditions or "—",
                "Активен" if product.is_active else "Неактивен",
            ]
        )

        for col_idx, value in enumerate(row_data, 1):
            cell = ws.cell(row=row_idx, column=col_idx, value=value)
            cell.font = cell_font
            cell.border = thin_border
            if isinstance(value, (int, float)):
                cell.alignment = Alignment(horizontal="right")
                cell.number_format = "#,##0.00" if isinstance(value, float) else "#,##0"

        # Подсветка критических остатков
        stock_qty = product.stock_qty or 0
        min_stock = product.min_stock_qty or 0
        if stock_qty <= 0:
            ws.cell(row=row_idx, column=4).fill = PatternFill(
                start_color="FEE2E2", end_color="FEE2E2", fill_type="solid"
            )
        elif stock_qty <= min_stock:
            ws.cell(row=row_idx, column=4).fill = PatternFill(
                start_color="FEF3C7", end_color="FEF3C7", fill_type="solid"
            )

    # Итого строка
    total_row = len(products) + 4
    ws.cell(row=total_row, column=1, value=f"Всего товаров: {len(products)}")
    ws.cell(row=total_row, column=1).font = Font(name="Arial", bold=True, size=10)

    # Автофильтр
    last_col = get_column_letter(len(headers))
    ws.auto_filter.ref = f"A3:{last_col}{total_row - 1}"

    # Закрепляем заголовок
    ws.freeze_panes = "A4"

    # Сохраняем в буфер
    buffer = io.BytesIO()
    wb.save(buffer)
    buffer.seek(0)

    logger.info("Экспорт товаров в Excel", count=len(products), include_purchase=include_purchase_price)
    return buffer


async def export_products_csv(
    include_purchase_price: bool = True,
    only_active: bool = False,
) -> io.StringIO:
    """
    Экспорт товаров в CSV (UTF-8 с BOM для корректного открытия в Excel).
    """
    import csv

    products = await Product.find({"is_active": True} if only_active else {}).sort("name").to_list()

    categories = await Category.find_all().to_list()
    cat_map = {str(c.id): c.name for c in categories}

    buffer = io.StringIO()
    # BOM для Excel
    buffer.write("\ufeff")

    headers = ["Название", "Категория", "Ед. изм.", "Остаток", "Мин. остаток", "Цена опт"]
    if include_purchase_price:
        headers.append("Цена закупки")
    headers.extend(["Страна", "Статус"])

    writer = csv.writer(buffer, delimiter=";")
    writer.writerow(headers)

    for product in products:
        row = [
            product.name,
            cat_map.get(str(product.category_id), "—"),
            UNIT_LABELS.get(product.unit, product.unit),
            product.stock_qty,
            product.min_stock_qty,
            product.price_wholesale,
        ]
        if include_purchase_price:
            row.append(product.cost_price or 0)
        row.extend(
            [
                product.origin_country or "—",
                "Активен" if product.is_active else "Неактивен",
            ]
        )
        writer.writerow(row)

    buffer.seek(0)
    logger.info("Экспорт товаров в CSV", count=len(products))
    return buffer
