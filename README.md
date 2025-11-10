# RecipeGen - AI-Powered Meal Plan Generator

RecipeGen is an intelligent web platform that generates personalized meal plans and recipes using advanced AI technology (OpenAI GPT-4o & DALL-E 3). Users can customize their meal plans based on ingredients, dietary restrictions, cuisine preferences, and cooking goals.

## 🚀 Features

- **AI-Powered Generation**: Leverages OpenAI GPT-4o for intelligent meal planning and DALL-E 3 for recipe images
- **Multi-Currency Support**: GBP (£) and EUR (€) with dynamic conversion (1.00 GBP = 1.15 EUR)
- **Token-Based System**: Prepaid credits system for accessing generation features
- **Google OAuth 2.0**: Secure authentication with Google Sign-In
- **PDF Export**: Generate downloadable meal plan PDFs with mPDF
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **User Dashboard**: Track token balance, generation history, and account settings

## 🛠️ Tech Stack

- **Backend**: PHP 8.x, MySQL
- **Frontend**: Vanilla JavaScript, Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4o, DALL-E 3)
- **Authentication**: Google OAuth 2.0
- **PDF Generation**: mPDF
- **Email**: PHPMailer (SMTP)
- **Dependency Management**: Composer (PHP), npm (Node.js)

## 📋 Prerequisites

- PHP >= 8.0
- MySQL >= 5.7
- Composer
- Node.js & npm
- XAMPP/LAMP/WAMP or similar local server
- OpenAI API Key
- Google OAuth 2.0 credentials

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/airecipegeneration/recipegen.git
cd recipegen
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node.js dependencies

```bash
npm install
```

### 4. Database Setup

Create a MySQL database and import the schema:

```sql
CREATE DATABASE airecipegeneration;
```

Import your database schema (tables: `users`, `topups`, `generations`, etc.)

### 5. Configure Environment

Copy `.env.example` to `config.php` and fill in your credentials:

```bash
cp .env.example config.php
```

Edit `config.php` with your actual credentials:

- Database credentials
- OpenAI API key
- Google OAuth 2.0 Client ID & Secret
- SMTP email configuration

### 6. Build CSS (Tailwind)

```bash
npm run build
# or for development with watch mode:
npm run dev
```

### 7. Set Permissions

Ensure the `recipes/generated/` directory is writable:

```bash
chmod -R 755 recipes/generated/
```

## 🚀 Usage

1. Start your local server (Apache + MySQL via XAMPP)
2. Navigate to `http://localhost/AiRecipeGeneration/`
3. Register or sign in with Google
4. Top up tokens via the Top-Up page
5. Generate personalized meal plans using the Recipe Generator

## 💳 Token System

- **Rate**: 100 Tokens = £1.00 GBP or €1.15 EUR
- **Standard Generation**: 60 Tokens (~£0.60 / €0.69)
- **Bonus Packages**: Volume discounts available (10%-20% bonus)
- **"I Feel Lucky"**: Random bonus (10%-25%)

## 🌍 Multi-Currency

The platform supports:
- **GBP (£)** - Primary currency
- **EUR (€)** - Secondary currency

Users can switch currencies via the header selector. All prices and token calculations are dynamically converted.

## 📁 Project Structure

```
recipegen/
├── api/                    # API endpoints
├── css/                    # Tailwind source files
├── images/                 # Static assets (logos, icons, flags)
├── libs/                   # PHPMailer library
├── pages/                  # Policy pages (Terms, Privacy, etc.)
├── recipes/generated/      # User-generated PDFs (gitignored)
├── templates/              # Reusable PHP templates (header, footer)
├── vendor/                 # Composer dependencies (gitignored)
├── node_modules/           # npm dependencies (gitignored)
├── *.php                   # Core PHP files
├── *.js                    # JavaScript modules
├── composer.json           # PHP dependencies
├── package.json            # Node.js dependencies
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md
```

## 🔒 Security

- All API keys are stored in `config.php` (gitignored)
- Passwords are hashed using PHP `password_hash()`
- Prepared statements prevent SQL injection
- CSRF protection on forms
- Session-based authentication
- HTTPS recommended for production

## 📄 License

Proprietary - All rights reserved by WINTER WORLD LIMITED (Company No. 16133390)

## 📧 Contact

- **Email**: info@recipegen.co.uk
- **Phone**: +44 7874 493565
- **Address**: 16 Tiller Road, London, England, E14 8PX
- **Website**: [recipegen.co.uk](https://recipegen.co.uk)

## 🤝 Contributing

This is a private project. For any inquiries, please contact the development team.

---

**Made with ❤️ by WINTER WORLD LIMITED**

