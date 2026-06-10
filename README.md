# Vela Analytics — E-commerce Dashboard

A premium SaaS analytics dashboard built with **Next.js 14**, **Supabase Auth**, **Recharts**, and **Tailwind CSS**.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Auth:** Supabase Auth (email/password)
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **Styling:** Tailwind CSS + custom CSS variables
- **Typography:** Inter + JetBrains Mono (numbers)
- **Deploy:** Render

---

## Setup

### 1. Install
```bash
cd vela
npm install
```

### 2. Environment
```bash
cp .env.example .env.local
# Add your Supabase URL and anon key
```

### 3. Supabase — run SQL
In your Supabase project → SQL Editor, paste and run the entire contents of `supabase-setup.sql`.

This creates 3 tables, sets up RLS, and seeds 90 days of realistic data.

### 4. Enable Email Auth
Supabase → Authentication → Providers → Email → Enable

### 5. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with pricing |
| `/register` | Create account |
| `/login` | Sign in |
| `/dashboard` | Overview — KPIs, revenue chart, donut, recent orders |
| `/dashboard/orders` | Full orders table — search, filter, paginate |
| `/dashboard/customers` | Customer LTV table — sort, search |

---

## Deploy to Render/Vercel

1. Push to GitHub
2. Render → New Web Service → connect repo
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Design System

- **Background:** `#09090b` (zinc-950)
- **Surface:** `#18181b` (zinc-900)
- **Border:** `rgba(255,255,255,0.06)`
- **Accent:** `#6366f1` (Electric Indigo)
- **Numbers:** JetBrains Mono with tabular-nums
- **Micro-transitions:** 150ms ease on all interactive elements
