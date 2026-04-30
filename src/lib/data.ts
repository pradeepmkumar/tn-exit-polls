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

// Fresh exit poll data published April 29-30, 2026 after polling ended
// Sources: Business Today, Zee News, Republic World, and major news agencies
export const POLL_RESULTS: PollResult[] = [
  {
    id: "axis-2026-04",
    agency: "Axis My India",
    channel: "India Today",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 75, INC: 15, VCK: 8, AIADMK: 15, BJP: 5, PMK: 4, TVK: 109, NTK: 0, OTH: 3 },
    voteShare: { DMK: 28.0, INC: 5.5, VCK: 3.0, AIADMK: 12.0, BJP: 4.5, PMK: 3.5, TVK: 35.0, NTK: 4.5, OTH: 3.5 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "votevibe-2026-04",
    agency: "Vote Vibe",
    channel: "Independent",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 80, INC: 17, VCK: 8, AIADMK: 78, BJP: 24, PMK: 17, TVK: 7, NTK: 2, OTH: 1 },
    voteShare: { DMK: 31.5, INC: 6.5, VCK: 3.0, AIADMK: 26.0, BJP: 8.5, PMK: 6.0, TVK: 10.0, NTK: 3.0, OTH: 5.5 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "chanakya-2026-04",
    agency: "Chanakya Strategies",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 115, INC: 22, VCK: 10, AIADMK: 38, BJP: 12, PMK: 8, TVK: 0, NTK: 8, OTH: 16 },
    voteShare: { DMK: 44.5, INC: 8.0, VCK: 3.5, AIADMK: 19.0, BJP: 5.0, PMK: 3.0, TVK: 10.0, NTK: 4.0, OTH: 3.0 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "matrize-2026-04",
    agency: "Matrize",
    channel: "India TV",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 95, INC: 18, VCK: 9, AIADMK: 64, BJP: 21, PMK: 14, TVK: 11, NTK: 4, OTH: 4 },
    voteShare: { DMK: 40.3, INC: 7.0, VCK: 3.0, AIADMK: 37.1, BJP: 7.5, PMK: 5.0, TVK: 17.5, NTK: 4.0, OTH: -0.4 },
    sourceUrl: "https://www.indiatvnews.com/tamil-nadu/news-tamil-nadu-exit-poll-2026-live-updates-dmk-aiadmk-tvk-bjp-mk-stalin-palaniswami-vijay-election-results-2026-1039320",
  },
  {
    id: "jvc-2026-04",
    agency: "Times Now-JVC",
    channel: "Times Now",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 63, INC: 13, VCK: 8, AIADMK: 90, BJP: 29, PMK: 19, TVK: 9, NTK: 2, OTH: 1 },
    voteShare: { DMK: 30.0, INC: 5.5, VCK: 3.0, AIADMK: 28.0, BJP: 9.5, PMK: 5.5, TVK: 12.0, NTK: 2.5, OTH: 4.0 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "ppl-2026-04",
    agency: "Peoples Pulse",
    channel: "News18",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 102, INC: 20, VCK: 9, AIADMK: 48, BJP: 15, PMK: 10, TVK: 21, NTK: 5, OTH: 4 },
    voteShare: { DMK: 38.4, INC: 7.5, VCK: 3.5, AIADMK: 31.5, BJP: 7.0, PMK: 4.5, TVK: 23.6, NTK: 3.0, OTH: 1.4 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "pmarq-2026-04",
    agency: "P-MARQ",
    channel: "NewsX",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 102, INC: 20, VCK: 9, AIADMK: 49, BJP: 16, PMK: 10, TVK: 21, NTK: 3, OTH: 4 },
    voteShare: { DMK: 36.0, INC: 7.5, VCK: 3.5, AIADMK: 31.0, BJP: 7.5, PMK: 4.5, TVK: 23.0, NTK: 3.0, OTH: 4.0 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
  },
  {
    id: "pinsight-2026-04",
    agency: "Peoples Insight",
    channel: "Independent",
    publishedDate: "2026-04-29",
    methodology: "Exit Poll",
    seats: { DMK: 98, INC: 19, VCK: 9, AIADMK: 43, BJP: 13, PMK: 9, TVK: 35, NTK: 5, OTH: 4 },
    voteShare: { DMK: 37.0, INC: 7.0, VCK: 3.5, AIADMK: 26.0, BJP: 6.0, PMK: 4.0, TVK: 27.0, NTK: 3.5, OTH: 6.0 },
    sourceUrl: "https://www.businesstoday.in/elections/tamil-nadu/story/tamil-nadu-election-exit-poll-result-2026-tvk-thalapathy-vijay-dmk-mk-stalin-nda-bjp-aiadmk-527800-2026-04-29",
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

export const LAST_UPDATED = "2026-04-30T18:45:00+05:30";
