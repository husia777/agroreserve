"""
UC-227: Генерация комплекта документов для тендера.
Формирует ZIP-архив с документами для подачи заявки на госзакупку (44-ФЗ).

Документы в комплекте:
1. Коммерческое предложение (PDF)
2. Декларация соответствия требованиям (PDF)
3. Справка о ресурсах и опыте (PDF)
4. Список сертификатов (PDF)
"""
import io
import zipfile
from datetime import datetime, timezone
from typing import Optional

import structlog
from weasyprint import HTML

from app.models.tender import Tender
from app.models.settings import SystemSettings
from app.models.certificate import Certificate

logger = structlog.get_logger(__name__)


async def _get_company_info() -> dict:
    """Получает реквизиты компании из настроек."""
    settings = await SystemSettings.find_one({"singleton_key": "main"})
    if not settings:
        return {
            "name": "ИП Наимов Хусейн Вохиджонович",
            "inn": "",
            "ogrn": "",
            "address": "",
            "phone": "",
            "email": "",
            "bank_name": "",
            "bik": "",
            "account": "",
            "corr_account": "",
        }
    return {
        "name": settings.company_name or "",
        "inn": settings.inn or "",
        "ogrn": settings.ogrn or "",
        "address": settings.actual_address or settings.legal_address or "",
        "phone": settings.phone or "",
        "email": settings.email or "",
        "bank_name": settings.bank_details.bank_name if settings.bank_details else "",
        "bik": settings.bank_details.bik if settings.bank_details else "",
        "account": settings.bank_details.account if settings.bank_details else "",
        "corr_account": settings.bank_details.correspondent_account if settings.bank_details else "",
    }


def _base_css() -> str:
    """Базовые CSS стили для PDF документов."""
    return """
    @page { size: A4; margin: 20mm 15mm; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #111; line-height: 1.5; }
    h1 { font-size: 16px; text-align: center; margin-bottom: 20px; text-transform: uppercase; }
    h2 { font-size: 14px; margin-top: 20px; margin-bottom: 10px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #16a34a; padding-bottom: 15px; }
    .header .company { font-size: 14px; font-weight: bold; color: #16a34a; }
    .header .details { font-size: 10px; color: #666; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; font-size: 11px; }
    th { background: #f5f5f5; font-weight: bold; }
    .right { text-align: right; }
    .center { text-align: center; }
    .bold { font-weight: bold; }
    .green { color: #16a34a; }
    .signature { margin-top: 40px; }
    .signature-line { border-bottom: 1px solid #333; width: 200px; display: inline-block; margin: 0 10px; }
    .date-block { margin-top: 10px; font-size: 11px; color: #666; }
    .footer { margin-top: 30px; font-size: 10px; color: #999; text-align: center; }
    """


