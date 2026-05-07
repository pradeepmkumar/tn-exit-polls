# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js 16.2.4 + React 19 Differences

This project uses **Next.js 16.2.4** (latest) and **React 19**, which have breaking changes from earlier versions. Key differences:

- **App Router**: File-based routing in `src/app/`. All pages use `page.tsx`. No `_app` / `_document`.
- **Server Components by default**: Components are Server Components unless `'use client'` is added (rarely needed here).
- **Next.js API**: Check `node_modules/next/dist/docs/` for current docs before implementing new features.
- **React 19**: Some hooks and patterns differ; refer to React docs if issues arise.

See `AGENTS.md` for agent-specific guidance.

## Development Commands

- **Start dev server**: `npm run dev` (http://localhost:3000)
- **Build for production**: `npm run build`
- **Type checking**: `npx tsc --noEmit`
- **Lint code**: `npm run lint`
- **Start production server**: `npm start`

## Page Routes

The app has multiple pages in `src/app/`:

- **`/`** (Home): Main dashboard combining exit poll visualizations and a poll table
- **`/exit-polls`**: Dedicated exit polls view with the same visualizations (separated for potential independent access)
- **`/actual-results`**: Will display official results once available (currently placeholder)

Both exit-polls and home typically show the same data until official results are released.

## Data Update Workflow

Poll data is managed in `src/lib/data.ts` as static TypeScript objects. Two scripts are available:

### Manual Data Entry
```bash
node scripts/update-polls.js --manual
```
Interactive CLI prompting for: poll agency, news channel, seat predictions (per party), vote share (%), source URL. Data is appended to `POLL_RESULTS` array.

### Fetch from External Source
```bash
node scripts/fetch-exit-polls.js
```
Fetches poll data from an external API/source. Check `scripts/README.md` for details on data sources and schema mapping.

**Data format**: Each poll object requires `id`, `agency`, `channel`, `publishedDate`, `methodology` ("Exit Poll" or "Official Results"), `seats` (party→count map), `voteShare` (party→% map), and optionally `sourceUrl`.

**Validation**: Seat totals should sum to 234 (TN assembly total). Party codes: `DMK`, `INC`, `VCK`, `AIADMK`, `BJP`, `PMK`, `TVK`, `NTK`, `OTH`.

## Project Overview

**Tamil Nadu Assembly Election 2026 Exit Poll Tracker** — A dashboard aggregating exit poll predictions from multiple agencies (Axis My India, Matrize, etc.) displaying seat projections and vote share comparisons across political alliances. Election held April 23, 2026; results counted May 4, 2026.

**Current state**: Exit poll aggregation. Once official results are released, add them to `POLL_RESULTS` with `methodology: "Official Results"` to appear alongside predictions.

## Architecture

Single-page, server-rendered Next.js app. Data flows: `src/lib/data.ts` (static poll data) → page components → component tree (renders visualizations and tables). No API calls—all data is static TypeScript.

**Key files & their roles:**

- **`src/lib/data.ts`**: Core data model. Single source of truth. Exports:
  - `POLL_RESULTS`: Array of `PollResult` objects (from scripts or manual entry)
  - `PARTIES` / `ALLIANCES`: Party metadata with colors for charts
  - `ELECTION`: Election constants (total seats, majority threshold, voting/result dates)
  - All UI automatically reflects changes here (no rebuild required after data updates)

- **`src/app/layout.tsx`**: Root wrapper. Configures SEO (metadata, Open Graph), Google Analytics 4, Google AdSense client ID, and Geist font. Inherited by all pages.

- **`src/app/page.tsx`** & **`src/app/exit-polls/page.tsx`**: Page components. Import `POLL_RESULTS` and render the same layout: header → majority meter → seat/vote share charts → poll table → ad banners → footer. Exit-polls page is a dedicated view, home page shows both exit polls and official results (once added).

- **`src/components/`**: Reusable UI components:
  - `Header.tsx` / `Footer.tsx`: Navigation and page chrome
  - `MajorityMeter.tsx`: Per-alliance seat totals, majority threshold (118 seats), uses latest poll
  - `SeatChart.tsx` / `VoteShareChart.tsx`: Recharts bar charts. Aggregate predictions by polling agency; color-coded by alliance
  - `PollTable.tsx`: Tabular view of all polls. Columns: agency, channel, date, methodology, seats, vote share
  - `AdBanner.tsx`: Google AdSense responsive slots. Ad unit IDs in `layout.tsx`

- **SEO metadata**: `src/app/opengraph-image.tsx` (dynamic OG image), `sitemap.ts`, `robots.ts`

## Tech Stack

- **Framework**: Next.js 16.2.4 + React 19
- **Language**: TypeScript with strict mode (tsconfig.json)
- **CSS**: Tailwind CSS v4 + PostCSS (v4 is PostCSS-based, no @tailwind directives)
- **Charts**: Recharts 3.8.1 (responsive bar charts)
- **Icons**: lucide-react
- **Analytics**: Google Analytics 4 (via `@next/third-parties/google`)
- **Monetization**: Google AdSense (client ID hardcoded in layout.tsx)
- **Path alias**: `@/` → `src/`
- **Linting**: ESLint v9 + Next.js config (flat config, not .eslintrc)

## Development Best Practices for This Project

1. **Data is king**: All changes to `POLL_RESULTS`, `PARTIES`, `ALLIANCES`, or `ELECTION` in `src/lib/data.ts` auto-reflect in the UI. No rebuild needed for data changes.
2. **No client-side state**: This is a static site. No Redux, Context, or useState. Components are presentational and re-render when `src/lib/data.ts` changes.
3. **Charts update automatically**: `SeatChart.tsx` and `VoteShareChart.tsx` aggregate from `POLL_RESULTS` at render time. Just add data, charts regenerate.
4. **Styling**: Tailwind v4 is PostCSS-based. Use utility classes directly in JSX. No CSS Modules needed unless component isolation is critical.
5. **TypeScript strict mode**: Enforce types strictly. `PollResult`, `Alliance`, `Party` are defined; use them.
6. **Scripts are separate**: `scripts/update-polls.js` and `scripts/fetch-exit-polls.js` mutate `src/lib/data.ts` and exit. Not part of the dev/build pipeline.
7. **Deployment**: Every `npm run build` snapshots the current `src/lib/data.ts`. To publish new polls, update data, rebuild, and redeploy.

## Data Model

**`PollResult`** (defined in `src/lib/data.ts`): Each poll entry has:
- `id` (unique), `agency` (CVoter, Axis My India, etc.), `channel` (news outlet), `publishedDate` (YYYY-MM-DD)
- `methodology` ("Exit Poll" or "Official Results")
- `seats`: `Record<string, number>` mapping party codes (DMK, AIADMK, etc.) to seat counts
- `voteShare`: `Record<string, number>` mapping party codes to vote share percentages
- Optional `sourceUrl` and `sampleSize`

**Alliances** aggregate parties: INDIA (DMK+INC+VCK), AIADMK+ (AIADMK+BJP+PMK), TVK (single party), Others.

**Election metadata**: Total seats = 234, majority = 118, voting April 23, results May 4, 2026.

## Deployment

Hosted on Vercel. To deploy:

```bash
npm run build
vercel deploy
```

**Environment variables** (set in Vercel dashboard):
- `NEXT_PUBLIC_SITE_URL`: Canonical URL for metadata (e.g., `https://tn-poll.in`)
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Measurement ID (injected via `@next/third-parties/google`)

**Google AdSense**: Client ID is hardcoded in `src/app/layout.tsx`. Update it before deploying to production.

## Common Editing Tasks

**Add a new poll manually**: Edit `src/lib/data.ts`, append to `POLL_RESULTS` array. Template:
```typescript
{
  id: "unique-id",
  agency: "Poll Agency Name",
  channel: "News Channel",
  publishedDate: "YYYY-MM-DD",
  methodology: "Exit Poll", // or "Official Results"
  seats: { DMK: 120, AIADMK: 80, ... },
  voteShare: { DMK: 45.5, AIADMK: 30.2, ... },
  sourceUrl: "https://..."
}
```

**Adjust chart colors**: Edit `color` field in `PARTIES` or `ALLIANCES` arrays in `src/lib/data.ts`. Changes auto-apply to all charts (SeatChart, VoteShareChart).

**Modify page layout**: Edit `src/app/page.tsx` or `src/app/exit-polls/page.tsx`. Components render independently so you can reorder/remove/adjust widths safely. All accept `POLL_RESULTS` and `ELECTION` as needed.

**Update election metadata**: Edit `ELECTION` object in `src/lib/data.ts`: `totalSeats`, `majorityMark`, `votingDate`, `resultDate`. Used by `MajorityMeter.tsx`, page title, and metadata tags.

**Change AdSense configuration**: Client ID is hardcoded in `src/app/layout.tsx` (`ca-pub-...`). Ad slot IDs are in each `AdBanner.tsx` call. Update before production deployment.

## File Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout: SEO, GA4, AdSense config
│   ├── page.tsx             # Home page: full dashboard
│   ├── exit-polls/
│   │   └── page.tsx         # Exit polls dedicated view
│   ├── actual-results/
│   │   └── page.tsx         # Placeholder for official results
│   ├── opengraph-image.tsx  # Dynamic OG preview image
│   ├── sitemap.ts           # SEO sitemap
│   └── robots.ts            # SEO robots.txt
├── components/
│   ├── Header.tsx           # Page header
│   ├── Footer.tsx           # Page footer
│   ├── MajorityMeter.tsx    # Alliance seat breakdown
│   ├── SeatChart.tsx        # Recharts bar: seats by agency
│   ├── VoteShareChart.tsx   # Recharts bar: vote % by agency
│   ├── PollTable.tsx        # All polls table
│   └── AdBanner.tsx         # AdSense banner slots
└── lib/
    └── data.ts              # Single source of truth: POLL_RESULTS, PARTIES, ALLIANCES, ELECTION
```

## Styling & Responsive Design

- Mobile-first Tailwind CSS v4 (no @tailwind directives needed)
- Grid/flex layouts: 1 column on mobile → 2–3 columns on desktop
- Ad banners: full width on mobile, constrained on desktop
- All containers max-width-bounded (6xl) for readability
- Color scheme: polls and alliances defined in `data.ts` and applied dynamically
