# Core API Boilerplate

This repository contains the foundational Node.js (Express, Sequelize) backend for our new projects. All business logic has been stripped out, leaving a robust infrastructure centered around authentication, user profiles, Google OAuth, loggers, and database connections.

---

## 🏗️ Architecture Guide

The backend uses a standard monolithic architecture structured for maintainability and scalability.

```text
backend/
├── src/
│   ├── configs/          # Configuration files (Database, App, Services)
│   ├── controllers/      # 🟢 ADD YOUR DOMAIN CONTROLLERS HERE
│   ├── db/
│   │   ├── migrations/   # Sequelize migrations
│   │   ├── models/       # 🟢 ADD YOUR DATABASE MODELS HERE (e.g., User.model.js)
│   │   └── seeders/      # Database seeders
│   ├── helpers/          # Generic utility functions and helpers
│   ├── libs/             # Custom libraries (Error handling, Mailers, API wrappers)
│   ├── rest-resources/   
│   │   ├── middlewares/  # Express middlewares (Auth guards, Validators)
│   │   └── routes/       # API routing definitions
│   │       ├── api/v1/   # 🟢 ADD YOUR DOMAIN ROUTES HERE
│   │       └── index.js  # Main router combiner
│   ├── services/         # 🟢 ADD YOUR BUSINESS LOGIC SERVICES HERE
│   └── socket-resources/ # WebSockets implementation and event handlers
└── index.js              # Entry point for the server
```

### Adding New API Routes & Domain Logic
To keep the core authentication clean, follow this workflow when adding new features:
1. **Database Model**: Create a new model in `src/db/models/`. Ensure it registers with the Sequelize instance.
2. **Service Layer**: Write your core business logic in `src/services/<domain>/`. Keep it isolated from Express req/res objects.
3. **Controller**: Create a controller in `src/controllers/<domain>.controller.js` to handle HTTP parsing and pass data to the service.
4. **Router**: Create a new route file in `src/rest-resources/routes/api/v1/<domain>.routes.js`.
5. **Mount Route**: Import your new route file into `src/rest-resources/routes/api/v1/index.js` and mount it (e.g. `router.use('/your-domain', yourDomainRoutes)`).
6. **Protect Routes**: To protect a route behind the auth system, simply inject the existing authentication middleware from `src/rest-resources/middlewares/` before your controller handler.

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the root of this `backend/` directory using the following template:

```env
# Application Settings
APP_NAME=MyBoilerplate
APP_URL=localhost:8080
NODE_ENV=development
PORT=8080
LOG_LEVEL=debug
AUTOMATIC_TRANSACTIONS=true

# Database Configuration (PostgreSQL)
DB_NAME=api
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432

# JWT Secrets & Expirations (Replace with secure random strings in production)
JWT_LOGIN_SECRET=your_login_secret_here
JWT_LOGIN_TOKEN_EXPIRY=2d
VERIFICATION_TOKEN_SECRET=your_verification_secret_here
VERIFICATION_TOKEN_EXPIRY=120s
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_TOKEN_EXPIRY=7d
JWT_EXTENDED_REFRESH_TOKEN_EXPIRY=30d
JWT_LOOKUP_SECRET=your_lookup_secret_here
JWT_LOOKUP_TOKEN_EXPIRY=5m

# OAuth & Mobile Integrations
GOOGLE_CLIENT_ID=your_google_client_id_here
APPLE_BUNDLE_ID=your_apple_bundle_id_here

# Redis / PubSub (Optional, used for sockets/caching)
REDIS_URL=
PUB_SUB_REDIS_DB_PASSWORD=
PUB_SUB_REDIS_DB_HOST=127.0.0.1
PUB_SUB_REDIS_DB_PORT=6379

# Email / SMTP Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME=MyBoilerplate
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=

# AWS / Cloud Services (Optional)
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=

# Azure Storage (Optional)
AZURE_STORAGE_ACCOUNT=
AZURE_BLOB_CONTAINER=
AZURE_CLIENT_ID=
AZURE_TENANT_ID=
AZURE_FEDERATED_TOKEN_FILE=
AZURE_AUTHORITY_HOST=https://login.microsoftonline.com/

# Additional Integrations
VONAGE_SMS_API_KEY=
VONAGE_SMS_API_SECRET=
SUMSUB_TOKEN=
SUMSUB_SECRET_KEY=
ZOHO_BASE_URL=
ZOHO_TOKEN_URL=
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REDIRECT_URI=
ZOHO_AUTH_CODE=
APP_ATTEST_BUNDLE_ID=
APP_ATTEST_TEAM_ID=
FIREBASE_SERVICE_ACCOUNT=
CASTLE_API_SECRET=
SENTRY_DSN=
```

---

## 🚀 Setup Instructions

Follow these exact steps in your terminal to get the development server running locally.

**1. Clone the repository and navigate to the backend folder**
```bash
git clone https://github.com/your-org/your-repo-name.git
cd your-repo-name/backend
```

**2. Install Dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
Create a new `.env` file and configure your database and secrets.
```bash
touch .env
# Open .env in your editor and paste the template variables provided above
```

**4. Start the Development Server**
Ensure your local PostgreSQL instance is running, then run:
```bash
npm run start:dev
```
*Note: Depending on your local setup, you might need to run database migrations first using `npx sequelize-cli db:migrate`.*

The server will start and be available at `http://localhost:8080`.
