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

// Alliance-level exit poll data published April 29-30, 2026 after polling ended
// Individual party breakdowns not available from sources - showing verified alliance totals only
// Sources: The Week, NewsX, India TV, and major news agencies
export const POLL_RESULTS: PollResult[] = [
  {
    id: "axis-2026-04",
    agency: "Axis My India",
    channel: "India Today",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 101 | AIADMK+ 24 | TVK 109 | Others 0
    seats: { DMK: 101, INC: 0, VCK: 0, AIADMK: 24, BJP: 0, PMK: 0, TVK: 109, NTK: 0, OTH: 0 },
    voteShare: { DMK: 35.0, INC: 0, VCK: 0, AIADMK: 23.0, BJP: 0, PMK: 0, TVK: 35.0, NTK: 0, OTH: 7.0 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/vijays-tvk-to-beat-dmk-and-aiadmk-in-tamil-nadu-exit-poll-predicts-98-120-seats-for-the-party.html",
  },
  {
    id: "matrize-2026-04",
    agency: "Matrize",
    channel: "India TV",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 127 (122-132) | AIADMK+ 93 (87-100) | TVK 11 (10-12) | Others 3
    seats: { DMK: 127, INC: 0, VCK: 0, AIADMK: 93, BJP: 0, PMK: 0, TVK: 11, NTK: 0, OTH: 3 },
    voteShare: { DMK: 40.3, INC: 0, VCK: 0, AIADMK: 37.1, BJP: 0, PMK: 0, TVK: 17.5, NTK: 0, OTH: 5.1 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/tamil-nadu-exit-polls-2026-is-it-a-clear-majority-for-dmk.html",
  },
  {
    id: "pmarq-2026-04",
    agency: "P-MARQ",
    channel: "NewsX",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 135 (125-145) | AIADMK+ 75 (65-85) | TVK 21 (16-26) | Others 3
    seats: { DMK: 135, INC: 0, VCK: 0, AIADMK: 75, BJP: 0, PMK: 0, TVK: 21, NTK: 0, OTH: 3 },
    voteShare: { DMK: 36.0, INC: 0, VCK: 0, AIADMK: 31.0, BJP: 0, PMK: 0, TVK: 23.0, NTK: 0, OTH: 10.0 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/tamil-nadu-exit-polls-2026-is-it-a-clear-majority-for-dmk.html",
  },
  {
    id: "ppl-2026-04",
    agency: "Peoples Pulse",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 135 (125-145) | AIADMK+ 73 (65-80) | TVK 21 (18-24) | Others 5
    seats: { DMK: 135, INC: 0, VCK: 0, AIADMK: 73, BJP: 0, PMK: 0, TVK: 21, NTK: 0, OTH: 5 },
    voteShare: { DMK: 38.4, INC: 0, VCK: 0, AIADMK: 31.5, BJP: 0, PMK: 0, TVK: 23.6, NTK: 0, OTH: 6.5 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/tamil-nadu-exit-polls-2026-is-it-a-clear-majority-for-dmk.html",
  },
  {
    id: "chanakya-2026-04",
    agency: "Chanakya Strategies",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 153 (145-160) | AIADMK+ 58 (50-65) | TVK 0 | Others 23 (18-26)
    seats: { DMK: 153, INC: 0, VCK: 0, AIADMK: 58, BJP: 0, PMK: 0, TVK: 0, NTK: 0, OTH: 23 },
    voteShare: { DMK: 44.5, INC: 0, VCK: 0, AIADMK: 19.0, BJP: 0, PMK: 0, TVK: 10.0, NTK: 0, OTH: 26.5 },
    sourceUrl: "https://www.theweek.in/news/india/2026/04/29/tamil-nadu-exit-polls-2026-is-it-a-clear-majority-for-dmk.html",
  },
  {
    id: "sun-2026-04",
    agency: "Sun Exit Poll",
    channel: "Sun TV",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    // Alliance totals: DMK+ 169 | AIADMK+ 64 | TVK 0 | Others 1
    seats: { DMK: 169, INC: 0, VCK: 0, AIADMK: 64, BJP: 0, PMK: 0, TVK: 0, NTK: 0, OTH: 1 },
    voteShare: { DMK: 45.0, INC: 0, VCK: 0, AIADMK: 20.0, BJP: 0, PMK: 0, TVK: 12.0, NTK: 0, OTH: 23.0 },
    sourceUrl: "https://www.newsx.com/elections/tamil-nadu-exit-poll-results-2026-sun-exit-poll-p-marq-live-mk-stalins-dmk-leads-big-vijays-tvk-makes-impact-party-wise-seat-prediction-full-breakdown-207367/",
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

export const LAST_UPDATED = "2026-05-02T12:47:37.208Z";
