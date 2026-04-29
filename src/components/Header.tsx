import { ELECTION, LAST_UPDATED } from "@/lib/data";
import { Clock } from "lucide-react";

export default function Header() {
  const updated = new Date(LAST_UPDATED).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-red-200 mb-0.5">
              Exit Poll Tracker
            </div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {ELECTION.shortName}
            </h1>
            <p className="text-sm text-red-100 mt-0.5">
              {ELECTION.totalSeats} seats · Majority: {ELECTION.majorityMark} seats
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-red-100 bg-red-800/40 rounded-full px-3 py-1.5 self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated: {updated} IST</span>
          </div>
        </div>
      </div>
    </header>
  );
}
