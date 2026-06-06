# Alcove Residences

A premium curated resale apartment platform for Dhaka, Bangladesh. Unlike traditional property marketplaces, Alcove operates as an acquisition and resale business — every apartment is personally verified, acquired, and managed by the internal team.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| App | Next.js 16 (App Router + API Routes) |
| UI | TypeScript, Tailwind CSS, Framer Motion |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT (jose) |
| Maps | OpenStreetMap + Leaflet |
| Deployment | Vercel |

## Project Structure

```
├── apps/web/           # Unified Next.js app (frontend + API)
├── packages/database/  # Prisma schema, migrations, seed
└── .env.example
```

The API runs as Next.js Route Handlers under `/api/*` — no separate backend server needed.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+

### Setup

```bash
npm install
cp .env.example .env
# Set DATABASE_URL in .env

npm run db:generate
npm run db:push
npm run db:seed

npm run dev
```

Open **http://localhost:3000**

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@alcove.bd | admin123 |
| Buyer | buyer@example.com | buyer123 |

## Deploy to Vercel

1. Import the repository on [Vercel](https://vercel.com)
2. Set **Root Directory** to `apps/web`
3. Add environment variables from `.env.example` (especially `DATABASE_URL` and `JWT_SECRET`)
4. Deploy

Vercel will run `npm install` from the monorepo root and build the Next.js app with integrated API routes.

## API Endpoints

All endpoints are served from the same origin at `/api/`:

- `POST /api/auth/register` · `POST /api/auth/login`
- `GET /api/apartments` · `GET /api/apartments/by-slug/[slug]`
- `POST /api/apartments/[id]/visit` · `POST /api/valuations`
- `POST /api/inquiries/contact` · `GET /api/admin/dashboard`

## License

Private — All rights reserved.
