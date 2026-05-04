"use client";

import { ELECTION, LAST_UPDATED } from "@/lib/data";
import { Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const updated = new Date(LAST_UPDATED).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isResultsPage = pathname === "/results";

  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-red-200 mb-0.5">
              Exit Poll Tracker
            </div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {ELECTION.shortName}
            </h1>
            <p className="text-sm text-red-100 mt-0.5">
              {ELECTION.totalSeats} seats · Majority: {ELECTION.majorityMark} seats
            </p>
          </Link>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-1.5 text-xs text-red-100 bg-red-800/40 rounded-full px-3 py-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated: {updated} IST</span>
            </div>

            <nav className="flex gap-2">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  !isResultsPage
                    ? "bg-red-800/60 text-white"
                    : "text-red-100 hover:bg-red-800/40"
                }`}
              >
                Exit Polls
              </Link>
              <Link
                href="/results"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  isResultsPage
                    ? "bg-red-800/60 text-white"
                    : "text-red-100 hover:bg-red-800/40"
                }`}
              >
                Live Results
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
