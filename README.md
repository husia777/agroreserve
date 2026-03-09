# 🌿 Агрорезерв — Платформа оптовой торговли

Полнофункциональная IT-платформа для оптовой и розничной торговли овощами, фруктами, сухофруктами, орехами.

**ИП Наимов Хусейн Вохиджонович** | г. Тобольск, Тюменская область

---

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Node.js 18+ (для frontend разработки)
- Python 3.11+ (для backend разработки без Docker)

### Запуск через Docker Compose

```bash
# 1. Клонировать репозиторий
git clone <repo-url> agroreserve
cd agroreserve

# 2. Создать .env файл из примера
cp backend/.env.example backend/.env
# Отредактировать backend/.env — заполнить JWT_SECRET, MongoDB URI и т.д.

# 3. Запустить все сервисы
docker-compose up -d

# 4. Приложение доступно:
#    - Сайт: http://localhost
#    - API:  http://localhost/api/v1/docs
#    - MongoDB: localhost:27017
#    - Redis: localhost:6379
```

### Запуск для разработки (без Docker)

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cp .env.example .env
# Заполнить .env
uvicorn app.main:app --reload --port 8000

# Frontend (в другом терминале)
cd frontend
npm install
npm run dev
# Откроется http://localhost:5173
```

---

## 📦 Стек технологий

### Backend

- **Python 3.11** + **FastAPI** — REST API
- **MongoDB** + **Beanie ODM** — база данных
- **Motor** — async MongoDB driver
- **Pydantic v2** — валидация
- **Celery + Redis** — фоновые задачи
- **JWT** — аутентификация
- **WeasyPrint** — генерация PDF документов

### Frontend

- **React 18** + **TypeScript** (strict mode)
- **Vite** — сборщик
- **TailwindCSS** — стили
- **React Query** — кэширование данных
- **React Hook Form + Zod** — формы и валидация
- **Zustand** — state management
- **Recharts** — графики
- **Lucide React** — иконки

### Инфраструктура

- **Docker + Docker Compose**
- **Nginx** — reverse proxy
- **MongoDB** (Atlas или self-hosted)
- **Redis** — кэш + очереди задач

---

## 🏗 Структура проекта

```
agroreserve/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI приложение
│   │   ├── config.py            # Настройки (pydantic-settings)
│   │   ├── database.py          # MongoDB подключение
│   │   ├── models/              # Beanie модели (10 коллекций)
│   │   ├── schemas/             # Request/Response схемы
│   │   ├── routers/             # API роутеры (18 шт.)
│   │   │   ├── auth.py          # Регистрация, вход, JWT
│   │   │   ├── catalog.py       # Каталог товаров
│   │   │   ├── cart.py          # Корзина
│   │   │   ├── orders.py        # Заказы клиента
│   │   │   ├── documents.py     # Документы клиента
│   │   │   ├── admin/           # Админка (11 модулей)
│   │   │   └── sync.py          # Синхронизация с 1С
│   │   ├── services/            # Бизнес-логика (6 сервисов)
│   │   ├── utils/               # PDF, Telegram, Security
│   │   └── tasks/               # Celery задачи
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/                 # API клиент (7 модулей)
│   │   ├── components/
│   │   │   ├── ui/              # UI компоненты (13 шт.)
│   │   │   ├── layout/          # Layouts (7 шт.)
│   │   │   └── shared/          # Бизнес-компоненты (6 шт.)
│   │   ├── pages/
│   │   │   ├── public/          # Публичные (9 страниц)
│   │   │   ├── account/         # ЛК клиента (5 страниц)
│   │   │   └── admin/           # Админка (11 страниц)
│   │   ├── stores/              # Zustand stores
│   │   ├── types/               # TypeScript типы
│   │   └── utils/               # Утилиты
│   ├── package.json
│   └── vite.config.ts
├── nginx/nginx.conf
├── docker-compose.yml
└── README.md
```

---

## 📋 Реализованные юзкейсы (MVP — 22 шт.)

### Каталог

- ✅ UC-01: Просмотр каталога с фильтрами и поиском
- ✅ UC-09: Остатки реалтайм (синхронизация с 1С)
- ✅ UC-24: Поштучный калькулятор
- ✅ UC-40: Мульти-категорийный каталог

### Авторизация

- ✅ UC-02: Регистрация/авторизация (JWT)
- ✅ UC-14: Модерация B2B клиентов

### Заказы

- ✅ UC-03: Заказ B2B (корзина, оформление, кредитный лимит)
- ✅ UC-41: Время и приоритет доставки
- ✅ UC-60: Трекинг заказа

### Документы

- ✅ UC-08: Скачивание документов из ЛК
- ✅ UC-49: Автодокументооборот (счета, ТОРГ-12)

### Сертификаты

- ✅ UC-21: Управление сертификатами
- ✅ UC-22: Печать ярлыков
- ✅ UC-23: Просмотр сертификатов клиентом
- ✅ UC-25: Единицы измерения и фасовки

### Финансы

- ✅ UC-30: Кредитный лимит и дебиторка
- ✅ UC-48: P&L (выручка, себестоимость, расходы, УСН 6%, прибыль)

### Склад

- ✅ UC-64: Приходование товара (средневзвешенная себестоимость)

### Платформа

- ✅ UC-47: Уведомления (Telegram + Email + DB)
- ✅ UC-51: Бэкап и безопасность
- ✅ UC-46: SEO и мета-теги

### Админка

- ✅ UC-11: Управление заказами
- ✅ UC-15: Управление каталогом
- ✅ UC-58: Виджет «Сегодняшний день»

---

## 🔗 API документация

После запуска backend доступна Swagger документация:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Основные эндпоинты

| Группа | Путь                                     | Описание        |
| ------ | ---------------------------------------- | --------------- |
| Public | `GET /api/v1/catalog/products`           | Каталог товаров |
| Auth   | `POST /api/v1/auth/register`             | Регистрация     |
| Auth   | `POST /api/v1/auth/login`                | Вход            |
| Client | `POST /api/v1/orders`                    | Создать заказ   |
| Client | `GET /api/v1/orders`                     | Мои заказы      |
| Admin  | `GET /api/v1/admin/dashboard/today`      | Дашборд         |
| Admin  | `PATCH /api/v1/admin/orders/{id}/status` | Смена статуса   |
| Admin  | `POST /api/v1/admin/stock/receipts`      | Приходование    |
| Admin  | `GET /api/v1/admin/finance/pnl`          | P&L             |
| Sync   | `POST /api/v1/sync/1c/stock`             | Остатки из 1С   |

---

## ⚙️ Переменные окружения

См. `backend/.env.example` для полного списка. Ключевые:

| Переменная               | Описание                   |
| ------------------------ | -------------------------- |
| `MONGODB_URI`            | Строка подключения MongoDB |
| `JWT_SECRET`             | Секрет для JWT токенов     |
| `REDIS_URI`              | Строка подключения Redis   |
| `TELEGRAM_BOT_TOKEN`     | Токен Telegram бота        |
| `TELEGRAM_ADMIN_CHAT_ID` | ID чата админа             |
| `OC_1C_BASE_URL`         | URL OData API 1С           |

---

## 📊 Бизнес-правила

1. **Цены**: B2B видят оптовые, неавторизованные — розничные
2. **Фактический вес**: Заказ в примерном весе, отгрузка по факту
3. **Себестоимость**: Средневзвешенная по приходам
4. **УСН 6%**: Налог от выручки (автоматически)
5. **Кредитный лимит**: Задолженность >= лимит → блокировка заказов
6. **Минимальный остаток**: Ниже минимума → алерт админу

---

## 🗓 Roadmap

- [x] **MVP** — 22 юзкейса (текущая версия)
- [ ] **v2** — 27 юзкейсов (школьный блок, CRM, тендеры, PWA)
- [ ] **v3** — 9 юзкейсов (ML прогноз, интеграция весов, Меркурий)

---

## 📄 Лицензия

Proprietary. © 2026 ИП Наимов Х.В.
