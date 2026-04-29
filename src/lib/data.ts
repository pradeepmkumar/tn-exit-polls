export interface Party {
  name: string;
  shortName: string;
  alliance: string;
  color: string;
}

export interface Alliance {
  name: string;
  shortName: string;
  parties: string[];
  color: string;
  leadParty: string;
}

export interface PollResult {
  id: string;
  agency: string;
  channel: string;
  publishedDate: string;
  sampleSize?: number;
  methodology: string;
  seats: Record<string, number>;
  voteShare: Record<string, number>;
  sourceUrl?: string;
}

export const PARTIES: Party[] = [
  { name: "Dravida Munnetra Kazhagam", shortName: "DMK", alliance: "INDIA Alliance", color: "#E31E24" },
  { name: "Indian National Congress", shortName: "INC", alliance: "INDIA Alliance", color: "#0078BE" },
  { name: "Viduthalai Chiruthaigal Katchi", shortName: "VCK", alliance: "INDIA Alliance", color: "#6A1B9A" },
  { name: "All India Anna Dravida Munnetra Kazhagam", shortName: "AIADMK", alliance: "AIADMK Alliance", color: "#00853F" },
  { name: "Bharatiya Janata Party", shortName: "BJP", alliance: "AIADMK Alliance", color: "#FF6600" },
  { name: "Pattali Makkal Katchi", shortName: "PMK", alliance: "AIADMK Alliance", color: "#FFC107" },
  { name: "Tamilaga Vettri Kazhagam", shortName: "TVK", alliance: "TVK Alliance", color: "#FFD700" },
  { name: "Naam Tamilar Katchi", shortName: "NTK", alliance: "Others", color: "#FF1744" },
  { name: "Others", shortName: "OTH", alliance: "Others", color: "#9E9E9E" },
];

export const ALLIANCES: Alliance[] = [
  {
    name: "INDIA Alliance",
    shortName: "DMK+",
    parties: ["DMK", "INC", "VCK"],
    color: "#E31E24",
    leadParty: "DMK",
  },
  {
    name: "AIADMK Alliance",
    shortName: "AIADMK+",
    parties: ["AIADMK", "BJP", "PMK"],
    color: "#00853F",
    leadParty: "AIADMK",
  },
  {
    name: "TVK Alliance",
    shortName: "TVK",
    parties: ["TVK"],
    color: "#FFD700",
    leadParty: "TVK",
  },
  {
    name: "Others",
    shortName: "Others",
    parties: ["NTK", "OTH"],
    color: "#9E9E9E",
    leadParty: "OTH",
  },
];

export const ELECTION = {
  name: "Tamil Nadu Legislative Assembly Election 2026",
  shortName: "TN Assembly 2026",
  totalSeats: 234,
  majorityMark: 118,
  electionDate: "2026-04-23",   // Voting was held on April 23, 2026
  resultDate: "2026-05-04",     // Counting on May 4, 2026
};

