# ============================================================
# Dockerfile для FastAPI backend Агрорезерв
# Python 3.11 + uv — быстрая сборка зависимостей
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


# ── Установка uv ─────────────────────────────────────────────
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# ── Этап установки зависимостей ──────────────────────────────
FROM base AS deps

WORKDIR /app

# Копируем файлы зависимостей для кэширования слоёв
COPY pyproject.toml uv.lock* ./

# Устанавливаем зависимости (без dev)
# --no-install-project — не устанавливать сам проект
RUN uv sync --no-dev --no-install-project

# ── Финальный образ ───────────────────────────────────────────
FROM deps AS final

WORKDIR /app

# Создаём пользователя без root-прав
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --gid 1001 --no-create-home appuser

# Создаём директории для файлов
RUN mkdir -p /app/uploads/certificates /app/uploads/documents /app/uploads/photos /app/media/documents /app/backups && \
    chown -R appuser:appgroup /app/uploads /app/media /app/backups

# Копируем код приложения
COPY --chown=appuser:appgroup . .

# В production раскомментировать:
# USER appuser

# Открываем порт
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Запуск через uv run (использует виртуальное окружение автоматически)
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
