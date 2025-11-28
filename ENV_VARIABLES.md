# Environment Variables для Vercel

Список всех необходимых environment variables для деплоя на Vercel.

## Обязательные переменные

### Database (PostgreSQL - Neon)
```bash
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

### NextAuth
```bash
NEXTAUTH_SECRET=your-secret-here
# Сгенерируйте: openssl rand -base64 32
NEXTAUTH_URL=https://yourproject.vercel.app
```

### Google OAuth
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### OpenAI
```bash
OPENAI_API_KEY=sk-...
```

### TransferMit Payment Gateway
```bash
TM_API_KEY=your-transfermit-api-key
TM_SIGNING_KEY=your-transfermit-signing-key
```

### SMTP Email
```bash
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
SMTP_FROM=your-email@domain.com
SMTP_FROM_NAME=Avenqor Support
```

## Опциональные переменные

```bash
SITE_BASE_URL=https://yourproject.vercel.app
TM_API_URL=https://app.transfermit.com/api/v1
```

## Инструкция по добавлению в Vercel

1. Откройте Vercel Dashboard → ваш проект → Settings → Environment Variables
2. Добавьте каждую переменную отдельно
3. Выберите окружения (Production, Preview, Development)
4. Сохраните изменения
5. Передеплойте проект

