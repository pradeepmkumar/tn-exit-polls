import { PARTIES, POLL_RESULTS, getAllianceSeats, getAverageSeats, getAverageVoteShare } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export default function PollTable() {
  const avgSeats = getAverageSeats();
  const avgVote = getAverageVoteShare();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800">Exit Poll Comparison — Seats</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Projected seats out of {234} total seats
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <th className="text-left px-4 py-3 sticky left-0 bg-gray-50 min-w-[140px]">Agency</th>
              {PARTIES.map((p) => (
                <th
                  key={p.shortName}
                  className="text-center px-3 py-3 min-w-[60px]"
                >
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-white text-xs"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.shortName}
                  </span>
                </th>
              ))}
              <th className="text-center px-3 py-3 min-w-[90px] text-red-600">INDIA+</th>
              <th className="text-center px-3 py-3 min-w-[90px] text-green-600">AIADMK+</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {POLL_RESULTS.map((poll) => {
              const indiaSeat = ["DMK","INC","VCK"].reduce((s, p) => s + (poll.seats[p] ?? 0), 0);
              const aiadmkSeat = ["AIADMK","BJP","PMK"].reduce((s, p) => s + (poll.seats[p] ?? 0), 0);
              return (
                <tr key={poll.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 sticky left-0 bg-white hover:bg-gray-50">
                    <div className="font-semibold text-gray-800">{poll.agency}</div>
                    <div className="text-xs text-gray-400">
                      {poll.channel} · {new Date(poll.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </div>
                    {poll.sampleSize && (
                      <div className="text-xs text-gray-400">n={poll.sampleSize.toLocaleString()}</div>
                    )}
                  </td>
                  {PARTIES.map((p) => (
                    <td key={p.shortName} className="text-center px-3 py-3 font-medium text-gray-700">
                      {poll.seats[p.shortName] ?? "–"}
                    </td>
                  ))}
                  <td className="text-center px-3 py-3">
                    <span className={`font-bold ${indiaSeat >= 118 ? "text-green-600" : "text-red-500"}`}>
                      {indiaSeat}
                    </span>
                  </td>
                  <td className="text-center px-3 py-3">
                    <span className={`font-bold ${aiadmkSeat >= 118 ? "text-green-600" : "text-gray-600"}`}>
                      {aiadmkSeat}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* Average row */}
            <tr className="bg-yellow-50 font-semibold">
              <td className="px-4 py-3 sticky left-0 bg-yellow-50">
                <div className="font-bold text-gray-800">Average</div>
                <div className="text-xs text-gray-500">{POLL_RESULTS.length} polls</div>
              </td>
              {PARTIES.map((p) => (
                <td key={p.shortName} className="text-center px-3 py-3 font-bold text-gray-800">
                  {avgSeats[p.shortName]}
                </td>
              ))}
              <td className="text-center px-3 py-3">
                <span className="font-bold text-red-600">
                  {["DMK","INC","VCK"].reduce((s, p) => s + (avgSeats[p] ?? 0), 0)}
                </span>
              </td>
              <td className="text-center px-3 py-3">
                <span className="font-bold text-green-600">
                  {["AIADMK","BJP","PMK"].reduce((s, p) => s + (avgSeats[p] ?? 0), 0)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vote share sub-table */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Vote Share % (Average)</h3>
        <div className="flex flex-wrap gap-3">
          {PARTIES.map((p) => (
            <div key={p.shortName} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-xs font-semibold text-gray-700">{p.shortName}</span>
              <span className="text-xs text-gray-500">{avgVote[p.shortName]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
