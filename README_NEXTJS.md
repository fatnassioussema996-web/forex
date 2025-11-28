# RecipeGen - Next.js Migration

Миграция проекта RecipeGen с PHP на Next.js 14 (App Router).

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

**Важно**: Для работы с Puppeteer в serverless окружении (Vercel) может потребоваться дополнительная настройка. См. раздел "PDF Generation" ниже.

### 2. Настройка переменных окружения

Скопируйте `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

Заполните все необходимые переменные в `.env.local`.

### 3. Настройка базы данных

#### Локально (MySQL)

```bash
# Создайте базу данных MySQL
mysql -u root -p
CREATE DATABASE recipegen_db;

# Настройте DATABASE_URL в .env.local
DATABASE_URL="mysql://user:password@localhost:3306/recipegen_db"
```

#### Prisma миграции

```bash
# Генерируем Prisma Client
npm run db:generate

# Создаем миграции на основе schema.prisma
npm run db:migrate

# Или просто пушим схему (для разработки)
npm run db:push
```

### 4. Запуск проекта

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 📁 Структура проекта

```
recipegen-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── api/               # API routes
│   └── [pages]/           # Страницы приложения
├── components/             # React компоненты
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                   # Утилиты и хелперы
│   ├── prisma.ts         # Prisma Client
│   ├── currency-utils.ts # Валютные утилиты
│   └── config.ts         # Конфигурация
├── prisma/                # Prisma схема
│   └── schema.prisma
└── public/                # Статические файлы
    ├── images/
    └── recipes/
```

## 🔧 Основные команды

```bash
# Development
npm run dev              # Запуск dev сервера

# Database
npm run db:generate      # Генерация Prisma Client
npm run db:migrate       # Создание миграций
npm run db:push          # Пуш схемы без миграций
npm run db:studio        # Открыть Prisma Studio

# Build
npm run build            # Production build
npm start                # Запуск production сервера
npm run lint             # Проверка кода
```

## 📝 Миграция с PHP

### Маппинг файлов

| PHP | Next.js |
|-----|---------|
| `index.php` | `app/page.tsx` |
| `login.php` | `app/login/page.tsx` |
| `register.php` | `app/register/page.tsx` |
| `cabinet.php` | `app/cabinet/page.tsx` |
| `handle_generation.php` | `app/api/generation/route.ts` |
| `api/topup-init.php` | `app/api/topup/init/route.ts` |
| `templates/header.php` | `components/Header.tsx` |
| `templates/footer.php` | `components/Footer.tsx` |
| `currency-utils.php` | `lib/currency-utils.ts` |
| `config.php` | `.env.local` + `lib/config.ts` |

## 🔐 Аутентификация

Используется NextAuth.js v4 с провайдерами:
- Email/Password (Credentials)
- Google OAuth 2.0

Настройка в `app/api/auth/[...nextauth]/route.ts`.

## 💾 База данных

- **Локально**: MySQL
- **Продакшн**: PlanetScale (serverless MySQL)

Prisma ORM используется для работы с БД.

## 🚀 Деплой

### Vercel

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Подключите PlanetScale базу данных
4. Деплой автоматический при push в main

## 📚 Документация

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [PlanetScale Docs](https://planetscale.com/docs)

## ⚠️ Важные замечания

### PDF Generation на Vercel

✅ **Настроено**: Используется `@sparticuz/chromium` + `puppeteer-core` для serverless окружения.

**Локальная разработка**: Установите Chrome/Chromium и укажите путь в `.env.local`:
```
PUPPETEER_EXECUTABLE_PATH=/path/to/chromium
```

Или установите полный Puppeteer для локальной разработки:
```bash
npm install --save-dev puppeteer
```

**Продакшн (Vercel)**: Автоматически использует @sparticuz/chromium.

### Storage driver

- Переменная `STORAGE_DRIVER` управляет тем, куда сохраняются PDF и изображения генератора (`local` по умолчанию).
- Сейчас реализован локальный диск (`public/…`). Значение `vercel-blob` зарезервировано: логика уже вынесена в `lib/storage.ts`, чтобы подключить Vercel Blob Storage без рефакторинга API.

### PlanetScale Configuration

Для использования PlanetScale (serverless MySQL) раскомментируйте в `prisma/schema.prisma`:
```prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma" // Раскомментируйте для PlanetScale
}
```

