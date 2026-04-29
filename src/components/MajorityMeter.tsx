import { ALLIANCES, ELECTION, getAllianceSeats, getAverageSeats, POLL_RESULTS } from "@/lib/data";

export default function MajorityMeter() {
  const avg = getAverageSeats();
  const total = ELECTION.totalSeats;
  const majority = ELECTION.majorityMark;

  const indiaTotalAvg = ALLIANCES[0].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);
  const aiadmkTotalAvg = ALLIANCES[1].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);
  const othersTotalAvg = ALLIANCES[2].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);

  const indiaWidth = (indiaTotalAvg / total) * 100;
  const aiadmkWidth = (aiadmkTotalAvg / total) * 100;
  const othersWidth = (othersTotalAvg / total) * 100;

  const majorityLineLeft = (majority / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-base font-bold text-gray-800 mb-4">
        Average Seat Projection (All Polls)
      </h2>

      {/* Alliance summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 rounded-lg bg-red-50 border border-red-100">
          <div className="text-2xl font-bold text-red-600">{indiaTotalAvg}</div>
          <div className="text-xs font-semibold text-red-700 mt-0.5">INDIA Alliance</div>
          <div className="text-xs text-gray-500">DMK + INC + VCK</div>
          {indiaTotalAvg >= majority && (
            <div className="mt-1 text-xs font-bold text-green-600 bg-green-100 rounded-full px-2 py-0.5">
              Majority ✓
            </div>
          )}
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{othersTotalAvg}</div>
          <div className="text-xs font-semibold text-gray-600 mt-0.5">Others</div>
          <div className="text-xs text-gray-500">Independents etc.</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-green-50 border border-green-100">
          <div className="text-2xl font-bold text-green-600">{aiadmkTotalAvg}</div>
          <div className="text-xs font-semibold text-green-700 mt-0.5">AIADMK Alliance</div>
          <div className="text-xs text-gray-500">AIADMK + BJP + PMK</div>
        </div>
      </div>

      {/* Bar */}
      <div className="relative">
        <div className="flex h-10 rounded-lg overflow-hidden text-white text-xs font-bold">
          <div
            className="flex items-center justify-center bg-red-500 transition-all duration-500"
            style={{ width: `${indiaWidth}%` }}
          >
            {indiaTotalAvg}
          </div>
          <div
            className="flex items-center justify-center bg-gray-400"
            style={{ width: `${othersWidth}%` }}
          >
            {othersTotalAvg > 5 ? othersTotalAvg : ""}
          </div>
          <div
            className="flex items-center justify-center bg-green-600 transition-all duration-500"
            style={{ width: `${aiadmkWidth}%` }}
          >
            {aiadmkTotalAvg}
          </div>
        </div>

        {/* Majority line */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-gray-800 flex flex-col items-center"
          style={{ left: `${majorityLineLeft}%` }}
        >
          <div className="-translate-x-1/2 -translate-y-5 text-xs font-semibold text-gray-700 whitespace-nowrap bg-white px-1 rounded">
            Majority: {majority}
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>← INDIA Alliance</span>
        <span>AIADMK Alliance →</span>
      </div>
    </div>
  );
}
