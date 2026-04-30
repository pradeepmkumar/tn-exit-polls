# Exit Poll Data Update Scripts

## Overview

Scripts to fetch and update Tamil Nadu exit poll data without requiring API credentials.

## Available Scripts

### 1. Manual Poll Entry (`update-polls.js --manual`)

Interactive CLI to manually enter exit poll data from news sources.

**Usage:**
```bash
node scripts/update-polls.js --manual
```

**Features:**
- Prompts for poll agency, channel, and source URL
- Enter seat predictions for each party
- Enter vote share percentages
- Add multiple polls in one session
- Automatically appends to `src/lib/data.ts`

**Example:**
```
Poll ID: news18-2026-04-30
Polling Agency: People's Pulse
News Channel: News18
Source URL: https://www.news18.com/...

Enter seat predictions:
  DMK seats: 102
  INC seats: 20
  VCK seats: 9
  ...
```

### 2. News API Fetch (`update-polls.js`)

Fetches Tamil Nadu election news articles (no API key required).

**Usage:**
```bash
node scripts/update-polls.js
```

**Features:**
- Searches NewsAPI for recent Tamil Nadu exit poll articles
- Displays article titles, sources, and URLs
- Helps you find sources for manual entry

## Step-by-Step: Updating with Live Data

### Option A: Manual Entry (Recommended)

1. **Visit news websites** for latest exit polls:
   - India Today / India TV
   - News18
   - NewsX
   - The Week
   - Business Today

2. **Run the update script:**
   ```bash
   node scripts/update-polls.js --manual
   ```

3. **Enter poll details** as prompted:
   - Polling agency name
   - News channel
   - Seat predictions per party
   - Vote share percentages

4. **Verify the update:**
   ```bash
   npm run dev
   # Visit http://localhost:3000 to see updated polls
   ```

### Option B: Semi-Automatic (Using NewsAPI)

1. **Run the script** to find recent articles:
   ```bash
   node scripts/update-polls.js
   ```

2. **Click the article URLs** to view full exit poll details

3. **Use Option A** (manual entry) to add the data

## Data Format

Each poll requires:

```javascript
{
  id: "unique-id",                        // e.g., "news18-2026-04-30"
  agency: "Polling Agency Name",          // e.g., "People's Pulse"
  channel: "News Channel",                // e.g., "News18"
  publishedDate: "YYYY-MM-DD",           // e.g., "2026-04-30"
  methodology: "Exit Poll",               // or "Opinion Poll"
  seats: {
    DMK: 102,
    INC: 20,
    VCK: 9,
    AIADMK: 47,
    BJP: 15,
    PMK: 10,
    TVK: 15,
    NTK: 7,
    OTH: 9
  },
  voteShare: {
    DMK: 33.0,
    INC: 7.5,
    VCK: 3.5,
    AIADMK: 22.0,
    BJP: 7.0,
    PMK: 4.5,
    TVK: 14.5,
    NTK: 4.0,
    OTH: 4.0
  },
  sourceUrl: "https://..."               // News article link
}
```

## Party Codes

```
DMK   - Dravida Munnetra Kazhagam
INC   - Indian National Congress
VCK   - Viduthalai Chiruthaigal Katchi
AIADMK - All India Anna Dravida Munnetra Kazhagam
BJP   - Bharatiya Janata Party
PMK   - Pattali Makkal Katchi
TVK   - Tamilaga Vettri Kazhagam
NTK   - Naam Tamilar Katchi
OTH   - Others
```

## Troubleshooting

**Q: "Cannot find module" error?**
- All scripts use Node.js built-ins. Run from repo root: `node scripts/update-polls.js --manual`

**Q: Data not showing on website?**
- Run `npm run dev` to rebuild
- Clear browser cache (Ctrl+Shift+Delete)
- Check that seats add up to 234 (total TN assembly seats)

**Q: Want to remove a poll?**
- Edit `src/lib/data.ts` and remove the poll object from `POLL_RESULTS` array

## Real-Time Election Results (May 4, 2026)

Once official results are announced on counting day:

1. Visit Election Commission of India website (eci.gov.in)
2. Extract constituency-wise results
3. Aggregate to party totals
4. Add as new poll with `methodology: "Official Results"`

Example:
```
id: "eci-official-2026-05-04"
agency: "Election Commission of India"
publishedDate: "2026-05-04"
methodology: "Official Results"
```

## Automation (Optional)

To periodically fetch updates, you can:

1. **Use GitHub Actions** (if repo is on GitHub):
   ```yaml
   - name: Update exit polls
     run: node scripts/update-polls.js --manual
   ```

2. **Use cron job** (Linux/Mac):
   ```bash
   # Edit crontab: crontab -e
   0 */4 * * * cd /path/to/repo && node scripts/update-polls.js
   ```

3. **Use Windows Task Scheduler** for Windows systems