def _generate_commercial_offer(tender: dict, company: dict) -> bytes:
    """
    1. Коммерческое предложение.
    Содержит: реквизиты, позиции тендера с ценами, общая сумма.
    """
    now = datetime.now(timezone.utc)
    items_html = ""
    total = 0
    for i, item in enumerate(tender.get("items", []), 1):
        price = item.get("max_price") or 0
        qty = item.get("qty", 0)
        subtotal = price * qty
        total += subtotal
        items_html += f"""
        <tr>
            <td class="center">{i}</td>
            <td>{item.get('name', '')}</td>
            <td class="center">{item.get('unit', 'кг')}</td>
            <td class="right">{qty:,.1f}</td>
            <td class="right">{price:,.2f} ₽</td>
            <td class="right bold">{subtotal:,.2f} ₽</td>
        </tr>
        """

    # Наша цена (если рассчитана)
    our_price = tender.get("our_price") or total
    our_total_text = f"{our_price:,.2f} ₽"

    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{_base_css()}</style></head><body>
    <div class="header">
        <div class="company">{company['name']}</div>
        <div class="details">ИНН: {company['inn']} | ОГРН: {company['ogrn']}</div>
        <div class="details">{company['address']}</div>
        <div class="details">Тел: {company['phone']} | Email: {company['email']}</div>
    </div>

    <h1>Коммерческое предложение</h1>

    <p>
        На закупку по тендеру <b>№ {tender.get('eis_number', '')}</b><br>
        Заказчик: <b>{tender.get('customer', '')}</b><br>
        НМЦК: <b>{tender.get('max_price', 0):,.2f} ₽</b>
    </p>

    <table>
        <thead>
            <tr>
                <th class="center" style="width:30px">№</th>
                <th>Наименование</th>
                <th class="center">Ед.</th>
                <th class="right">Кол-во</th>
                <th class="right">Цена за ед.</th>
                <th class="right">Сумма</th>
            </tr>
        </thead>
        <tbody>
            {items_html}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" class="right bold">Итого предложение:</td>
                <td class="right bold green">{our_total_text}</td>
            </tr>
        </tfoot>
    </table>

    <h2>Условия поставки</h2>
    <ul>
        <li>Срок поставки: согласно условиям тендера</li>
        <li>Условия оплаты: по факту поставки, в течение 15 рабочих дней</li>
        <li>Доставка: собственным транспортом, включена в стоимость</li>
        <li>Качество: ГОСТ, ТР ТС, с сертификатами соответствия</li>
    </ul>

    <div class="signature">
        <p>{company['name']}</p>
        <p style="margin-top: 20px;">
            Подпись: <span class="signature-line"></span>
            / {company['name'].split()[-1] if company['name'] else '________'} /
        </p>
        <p class="date-block">Дата: {now.strftime('%d.%m.%Y')}</p>
    </div>

    <div class="footer">Коммерческое предложение действительно 30 календарных дней</div>
    </body></html>"""

    return HTML(string=html).write_pdf()


def _generate_declaration(tender: dict, company: dict) -> bytes:
    """
    2. Декларация соответствия требованиям 44-ФЗ.
    """
    now = datetime.now(timezone.utc)
    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{_base_css()}</style></head><body>
    <div class="header">
        <div class="company">{company['name']}</div>
        <div class="details">ИНН: {company['inn']} | {company['address']}</div>
    </div>

    <h1>Декларация соответствия<br>требованиям, установленным в извещении<br>о закупке № {tender.get('eis_number', '')}</h1>

    <p>Настоящим <b>{company['name']}</b> (ИНН: {company['inn']}) декларирует следующее:</p>

    <h2>1. Соответствие единым требованиям (ч. 1 ст. 31 44-ФЗ)</h2>
    <ul>
        <li>Участник закупки является надлежащим образом зарегистрированным юридическим лицом / индивидуальным предпринимателем</li>
        <li>Участник закупки не является иностранным агентом</li>
        <li>Не проводится ликвидация участника, не принято решение о признании банкротом</li>
        <li>Деятельность участника не приостановлена</li>
        <li>У участника отсутствует недоимка по налогам, превышающая 25% активов</li>
        <li>Отсутствует судимость за экономические преступления у руководителя / главного бухгалтера</li>
        <li>Участник не привлекался к ответственности за незаконное вознаграждение в течение 2 лет</li>
        <li>Между участником и заказчиком отсутствует конфликт интересов</li>
        <li>Участник закупки не является офшорной компанией</li>
    </ul>

    <h2>2. Соответствие дополнительным требованиям</h2>
    <ul>
        <li>Участник обладает необходимыми ресурсами для исполнения контракта</li>
        <li>Участник имеет опыт поставки аналогичных товаров</li>
        <li>Товар соответствует требованиям технического задания</li>
    </ul>

    <h2>3. Субъект МСП</h2>
    <p>
        Участник является субъектом малого предпринимательства (СМП)
        в соответствии с Федеральным законом от 24.07.2007 № 209-ФЗ.
    </p>

    <div class="signature">
        <p>{company['name']}</p>
        <p style="margin-top: 20px;">
            Подпись: <span class="signature-line"></span>
            М.П.
        </p>
        <p class="date-block">Дата: {now.strftime('%d.%m.%Y')}</p>
    </div>
    </body></html>"""

    return HTML(string=html).write_pdf()


