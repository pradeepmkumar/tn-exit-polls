import { fetchActualResults, aggregateResults } from "@/lib/fetchResults";
import { NextResponse } from "next/server";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export async function GET() {
  try {
    // Fetch from all sources
    const results = await fetchActualResults();

    // If no results yet, return empty
    if (results.length === 0) {
      return NextResponse.json({
        status: "no-data",
        message: "Counting results not yet available",
        results: [],
        aggregated: null,
      });
    }

    // Aggregate results across sources
    const aggregated = aggregateResults(results);

    return NextResponse.json({
      status: "partial", // "partial" or "complete"
      message: "Counting in progress",
      results,
      aggregated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results", details: String(error) },
      { status: 500 }
    );
  }
}
