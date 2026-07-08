# 🌞 Gangotri Infrastructure

Official website for **Gangotri Infrastructure** — a solar EPC company delivering residential, commercial, and industrial rooftop solar solutions, plus EV charging infrastructure, across India.

Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Supabase** for backend/data storage.

---

## ✨ Features

- **Animated Hero section** — video background, live "meter panel" stats, scroll parallax
- **Services** — Residential, Commercial, Industrial Solar, Maintenance, EV Charging
- **Projects Gallery** — real installation showcase
- **Solar Calculator** — instant cost, subsidy, and payback estimate based on electricity bill/units
- **Government Subsidy guide** — full breakdown of PM Surya Ghar Muft Bijli Yojana
- **About page** — company story, timeline, certifications, leadership
- **FAQ section** — accordion-style, real questions people ask before buying solar
- **Contact form** — connected to Supabase, with server-side validation and rate limiting
- **Admin panel** — password-protected dashboard to view contact enquiries
- Fully responsive, dark/light section theming, consistent gold-and-navy design system

---

## 🛠️ Tech Stack

| Layer          | Tech                                  |
|-----------------|----------------------------------------|
| Framework       | Next.js 14+ (App Router)               |
| Styling         | Tailwind CSS                           |
| Animation       | Framer Motion                          |
| Icons           | lucide-react                           |
| Backend / DB    | Supabase (Postgres + Row Level Security) |
| Deployment      | Vercel (recommended)                   |

---

## 📁 Project Structure

```
gangotri-infrastructure/
├── app/
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx             # About page
│   ├── services/page.tsx          # Services (5 sections, anchor-linked)
│   ├── resources/page.tsx         # Solar calculator + subsidy guide
│   ├── contact/page.tsx           # Contact form
│   ├── admin/page.tsx             # Admin dashboard
│   └── api/
│       ├── contact/route.ts       # Contact form submission endpoint
│       └── admin/
│           └── contact-submissions/route.ts   # Admin data fetch endpoint
├── components/
│   ├── navbar/                    # Navbar, NavLinks, DropdownMenu
│   ├── sections/                  # Hero, Trust, Services, Gallery, FAQ, Footer
│   └── ui/                        # Shared UI primitives (Button, etc.)
├── lib/
│   ├── supabase/server.ts         # Server-only Supabase client
│   └── utils.ts                   # cn() helper and other utilities
├── supabase_migrations/
│   └── 001_contact_submissions.sql
├── public/
│   ├── videos/                    # Hero background video + poster
│   └── images/                    # Project photos, team photos, etc.
├── .env.local                     # Environment variables (not committed)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/alok957641/gangotri-infrastructure.git
cd gangotri-infrastructure
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=set-a-strong-password-here
```

> ⚠️ Never commit `.env.local` — it's already in `.gitignore`. The service role key bypasses Row Level Security and must stay server-side only.

### 4. Set up the Supabase database

In your Supabase project dashboard → **SQL Editor**, run:

```
supabase_migrations/001_contact_submissions.sql
```

This creates the `contact_submissions` table with RLS enabled (locked to server-only access).

### 5. Add your media

Drop these into `public/`:

- `videos/hero-bg.mp4` + `videos/hero-poster.jpg` — Hero background
- `images/projects/*.jpg` — Project gallery photos
- `images/about/*.jpg` — About page banner
- `images/team/*.jpg` — Leadership headshots

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment (Vercel)

1. Push this repo to GitHub (already done ✅).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import this repo.
3. Add the same environment variables from `.env.local` in Vercel's project settings.
4. Deploy — Vercel auto-builds on every push to `main`.

---

## 📌 Notes

- Large media files (like `hero-bg.mp4`) are best served via a CDN (Cloudinary, Bunny, S3) rather than committed directly to the repo, to keep clone/build times fast.
- The admin panel (`/admin`) is protected by a password header, not full authentication — treat the URL as semi-private and consider adding real auth (Supabase Auth) before scaling usage.
- Solar calculator figures (generation, tariff, cost per kW) are indicative defaults — update the constants in `app/resources/page.tsx` to match current local benchmarks.

---

## 📄 License

Private / proprietary — © Gangotri Infrastructure. Not for redistribution without permission.
