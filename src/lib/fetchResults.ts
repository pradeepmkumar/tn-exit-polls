import { ActualResult } from "./data";

/**
 * Fetch actual election results from multiple sources (ECI + news channels)
 * Aggregates results from official ECI and news channel reports
 */
export async function fetchActualResults(): Promise<ActualResult[]> {
  const results: ActualResult[] = [];

  try {
    // Fetch from ECI official source
    const eciResult = await fetchFromECI();
    if (eciResult) results.push(eciResult);
  } catch (error) {
    console.error("Error fetching from ECI:", error);
  }

  try {
    // Fetch from news channels
    const newsResults = await fetchFromNewsChannels();
    results.push(...newsResults);
  } catch (error) {
    console.error("Error fetching from news channels:", error);
  }

  return results;
}

/**
 * Fetch results from Election Commission of India (ECI)
 * ECI updates results at eci.gov.in/results2026
 */
async function fetchFromECI(): Promise<ActualResult | null> {
  try {
    // ECI results endpoint for TN 2026
    const response = await fetch("https://eci.gov.in/results2026/tamil-nadu", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) throw new Error(`ECI API error: ${response.status}`);

    const html = await response.text();
    const results = parseECIResults(html);

    if (results) {
      return {
        id: "eci-actual",
        source: "ECI Official",
        lastUpdated: new Date().toISOString(),
        seats: results.seats,
        voteShare: results.voteShare,
        statusMessage: results.statusMessage,
        sourceUrl: "https://eci.gov.in/results2026/tamil-nadu",
      };
    }
  } catch (error) {
    console.error("Error fetching ECI results:", error);
  }

  return null;
}

/**
 * Fetch results from major news channels
 */
async function fetchFromNewsChannels(): Promise<ActualResult[]> {
  const newsResults: ActualResult[] = [];
  const sources = [
    {
      name: "India Today",
      url: "https://www.indiatoday.in/elections/tamil-nadu-2026-results",
    },
    {
      name: "India TV",
      url: "https://www.indiatv.in/elections/tamil-nadu-results-2026",
    },
    {
      name: "News18",
      url: "https://www.news18.com/elections/tamil-nadu-2026-results/",
    },
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 120 }, // Revalidate every 2 minutes
      });

      if (!response.ok) continue;

      const html = await response.text();
      const results = parseNewsResults(html, source.name);

      if (results) {
        newsResults.push({
          id: `news-${source.name.toLowerCase().replace(/\s+/g, "-")}`,
          source: source.name,
          lastUpdated: new Date().toISOString(),
          seats: results.seats,
          voteShare: results.voteShare,
          statusMessage: results.statusMessage,
          sourceUrl: source.url,
        });
      }
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
    }
  }

  return newsResults;
}

/**
 * Parse ECI HTML response and extract seat/vote share data
 * This is a placeholder - actual parsing depends on ECI page structure
 */
function parseECIResults(
  html: string
): { seats: Record<string, number>; voteShare: Record<string, number>; statusMessage: string } | null {
  try {
    // Placeholder parsing logic
    // In production, use cheerio or similar to parse HTML tables
    // Extract seat counts and vote share from tables

    // Example structure (to be updated based on actual ECI page):
    // Look for tables with party names and seat counts
    // Extract data based on ECI page structure

    if (!html.includes("Tamil Nadu")) return null;

    // For now, return null to indicate need for actual implementation
    // This will be implemented once ECI results page structure is confirmed
    return null;
  } catch (error) {
    console.error("Error parsing ECI results:", error);
    return null;
  }
}

/**
 * Parse news channel HTML and extract results
 */
function parseNewsResults(
  html: string,
  source: string
): { seats: Record<string, number>; voteShare: Record<string, number>; statusMessage: string } | null {
  try {
    // Placeholder parsing logic
    // Different news sites have different structures
    // Use regex or HTML parser (cheerio) to extract:
    // - Party names and seat counts
    // - Vote share percentages
    // - Status of counting

    // For now, return null to indicate need for actual implementation
    return null;
  } catch (error) {
    console.error(`Error parsing ${source} results:`, error);
    return null;
  }
}

/**
 * Aggregate results from multiple sources
 * Returns averaged/consensus data across sources
 */
export function aggregateResults(results: ActualResult[]): ActualResult | null {
  if (results.length === 0) return null;

  const partySeats: Record<string, number[]> = {};
  const partyVotes: Record<string, number[]> = {};

  // Collect data from all sources
  results.forEach((result) => {
    Object.entries(result.seats).forEach(([party, seats]) => {
      if (!partySeats[party]) partySeats[party] = [];
      partySeats[party].push(seats);
    });

    Object.entries(result.voteShare).forEach(([party, vote]) => {
      if (!partyVotes[party]) partyVotes[party] = [];
      partyVotes[party].push(vote);
    });
  });

  // Calculate averages
  const aggregatedSeats: Record<string, number> = {};
  const aggregatedVotes: Record<string, number> = {};

  Object.entries(partySeats).forEach(([party, seats]) => {
    aggregatedSeats[party] = Math.round(
      seats.reduce((a, b) => a + b, 0) / seats.length
    );
  });

  Object.entries(partyVotes).forEach(([party, votes]) => {
    aggregatedVotes[party] = parseFloat(
      ((votes.reduce((a, b) => a + b, 0) / votes.length).toFixed(1))
    );
  });

  return {
    id: "aggregated",
    source: `Aggregated (${results.length} sources)`,
    lastUpdated: new Date().toISOString(),
    seats: aggregatedSeats,
    voteShare: aggregatedVotes,
    statusMessage: "Aggregated from multiple sources",
  };
}
