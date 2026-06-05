# Alcove Residences

A premium curated resale apartment platform for Dhaka, Bangladesh. Unlike traditional property marketplaces, Alcove operates as an acquisition and resale business — every apartment is personally verified, acquired, and managed by the internal team.

## Business Model

- **NOT** an open listing platform
- No seller dashboard, agent portal, or public listing submission
- Company acquires apartments from owners via valuation requests
- Admin team publishes curated inventory (15–20 active apartments)
- Buyers browse and submit visit/contact requests

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS, ShadCN-style UI, Framer Motion |
| Backend | NestJS, REST API, Swagger docs |
| Database | PostgreSQL, Prisma ORM |
| Maps | OpenStreetMap + Leaflet |
| Storage | AWS S3 compatible |
| Deployment | Vercel-ready (frontend) |

## Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend (public site + admin UI)
│   └── api/          # NestJS REST API
├── packages/
│   └── database/     # Prisma schema, migrations, seed
└── .env.example      # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure DATABASE_URL in .env, then:
npm run db:generate
npm run db:push
npm run db:seed

# Start development servers
npm run dev
```

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000/api
- **API Docs**: http://localhost:4000/api/docs

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@alcove.bd | admin123 |
| Buyer | buyer@example.com | buyer123 |

## Pages

- `/` — Premium homepage with hero, featured apartments, testimonials, FAQ
- `/apartments` — Curated collection with simple filters
- `/apartments/[slug]` — Premium apartment detail with gallery, map, inquiry sidebar
- `/about` — Company story and business model
- `/sell` — Multi-step valuation request form
- `/contact` — Contact form and information
- `/login` — Buyer/admin authentication
- `/account` — Buyer saved apartments and profile
- `/admin` — Internal admin dashboard

## API Endpoints

- `POST /api/auth/register` — Buyer registration
- `POST /api/auth/login` — Email/password login
- `POST /api/auth/otp/request` — Mobile OTP request
- `GET /api/apartments` — List with filters (area, budget, bedrooms, size)
- `GET /api/apartments/:slug` — Apartment detail
- `POST /api/apartments/:id/visit` — Schedule visit request
- `POST /api/valuations` — Submit valuation request
- `POST /api/inquiries/contact` — General contact inquiry
- `GET /api/admin/dashboard` — Admin analytics (auth required)

## Deployment

### Frontend (Vercel)

Deploy `apps/web` with environment variables from `.env.example`.

### API

Deploy NestJS API to any Node.js host. Set `DATABASE_URL`, `JWT_SECRET`, and S3 credentials.

## License

Private — All rights reserved.
