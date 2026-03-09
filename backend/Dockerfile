# ============================================================
# Dockerfile для FastAPI backend Агрорезерв
# Python 3.11 — многоэтапная сборка
# ============================================================

FROM python:3.11-slim AS base

# Устанавливаем системные зависимости
# WeasyPrint требует cairo, pango, gdk-pixbuf
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Для WeasyPrint (генерация PDF)
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info \
    # Для Pillow (обработка изображений)
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    # Для python-magic (определение типа файлов)
    libmagic1 \
    # Утилиты
    curl \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*


# ── Этап установки зависимостей ──────────────────────────────
FROM base AS deps

WORKDIR /app

# Копируем только requirements для кэширования слоёв
COPY requirements.txt .

# Устанавливаем Python зависимости
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ── Финальный образ ───────────────────────────────────────────
FROM deps AS final

WORKDIR /app

# Создаём пользователя без root-прав
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --gid 1001 --no-create-home appuser

# Создаём директории для файлов
RUN mkdir -p /app/uploads/certificates /app/uploads/documents /app/uploads/photos && \
    chown -R appuser:appgroup /app/uploads

# Копируем код приложения
COPY --chown=appuser:appgroup . .

# В production раскомментировать:
# USER appuser

# Открываем порт
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Запуск приложения
# В docker-compose.yml команда переопределяется для dev-режима (--reload)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
