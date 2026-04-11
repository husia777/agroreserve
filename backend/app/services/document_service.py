"""
Сервис генерации документов (счёт, ТОРГ-12, ярлыки, акт сверки, договоры).

Использует WeasyPrint для генерации PDF из HTML-шаблонов.
Если WeasyPrint не установлен — создаёт заглушку в виде HTML файла.
"""

from datetime import UTC, datetime
from pathlib import Path
from typing import Optional

import structlog

from app.models.document import DocumentRecord, DocumentType

logger = structlog.get_logger(__name__)

# Директория для хранения PDF файлов
DOCUMENTS_DIR = "/app/media/documents"


async def get_next_doc_number(doc_type: DocumentType) -> str:
    """
    Генерирует следующий номер документа (сквозной по году).

    Форматы:
    - Счёт-001, Счёт-002, ...
    - ТОРГ12-001, ТОРГ12-002, ...

    Args:
        doc_type: Тип документа

    Returns:
        Строка с номером документа
    """
    year = datetime.now(UTC).year
    prefix = DocumentRecord.get_document_prefix(doc_type)

    last_doc = (
        await DocumentRecord.find(
            DocumentRecord.doc_type == doc_type,
            DocumentRecord.year == year,
        )
        .sort(-DocumentRecord.number)
        .first_or_none()
    )

    if last_doc:
        try:
            # Извлекаем числовую часть: "Счёт-005" → "005" → 5
            num_part = last_doc.number.split("-")[-1]
            next_num = int(num_part) + 1
        except (ValueError, IndexError):
            next_num = 1
    else:
        next_num = 1

    return f"{prefix}-{next_num:03d}"


def _get_seller_info() -> dict:
    """Возвращает реквизиты продавца из настроек."""
    return {
        "name": "ИП Наимов Хусейн Вохиджонович",
        "inn": "720600000000",  # Заменить на реальный ИНН
        "ogrn": "320000000000000",  # Заменить на реальный ОГРН
        "address": "г. Тобольск, Тюменская область",
        "phone": "+7 (000) 000-00-00",
        "email": "info@agroreserve.ru",
        "bank_name": "ПАО Сбербанк",
        "bik": "047102651",
        "account": "40802810000000000000",
        "correspondent_account": "30101810500000000651",
    }


async def _get_seller_info_from_db() -> dict:
    """
    Получает реквизиты продавца из SystemSettings (если есть).
    Fallback на статичные значения.
    """
    try:
        from app.models.settings import SystemSettings

        settings_doc = await SystemSettings.find_one(SystemSettings.singleton_key == "main")
        if settings_doc:
            bd = settings_doc.bank_details
            return {
                "name": settings_doc.company_name,
                "inn": settings_doc.inn,
                "ogrn": settings_doc.ogrn,
                "address": settings_doc.legal_address,
                "phone": settings_doc.phone,
                "email": settings_doc.email,
                "bank_name": bd.bank_name,
                "bik": bd.bik,
                "account": bd.account,
                "correspondent_account": bd.correspondent_account,
            }
    except Exception as e:
        logger.warning("Не удалось получить реквизиты из SystemSettings", error=str(e))
    return _get_seller_info()


