"""
Схемы для сертификатов и деклараций соответствия.
"""
from datetime import date as DateType
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class CertificateCreate(BaseModel):
    """Запрос на создание сертификата."""
    number: str = Field(..., min_length=3, max_length=100, description="Номер сертификата/декларации")
    cert_type: str = Field(..., description="Тип: declaration_tr_ts, certificate, vet_certificate, quality_certificate, other")
    issued_date: DateType = Field(..., description="Дата выдачи")
    expiry_date: DateType = Field(..., description="Дата окончания действия")
    issuing_authority: Optional[str] = Field(None, max_length=300, description="Орган выдачи")
    product_ids: List[str] = Field(default_factory=list, description="ID товаров")
    notes: Optional[str] = Field(None, max_length=1000)

    @field_validator("cert_type")
    @classmethod
    def validate_cert_type(cls, v: str) -> str:
        valid = ["declaration_tr_ts", "certificate", "vet_certificate", "quality_certificate", "other"]
        if v not in valid:
            raise ValueError(f"Допустимые типы: {', '.join(valid)}")
        return v

    @field_validator("expiry_date")
    @classmethod
    def validate_expiry_date(cls, v: DateType, info) -> DateType:
        if "issued_date" in (info.data or {}):
            if v <= info.data["issued_date"]:
                raise ValueError("Дата окончания должна быть позже даты выдачи")
        return v


class CertificateUpdate(BaseModel):
    """Запрос на обновление сертификата."""
    expiry_date: Optional[DateType] = None
    issuing_authority: Optional[str] = Field(None, max_length=300)
    product_ids: Optional[List[str]] = None
    notes: Optional[str] = Field(None, max_length=1000)


class CertificateResponse(BaseModel):
    """Сертификат в ответе API."""
    id: str = Field(..., alias="_id")
    number: str
    cert_type: str
    issued_date: str
    expiry_date: str
    issuing_authority: Optional[str] = None
    product_ids: List[str] = Field(default_factory=list)
    product_names: List[str] = Field(default_factory=list, description="Названия товаров (денормализовано)")
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    status: str
    days_until_expiry: Optional[int] = Field(None, description="Дней до истечения (null если просрочен)")
    notes: Optional[str] = None
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}