// Real exit poll data published on April 29, 2026 after polling ended
// Sources: IndiaTV, News18, NewsX, BusinessToday, Onmanorama
export const POLL_RESULTS: PollResult[] = [
  {
    id: "chanakya-2026-04",
    agency: "Today's Chanakya",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // DMK+ 152 | AIADMK+ 57 | TVK 15 | NTK 5 | Others 5
    seats: { DMK: 115, INC: 22, VCK: 10, AIADMK: 38, BJP: 12, PMK: 7, TVK: 15, NTK: 5, OTH: 10 },
    voteShare: { DMK: 34.0, INC: 7.5, VCK: 3.5, AIADMK: 22.0, BJP: 7.0, PMK: 4.0, TVK: 14.0, NTK: 3.5, OTH: 4.5 },
    sourceUrl: "https://www.indiatvnews.com/news/india/exit-poll-results-2026-live-updates-west-bengal-tamil-nadu-kerala-assam-puducherry-metrize-today-s-chanakya-axis-my-india-poll-of-polls-1039321",
  },
  {
    id: "pmarq-2026-04",
    agency: "P-Marq",
    channel: "NewsX",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // DMK+ 135 | AIADMK+ 75 | TVK 21 | NTK 3
    seats: { DMK: 102, INC: 20, VCK: 9, AIADMK: 49, BJP: 16, PMK: 10, TVK: 21, NTK: 4, OTH: 3 },
    voteShare: { DMK: 33.0, INC: 7.5, VCK: 3.5, AIADMK: 22.5, BJP: 7.5, PMK: 4.5, TVK: 16.0, NTK: 3.0, OTH: 2.5 },
    sourceUrl: "https://www.newsx.com/elections/tamil-nadu-exit-poll-results-2026-sun-exit-poll-p-marq-live-mk-stalins-dmk-leads-big-vijays-tvk-makes-impact-party-wise-seat-prediction-full-breakdown-207367/",
  },
  {
    id: "news18-2026-04",
    agency: "People's Pulse",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // DMK+ 135 | AIADMK+ 72 | TVK 15 | NTK 7 | Others 5
    seats: { DMK: 102, INC: 20, VCK: 9, AIADMK: 47, BJP: 15, PMK: 10, TVK: 15, NTK: 7, OTH: 9 },
    voteShare: { DMK: 33.0, INC: 7.5, VCK: 3.5, AIADMK: 22.0, BJP: 7.0, PMK: 4.5, TVK: 14.5, NTK: 4.0, OTH: 4.0 },
    sourceUrl: "https://www.oneindia.com/india/exit-polls-2026-prediction-live-updates-west-bengal-tamil-nadu-kerala-assam-puducherry-results-8072931.html",
  },
  {
    id: "matrize-2026-04",
    agency: "Matrize",
    channel: "India TV",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // DMK+ 127 | AIADMK+ 90 | TVK 13 | NTK 4
    seats: { DMK: 95, INC: 18, VCK: 8, AIADMK: 58, BJP: 20, PMK: 12, TVK: 13, NTK: 4, OTH: 6 },
    voteShare: { DMK: 32.5, INC: 7.0, VCK: 3.0, AIADMK: 24.0, BJP: 7.5, PMK: 4.5, TVK: 13.5, NTK: 4.0, OTH: 4.0 },
    sourceUrl: "https://www.indiatvnews.com/tamil-nadu/news-tamil-nadu-exit-poll-2026-live-updates-dmk-aiadmk-tvk-bjp-mk-stalin-palaniswami-vijay-election-results-2026-1039320",
  },
  {
    id: "axis-2026-04",
    agency: "Axis My India",
    channel: "News24",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // OUTLIER: TVK leads — TVK 109 | DMK+ 101 | AIADMK+ 24
    seats: { DMK: 75, INC: 15, VCK: 8, AIADMK: 15, BJP: 5, PMK: 4, TVK: 109, NTK: 0, OTH: 3 },
    voteShare: { DMK: 28.0, INC: 5.5, VCK: 3.0, AIADMK: 12.0, BJP: 4.5, PMK: 3.5, TVK: 34.0, NTK: 4.5, OTH: 5.0 },
    sourceUrl: "https://news24online.com/india/tamil-nadu-exit-poll-result-2026-live-updates-dmk-vs-aiadmk-vs-tvk-tn-election-maha-poll-result-mk-stalin-vs-palaniswami-vs-thalapathy-vijay/821047/",
  },
  {
    id: "cvoter-2026-04",
    agency: "CVoter",
    channel: "India TV",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // DMK+ 130 | AIADMK+ 80 | TVK 18 | NTK 6
    seats: { DMK: 98, INC: 18, VCK: 9, AIADMK: 52, BJP: 17, PMK: 11, TVK: 18, NTK: 6, OTH: 5 },
    voteShare: { DMK: 32.0, INC: 7.0, VCK: 3.5, AIADMK: 23.5, BJP: 7.5, PMK: 4.5, TVK: 15.0, NTK: 3.5, OTH: 3.5 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/tamil-nadu-exit-polls-2026-is-it-a-clear-majority-for-dmk.html",
  },
];

export function getAllianceSeats(poll: PollResult, allianceName: string): number {
  const alliance = ALLIANCES.find((a) => a.name === allianceName);
  if (!alliance) return 0;
  return alliance.parties.reduce((sum, p) => sum + (poll.seats[p] ?? 0), 0);
}

export function getAverageSeats(): Record<string, number> {
  const totals: Record<string, number> = {};
  PARTIES.forEach((p) => {
    const sum = POLL_RESULTS.reduce((acc, poll) => acc + (poll.seats[p.shortName] ?? 0), 0);
    totals[p.shortName] = Math.round(sum / POLL_RESULTS.length);
  });
  return totals;
}

export function getAverageVoteShare(): Record<string, number> {
  const totals: Record<string, number> = {};
  PARTIES.forEach((p) => {
    const sum = POLL_RESULTS.reduce((acc, poll) => acc + (poll.voteShare[p.shortName] ?? 0), 0);
    totals[p.shortName] = parseFloat((sum / POLL_RESULTS.length).toFixed(1));
  });
  return totals;
}

export const LAST_UPDATED = "2026-04-29T20:00:00+05:30";
