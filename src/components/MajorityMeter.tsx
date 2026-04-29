import { ALLIANCES, ELECTION, getAverageSeats } from "@/lib/data";

export default function MajorityMeter() {
  const avg = getAverageSeats();
  const total = ELECTION.totalSeats;
  const majority = ELECTION.majorityMark;

  const indiaSeat  = ALLIANCES[0].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);
  const aiadmkSeat = ALLIANCES[1].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);
  const tvkSeat    = ALLIANCES[2].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);
  const othersSeat = ALLIANCES[3].parties.reduce((s, p) => s + (avg[p] ?? 0), 0);

  const indiaW  = (indiaSeat  / total) * 100;
  const aiadmkW = (aiadmkSeat / total) * 100;
  const tvkW    = (tvkSeat    / total) * 100;
  const othersW = (othersSeat / total) * 100;

  const majorityLineLeft = (majority / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Average Seat Projection — All Polls</h2>
        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
          {ELECTION.totalSeats} seats · Majority {majority}
        </span>
      </div>

      {/* Alliance summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* INDIA Alliance */}
        <div className="text-center p-3 rounded-lg bg-red-50 border border-red-100">
          <div className="text-2xl sm:text-3xl font-bold text-red-600">{indiaSeat}</div>
          <div className="text-xs font-semibold text-red-700 mt-0.5">DMK+ (INDIA)</div>
          <div className="text-xs text-gray-500">DMK · INC · VCK</div>
          {indiaSeat >= majority && (
            <div className="mt-1.5 text-xs font-bold text-green-700 bg-green-100 rounded-full px-2 py-0.5 inline-block">
              Majority ✓
            </div>
          )}
        </div>

        {/* AIADMK Alliance */}
        <div className="text-center p-3 rounded-lg bg-green-50 border border-green-100">
          <div className="text-2xl sm:text-3xl font-bold text-green-700">{aiadmkSeat}</div>
          <div className="text-xs font-semibold text-green-800 mt-0.5">AIADMK+</div>
          <div className="text-xs text-gray-500">AIADMK · BJP · PMK</div>
        </div>

        {/* TVK */}
        <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
          <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{tvkSeat}</div>
          <div className="text-xs font-semibold text-yellow-700 mt-0.5">TVK (Vijay)</div>
          <div className="text-xs text-gray-500">Tamilaga Vettri Kazhagam</div>
          <div className="mt-1 text-xs text-orange-600 font-medium">⚡ New Force</div>
        </div>

        {/* Others */}
        <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div className="text-2xl sm:text-3xl font-bold text-gray-500">{othersSeat}</div>
          <div className="text-xs font-semibold text-gray-600 mt-0.5">Others</div>
          <div className="text-xs text-gray-500">NTK & Independents</div>
        </div>
      </div>

      {/* Seat bar */}
      <div className="relative">
        <div className="flex h-10 rounded-lg overflow-hidden text-white text-xs font-bold">
          <div
            className="flex items-center justify-center bg-red-500 transition-all duration-500"
            style={{ width: `${indiaW}%` }}
          >
            {indiaSeat}
          </div>
          <div
            className="flex items-center justify-center bg-yellow-400 text-gray-800 transition-all duration-500"
            style={{ width: `${tvkW}%` }}
          >
            {tvkSeat > 8 ? tvkSeat : ""}
          </div>
          <div
            className="flex items-center justify-center bg-gray-300 text-gray-700"
            style={{ width: `${othersW}%` }}
          >
            {othersSeat > 8 ? othersSeat : ""}
          </div>
          <div
            className="flex items-center justify-center bg-green-600 transition-all duration-500"
            style={{ width: `${aiadmkW}%` }}
          >
            {aiadmkSeat}
          </div>
        </div>

        {/* Majority line */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-gray-800"
          style={{ left: `${majorityLineLeft}%` }}
        >
          <div className="-translate-x-1/2 -translate-y-5 text-xs font-semibold text-gray-700 whitespace-nowrap bg-white px-1 rounded border border-gray-200">
            Majority: {majority}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-between text-xs text-gray-500 mt-3 gap-2">
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> DMK+</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" /> TVK</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-300 inline-block" /> Others</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-600 inline-block" /> AIADMK+</span>
        </div>
        <span className="italic text-gray-400">Average of 6 exit polls</span>
      </div>

      {/* Axis My India alert */}
      <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-800">
        <span className="font-bold">⚡ Outlier Alert — Axis My India:</span> The only agency predicting TVK to lead with{" "}
        <span className="font-bold">109 seats</span>, ahead of DMK+ (101) and AIADMK+ (24). A potential historic upset for Vijay&apos;s party in its first election.
      </div>
    </div>
  );
}