def _generate_resource_reference(tender: dict, company: dict) -> bytes:
    """
    3. Справка о ресурсах и опыте.
    """
    now = datetime.now(timezone.utc)
    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{_base_css()}</style></head><body>
    <div class="header">
        <div class="company">{company['name']}</div>
        <div class="details">ИНН: {company['inn']} | {company['address']}</div>
    </div>

    <h1>Справка о материально-технических ресурсах</h1>

    <p>
        Настоящим подтверждаю, что <b>{company['name']}</b> располагает следующими ресурсами
        для исполнения контракта по закупке № {tender.get('eis_number', '')}:
    </p>

    <h2>Материально-техническая база</h2>
    <table>
        <tr><th>Ресурс</th><th>Описание</th></tr>
        <tr><td>Складское помещение</td><td>Собственный склад, Тобольск. Площадь: 80 м². Зонирование: овощи, фрукты, сухие товары</td></tr>
        <tr><td>Транспорт</td><td>Грузовой автомобиль (Газель). Грузоподъёмность: 1.5 т. Термобудка для скоропортящихся товаров</td></tr>
        <tr><td>Холодильное оборудование</td><td>Холодильная камера для хранения овощей и фруктов (от +2°C до +8°C)</td></tr>
    </table>

    <h2>Опыт исполнения аналогичных контрактов</h2>
    <table>
        <tr><th>Заказчик</th><th>Предмет</th><th>Сумма</th><th>Период</th></tr>
        <tr>
            <td><i>Заполняется при наличии</i></td>
            <td>Поставка овощей и фруктов</td>
            <td>—</td>
            <td>—</td>
        </tr>
    </table>

    <h2>Трудовые ресурсы</h2>
    <table>
        <tr><th>Должность</th><th>Кол-во</th><th>Функционал</th></tr>
        <tr><td>Руководитель / Логист</td><td>1</td><td>Управление закупками, логистика, контроль качества</td></tr>
    </table>

    <div class="signature">
        <p>{company['name']}</p>
        <p style="margin-top: 20px;">
            Подпись: <span class="signature-line"></span>
            М.П.
        </p>
        <p class="date-block">Дата: {now.strftime('%d.%m.%Y')}</p>
    </div>
    </body></html>"""

    return HTML(string=html).write_pdf()


async def _generate_certificates_list(tender: dict, company: dict) -> bytes:
    """
    4. Список действующих сертификатов.
    """
    now = datetime.now(timezone.utc)

    # Получаем активные сертификаты
    certs = await Certificate.find(
        {"status": {"$in": ["active", "expiring_soon"]}}
    ).sort("expiry_date").to_list()

    certs_html = ""
    if certs:
        for i, cert in enumerate(certs, 1):
            cert_type_labels = {
                "declaration_tr_ts": "Декларация ТР ТС",
                "certificate": "Сертификат",
                "vet": "Ветеринарная справка",
                "quality": "Удостоверение качества",
                "other": "Прочее",
            }
            certs_html += f"""
            <tr>
                <td class="center">{i}</td>
                <td>{cert_type_labels.get(cert.cert_type, cert.cert_type)}</td>
                <td>{cert.number}</td>
                <td class="center">{cert.issued_date.strftime('%d.%m.%Y') if cert.issued_date else '—'}</td>
                <td class="center">{cert.expiry_date.strftime('%d.%m.%Y') if cert.expiry_date else '—'}</td>
            </tr>
            """
    else:
        certs_html = '<tr><td colspan="5" class="center">Сертификаты будут предоставлены при поставке</td></tr>'

    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{_base_css()}</style></head><body>
    <div class="header">
        <div class="company">{company['name']}</div>
        <div class="details">ИНН: {company['inn']} | {company['address']}</div>
    </div>

    <h1>Перечень сертификатов и деклараций соответствия</h1>

    <p>
        К закупке № <b>{tender.get('eis_number', '')}</b><br>
        Заказчик: <b>{tender.get('customer', '')}</b>
    </p>

    <table>
        <thead>
            <tr>
                <th class="center" style="width:30px">№</th>
                <th>Тип документа</th>
                <th>Номер</th>
                <th class="center">Дата выдачи</th>
                <th class="center">Действителен до</th>
            </tr>
        </thead>
        <tbody>
            {certs_html}
        </tbody>
    </table>

    <p style="margin-top: 15px; font-size: 11px; color: #666;">
        Копии сертификатов предоставляются по запросу заказчика.
        Оригиналы прилагаются к каждой партии товара при поставке.
    </p>

    <div class="signature">
        <p>{company['name']}</p>
        <p style="margin-top: 20px;">
            Подпись: <span class="signature-line"></span>
            М.П.
        </p>
        <p class="date-block">Дата: {now.strftime('%d.%m.%Y')}</p>
    </div>
    </body></html>"""

    return HTML(string=html).write_pdf()


async def generate_tender_documents_zip(tender_id: str) -> io.BytesIO:
    """
    Генерирует ZIP-архив со всеми документами для тендера.

    Возвращает BytesIO с ZIP-файлом:
    - 01_Коммерческое_предложение.pdf
    - 02_Декларация_соответствия.pdf
    - 03_Справка_о_ресурсах.pdf
    - 04_Перечень_сертификатов.pdf
    """
    # Получаем тендер
    tender_doc = await Tender.get(tender_id)
    if not tender_doc:
        raise ValueError(f"Тендер {tender_id} не найден")

    tender = {
        "eis_number": tender_doc.eis_number,
        "title": tender_doc.title,
        "customer": tender_doc.customer,
        "region": tender_doc.region,
        "max_price": tender_doc.max_price,
        "our_price": tender_doc.our_price,
        "items": [
            {"name": item.name, "qty": item.qty, "unit": item.unit, "max_price": item.max_price}
            for item in (tender_doc.items or [])
        ],
    }

    company = await _get_company_info()

    # Генерируем документы
    docs = [
        ("01_Коммерческое_предложение.pdf", _generate_commercial_offer(tender, company)),
        ("02_Декларация_соответствия.pdf", _generate_declaration(tender, company)),
        ("03_Справка_о_ресурсах.pdf", _generate_resource_reference(tender, company)),
        ("04_Перечень_сертификатов.pdf", await _generate_certificates_list(tender, company)),
    ]

    # Собираем ZIP
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for filename, pdf_bytes in docs:
            zf.writestr(filename, pdf_bytes)

    buffer.seek(0)
    logger.info("Сгенерирован комплект документов для тендера", tender_id=tender_id, eis=tender["eis_number"])
    return buffer
