#!/usr/bin/env python3
"""
UC-47: Патч для подключения Telegram-уведомлений.
Добавляет вызов notify_admin_new_order + прямой Telegram fallback в /retail эндпоинт.
"""
import re

FILE = "/home/husein/Downloads/agrorezerv/backend/app/routers/orders.py"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# ── Проверяем что notify ещё не добавлен ──────────────────
if "notify_admin_new_order" in content:
    print("⚠️  notify_admin_new_order уже есть в файле, пропускаем.")
else:
    # Ищем строку с logger.info и return в create_retail_order
    old_block = '''    logger.info(
        "Розничный заказ без регистрации оформлен",
        order_number=order_number,
        phone=data.phone,
        total=order.total,
    )

    return _order_to_response(order)'''

    new_block = '''    logger.info(
        "Розничный заказ без регистрации оформлен",
        order_number=order_number,
        phone=data.phone,
        total=order.total,
    )

    # ── UC-47: Уведомление администратору о розничном заказе ──
    try:
        from app.services.notification_service import notify_admin_new_order
        await notify_admin_new_order(order)
    except Exception as e:
        logger.warning("Не удалось отправить уведомление о розничном заказе", error=str(e))

    # Прямая отправка в Telegram как fallback (Celery может быть недоступен)
    try:
        from app.utils.telegram_bot import send_admin_notification
        tg_text = (
            f"🛒 <b>Розничный заказ {order.order_number}</b>\\n"
            f"Покупатель: {order.client_name}\\n"
            f"Телефон: {order.client_phone}\\n"
            f"Сумма: {order.total:,.0f} ₽\\n"
            f"Доставка: {order.delivery_date} ({order.delivery_slot})\\n"
            f"Адрес: {order.delivery_address}"
        )
        if order.note:
            tg_text += f"\\nПримечание: {order.note}"
        await send_admin_notification(tg_text)
    except Exception as e:
        logger.warning("Telegram fallback не сработал", error=str(e))

    return _order_to_response(order)'''

    if old_block in content:
        content = content.replace(old_block, new_block)
        with open(FILE, "w", encoding="utf-8") as f:
            f.write(content)
        print("✅ orders.py — добавлен notify_admin_new_order + Telegram fallback в /retail")
    else:
        print("❌ Не найден целевой блок в orders.py. Проверьте файл вручную.")
        # Покажем что ищем
        import difflib
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'Розничный заказ без регистрации оформлен' in line:
                print(f"   Найден logger.info на строке {i+1}")
                print(f"   Контекст: {lines[max(0,i-2):i+8]}")
                break
