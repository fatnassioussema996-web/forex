# RecipeGen - AI-Powered Recipe Generator

RecipeGen is an intelligent web platform that generates personalized recipes using advanced AI technology (OpenAI GPT-4o & DALL-E 3). Users can customize their recipes based on ingredients, dietary restrictions, cuisine preferences, and cooking goals.

## 🚀 Features

- **AI-Powered Generation**: Leverages OpenAI GPT-4o for intelligent recipe generation and DALL-E 3 for recipe images
- **Multi-Currency Support**: GBP (£) and EUR (€) with dynamic conversion
- **Token-Based System**: Prepaid credits system for accessing generation features
- **Google OAuth 2.0**: Secure authentication with Google Sign-In
- **PDF Export**: Generate downloadable recipe PDFs with Puppeteer
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **User Dashboard**: Track token balance, generation history, and account settings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MySQL (Prisma ORM)
- **Frontend**: React, Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4o, DALL-E 3)
- **Authentication**: NextAuth.js (Email/Password + Google OAuth)
- **PDF Generation**: Puppeteer (serverless-compatible)
- **Email**: Nodemailer (SMTP)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js >= 18.0
- MySQL >= 5.7 (or PlanetScale for production)
- npm or yarn
- OpenAI API Key
- Google OAuth 2.0 credentials

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd recipegen
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your application URL
- `OPENAI_API_KEY` - Your OpenAI API key
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `TM_API_KEY` and `TM_SIGNING_KEY` - TransferMit payment gateway credentials
- Email configuration (SMTP settings)

### 4. Set up the database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (or use migrations)
npm run db:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **Quick Start**: See `QUICK_START.md` for detailed setup instructions
- **Migration Status**: See `MIGRATION_STATUS.md` for migration progress
- **Next.js Setup**: See `README_NEXTJS.md` for Next.js-specific documentation

## 🗂️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── about/              # About page
│   ├── cabinet/            # User dashboard
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   └── ...                 # Other pages
├── components/             # React components
├── lib/                    # Utility functions
├── prisma/                 # Prisma schema
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## 🔐 Security

- All API keys are stored in environment variables (`.env.local`)
- Passwords are hashed using bcrypt
- Sessions are managed securely via NextAuth.js
- Payment processing via PCI DSS-compliant gateway

## 📝 License

Copyright © 2025 WINTER WORLD LIMITED. All Rights Reserved.

## 📧 Contact

For support, email: [info@recipegen.co.uk](mailto:info@recipegen.co.uk)
