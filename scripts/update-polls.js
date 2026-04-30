#!/usr/bin/env node

/**
 * Update Tamil Nadu Exit Poll Data
 * Fetches latest exit poll news and updates the data file
 *
 * Usage:
 *   node scripts/update-polls.js               # Fetch from news APIs
 *   node scripts/update-polls.js --manual      # Manual entry mode
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// Party code mappings
const PARTY_CODES = {
  DMK: 'DMK',
  INC: 'INC',
  VCK: 'VCK',
  AIADMK: 'AIADMK',
  BJP: 'BJP',
  PMK: 'PMK',
  TVK: 'TVK',
  NTK: 'NTK',
  OTH: 'OTH',
};

/**
 * Fetch news articles about exit polls (using NewsAPI or manual entry)
 */
async function fetchNewsArticles() {
  // NewsAPI free tier - no API key needed for basic queries
  const query = 'Tamil Nadu exit polls 2026 election';
  const newsApiUrl = new URL('https://newsapi.org/v2/everything');
  newsApiUrl.searchParams.set('q', query);
  newsApiUrl.searchParams.set('sortBy', 'publishedAt');
  newsApiUrl.searchParams.set('language', 'en');

  console.log('📰 Searching for Tamil Nadu exit poll news...\n');

  return new Promise((resolve) => {
    https.get(newsApiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.articles || []);
        } catch {
          console.log('⚠️  NewsAPI call limited. Use --manual mode or add API key to script.\n');
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

/**
 * Manual entry mode - user provides poll data via CLI
 */
async function manualEntryMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise(resolve => rl.question(q, resolve));

  console.log('\n📝 Manual Exit Poll Entry Mode\n');
  console.log('Enter exit poll details (press Ctrl+C to cancel)\n');

  const polls = [];

  let addMore = true;
  while (addMore) {
    const pollData = {
      id: '',
      agency: '',
      channel: '',
      publishedDate: new Date().toISOString().split('T')[0],
      methodology: 'Exit Poll',
      seats: {},
      voteShare: {},
      sourceUrl: '',
    };

    pollData.id = await question(`Poll ID (e.g., agency-2026-04): `);
    pollData.agency = await question(`Polling Agency (e.g., Today's Chanakya): `);
    pollData.channel = await question(`News Channel (e.g., News18): `);
    pollData.sourceUrl = await question(`Source URL (optional): `);

    console.log('\nEnter seat predictions (press Enter to skip party):');
    for (const [party, code] of Object.entries(PARTY_CODES)) {
      const seats = await question(`  ${party} seats: `);
      if (seats) pollData.seats[code] = parseInt(seats);
    }

    console.log('\nEnter vote share percentages (press Enter to skip):');
    for (const [party, code] of Object.entries(PARTY_CODES)) {
      const vote = await question(`  ${party} vote share (%): `);
      if (vote) pollData.voteShare[code] = parseFloat(vote);
    }

    polls.push(pollData);

    const more = await question('\nAdd another poll? (y/n): ');
    addMore = more.toLowerCase() === 'y';
  }

  rl.close();
  return polls;
}

/**
 * Append new polls to the data.ts file
 */
function appendPolls(newPolls) {
  if (newPolls.length === 0) {
    console.log('❌ No polls to add.');
    return;
  }

  let content = fs.readFileSync(DATA_FILE, 'utf-8');

  // Generate new poll entries
  const pollEntries = newPolls.map(poll => `  {
    id: "${poll.id}",
    agency: "${poll.agency}",
    channel: "${poll.channel}",
    publishedDate: "${poll.publishedDate}",
    methodology: "${poll.methodology}",
    seats: { ${Object.entries(poll.seats).map(([k, v]) => `${k}: ${v}`).join(', ')} },
    voteShare: { ${Object.entries(poll.voteShare).map(([k, v]) => `${k}: ${v}`).join(', ')} },
    sourceUrl: "${poll.sourceUrl}",
  }`).join(',\n');

  // Find and update POLL_RESULTS array
  const pollResultsRegex = /export const POLL_RESULTS: PollResult\[\] = \[([\s\S]*?)\];/;
  content = content.replace(pollResultsRegex, (match) => {
    // Remove the closing ];, add new polls, close again
    return match.slice(0, -2) + `,\n${pollEntries}\n];`;
  });

  // Update LAST_UPDATED
  const now = new Date().toISOString();
  content = content.replace(
    /export const LAST_UPDATED = "[^"]*";/,
    `export const LAST_UPDATED = "${now}";`
  );

  fs.writeFileSync(DATA_FILE, content);
  console.log(`\n✅ Added ${newPolls.length} poll(s) to data.ts`);
  console.log(`✅ Updated LAST_UPDATED timestamp`);
}

/**
 * Display recent poll articles
 */
function displayArticles(articles) {
  if (articles.length === 0) {
    console.log('No articles found. Try manual entry mode.\n');
    return;
  }

  console.log(`📰 Found ${articles.length} article(s):\n`);
  articles.slice(0, 5).forEach((article, i) => {
    console.log(`${i + 1}. ${article.title}`);
    console.log(`   Source: ${article.source.name}`);
    console.log(`   URL: ${article.url}\n`);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const manualMode = args.includes('--manual');

  if (manualMode) {
    try {
      const polls = await manualEntryMode();
      appendPolls(polls);
    } catch (error) {
      if (error.code === 'ERR_USE_AFTER_CLOSE') {
        console.log('\n✅ Exit poll entry cancelled.');
      } else {
        console.error('Error:', error.message);
      }
    }
  } else {
    // Try fetching from news API
    const articles = await fetchNewsArticles();
    displayArticles(articles);

    console.log('💡 To manually add polls, run:');
    console.log('   node scripts/update-polls.js --manual\n');
  }
}

main();
