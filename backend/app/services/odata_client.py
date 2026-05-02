from typing import Any, Dict, Optional
from xml.etree import ElementTree as ET

import httpx
import structlog

from app.config import settings

logger = structlog.get_logger(__name__)


class ODataClient:
    def __init__(self):
        self.base_url = settings.ODATA_1C_URL.rstrip("/")
        self.auth = (settings.ODATA_1C_LOGIN, settings.ODATA_1C_PASSWORD)
        self.org_ref = settings.ODATA_1C_ORGANIZATION_REF
        self.sklad_ref = settings.ODATA_1C_SKLAD_REF
        self.vat_ref = settings.ODATA_1C_VAT_REF
        self.currency_ref = settings.ODATA_1C_CURRENCY_REF

    # ------------------------------------------------------------------
    # Базовый метод для GET-запросов (возвращает XML как ElementTree)
    # ------------------------------------------------------------------
    async def _request_xml(self, path: str, params: Optional[dict] = None) -> ET.Element:
        url = f"{self.base_url}/{path}"
        async with httpx.AsyncClient(auth=self.auth, timeout=30.0) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return ET.fromstring(response.text)

    # ------------------------------------------------------------------
    # Получение списка товаров (номенклатуры)
    # ------------------------------------------------------------------
    async def get_nomenclature(self) -> list[dict]:
        """
        Возвращает список словарей с ключами 'Ref_Key' и 'Description'
        """
        root = await self._request_xml("Catalog_Номенклатура", params={"$filter": "IsFolder eq false", "$top": 5000})
        ns = {
            "atom": "http://www.w3.org/2005/Atom",
            "d": "http://schemas.microsoft.com/ado/2007/08/dataservices",
            "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        }
        entries = root.findall("atom:entry", ns)
        items = []
        for entry in entries:
            props = entry.find("atom:content/m:properties", ns)
            if props is None:
                continue
            ref_key = props.find("d:Ref_Key", ns)
            description = props.find("d:Description", ns)
            if ref_key is not None and description is not None and ref_key.text and description.text:
                items.append({"Ref_Key": ref_key.text,
                             "Description": description.text})
        return items

    # ------------------------------------------------------------------
    # Получение остатков
    # ------------------------------------------------------------------
    async def get_stock_balances(self) -> list[dict]:
        """
        Возвращает список остатков: {'Номенклатура_Key': GUID, 'КоличествоОстаток': float}
        """
        root = await self._request_xml("AccumulationRegister_ОстаткиТоваров/Balance", params={"$top": 10000})
        ns = {
            "atom": "http://www.w3.org/2005/Atom",
            "d": "http://schemas.microsoft.com/ado/2007/08/dataservices",
            "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        }
        entries = root.findall("atom:entry", ns)
        balances = []
        for entry in entries:
            props = entry.find("atom:content/m:properties", ns)
            if props is None:
                continue
            product_ref = props.find("d:Номенклатура_Key", ns)
            qty = props.find("d:КоличествоОстаток", ns)
            if product_ref is not None and qty is not None and product_ref.text:
                try:
                    qty_val = float(qty.text) if qty.text else 0.0
                except (TypeError, ValueError):
                    qty_val = 0.0
                balances.append(
                    {"Номенклатура_Key": product_ref.text, "КоличествоОстаток": qty_val})
        return balances

    # ------------------------------------------------------------------
    # Поиск контрагента по ИНН (GET, возвращает Ref_Key или None)
    # ------------------------------------------------------------------
    async def find_contractor_by_inn(self, inn: str) -> Optional[str]:
        root = await self._request_xml("Catalog_Контрагенты", params={"$filter": f"ИНН eq '{inn}'", "$top": 1})
        ns = {
            "atom": "http://www.w3.org/2005/Atom",
            "d": "http://schemas.microsoft.com/ado/2007/08/dataservices",
            "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        }
        entries = root.findall("atom:entry", ns)
        if not entries:
            return None
        props = entries[0].find("atom:content/m:properties", ns)
        if props is None:
            return None
        ref_key = props.find("d:Ref_Key", ns)
        return ref_key.text if ref_key is not None else None

    # ------------------------------------------------------------------
    # Создание контрагента (POST в JSON – проверим; если не сработает – переделаем в XML)
    # ------------------------------------------------------------------
    async def create_contractor(self, name: str, inn: str, legal_address: str) -> str:
        payload = {
            "Наименование": name,
            "ИНН": inn,
            "ЮридическийАдрес": legal_address,
            "НаименованиеПолное": name,
            "ЯвляетсяРезидентом": True,
            "ПометкаУдаления": False,
        }
        async with httpx.AsyncClient(auth=self.auth, timeout=30.0) as client:
            response = await client.post(
                f"{self.base_url}/Catalog_Контрагенты",
                json=payload,
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            )
            response.raise_for_status()
            data = response.json()
            return data["Ref_Key"]

    # ------------------------------------------------------------------
    # Создание документа реализации (заказа) – POST в JSON
    # ------------------------------------------------------------------
    async def create_sales_order(self, order_data: dict[str, Any]) -> str:
        doc = {
            "Номер": order_data["number"],
            "Дата": order_data["date"],
            "Организация_Key": self.org_ref,
            "Контрагент_Key": order_data["contractor_ref"],
            "Склад_Key": self.sklad_ref,
            "Валюта_Key": self.currency_ref,
            "ЦенаВключаетНДС": True,
            "НалогообложениеНДС": "ПродажаНеОблагаетсяНДС",
            "Товары": [],
        }
        for item in order_data["items"]:
            doc["Товары"].append(
                {
                    "Номенклатура_Key": item["product_ref"],
                    "Количество": item["quantity"],
                    "Цена": item["price"],
                    "Сумма": item["quantity"] * item["price"],
                    "СтавкаНДС_Key": self.vat_ref,
                    "СуммаНДС": 0,
                    "СуммаСНДС": item["quantity"] * item["price"],
                }
            )
        async with httpx.AsyncClient(auth=self.auth, timeout=30.0) as client:
            response = await client.post(f"{self.base_url}/Document_РеализацияТоваровУслуг", json=doc)
            response.raise_for_status()
            data = response.json()
            return data["Ref_Key"]

    # app/services/odata_client.py

    async def get_payments(self, date_from: str, date_to: str) -> list[dict]:
        """
        Получить поступления безналичных денежных средств за период.
        Возвращает список оплат.
        """
        params = {
            "$filter": f"Дата ge datetime'{date_from}' and Дата le datetime'{date_to}'",
            "$orderby": "Дата asc",
            "$top": 5000,
        }
        root = await self._request_xml("Document_ПоступлениеБезналичныхДенежныхСредств", params=params)
        ns = {
            "atom": "http://www.w3.org/2005/Atom",
            "d": "http://schemas.microsoft.com/ado/2007/08/dataservices",
            "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        }
        entries = root.findall("atom:entry", ns)
        payments = []
        for entry in entries:
            props = entry.find("atom:content/m:properties", ns)
            if props is None:
                continue
            number = props.find("d:Номер", ns)
            date_elem = props.find("d:Дата", ns)
            amount = props.find("d:Сумма", ns)
            contractor_ref = props.find("d:Контрагент_Key", ns)
            # Попробуем найти номер заказа (если есть реквизит "Заказ")
            order_number_elem = props.find("d:Заказ", ns)  # или "Основание"
            order_number = order_number_elem.text if order_number_elem is not None else None

            if number is not None and date_elem is not None and amount is not None:
                payments.append(
                    {
                        "Номер": number.text,
                        "Дата": date_elem.text,
                        "Сумма": float(amount.text) if amount.text else 0.0,
                        "Контрагент_Key": contractor_ref.text if contractor_ref is not None else None,
                        "НомерЗаказа": order_number,
                    }
                )
        return payments

    async def create_receipt_document(self, receipt_data: dict[str, Any]) -> str:
        """
        Создать документ «Поступление товаров и услуг» в 1С.
        """
        # Для упрощения используем предопределённого поставщика
        supplier_ref = settings.ODATA_1C_SUPPLIER_REF  # нужно добавить в .env
        doc = {
            "Номер": receipt_data.get("receipt_number"),
            "Дата": receipt_data["date"],
            "Организация_Key": self.org_ref,
            "Склад_Key": self.sklad_ref,
            "Контрагент_Key": supplier_ref,
            "НомерВходящий": receipt_data.get("invoice_number", ""),
            "Товары": []
        }
        for item in receipt_data["items"]:
            doc["Товары"].append({
                "Номенклатура_Key": item["product_ref"],
                "Количество": item["quantity"],
                "Цена": item["price"],
                "Сумма": item["quantity"] * item["price"],
                "СтавкаНДС_Key": self.vat_ref,
                "СуммаНДС": 0,
                "СуммаСНДС": item["quantity"] * item["price"]
            })
        async with httpx.AsyncClient(auth=self.auth, timeout=30.0) as client:
            response = await client.post(f"{self.base_url}/Document_ПоступлениеТоваровУслуг", json=doc)
            response.raise_for_status()
            data = response.json()
            return data["Ref_Key"]


# Глобальный экземпляр
odata_client = ODataClient()
