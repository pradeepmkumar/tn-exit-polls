import { PARTIES, POLL_RESULTS, getAverageSeats, getAverageVoteShare } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const INDIA_PARTIES  = ["DMK", "INC", "VCK"];
const AIADMK_PARTIES = ["AIADMK", "BJP", "PMK"];

export default function PollTable() {
  const avgSeats = getAverageSeats();
  const avgVote  = getAverageVoteShare();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800">Exit Polls vs Official Results — Seats</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Projected seats from exit polls (29 Apr) and official results from Election Commission of India (4 May) · Out of 234 seats
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <th className="text-left px-4 py-3 sticky left-0 bg-gray-50 min-w-[140px]">Agency</th>
              {PARTIES.map((p) => (
                <th key={p.shortName} className="text-center px-3 py-3 min-w-[55px]">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: p.color,
                      color: p.shortName === "TVK" || p.shortName === "PMK" ? "#333" : "#fff",
                    }}
                  >
                    {p.shortName}
                  </span>
                </th>
              ))}
              <th className="text-center px-3 py-3 min-w-[70px] text-red-600 font-bold">DMK+</th>
              <th className="text-center px-3 py-3 min-w-[70px] text-green-700 font-bold">AIADMK+</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {POLL_RESULTS.map((poll) => {
              const indiaSeat  = INDIA_PARTIES.reduce((s, p)  => s + (poll.seats[p] ?? 0), 0);
              const aiadmkSeat = AIADMK_PARTIES.reduce((s, p) => s + (poll.seats[p] ?? 0), 0);
              const isAxisOutlier = poll.id === "axis-2026-04";
              return (
                <tr
                  key={poll.id}
                  className={`hover:bg-gray-50 transition-colors ${isAxisOutlier ? "bg-orange-50 hover:bg-orange-50" : ""}`}
                >
                  <td className={`px-4 py-3 sticky left-0 ${isAxisOutlier ? "bg-orange-50" : "bg-white hover:bg-gray-50"}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-800">{poll.agency}</span>
                      {isAxisOutlier && (
                        <span className="text-xs bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-1.5 py-0.5 font-semibold">
                          Outlier
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      {poll.channel} ·{" "}
                      {new Date(poll.publishedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                      {poll.sourceUrl && poll.sourceUrl !== "#" && (
                        <a
                          href={poll.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>

                  {PARTIES.map((p) => (
                    <td
                      key={p.shortName}
                      className="text-center px-3 py-3 font-medium text-gray-700"
                    >
                      {poll.seats[p.shortName] ?? "–"}
                    </td>
                  ))}

                  <td className="text-center px-3 py-3">
                    <span className={`font-bold ${indiaSeat >= 118 ? "text-green-600" : "text-red-500"}`}>
                      {indiaSeat}
                    </span>
                  </td>
                  <td className="text-center px-3 py-3">
                    <span className="font-bold text-green-700">{aiadmkSeat}</span>
                  </td>
                </tr>
              );
            })}

            {/* Average row */}
            <tr className="bg-yellow-50 border-t-2 border-yellow-200">
              <td className="px-4 py-3 sticky left-0 bg-yellow-50">
                <div className="font-bold text-gray-800">Poll of Polls</div>
                <div className="text-xs text-gray-500">Average · {POLL_RESULTS.length} surveys</div>
              </td>
              {PARTIES.map((p) => (
                <td key={p.shortName} className="text-center px-3 py-3 font-bold text-gray-800">
                  {avgSeats[p.shortName]}
                </td>
              ))}
              <td className="text-center px-3 py-3">
                <span className="font-bold text-red-600">
                  {INDIA_PARTIES.reduce((s, p) => s + (avgSeats[p] ?? 0), 0)}
                </span>
              </td>
              <td className="text-center px-3 py-3">
                <span className="font-bold text-green-700">
                  {AIADMK_PARTIES.reduce((s, p) => s + (avgSeats[p] ?? 0), 0)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vote share footer */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
          Average Vote Share % (Poll of Polls)
        </h3>
        <div className="flex flex-wrap gap-4">
          {PARTIES.map((p) => (
            <div key={p.shortName} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-xs font-semibold text-gray-700">{p.shortName}</span>
              <span className="text-xs text-gray-500">{avgVote[p.shortName]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
