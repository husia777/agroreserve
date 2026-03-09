"""
Роутер управления уведомлениями (администратор).
Эндпоинты: /api/v1/admin/notifications/
"""
import math
from datetime import datetime, timezone
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.notification import Notification, NotificationChannel
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/notifications", tags=["Админ: Уведомления"])


@router.get(
    "/",
    summary="Список уведомлений",
)
async def get_notifications(
    is_read: Optional[bool] = Query(None, description="Фильтр: прочитанные/непрочитанные"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100),
    admin=Depends(require_admin),
):
    """
    Список уведомлений для текущего администратора.
    Сортировка: новые первые.
    """
    user_id = str(admin.id)
    query_filter: dict = {"user_id": user_id}

    if is_read is not None:
        query_filter["is_read"] = is_read

    total = await Notification.find(query_filter).count()
    unread_count = await Notification.find(
        {"user_id": user_id, "is_read": False}
    ).count()

    notifications = (
        await Notification.find(query_filter)
        .sort(-Notification.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    items = [
        {
            "id": str(n.id),
            "notification_type": n.notification_type.value
            if hasattr(n.notification_type, "value")
            else n.notification_type,
            "channel": n.channel.value if hasattr(n.channel, "value") else n.channel,
            "title": n.title,
            "message": n.message,
            "action_url": n.action_url,
            "action_label": n.action_label,
            "related_id": n.related_id,
            "related_type": n.related_type,
            "is_read": n.is_read,
            "read_at": n.read_at.isoformat() if n.read_at else None,
            "created_at": n.created_at.isoformat(),
        }
        for n in notifications
    ]

    return {
        "items": items,
        "total": total,
        "unread_count": unread_count,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.patch(
    "/{notification_id}/read",
    summary="Отметить как прочитанное",
)
async def mark_as_read(
    notification_id: str,
    admin=Depends(require_admin),
):
    """Отмечает уведомление как прочитанное."""
    try:
        notification = await Notification.get(PydanticObjectId(notification_id))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Уведомление не найдено",
        )

    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Уведомление не найдено",
        )

    # Проверяем принадлежность
    if notification.user_id != str(admin.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ запрещён",
        )

    if not notification.is_read:
        notification.is_read = True
        notification.read_at = datetime.now(timezone.utc)
        await notification.save()

    return {
        "id": str(notification.id),
        "is_read": notification.is_read,
        "read_at": notification.read_at.isoformat() if notification.read_at else None,
    }


@router.post(
    "/read-all",
    summary="Отметить все как прочитанные",
)
async def mark_all_as_read(
    admin=Depends(require_admin),
):
    """Отмечает все непрочитанные уведомления как прочитанные."""
    now = datetime.now(timezone.utc)
    user_id = str(admin.id)

    # Получаем все непрочитанные
    unread = await Notification.find(
        Notification.user_id == user_id,
        Notification.is_read == False,  # noqa: E712
    ).to_list()

    for n in unread:
        n.is_read = True
        n.read_at = now
        await n.save()

    logger.info(
        "Все уведомления отмечены как прочитанные",
        admin_id=user_id,
        count=len(unread),
    )

    return {
        "marked_count": len(unread),
        "message": f"Отмечено прочитанными: {len(unread)}",
    }


@router.get(
    "/unread-count",
    summary="Количество непрочитанных уведомлений",
)
async def get_unread_count(
    admin=Depends(require_admin),
):
    """Быстрый эндпоинт для получения счётчика непрочитанных."""
    count = await Notification.find(
        Notification.user_id == str(admin.id),
        Notification.is_read == False,  # noqa: E712
    ).count()

    return {"unread_count": count}
