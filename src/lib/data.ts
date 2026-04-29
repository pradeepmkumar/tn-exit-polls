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
  { name: "Others", shortName: "OTH", alliance: "Others", color: "#9E9E9E" },
];

export const ALLIANCES: Alliance[] = [
  {
    name: "INDIA Alliance",
    shortName: "INDIA",
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
    name: "Others",
    shortName: "Others",
    parties: ["OTH"],
    color: "#9E9E9E",
    leadParty: "OTH",
  },
];

export const ELECTION = {
  name: "Tamil Nadu Legislative Assembly Election 2026",
  shortName: "TN Assembly 2026",
  totalSeats: 234,
  majorityMark: 118,
  electionDate: "2026-05-15",
  resultDate: "2026-05-19",
};

export const POLL_RESULTS: PollResult[] = [
  {
    id: "cvoter-2026-04",
    agency: "CVoter",
    channel: "India TV",
    publishedDate: "2026-04-20",
    sampleSize: 15000,
    methodology: "Exit Poll",
    seats: { DMK: 118, INC: 22, VCK: 8, AIADMK: 52, BJP: 12, PMK: 8, OTH: 14 },
    voteShare: { DMK: 32.5, INC: 8.2, VCK: 3.1, AIADMK: 28.4, BJP: 7.6, PMK: 4.2, OTH: 16.0 },
    sourceUrl: "#",
  },
  {
    id: "axis-2026-04",
    agency: "Axis My India",
    channel: "News18",
    publishedDate: "2026-04-21",
    sampleSize: 18000,
    methodology: "Exit Poll",
    seats: { DMK: 122, INC: 20, VCK: 9, AIADMK: 48, BJP: 14, PMK: 7, OTH: 14 },
    voteShare: { DMK: 33.1, INC: 7.8, VCK: 3.4, AIADMK: 27.2, BJP: 8.1, PMK: 3.8, OTH: 16.6 },
    sourceUrl: "#",
  },
  {
    id: "chanakya-2026-04",
    agency: "Today's Chanakya",
    channel: "Republic TV",
    publishedDate: "2026-04-21",
    sampleSize: 12000,
    methodology: "Exit Poll",
    seats: { DMK: 128, INC: 18, VCK: 7, AIADMK: 46, BJP: 16, PMK: 6, OTH: 13 },
    voteShare: { DMK: 34.2, INC: 7.1, VCK: 2.9, AIADMK: 26.8, BJP: 8.9, PMK: 3.5, OTH: 16.6 },
    sourceUrl: "#",
  },
  {
    id: "jan-ki-baat-2026-04",
    agency: "Jan Ki Baat",
    channel: "ABP News",
    publishedDate: "2026-04-22",
    sampleSize: 10000,
    methodology: "Exit Poll",
    seats: { DMK: 115, INC: 24, VCK: 10, AIADMK: 54, BJP: 10, PMK: 9, OTH: 12 },
    voteShare: { DMK: 31.8, INC: 8.6, VCK: 3.6, AIADMK: 29.1, BJP: 6.8, PMK: 4.5, OTH: 15.6 },
    sourceUrl: "#",
  },
  {
    id: "matrize-2026-04",
    agency: "Matrize",
    channel: "News24",
    publishedDate: "2026-04-22",
    sampleSize: 9000,
    methodology: "Exit Poll",
    seats: { DMK: 120, INC: 21, VCK: 8, AIADMK: 50, BJP: 13, PMK: 8, OTH: 14 },
    voteShare: { DMK: 32.9, INC: 8.0, VCK: 3.2, AIADMK: 27.8, BJP: 7.4, PMK: 4.1, OTH: 16.6 },
    sourceUrl: "#",
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

export const LAST_UPDATED = "2026-04-29T10:00:00+05:30";
