# TrakoShip - Professional Shipment Tracking Platform

TrakoShip is a full-stack shipment tracking platform designed for small and medium-sized shipping companies. It provides real-time tracking, customer management, and embeddable widgets for seamless integration into any website.

## 🚀 Features

- **Customer Management**: Add, edit, and manage customer profiles with contact information
- **Shipment Tracking**: Create and track shipments with auto-generated tracking numbers
- **Real-time Status Updates**: Multiple shipment statuses (Pending, In Transit, Delivered, etc.)
- **Public Tracking Page**: Allow customers to track shipments without authentication
- **Embeddable Widget**: Add tracking functionality to any website with simple JavaScript
- **Bilingual Support**: Full Arabic and English translations with RTL/LTR support
- **Plan-based Access**: Free, Basic, and Pro plans with different limits
- **Comprehensive Dashboard**: View statistics and recent shipments at a glance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies, bcryptjs
- **Internationalization**: next-intl
- **Styling**: Custom CSS with CSS Modules

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm** or **yarn**
- **PostgreSQL**: v14 or higher

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd TRACKOSHIP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE trakoship;

# Exit PostgreSQL
\q
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory (a `.env` file is already created with default values):

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trakoship?schema=public"

# JWT Secret (change this to a random string in production)
JWT_SECRET="trakoship-secret-key-change-in-production-12345"

# Node Environment
NODE_ENV="development"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Important**: Update the `DATABASE_URL` with your PostgreSQL credentials and change the `JWT_SECRET` to a secure random string.

### 5. Run Database Migrations

Generate Prisma Client and create database tables:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 6. Seed the Database (Optional)

Populate the database with sample data for testing:

```bash
npm run db:seed
```

This will create:
- Two test user accounts
- Sample customers
- Sample shipments with different statuses

**Test Accounts**:
- Email: `demo@trakoship.com` | Password: `password123` (Free Plan)
- Email: `pro@trakoship.com` | Password: `password123` (Pro Plan)

### 7. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 🌐 Accessing the Application

### Public Pages (No Authentication Required)

- **Home**: http://localhost:3000/en/ or http://localhost:3000/ar/
- **About Us**: http://localhost:3000/en/about
- **Features**: http://localhost:3000/en/features
- **Pricing**: http://localhost:3000/en/pricing
- **Track Shipment**: http://localhost:3000/en/track/TKS-ABC12345 (use tracking numbers from seed data)

### Authentication Pages

- **Login**: http://localhost:3000/en/login
- **Register**: http://localhost:3000/en/register

### Protected Dashboard Pages (Requires Login)

- **Dashboard**: http://localhost:3000/en/dashboard
- **Customers**: http://localhost:3000/en/dashboard/customers
- **Shipments**: http://localhost:3000/en/dashboard/shipments
- **Settings**: http://localhost:3000/en/dashboard/settings

## 📦 Sample Tracking Numbers

After running the seed script, you can test tracking with these numbers:

- `TKS-ABC12345` - Delivered shipment
- `TKS-XYZ67890` - In Transit shipment
- `TKS-DEF54321` - Pending shipment
- `TKS-GHI98765` - Out for Delivery shipment

## 🔌 Embeddable Widget

TrakoShip provides two methods to embed tracking on external websites:

### Method 1: Iframe Embed

```html
<iframe 
  src="http://localhost:3000/embed/track/TKS-ABC12345" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border: 1px solid #e2e8f0; border-radius: 0.5rem;"
></iframe>
```

### Method 2: JavaScript Widget

```html
<script>
  window.TrakoShipConfig = {
    trackingNumber: 'TKS-ABC12345',
    containerId: 'trakoship-widget'
  };
</script>
<script src="http://localhost:3000/widget.js"></script>
<div id="trakoship-widget"></div>
```

## 🌍 Language Switching

The application supports both English and Arabic:

- **English**: `/en/...` (e.g., http://localhost:3000/en/)
- **Arabic**: `/ar/...` (e.g., http://localhost:3000/ar/)

Switch languages using the language toggle in the navigation bar.

## 📊 Plan Limits

| Plan | Customers | Shipments | Features | Price/Month |
|------|-----------|-----------|----------|-------------|
| **Free** | 50 | 500 | Basic Features | $0 |
| **Basic** | 200 | 2,000 | All Features + Support | $25 |
| **Pro** | Unlimited | Unlimited | All Features + API | $100 |

## 🧪 Testing the Application

### 1. Register a New Account

Visit http://localhost:3000/en/register and create a new company account.

### 2. Add Customers

Navigate to Dashboard → Customers and add customer profiles.

### 3. Create Shipments

Navigate to Dashboard → Shipments and create new shipments. The system will auto-generate tracking numbers.

### 4. Update Shipment Status

Click "Update" on any shipment to change its status and add timeline entries.

### 5. Track Publicly

Use the generated tracking number to test the public tracking page (no login required).

### 6. Test Embeddable Widget

Copy the embed code from Settings page and test it on a separate HTML file.

## 🗂️ Project Structure

```
TRACKOSHIP/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Database seed script
├── public/
│   └── widget.js              # Embeddable widget script
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   ├── features/      # Features page
│   │   │   ├── pricing/       # Pricing page
│   │   │   ├── login/         # Login page
│   │   │   ├── register/      # Register page
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   └── track/         # Public tracking page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── customers/     # Customer CRUD endpoints
│   │   │   ├── shipments/     # Shipment CRUD endpoints
│   │   │   ├── track/         # Public tracking endpoint
│   │   │   └── dashboard/     # Dashboard stats endpoint
│   │   ├── embed/             # Embeddable tracking page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Navbar.tsx         # Public navigation
│   │   ├── DashboardNav.tsx   # Dashboard navigation
│   │   └── Footer.tsx         # Footer component
│   ├── lib/                   # Utilities and helpers
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── tracking.ts        # Tracking number generator
│   │   └── plans.ts           # Plan limits
│   ├── locales/               # Translation files
│   │   ├── en/common.json     # English translations
│   │   └── ar/common.json     # Arabic translations
│   ├── i18n.ts                # i18n configuration
│   └── middleware.ts          # Next.js middleware
├── .env                       # Environment variables
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🔐 Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens are stored in httpOnly cookies
- Authentication required for all dashboard routes
- API endpoints validate user ownership of resources
- Database queries use Prisma's query builder (SQL injection protection)

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:seed      # Seed database with sample data
```

## 🐛 Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Ensure PostgreSQL is running:
   ```bash
   # Windows (if installed as service)
   net start postgresql-x64-14
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

2. Verify your DATABASE_URL in `.env` matches your PostgreSQL credentials

3. Check if the database exists:
   ```bash
   psql -U postgres -l
   ```

### Port Already in Use

If port 3000 is already in use, you can change it:

```bash
PORT=3001 npm run dev
```

### Prisma Client Not Generated

If you see Prisma Client errors:

```bash
npm run db:generate
```

## 🚀 Production Deployment

For production deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables (especially `JWT_SECRET` and `DATABASE_URL`)

3. Run database migrations:
   ```bash
   npm run db:migrate
   ```

4. Start the production server:
   ```bash
   npm run start
   ```

## 📧 Support & Contact

For issues or questions, please contact the development team.

## 📄 License

This project is proprietary software developed for TrakoShip.

---

**Built with ❤️ for small and medium shipping companies**

