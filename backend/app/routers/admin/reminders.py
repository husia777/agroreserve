"""
Роутер напоминаний (администратор).
Эндпоинты: /api/v1/admin/reminders/

UC-53: Управление напоминаниями — создание, просмотр, выполнение.
"""

import math
from datetime import datetime, timedelta, timezone
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator

from app.models.reminder import Reminder
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/reminders", tags=["Админ: Напоминания"])


# ── Pydantic схемы ─────────────────────────────────────────────────────────────


class ReminderCreate(BaseModel):
    """Создание напоминания."""

    title: str = Field(..., min_length=2, max_length=200, description="Заголовок")
    description: Optional[str] = Field(None, max_length=1000, description="Описание")
    remind_at: str = Field(..., description="Дата и время (ISO 8601 или YYYY-MM-DDTHH:MM)")
    is_recurring: bool = Field(False, description="Повторяющееся напоминание")
    recurrence_rule: Optional[str] = Field(None, description="daily, weekly, monthly")
    related_type: Optional[str] = Field(None, description="contract, certificate, tender, payment")
    related_id: Optional[str] = Field(None, description="ID связанного объекта")
    is_completed: Optional[bool] = Field(None, description="Игнорируется при создании")

    @field_validator("description", "related_type", "related_id", "recurrence_rule", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        """Пустые строки → None (фронтенд шлёт '' для необязательных полей)."""
        if v == "":
            return None
        return v

    def get_remind_at(self) -> datetime:
        """Парсит remind_at в datetime."""
        try:
            dt = datetime.fromisoformat(self.remind_at)
            # Если нет таймзоны — считаем UTC
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except ValueError:
            raise ValueError(f"Некорректный формат даты: {self.remind_at}")


class ReminderUpdate(BaseModel):
    """Обновление напоминания."""

    title: Optional[str] = Field(None, min_length=2, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    remind_at: Optional[str] = None
    is_recurring: Optional[bool] = None
    recurrence_rule: Optional[str] = None
    related_type: Optional[str] = None
    related_id: Optional[str] = None
    is_completed: Optional[bool] = None

    @field_validator("description", "related_type", "related_id", "recurrence_rule", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        if v == "":
            return None
        return v


# ── Утилиты ────────────────────────────────────────────────────────────────────


def _reminder_to_dict(reminder: Reminder) -> dict:
    """Конвертирует Reminder в словарь (поля фронтенда)."""
    now = datetime.now(timezone.utc)
    # MongoDB может вернуть naive datetime — приводим к aware (UTC)
    remind_at = reminder.remind_at
    if remind_at.tzinfo is None:
        remind_at = remind_at.replace(tzinfo=timezone.utc)
    is_overdue = not reminder.is_completed and remind_at < now

    return {
        "_id": str(reminder.id),  # Фронтенд: _id
        "title": reminder.title,
        "description": reminder.description,
        "remind_at": remind_at.isoformat(),
        "is_recurring": reminder.is_recurring,
        "recurrence_rule": reminder.recurrence_rule,
        "related_type": reminder.related_type,
        "related_id": str(reminder.related_id) if reminder.related_id else None,
        "is_completed": reminder.is_completed,
        "is_overdue": is_overdue,
    }


# ── Эндпоинты ──────────────────────────────────────────────────────────────────


@router.get(
    "/upcoming",
    summary="Ближайшие напоминания (для дашборда) (UC-53)",
)
async def get_upcoming_reminders(
    hours: int = Query(24, ge=1, le=168, description="Ближайшие N часов"),
    admin=Depends(require_admin),
):
    """UC-53: Ближайшие невыполненные напоминания."""
    now = datetime.now(timezone.utc)
    threshold = now + timedelta(hours=hours)

    upcoming = (
        await Reminder.find(
            Reminder.is_completed == False,  # noqa: E712
            Reminder.remind_at >= now,
            Reminder.remind_at <= threshold,
        )
        .sort(Reminder.remind_at)
        .to_list()
    )

    # Фронтенд getUpcomingReminders ожидает ReminderV2[] (массив)
    return [_reminder_to_dict(r) for r in upcoming]


@router.get(
    "/",
    summary="Список напоминаний (UC-53)",
)
async def get_reminders(
    is_completed: Optional[bool] = Query(None, description="Фильтр: выполненные/невыполненные"),
    related_type: Optional[str] = Query(None, description="Фильтр по типу привязки"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    per_page: Optional[int] = Query(None, ge=1, le=100, description="Алиас для limit"),
    admin=Depends(require_admin),
):
    """UC-53: Список всех напоминаний с фильтрами."""
    if per_page is not None:
        limit = per_page

    query_filter: dict = {}

    if is_completed is not None:
        query_filter["is_completed"] = is_completed

    if related_type:
        query_filter["related_type"] = related_type

    total = await Reminder.find(query_filter).count()
    reminders = (
        await Reminder.find(query_filter).sort(Reminder.remind_at).skip((page - 1) * limit).limit(limit).to_list()
    )

    return {
        "items": [_reminder_to_dict(r) for r in reminders],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Создать напоминание (UC-53)",
)
async def create_reminder(
    data: ReminderCreate,
    admin=Depends(require_admin),
):
    """UC-53: Создать новое напоминание."""
    # Парсим дату
    try:
        remind_at = data.get_remind_at()
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    # Валидация recurrence_rule
    if data.is_recurring and data.recurrence_rule:
        valid_rules = ["daily", "weekly", "monthly"]
        if data.recurrence_rule not in valid_rules:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Допустимые правила повтора: {', '.join(valid_rules)}",
            )

    related_id = None
    if data.related_id:
        try:
            related_id = PydanticObjectId(data.related_id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Некорректный формат related_id",
            )

    reminder = Reminder(
        title=data.title,
        description=data.description,
        remind_at=remind_at,
        is_recurring=data.is_recurring,
        recurrence_rule=data.recurrence_rule,
        related_type=data.related_type,
        related_id=related_id,
        is_completed=False,
        created_by=admin.id,
    )
    await reminder.insert()

    logger.info(
        "Напоминание создано",
        reminder_id=str(reminder.id),
        title=data.title,
        remind_at=remind_at.isoformat(),
        admin_id=str(admin.id),
    )

    return _reminder_to_dict(reminder)


@router.put(
    "/{reminder_id}",
    summary="Обновить напоминание (PUT)",
)
async def update_reminder_put(
    reminder_id: str,
    data: ReminderUpdate,
    admin=Depends(require_admin),
):
    """PUT-алиас для обновления — фронтенд использует PUT."""
    return await update_reminder(reminder_id, data, admin)


@router.patch(
    "/{reminder_id}",
    summary="Обновить напоминание (UC-53)",
)
async def update_reminder(
    reminder_id: str,
    data: ReminderUpdate,
    admin=Depends(require_admin),
):
    """Обновляет данные напоминания."""
    try:
        reminder = await Reminder.get(PydanticObjectId(reminder_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    if not reminder:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    update_data = data.model_dump(exclude_none=True)

    if "remind_at" in update_data:
        try:
            dt = datetime.fromisoformat(update_data["remind_at"])
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            update_data["remind_at"] = dt
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Некорректный формат даты remind_at",
            )

    if "recurrence_rule" in update_data:
        valid_rules = ["daily", "weekly", "monthly"]
        if update_data["recurrence_rule"] not in valid_rules:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Допустимые правила повтора: {', '.join(valid_rules)}",
            )

    if "related_id" in update_data and update_data["related_id"]:
        try:
            update_data["related_id"] = PydanticObjectId(update_data["related_id"])
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Некорректный формат related_id",
            )

    for field, value in update_data.items():
        setattr(reminder, field, value)

    await reminder.save()

    logger.info(
        "Напоминание обновлено",
        reminder_id=reminder_id,
        admin_id=str(admin.id),
    )

    return _reminder_to_dict(reminder)


@router.post(
    "/{reminder_id}/complete",
    summary="Отметить напоминание выполненным (UC-53)",
)
async def complete_reminder(
    reminder_id: str,
    admin=Depends(require_admin),
):
    """UC-53: Отмечает напоминание как выполненное. Если повторяющееся — создаёт следующее."""
    try:
        reminder = await Reminder.get(PydanticObjectId(reminder_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    if not reminder:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    reminder.is_completed = True
    await reminder.save()

    # Если повторяющееся — создаём следующее
    if reminder.is_recurring and reminder.recurrence_rule:
        current_time = reminder.remind_at
        if reminder.recurrence_rule == "daily":
            next_time = current_time + timedelta(days=1)
        elif reminder.recurrence_rule == "weekly":
            next_time = current_time + timedelta(weeks=1)
        elif reminder.recurrence_rule == "monthly":
            next_time = current_time + timedelta(days=30)
        else:
            next_time = None

        if next_time:
            new_reminder = Reminder(
                title=reminder.title,
                description=reminder.description,
                remind_at=next_time,
                is_recurring=True,
                recurrence_rule=reminder.recurrence_rule,
                related_type=reminder.related_type,
                related_id=reminder.related_id,
                is_completed=False,
                created_by=reminder.created_by,
            )
            await new_reminder.insert()

            logger.info(
                "Следующее повторяющееся напоминание создано",
                new_reminder_id=str(new_reminder.id),
                next_time=next_time.isoformat(),
            )

    logger.info(
        "Напоминание выполнено",
        reminder_id=reminder_id,
        admin_id=str(admin.id),
    )

    # Фронтенд ожидает ReminderV2 объект
    return _reminder_to_dict(reminder)


@router.delete(
    "/{reminder_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить напоминание (UC-53)",
)
async def delete_reminder(
    reminder_id: str,
    admin=Depends(require_admin),
):
    """Удаляет напоминание."""
    try:
        reminder = await Reminder.get(PydanticObjectId(reminder_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    if not reminder:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Напоминание не найдено")

    await reminder.delete()

    logger.info(
        "Напоминание удалено",
        reminder_id=reminder_id,
        admin_id=str(admin.id),
    )