def _build_invoice_html(order, doc_number: str) -> str:
    """
    Строит HTML для счёта на оплату.

    Args:
        order: Объект Order
        doc_number: Номер документа

    Returns:
        HTML строка
    """
    seller = _get_seller_info()
    today = datetime.now(UTC).strftime("%d.%m.%Y")

    # Реквизиты покупателя
    buyer_name = order.client_name
    buyer_inn = ""
    if hasattr(order, "_client_org") and order._client_org:
        buyer_inn = f", ИНН: {order._client_org.inn}"

    # Строки таблицы позиций
    rows_html = ""
    for i, item in enumerate(order.items, 1):
        qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
        rows_html += f"""
        <tr>
            <td>{i}</td>
            <td>{item.product_name}</td>
            <td>{item.unit}</td>
            <td>{qty:.2f}</td>
            <td>{item.price:,.2f}</td>
            <td>{qty * item.price:,.2f}</td>
        </tr>"""

    total_str = f"{order.total:,.2f}"

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Arial, sans-serif; font-size: 12px; margin: 20px; color: #000; }}
  h1 {{ font-size: 16px; text-align: center; margin-bottom: 5px; }}
  h2 {{ font-size: 14px; text-align: center; margin-top: 0; }}
  .header {{ border: 2px solid #000; padding: 10px; margin-bottom: 15px; }}
  .bank-info {{ font-size: 11px; border: 1px solid #ccc; padding: 8px; margin-bottom: 10px; }}
  table {{ width: 100%; border-collapse: collapse; margin-bottom: 10px; }}
  th, td {{ border: 1px solid #000; padding: 4px 6px; text-align: left; }}
  th {{ background: #f0f0f0; font-weight: bold; text-align: center; }}
  td.num {{ text-align: center; }}
  td.right {{ text-align: right; }}
  .total-row td {{ font-weight: bold; }}
  .footer {{ margin-top: 20px; font-size: 11px; }}
  .sign-row {{ display: flex; justify-content: space-between; margin-top: 30px; }}
</style>
</head>
<body>
<div class="header">
  <strong>Получатель:</strong> {seller['name']}<br>
  ИНН: {seller['inn']} | ОГРНИП: {seller['ogrn']}<br>
  Банк: {seller['bank_name']} | БИК: {seller['bik']}<br>
  Р/с: {seller['account']} | К/с: {seller['correspondent_account']}
</div>

<h1>СЧЁТ НА ОПЛАТУ № {doc_number}</h1>
<h2>от {today} г.</h2>

<p><strong>Поставщик:</strong> {seller['name']}, ИНН: {seller['inn']}</p>
<p><strong>Покупатель:</strong> {buyer_name}{buyer_inn}</p>
<p><strong>Основание:</strong> Заказ № {order.order_number}</p>

<table>
  <thead>
    <tr>
      <th style="width:30px">№</th>
      <th>Наименование</th>
      <th style="width:40px">Ед.</th>
      <th style="width:60px">Кол-во</th>
      <th style="width:80px">Цена</th>
      <th style="width:90px">Сумма</th>
    </tr>
  </thead>
  <tbody>
    {rows_html}
  </tbody>
  <tfoot>
    <tr class="total-row">
      <td colspan="5" class="right">ИТОГО:</td>
      <td class="right">{total_str} ₽</td>
    </tr>
  </tfoot>
</table>

<p><strong>Итого к оплате: {total_str} рублей</strong></p>
<p>Без НДС (УСН 6%)</p>
<p>Оплата в течение 5 рабочих дней.</p>

<div class="sign-row">
  <div>Руководитель: _________________ / Наимов Х.В. /</div>
  <div>Бухгалтер: _________________ / Наимов Х.В. /</div>
</div>
</body>
</html>"""


def _build_torg12_html(order, doc_number: str) -> str:
    """
    Строит HTML для товарной накладной ТОРГ-12.
    """
    seller = _get_seller_info()
    today = datetime.now(UTC).strftime("%d.%m.%Y")

    rows_html = ""
    for i, item in enumerate(order.items, 1):
        qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
        row_total = round(qty * item.price, 2)
        rows_html += f"""
        <tr>
            <td class="num">{i}</td>
            <td>{item.product_name}</td>
            <td class="num">Россия</td>
            <td class="num">{item.unit}</td>
            <td class="num">{qty:.2f}</td>
            <td class="right">{item.price:,.2f}</td>
            <td class="right">{row_total:,.2f}</td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #000; }}
  h1 {{ font-size: 14px; text-align: center; }}
  table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
  th, td {{ border: 1px solid #000; padding: 3px 5px; }}
  th {{ background: #f0f0f0; text-align: center; font-size: 10px; }}
  .num {{ text-align: center; }}
  .right {{ text-align: right; }}
  .total-row td {{ font-weight: bold; }}
  .parties {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }}
  .party-box {{ border: 1px solid #ccc; padding: 8px; }}
  .sign-section {{ margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
</style>
</head>
<body>

<h1>ТОВАРНАЯ НАКЛАДНАЯ</h1>
<p style="text-align:center">Форма ТОРГ-12</p>

<div class="parties">
  <div class="party-box">
    <strong>Грузоотправитель (Поставщик):</strong><br>
    {seller['name']}<br>
    ИНН: {seller['inn']}<br>
    Адрес: {seller['address']}<br>
    Тел: {seller['phone']}
  </div>
  <div class="party-box">
    <strong>Грузополучатель (Покупатель):</strong><br>
    {order.client_name}<br>
    Адрес доставки: {order.delivery_address}
  </div>
</div>

<p>
  <strong>Накладная №</strong> {doc_number} &nbsp;&nbsp;
  <strong>от</strong> {today} г. &nbsp;&nbsp;
  <strong>Основание:</strong> Заказ № {order.order_number}
</p>

<table>
  <thead>
    <tr>
      <th style="width:25px">№</th>
      <th>Наименование товара</th>
      <th style="width:70px">Страна происхождения</th>
      <th style="width:35px">Ед.</th>
      <th style="width:60px">Кол-во</th>
      <th style="width:75px">Цена, ₽</th>
      <th style="width:90px">Сумма, ₽</th>
    </tr>
  </thead>
  <tbody>
    {rows_html}
  </tbody>
  <tfoot>
    <tr class="total-row">
      <td colspan="6" class="right">Итого:</td>
      <td class="right">{order.total:,.2f}</td>
    </tr>
  </tfoot>
</table>

<p><strong>Всего наименований: {len(order.items)}</strong></p>
<p><strong>Итого к оплате: {order.total:,.2f} рублей</strong></p>
<p>Без НДС (УСН 6%)</p>

<div class="sign-section">
  <div>
    <strong>Отпустил:</strong><br><br>
    _____________ / Наимов Х.В. /<br>
    (подпись) &nbsp;&nbsp;&nbsp;&nbsp; (расшифровка)
  </div>
  <div>
    <strong>Принял:</strong><br><br>
    _____________ / _________________ /<br>
    (подпись) &nbsp;&nbsp;&nbsp;&nbsp; (расшифровка)
  </div>
</div>

<p style="margin-top:15px">М.П.</p>

</body>
</html>"""


async def _save_pdf(html: str, filename: str) -> Optional[str]:
    """
    Конвертирует HTML в PDF и сохраняет на диск.

    Args:
        html: HTML строка
        filename: Имя файла (без пути)

    Returns:
        Путь к файлу или None при ошибке
    """
    Path(DOCUMENTS_DIR).mkdir(parents=True, exist_ok=True)
    filepath = Path(DOCUMENTS_DIR) / filename

    try:
        import weasyprint

        weasyprint.HTML(string=html).write_pdf(filepath)
        logger.info("PDF сгенерирован через WeasyPrint", filename=filename)
        return str(filepath)
    except ImportError:
        # WeasyPrint не установлен — сохраняем HTML как fallback
        html_filepath = str(filepath).replace(".pdf", ".html")
        with Path(html_filepath).open("w", encoding="utf-8") as f:
            f.write(html)
        logger.warning(
            "WeasyPrint не установлен, сохранён HTML",
            html_filename=Path(html_filepath).name,
        )
        return str(html_filepath)
    except Exception as e:
        logger.error("Ошибка генерации PDF", error=str(e), filename=filename)
        return None


async def generate_invoice(order) -> Optional[DocumentRecord]:
    """
    Генерирует счёт на оплату для заказа.

    Args:
        order: Объект Order

    Returns:
        DocumentRecord или None при ошибке
    """
    client_id = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)

    doc_number = await get_next_doc_number(DocumentType.INVOICE)
    year = datetime.now(UTC).year

    html = _build_invoice_html(order, doc_number)
    filename = f"invoice_{order.order_number}_{doc_number.replace('/', '-')}.pdf"
    filepath = await _save_pdf(html, filename)

    # URL для скачивания
    file_url = f"/api/v1/documents/files/{filename}" if filepath else None
    file_size = Path(filepath).stat().st_size if filepath and Path(filepath).exists() else None

    doc = DocumentRecord(
        doc_type=DocumentType.INVOICE,
        number=doc_number,
        year=year,
        order_id=str(order.id),
        client_id=client_id,
        client_name=order.client_name,
        file_url=file_url,
        file_name=filename,
        file_size_bytes=file_size,
        created_at=datetime.now(UTC),
        created_by="system",
    )
    await doc.insert()

    logger.info(
        "Счёт сгенерирован",
        doc_number=doc_number,
        order_number=order.order_number,
    )

    return doc


async def generate_torg12(order) -> Optional[DocumentRecord]:
    """
    Генерирует товарную накладную ТОРГ-12 для заказа.

    Args:
        order: Объект Order

    Returns:
        DocumentRecord или None при ошибке
    """
    client_id = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)

    doc_number = await get_next_doc_number(DocumentType.TORG12)
    year = datetime.now(UTC).year

    html = _build_torg12_html(order, doc_number)
    filename = f"torg12_{order.order_number}_{doc_number.replace('/', '-')}.pdf"
    filepath = await _save_pdf(html, filename)

    file_url = f"/api/v1/documents/files/{filename}" if filepath else None
    file_size = Path(filepath).stat().st_size if filepath and Path(filepath).exists() else None

    doc = DocumentRecord(
        doc_type=DocumentType.TORG12,
        number=doc_number,
        year=year,
        order_id=str(order.id),
        client_id=client_id,
        client_name=order.client_name,
        file_url=file_url,
        file_name=filename,
        file_size_bytes=file_size,
        created_at=datetime.now(UTC),
        created_by="system",
    )
    await doc.insert()

    logger.info(
        "ТОРГ-12 сгенерирован",
        doc_number=doc_number,
        order_number=order.order_number,
    )

    return doc


async def generate_labels(products: list, order_id: Optional[str] = None) -> Optional[DocumentRecord]:
    """
    Генерирует ярлыки для упаковки товаров.

    Args:
        products: Список товаров с полями (name, origin_country, storage_conditions, shelf_life_days)
        order_id: ID заказа (опционально)

    Returns:
        DocumentRecord
    """
    today_str = datetime.now(UTC).strftime("%d.%m.%Y")

    label_html = """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; }
  .label {
    width: 148mm; height: 105mm; /* A6 */
    border: 1px solid #000; padding: 8px; margin: 5px;
    page-break-after: always; box-sizing: border-box;
    display: inline-block;
  }
  .label h2 { font-size: 14px; margin: 0 0 5px 0; text-align: center; }
  .label p { margin: 3px 0; }
  .label .field { display: flex; gap: 5px; }
  .label .field strong { min-width: 120px; }
  .company { font-size: 9px; text-align: center; color: #666; margin-top: 10px; }
  .logo { text-align: center; font-size: 16px; color: green; font-weight: bold; }
</style>
</head>
<body>
"""

    for product in products:
        label_html += f"""
<div class="label">
  <div class="logo">АГРОРЕЗЕРВ</div>
  <h2>{product.get('name', 'Товар')}</h2>
  <div class="field"><strong>Страна происхождения:</strong> {product.get('origin_country', 'Россия')}</div>
  <div class="field"><strong>Дата фасовки:</strong> {today_str}</div>
  <div class="field"><strong>Срок годности:</strong> {product.get('shelf_life_days', 30)} дней</div>
  <div class="field"><strong>Условия хранения:</strong> {product.get('storage_conditions', '+5...+15°C')}</div>
  <div class="field"><strong>Декларация ТР ТС:</strong> {product.get('declaration_number', 'см. сертификат')}</div>
  <div class="company">ИП Наимов Х.В. | agroreserve.ru | г. Тобольск</div>
</div>
"""

    label_html += "</body></html>"

    doc_number = await get_next_doc_number(DocumentType.LABEL)
    year = datetime.now(UTC).year
    filename = f"labels_{today_str.replace('.', '')}_{doc_number.replace('/', '-')}.pdf"
    filepath = await _save_pdf(label_html, filename)

    file_url = f"/api/v1/documents/files/{filename}" if filepath else None
    file_size = Path(filepath).stat().st_size if filepath and Path(filepath).exists() else None

    doc = DocumentRecord(
        doc_type=DocumentType.LABEL,
        number=doc_number,
        year=year,
        order_id=order_id,
        client_id="admin",
        client_name="Администратор",
        file_url=file_url,
        file_name=filename,
        file_size_bytes=file_size,
        created_at=datetime.now(UTC),
        created_by="system",
    )
    await doc.insert()

    return doc


# ── UC-43: Акт сверки взаиморасчётов ──────────────────────────────────────────


def _build_reconciliation_html(
    seller: dict,
    client_name: str,
    client_inn: str,
    client_address: str,
    date_from: str,
    date_to: str,
    opening_balance: float,
    transactions: list,
    closing_balance: float,
) -> str:
    """
    Строит HTML для акта сверки взаиморасчётов.

    Args:
        seller: Реквизиты продавца
        client_name: Название клиента
        client_inn: ИНН клиента
        client_address: Адрес клиента
        date_from: Начало периода (строка)
        date_to: Конец периода (строка)
        opening_balance: Начальное сальдо (положительное = клиент должен нам)
        transactions: Список транзакций [{date, doc, debit, credit, balance, description}]
        closing_balance: Конечное сальдо

    Returns:
        HTML строка
    """
    today = datetime.now(UTC).strftime("%d.%m.%Y")

    # Строки таблицы транзакций
    rows_html = f"""
    <tr>
      <td colspan="2"><strong>Сальдо на начало периода ({date_from})</strong></td>
      <td class="right"></td>
      <td class="right"></td>
      <td class="right"><strong>{opening_balance:,.2f}</strong></td>
    </tr>"""

    total_debit = 0.0
    total_credit = 0.0
    running_balance = opening_balance

    for t in transactions:
        debit_str = f"{t['debit']:,.2f}" if t.get("debit") else ""
        credit_str = f"{t['credit']:,.2f}" if t.get("credit") else ""
        if t.get("debit"):
            running_balance += t["debit"]
            total_debit += t["debit"]
        if t.get("credit"):
            running_balance -= t["credit"]
            total_credit += t["credit"]
        rows_html += f"""
    <tr>
      <td>{t.get('date', '')}</td>
      <td>{t.get('description', '')}</td>
      <td class="right">{debit_str}</td>
      <td class="right">{credit_str}</td>
      <td class="right">{running_balance:,.2f}</td>
    </tr>"""

    # Итого
    rows_html += f"""
    <tr class="total-row">
      <td colspan="2"><strong>Обороты за период</strong></td>
      <td class="right"><strong>{total_debit:,.2f}</strong></td>
      <td class="right"><strong>{total_credit:,.2f}</strong></td>
      <td class="right"></td>
    </tr>
    <tr class="total-row">
      <td colspan="2"><strong>Сальдо на конец периода ({date_to})</strong></td>
      <td class="right"></td>
      <td class="right"></td>
      <td class="right"><strong>{closing_balance:,.2f}</strong></td>
    </tr>"""

    # Текст сальдо
    if closing_balance > 0:
        balance_text = f"задолженность покупателя составляет {closing_balance:,.2f} руб."
    elif closing_balance < 0:
        balance_text = f"задолженность поставщика составляет {abs(closing_balance):,.2f} руб."
    else:
        balance_text = "задолженность отсутствует"

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #000; }}
  h1 {{ font-size: 15px; text-align: center; margin-bottom: 4px; }}
  h2 {{ font-size: 13px; text-align: center; margin-top: 0; margin-bottom: 15px; }}
  .parties {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; }}
  .party-box {{ border: 1px solid #999; padding: 8px; font-size: 11px; }}
  .party-box strong {{ display: block; margin-bottom: 4px; font-size: 12px; }}
  table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
  th, td {{ border: 1px solid #000; padding: 4px 6px; }}
  th {{ background: #f0f0f0; text-align: center; }}
  td.right {{ text-align: right; }}
  .total-row td {{ background: #f5f5f5; font-weight: bold; }}
  .sign-section {{ margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }}
  .sign-box {{ font-size: 11px; }}
  .balance-text {{ margin: 15px 0; padding: 10px; border: 1px solid #333; background: #fafafa; }}
</style>
</head>
<body>

<h1>АКТ СВЕРКИ ВЗАИМОРАСЧЁТОВ</h1>
<h2>за период с {date_from} по {date_to} г.</h2>

<div class="parties">
  <div class="party-box">
    <strong>Сторона 1 (Поставщик):</strong>
    {seller['name']}<br>
    ИНН: {seller['inn']}<br>
    Адрес: {seller['address']}<br>
    Тел: {seller['phone']}
  </div>
  <div class="party-box">
    <strong>Сторона 2 (Покупатель):</strong>
    {client_name}<br>
    ИНН: {client_inn or '—'}<br>
    Адрес: {client_address or '—'}
  </div>
</div>

<table>
  <thead>
    <tr>
      <th style="width:80px">Дата</th>
      <th>Документ / Описание</th>
      <th style="width:110px">Дебет (нам должны), ₽</th>
      <th style="width:110px">Кредит (оплачено), ₽</th>
      <th style="width:110px">Сальдо, ₽</th>
    </tr>
  </thead>
  <tbody>
    {rows_html}
  </tbody>
</table>

<div class="balance-text">
  По данным {seller['name']}, на {date_to} {balance_text}.
</div>

<div class="sign-section">
  <div class="sign-box">
    <strong>От {seller['name']}:</strong><br><br>
    Руководитель: _____________ / Наимов Х.В. /<br><br>
    Главный бухгалтер: _____________ / Наимов Х.В. /<br><br>
    М.П.
  </div>
  <div class="sign-box">
    <strong>От {client_name}:</strong><br><br>
    Руководитель: _____________ / _________________ /<br><br>
    Главный бухгалтер: _____________ / _________________ /<br><br>
    М.П.
  </div>
</div>

<p style="font-size:10px; margin-top:20px; color:#666;">
  Документ сформирован автоматически системой Агрорезерв. Дата формирования: {today}.
</p>
</body>
</html>"""


async def generate_reconciliation_act(
    client_id: str,
    date_from,
    date_to,
) -> bytes:
    """
    UC-43: Генерация акта сверки взаиморасчётов.

    Собирает все заказы и оплаты клиента за период.
    Рассчитывает: начальное сальдо, обороты (дебет/кредит), конечное сальдо.

    Args:
        client_id: ID клиента (строка ObjectId)
        date_from: Начало периода (date)
        date_to: Конец периода (date)

    Returns:
        bytes — PDF или HTML файл
    """
    from datetime import datetime as dt

    from beanie import PydanticObjectId

    from app.models.order import Order, OrderStatus
    from app.models.user import User

    # Получаем клиента
    try:
        client = await User.get(PydanticObjectId(client_id))
    except Exception as e:
        raise ValueError(f"Клиент с ID {client_id} не найден") from e

    if not client:
        raise ValueError(f"Клиент с ID {client_id} не найден")

    # Реквизиты продавца из БД
    seller = await _get_seller_info_from_db()

    # Форматируем даты
    date_from_str = date_from.strftime("%d.%m.%Y")
    date_to_str = date_to.strftime("%d.%m.%Y")

    # Конвертируем даты в datetime для MongoDB
    start_dt = dt(date_from.year, date_from.month, date_from.day, 0, 0, 0, tzinfo=UTC)
    end_dt = dt(date_to.year, date_to.month, date_to.day, 23, 59, 59, tzinfo=UTC)

    # Заказы клиента за период (только доставленные или подтверждённые)
    orders = (
        await Order.find(
            {"client_id.$id": PydanticObjectId(client_id)},
            Order.created_at >= start_dt,
            Order.created_at <= end_dt,
        )
        .sort(Order.created_at)
        .to_list()
    )

    # Начальное сальдо — задолженность до начала периода
    orders_before = await Order.find(
        {"client_id.$id": PydanticObjectId(client_id)},
        Order.created_at < start_dt,
        Order.status.in_([OrderStatus.DELIVERED, OrderStatus.CONFIRMED]),
    ).to_list()

    opening_debit = sum(o.total for o in orders_before)
    opening_paid = sum(o.paid_amount for o in orders_before)
    opening_balance = round(opening_debit - opening_paid, 2)

    # Транзакции за период
    transactions = []

    for order in orders:
        if order.status in [
            OrderStatus.DELIVERED,
            OrderStatus.CONFIRMED,
            OrderStatus.ASSEMBLING,
            OrderStatus.ASSEMBLED,
            OrderStatus.DELIVERING,
        ]:
            transactions.append(
                {
                    "date": order.created_at.strftime("%d.%m.%Y"),
                    "description": f"Заказ № {order.order_number} (поставка)",
                    "debit": order.total,
                    "credit": None,
                }
            )
            if order.paid_amount > 0:
                paid_date = (
                    order.paid_at.strftime("%d.%m.%Y") if order.paid_at else order.created_at.strftime("%d.%m.%Y")
                )
                transactions.append(
                    {
                        "date": paid_date,
                        "description": f"Оплата по заказу № {order.order_number}",
                        "debit": None,
                        "credit": order.paid_amount,
                    }
                )

    # Сортируем по дате
    transactions.sort(key=lambda x: x["date"])

    # Конечное сальдо
    period_debit = sum(t["debit"] for t in transactions if t.get("debit"))
    period_credit = sum(t["credit"] for t in transactions if t.get("credit"))
    closing_balance = round(opening_balance + period_debit - period_credit, 2)

    # Реквизиты клиента
    client_inn = ""
    client_address = ""
    if client.organization:
        client_inn = client.organization.inn
        client_address = client.organization.legal_address

    # Генерируем HTML
    html = _build_reconciliation_html(
        seller=seller,
        client_name=client.name,
        client_inn=client_inn,
        client_address=client_address,
        date_from=date_from_str,
        date_to=date_to_str,
        opening_balance=opening_balance,
        transactions=transactions,
        closing_balance=closing_balance,
    )

    # Сохраняем PDF
    filename = f"reconciliation_{client_id}_{date_from.strftime('%Y%m%d')}_{date_to.strftime('%Y%m%d')}.pdf"
    filepath = await _save_pdf(html, filename)

    # Сохраняем запись в БД
    doc_number = await get_next_doc_number(DocumentType.ACT_SVERKI)
    year = datetime.now(UTC).year
    file_url = f"/admin/documents/files/{filename}" if filepath else None
    file_size = Path(filepath).stat().st_size if filepath and Path(filepath).exists() else None

    doc_record = DocumentRecord(
        doc_type=DocumentType.ACT_SVERKI,
        number=doc_number,
        year=year,
        client_id=client_id,
        client_name=client.name,
        file_url=file_url,
        file_name=filename,
        file_size_bytes=file_size,
    )
    await doc_record.insert()

    logger.info(
        "Акт сверки сгенерирован",
        client_id=client_id,
        client_name=client.name,
        date_from=date_from_str,
        date_to=date_to_str,
        closing_balance=closing_balance,
    )

    # Читаем и возвращаем байты
    if filepath and Path(filepath).exists():
        with Path(filepath).open("rb") as f:
            return f.read()
    else:
        return html.encode("utf-8")


# ── UC-55: Генератор договоров ────────────────────────────────────────────────


def _build_contract_number(contract_type: str, counter: int) -> str:
    """Генерирует номер договора в формате ДГ-YYYY-NNNNN."""
    year = datetime.now(UTC).year
    prefix_map = {
        "supply": "ДП",  # Договор поставки
        "supply_44fz": "ГК",  # Госконтракт 44-ФЗ
        "agency": "ДА",  # Агентский договор
    }
    prefix = prefix_map.get(contract_type, "ДГ")
    return f"{prefix}-{year}-{counter:05d}"


def _build_supply_contract_html(
    seller: dict,
    client_name: str,
    client_inn: str,
    client_address: str,
    client_representative: str,
    contract_number: str,
    today: str,
) -> str:
    """Строит HTML для договора поставки."""
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Times New Roman, serif; font-size: 12px; margin: 30px 40px; color: #000; line-height: 1.5; }}
  h1 {{ font-size: 16px; text-align: center; font-weight: bold; margin: 20px 0 5px; }}
  h2 {{ font-size: 13px; text-align: center; margin: 0 0 20px; }}
  .section-title {{ font-weight: bold; margin: 15px 0 5px; }}
  p {{ margin: 6px 0; text-align: justify; }}
  .sign-section {{ margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }}
  .sign-box p {{ margin: 4px 0; }}
  .underline {{ border-bottom: 1px solid #000; min-width: 150px; display: inline-block; }}
</style>
</head>
<body>

<h1>ДОГОВОР ПОСТАВКИ</h1>
<h2>№ {contract_number} от {today} г.</h2>

<p>
  <strong>{seller['name']}</strong>, именуемый в дальнейшем «Поставщик»,
  действующий на основании свидетельства о регистрации ИП, с одной стороны,
  и <strong>{client_name}</strong>, ИНН: {client_inn or '—'}, именуемый в дальнейшем «Покупатель»,
  в лице {client_representative or 'руководителя'}, действующего на основании Устава, с другой стороны,
  заключили настоящий договор о нижеследующем:
</p>

<p class="section-title">1. ПРЕДМЕТ ДОГОВОРА</p>
<p>1.1. Поставщик обязуется поставить, а Покупатель обязуется принять и оплатить
овощи, фрукты и иную продовольственную продукцию (далее — «Товар») в количестве,
ассортименте и по ценам, указанным в счетах-фактурах (счетах) и/или накладных,
являющихся неотъемлемой частью настоящего Договора.</p>
<p>1.2. Поставщик гарантирует, что Товар соответствует требованиям технических
регламентов ЕАЭС, имеет необходимые сертификаты и декларации соответствия.</p>

<p class="section-title">2. КАЧЕСТВО И КОЛИЧЕСТВО ТОВАРА</p>
<p>2.1. Качество Товара должно соответствовать требованиям действующих ГОСТ, ТУ
и санитарных норм.</p>
<p>2.2. Количество Товара определяется в каждой партии по товарной накладной ТОРГ-12
или УПД.</p>
<p>2.3. Страна происхождения: Россия.</p>

<p class="section-title">3. ЦЕНА И ПОРЯДОК ОПЛАТЫ</p>
<p>3.1. Цена Товара устанавливается в российских рублях и указывается в счёте на оплату.</p>
<p>3.2. Оплата производится в безналичном порядке путём перечисления денежных средств
на расчётный счёт Поставщика в течение 14 (четырнадцати) рабочих дней с момента
получения Товара.</p>
<p>3.3. Без НДС (Поставщик применяет УСН 6%).</p>

<p class="section-title">4. ДОСТАВКА</p>
<p>4.1. Доставка Товара осуществляется силами Поставщика по адресу Покупателя:
{client_address or '____________________________'}.</p>
<p>4.2. Право собственности на Товар переходит к Покупателю с момента подписания
товарной накладной.</p>

<p class="section-title">5. ОТВЕТСТВЕННОСТЬ СТОРОН</p>
<p>5.1. За несвоевременную оплату Покупатель уплачивает Поставщику пеню в размере
0,1% от неоплаченной суммы за каждый день просрочки.</p>
<p>5.2. В случае поставки Товара ненадлежащего качества Поставщик обязан заменить
Товар в течение 2 рабочих дней.</p>

<p class="section-title">6. СРОК ДЕЙСТВИЯ ДОГОВОРА</p>
<p>6.1. Договор вступает в силу с момента подписания и действует до 31 декабря
текущего года с возможностью автоматической пролонгации.</p>

<p class="section-title">7. РЕКВИЗИТЫ СТОРОН</p>
<div class="sign-section">
  <div class="sign-box">
    <p><strong>ПОСТАВЩИК:</strong></p>
    <p>{seller['name']}</p>
    <p>ИНН: {seller['inn']}</p>
    <p>ОГРНИП: {seller['ogrn']}</p>
    <p>Адрес: {seller['address']}</p>
    <p>Банк: {seller['bank_name']}</p>
    <p>БИК: {seller['bik']}</p>
    <p>Р/с: {seller['account']}</p>
    <p>К/с: {seller['correspondent_account']}</p>
    <br>
    <p>Подпись: _____________ / Наимов Х.В. /</p>
    <p>М.П.</p>
  </div>
  <div class="sign-box">
    <p><strong>ПОКУПАТЕЛЬ:</strong></p>
    <p>{client_name}</p>
    <p>ИНН: {client_inn or '—'}</p>
    <p>Адрес: {client_address or '—'}</p>
    <br><br><br><br><br>
    <p>Подпись: _____________ / _________________ /</p>
    <p>М.П.</p>
  </div>
</div>

</body>
</html>"""


def _build_supply_44fz_contract_html(
    seller: dict,
    client_name: str,
    client_inn: str,
    client_address: str,
    contract_number: str,
    today: str,
    max_amount: float = 600000.0,
) -> str:
    """Строит HTML для госконтракта по 44-ФЗ."""
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Times New Roman, serif; font-size: 12px; margin: 30px 40px; color: #000; line-height: 1.5; }}
  h1 {{ font-size: 15px; text-align: center; font-weight: bold; margin: 20px 0 5px; }}
  h2 {{ font-size: 13px; text-align: center; margin: 0 0 5px; }}
  h3 {{ font-size: 12px; text-align: center; margin: 0 0 20px; color: #555; }}
  .section-title {{ font-weight: bold; margin: 15px 0 5px; }}
  p {{ margin: 6px 0; text-align: justify; }}
  .sign-section {{ margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }}
  .sign-box p {{ margin: 4px 0; }}
  .highlight {{ background: #fff3cd; padding: 2px 4px; }}
</style>
</head>
<body>

<h1>МУНИЦИПАЛЬНЫЙ КОНТРАКТ</h1>
<h2>на поставку продовольственных товаров</h2>
<h3>№ {contract_number} от {today} г.<br>
Закупка до 600 000 рублей (п.5 ч.1 ст.93 Федерального закона № 44-ФЗ)</h3>

<p>
  <strong>{client_name}</strong>, ИНН {client_inn or '—'}, именуемый в дальнейшем «Заказчик»,
  в лице руководителя, действующего на основании Устава, с одной стороны,
  и <strong>{seller['name']}</strong>, ИНН {seller['inn']}, ОГРНИП {seller['ogrn']},
  именуемый в дальнейшем «Поставщик», с другой стороны, заключили настоящий контракт.
</p>

<p class="section-title">1. ПРЕДМЕТ КОНТРАКТА</p>
<p>1.1. Поставщик обязуется поставить Заказчику продовольственные товары (овощи, фрукты,
сухофрукты, орехи, специи) в соответствии со Спецификацией (Приложение № 1),
а Заказчик обязуется принять и оплатить поставленный товар.</p>
<p>1.2. Цена контракта не превышает <strong>{max_amount:,.0f} (шестьсот тысяч) рублей</strong>
включительно, что позволяет осуществить закупку у единственного поставщика
в соответствии с п.5 ч.1 ст.93 Закона № 44-ФЗ.</p>

<p class="section-title">2. КАЧЕСТВО ТОВАРА</p>
<p>2.1. Поставляемый товар должен соответствовать требованиям ТР ТС 021/2011
«О безопасности пищевой продукции», ТР ТС 022/2011, ГОСТ.</p>
<p>2.2. Поставщик предоставляет на каждую партию: товарную накладную ТОРГ-12 или УПД,
декларацию соответствия ТР ТС, ветеринарное свидетельство (при необходимости).</p>
<p>2.3. Страна происхождения: Россия.</p>

<p class="section-title">3. ЦЕНА И ОПЛАТА</p>
<p>3.1. Цена контракта является твёрдой и не может изменяться в ходе исполнения.</p>
<p>3.2. Оплата производится безналичным платежом в течение 15 рабочих дней
после подписания товарной накладной и акта приёма-передачи.</p>
<p>3.3. НДС не предусмотрен (Поставщик применяет УСН).</p>

<p class="section-title">4. СРОК И УСЛОВИЯ ПОСТАВКИ</p>
<p>4.1. Поставка осуществляется по адресу: {client_address or '____________________________'}.</p>
<p>4.2. Поставка осуществляется за счёт Поставщика.</p>
<p>4.3. Периодичность и объём каждой партии определяются заявками Заказчика.</p>

<p class="section-title">5. ПРИЁМКА ТОВАРА</p>
<p>5.1. Заказчик проверяет качество и количество товара в момент поставки.</p>
<p>5.2. Претензии по качеству и количеству принимаются в течение 1 дня с момента поставки.</p>

<p class="section-title">6. ОТВЕТСТВЕННОСТЬ</p>
<p>6.1. При нарушении сроков поставки Поставщик уплачивает пеню в размере 1/300
ставки рефинансирования ЦБ РФ за каждый день просрочки.</p>
<p>6.2. При нарушении сроков оплаты Заказчик уплачивает пеню в размере 1/300
ставки рефинансирования ЦБ РФ за каждый день просрочки.</p>

<p class="section-title">7. СРОК ДЕЙСТВИЯ КОНТРАКТА</p>
<p>7.1. Контракт вступает в силу с момента подписания и действует до полного
исполнения сторонами своих обязательств, но не более 1 года.</p>

<p class="section-title">8. РЕКВИЗИТЫ И ПОДПИСИ СТОРОН</p>
<div class="sign-section">
  <div class="sign-box">
    <p><strong>ЗАКАЗЧИК:</strong></p>
    <p>{client_name}</p>
    <p>ИНН: {client_inn or '—'}</p>
    <p>Адрес: {client_address or '—'}</p>
    <br><br><br>
    <p>Руководитель: _____________ / _________________ /</p>
    <p>М.П.</p>
  </div>
  <div class="sign-box">
    <p><strong>ПОСТАВЩИК:</strong></p>
    <p>{seller['name']}</p>
    <p>ИНН: {seller['inn']}, ОГРНИП: {seller['ogrn']}</p>
    <p>Адрес: {seller['address']}</p>
    <p>Банк: {seller['bank_name']}</p>
    <p>БИК: {seller['bik']}, Р/с: {seller['account']}</p>
    <br>
    <p>ИП Наимов Х.В.: _____________ / Наимов Х.В. /</p>
    <p>М.П.</p>
  </div>
</div>

</body>
</html>"""


def _build_agency_contract_html(
    seller: dict,
    client_name: str,
    client_inn: str,
    client_address: str,
    contract_number: str,
    today: str,
) -> str:
    """Строит HTML для агентского договора."""
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Times New Roman, serif; font-size: 12px; margin: 30px 40px; color: #000; line-height: 1.5; }}
  h1 {{ font-size: 16px; text-align: center; font-weight: bold; margin: 20px 0 5px; }}
  h2 {{ font-size: 13px; text-align: center; margin: 0 0 20px; }}
  .section-title {{ font-weight: bold; margin: 15px 0 5px; }}
  p {{ margin: 6px 0; text-align: justify; }}
  .sign-section {{ margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }}
</style>
</head>
<body>

<h1>АГЕНТСКИЙ ДОГОВОР</h1>
<h2>№ {contract_number} от {today} г.</h2>

<p>
  <strong>{seller['name']}</strong>, ИНН {seller['inn']}, именуемый в дальнейшем «Агент»,
  и <strong>{client_name}</strong>, ИНН {client_inn or '—'}, именуемый в дальнейшем «Принципал»,
  заключили настоящий агентский договор о следующем:
</p>

<p class="section-title">1. ПРЕДМЕТ ДОГОВОРА</p>
<p>1.1. Принципал поручает, а Агент принимает на себя обязательство за вознаграждение
совершать по поручению Принципала юридические и иные действия по закупке
продовольственных товаров (овощи, фрукты, сухофрукты) от своего имени, но за счёт Принципала.</p>

<p class="section-title">2. ОБЯЗАННОСТИ АГЕНТА</p>
<p>2.1. Осуществлять поиск и закупку товаров по ценам не выше согласованных с Принципалом.</p>
<p>2.2. Обеспечивать наличие всей необходимой документации (сертификаты, накладные).</p>
<p>2.3. Предоставлять отчёты об исполнении поручений.</p>

<p class="section-title">3. ВОЗНАГРАЖДЕНИЕ АГЕНТА</p>
<p>3.1. Вознаграждение составляет __% от суммы каждой сделки.</p>
<p>3.2. Выплачивается в течение 5 рабочих дней после утверждения отчёта.</p>

<p class="section-title">4. СРОК ДЕЙСТВИЯ</p>
<p>4.1. Договор действует 1 год с возможностью пролонгации.</p>

<div class="sign-section">
  <div>
    <p><strong>АГЕНТ:</strong> {seller['name']}</p>
    <p>ИНН: {seller['inn']}, Адрес: {seller['address']}</p>
    <br><br>
    <p>_____________ / Наимов Х.В. / М.П.</p>
  </div>
  <div>
    <p><strong>ПРИНЦИПАЛ:</strong> {client_name}</p>
    <p>ИНН: {client_inn or '—'}, Адрес: {client_address or '—'}</p>
    <br><br>
    <p>_____________ / _________________ / М.П.</p>
  </div>
</div>

</body>
</html>"""


async def generate_contract_pdf(contract_type: str, client_id: str) -> bytes:
    """
    UC-55: Генератор договоров.

    Типы:
    - "supply": Договор поставки
    - "supply_44fz": Госконтракт 44-ФЗ
    - "agency": Агентский договор

    Автозаполняет реквизиты из User (клиент) + SystemSettings (мы).
    Нумерация: ДП-YYYY-NNNNN / ГК-YYYY-NNNNN / ДА-YYYY-NNNNN

    Args:
        contract_type: Тип договора
        client_id: ID клиента

    Returns:
        bytes — PDF или HTML файл
    """
    valid_types = ["supply", "supply_44fz", "agency"]
    if contract_type not in valid_types:
        raise ValueError(f"Допустимые типы договоров: {', '.join(valid_types)}")

    from beanie import PydanticObjectId

    from app.models.user import User

    # Получаем клиента
    try:
        client = await User.get(PydanticObjectId(client_id))
    except Exception as e:
        raise ValueError(f"Клиент с ID {client_id} не найден") from e

    if not client:
        raise ValueError(f"Клиент с ID {client_id} не найден")

    # Реквизиты продавца
    seller = await _get_seller_info_from_db()

    # Реквизиты клиента
    client_inn = ""
    client_address = ""
    client_representative = ""
    if client.organization:
        client_inn = client.organization.inn
        client_address = client.organization.legal_address

    # Генерируем номер договора
    # Получаем счётчик из коллекции документов
    year = datetime.now(UTC).year
    existing_contracts = await DocumentRecord.find(
        DocumentRecord.doc_type == DocumentType.CONTRACT,
        DocumentRecord.year == year,
    ).count()
    contract_counter = existing_contracts + 1
    contract_number = _build_contract_number(contract_type, contract_counter)
    today = datetime.now(UTC).strftime("%d.%m.%Y")

    # Выбираем шаблон
    if contract_type == "supply":
        html = _build_supply_contract_html(
            seller=seller,
            client_name=client.name,
            client_inn=client_inn,
            client_address=client_address,
            client_representative=client_representative,
            contract_number=contract_number,
            today=today,
        )
    elif contract_type == "supply_44fz":
        html = _build_supply_44fz_contract_html(
            seller=seller,
            client_name=client.name,
            client_inn=client_inn,
            client_address=client_address,
            contract_number=contract_number,
            today=today,
        )
    elif contract_type == "agency":
        html = _build_agency_contract_html(
            seller=seller,
            client_name=client.name,
            client_inn=client_inn,
            client_address=client_address,
            contract_number=contract_number,
            today=today,
        )

    # Сохраняем PDF
    filename = f"contract_{contract_type}_{client_id}_{year}_{contract_counter:05d}.pdf"
    filepath = await _save_pdf(html, filename)

    # Сохраняем запись в БД
    file_url = f"/admin/documents/files/{filename}" if filepath else None
    file_size = Path(filepath).stat().st_size if filepath and Path(filepath).exists() else None

    doc_record = DocumentRecord(
        doc_type=DocumentType.CONTRACT,
        number=contract_number,
        year=year,
        client_id=client_id,
        client_name=client.name,
        file_url=file_url,
        file_name=filename,
        file_size_bytes=file_size,
    )
    await doc_record.insert()

    logger.info(
        "Договор сгенерирован",
        contract_type=contract_type,
        contract_number=contract_number,
        client_id=client_id,
        client_name=client.name,
    )

    # Возвращаем байты
    if filepath and Path(filepath).exists():
        with Path(filepath).open("rb") as f:
            return f.read()
    else:
        return html.encode("utf-8")
