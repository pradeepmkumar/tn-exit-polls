"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import MajorityMeter from "@/components/MajorityMeter";
import SeatChart from "@/components/SeatChart";
import VoteShareChart from "@/components/VoteShareChart";
import { ActualResult, ALLIANCES, PARTIES, ELECTION } from "@/lib/data";
import { Info, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState<ActualResult[]>([]);
  const [aggregated, setAggregated] = useState<ActualResult | null>(null);
  const [status, setStatus] = useState<
    "no-data" | "partial" | "complete" | "error"
  >("no-data");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/results");
      const data = await response.json();

      setStatus(data.status);
      setResults(data.results || []);
      setAggregated(data.aggregated);
      setLastUpdated(data.timestamp || new Date().toISOString());
    } catch (error) {
      console.error("Error fetching results:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchResults();
  }, []);

  // Auto-refresh every 30 seconds when counting is ongoing
  useEffect(() => {
    if (!autoRefresh || status === "complete") return;

    const interval = setInterval(() => {
      fetchResults();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, status]);

  const getStatusIcon = () => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "partial":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "complete":
        return "Counting Complete";
      case "partial":
        return "Counting in Progress";
      case "error":
        return "Error Fetching Results";
      default:
        return "Results Not Yet Available";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Top ad */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <AdBanner slot="1111111111" format="horizontal" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Status banner */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <div className="font-semibold text-blue-900">
                {getStatusMessage()}
              </div>
              <div className="text-xs text-blue-700 mt-0.5">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()} IST
              </div>
            </div>
          </div>
          <button
            onClick={fetchResults}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Fetching..." : "Refresh"}
          </button>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Actual results are being fetched from ECI (Election Commission of
            India) and major news channels. Data updates every 30 seconds during
            counting. Results shown are aggregated from multiple authoritative
            sources.
          </span>
        </div>

        {/* No data state */}
        {status === "no-data" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-gray-500 mb-4">
              <RefreshCw className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Counting Not Started Yet
            </h2>
            <p className="text-sm text-gray-600">
              Results will appear here once counting begins. Check back shortly.
            </p>
          </div>
        )}

        {/* Aggregated results display */}
        {aggregated && (
          <>
            {/* Majority meter with actual results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Current Status
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ALLIANCES.map((alliance) => {
                  const totalSeats = alliance.parties.reduce(
                    (sum, p) => sum + (aggregated.seats[p] ?? 0),
                    0
                  );
                  const isLeading = totalSeats >= ELECTION.majorityMark;

                  return (
                    <div
                      key={alliance.shortName}
                      className="p-3 rounded-lg border border-gray-200"
                      style={{ backgroundColor: alliance.color + "15" }}
                    >
                      <div className="text-xs font-semibold text-gray-600">
                        {alliance.shortName}
                      </div>
                      <div
                        className="text-2xl font-bold mt-1"
                        style={{ color: alliance.color }}
                      >
                        {totalSeats}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {isLeading
                          ? "✓ Leading"
                          : `${ELECTION.majorityMark - totalSeats} needed`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mid-page ad */}
            <AdBanner slot="2222222222" format="horizontal" />

            {/* Individual party breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Party-wise Results
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PARTIES.map((party) => (
                  <div
                    key={party.shortName}
                    className="p-3 rounded-lg border border-gray-200"
                  >
                    <div className="text-xs font-semibold text-gray-600">
                      {party.shortName}
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <div
                        className="text-xl font-bold"
                        style={{ color: party.color }}
                      >
                        {aggregated.seats[party.shortName] ?? 0}
                      </div>
                      <div className="text-xs text-gray-500">
                        {aggregated.voteShare[party.shortName] ?? 0}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source breakdown */}
            {results.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-base font-bold text-gray-800 mb-4">
                  Source Data
                </h2>
                <div className="space-y-3">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-sm text-gray-800">
                            {result.source}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Updated:{" "}
                            {new Date(result.lastUpdated).toLocaleTimeString()}{" "}
                            IST
                          </div>
                          {result.statusMessage && (
                            <div className="text-xs text-gray-600 mt-1">
                              {result.statusMessage}
                            </div>
                          )}
                        </div>
                        {result.sourceUrl && (
                          <a
                            href={result.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Error Fetching Results
            </h2>
            <p className="text-sm text-red-700 mb-4">
              Failed to retrieve results. Please try again in a moment.
            </p>
            <button
              onClick={fetchResults}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Bottom ad */}
        <AdBanner slot="3333333333" format="rectangle" />
      </main>

      <Footer />
    </div>
  );
}
