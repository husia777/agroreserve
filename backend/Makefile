.PHONY: up down restart build logs shell \
        install run celery celery-beat \
        lint format typecheck security check pre-commit \
        test test-cov test-fast \
        db-shell db-backup \
        clean routes env

# ── Environments ────────────────────────────────────────────────────────────────

env:
	cp .env.example .env

# ── Docker ──────────────────────────────────────────────────────────────────────

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart api

build:
	docker compose up -d --build

logs:
	docker compose logs -f api

logs-all:
	docker compose logs -f --tail=100

shell:
	docker compose exec api bash

# ── Dev ─────────────────────────────────────────────────────────────────────────

install:
	uv sync --all-extras

dev: install
	uv run pre-commit install

run:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

run-prod:
	uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2

celery:
	uv run celery -A app.tasks.celery_app worker --loglevel=info

celery-beat:
	uv run celery -A app.tasks.celery_app beat --loglevel=info

celery-all:
	uv run celery -A app.tasks.celery_app worker --beat --loglevel=info

# ── Качество кода ───────────────────────────────────────────────────────────────

lint:
	uv run ruff check app/ tests/
	uv run ruff format --check app/ tests/

format:
	uv run ruff format app/ tests/
	uv run ruff check --fix app/ tests/

typecheck:
	uv run mypy app/

security:
	uv run bandit -r app/ -c pyproject.toml

check: lint typecheck security

pre-commit:
	uv run pre-commit run --all-files

# ── Тесты ───────────────────────────────────────────────────────────────────────

test:
	uv run pytest tests/ -v

test-fast:
	uv run pytest tests/ -x -q

test-cov:
	uv run pytest tests/ --cov=app --cov-report=term-missing --cov-report=html

# ── DB ──────────────────────────────────────────────────────────────────────────

db-shell:
	docker compose exec mongodb mongosh agroreserve

db-backup:
	docker compose exec mongodb mongodump --db=agroreserve --out=/data/backup/$$(date +%Y%m%d_%H%M%S)

# ── Utils ───────────────────────────────────────────────────────────────────────

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .mypy_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .ruff_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name htmlcov -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true

routes:
	uv run python -c "from app.main import app; [print(f'{r.methods} {r.path}') for r in app.routes if hasattr(r, 'methods')]"
