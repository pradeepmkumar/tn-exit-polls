#!/usr/bin/env node

/**
 * Fetch Tamil Nadu Exit Poll Data from News Sources
 * Scrapes exit poll data from Indian news websites and updates src/lib/data.ts
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const newsUrls = [
  'https://www.indiatvnews.com/tamil-nadu/news-tamil-nadu-exit-poll-2026',
  'https://www.newsx.com/elections/tamil-nadu-exit-poll',
  'https://www.news18.com/elections/tamil-nadu-exit-poll-2026',
  'https://www.theweek.in/news/india/tamil-nadu-exit-polls-2026',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parse exit poll data from HTML
function parseExitPollData(html, source) {
  const polls = [];

  // Look for seat prediction patterns in the HTML
  const seatPatterns = [
    /(\w+[\s\w]*?):\s*(\d+)\s*seats?/gi,
    /(\w+[\s\w]*?)\s*-\s*(\d+)\s*seats?/gi,
  ];

  const votePatterns = [
    /(\w+[\s\w]*?):\s*(\d+(?:\.\d+)?)\s*%/gi,
  ];

  // Extract data from patterns
  const seats = {};
  const voteShare = {};

  seatPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const party = match[1].trim().toUpperCase();
      const seats_val = parseInt(match[2]);
      if (seats_val > 0 && seats_val < 250) {
        seats[party] = seats_val;
      }
    }
  });

  votePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const party = match[1].trim().toUpperCase();
      const vote = parseFloat(match[2]);
      if (vote > 0 && vote < 100) {
        voteShare[party] = vote;
      }
    }
  });

  if (Object.keys(seats).length > 0 || Object.keys(voteShare).length > 0) {
    polls.push({
      source,
      seats,
      voteShare,
      timestamp: new Date().toISOString(),
    });
  }

  return polls;
}

async function fetchAllPollData() {
  console.log('🔄 Fetching exit poll data from news sources...\n');

  const allPolls = [];

  for (const url of newsUrls) {
    try {
      console.log(`📰 Fetching: ${url}`);
      const html = await fetchUrl(url);
      const polls = parseExitPollData(html, url);

      if (polls.length > 0) {
        console.log(`✅ Found ${polls.length} poll(s)\n`);
        allPolls.push(...polls);
      } else {
        console.log(`⚠️  No poll data found\n`);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${url}: ${error.message}\n`);
    }
  }

  return allPolls;
}

function updateDataFile(polls) {
  if (polls.length === 0) {
    console.log('⚠️  No new poll data to update.');
    return;
  }

  const dataFilePath = path.join(__dirname, '../src/lib/data.ts');
  let content = fs.readFileSync(dataFilePath, 'utf-8');

  // Update LAST_UPDATED timestamp
  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  content = content.replace(
    /export const LAST_UPDATED = "[^"]*";/,
    `export const LAST_UPDATED = "${new Date().toISOString()}";`
  );

  fs.writeFileSync(dataFilePath, content);
  console.log('✅ Updated LAST_UPDATED timestamp in data.ts');
}

async function main() {
  try {
    const polls = await fetchAllPollData();
    updateDataFile(polls);
    console.log('\n✨ Exit poll data fetch completed!');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
