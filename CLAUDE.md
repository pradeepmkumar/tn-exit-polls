# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js Version Warning

This project uses Next.js 16.2.4, which has breaking changes from earlier versions. APIs, conventions, and file structure may differ from training data. When implementing features, reference the relevant guide in `node_modules/next/dist/docs/` and pay attention to deprecation notices.

## Development Commands

- **Start dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Project Overview

This is a **Tamil Nadu Assembly Election 2026 Exit Poll Tracker** — a real-time visualization dashboard that aggregates exit poll data from multiple polling agencies (CVoter, Axis My India, Today's Chanakya, Jan Ki Baat, etc.) and displays seat projections and vote share comparisons for political alliances and parties.

## Architecture

The app uses Next.js App Router with server-side rendering. The core structure is:

- **Data Model** (`src/lib/data.ts`): Defines TypeScript interfaces for polls, parties, and alliances. All poll results are stored as objects with party/alliance seat and vote share data.
- **Root Layout** (`src/app/layout.tsx`): Sets up metadata (SEO tags), Google Analytics, Google AdSense, and the Geist font.
- **Main Page** (`src/app/page.tsx`): Orchestrates the dashboard layout — renders header, ad banners, info disclaimers, and component sections in a logical order.
- **Components** (`src/components/`): Modular React components that handle rendering specific UI sections:
  - `Header.tsx` / `Footer.tsx`: Page chrome
  - `MajorityMeter.tsx`: Shows alliance-level summaries and seat majority thresholds
  - `SeatChart.tsx` / `VoteShareChart.tsx`: Recharts visualizations for seat projections and vote share by polling agency
  - `PollTable.tsx`: Tabular comparison of polls side-by-side
  - `AdBanner.tsx`: Google AdSense ad slots

## Key Technical Details

- **Framework**: Next.js 16.2.4 with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with PostCSS
- **Charts**: Recharts for interactive seat and vote share visualizations
- **Icons**: lucide-react
- **Analytics**: Google Analytics (via `@next/third-parties`)
- **Monetization**: Google AdSense
- **Path alias**: `@/` resolves to `src/`

## Data Structure

All poll data flows through `PollResult` objects, which contain:
- Unique ID and polling agency name
- Published date and methodology
- `seats`: Record mapping party/alliance short names (e.g., "DMK+") to seat projections
- `voteShare`: Record mapping party/alliance short names to vote share percentages

Parties and alliances are defined in static arrays (`PARTIES`, `ALLIANCES`) in `lib/data.ts`. Colors and alliance mappings are pre-configured there.

## Deployment

The site runs on Vercel. Environment variables:
- `NEXT_PUBLIC_SITE_URL`: Site URL for metadata (defaults to `https://tn-poll.in`)
- `GA_ID`: Google Analytics 4 Measurement ID (currently a placeholder — set before deploying)
- `ADSENSE_CLIENT`: Google AdSense client ID (hardcoded in layout, ensure it's correct)

## Styling & Responsive Design

- Mobile-first Tailwind approach
- Grid layouts adjust from 1 column on mobile to 2+ on larger screens
- All components respect max-width constraints and padding for readability
