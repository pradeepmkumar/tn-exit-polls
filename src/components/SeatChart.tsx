"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { PARTIES, POLL_RESULTS, ELECTION } from "@/lib/data";

export default function SeatChart() {
  const data = POLL_RESULTS.map((poll) => ({
    name: poll.agency,
    ...PARTIES.reduce(
      (acc, p) => ({ ...acc, [p.shortName]: poll.seats[p.shortName] ?? 0 }),
      {}
    ),
  }));

  const colors = Object.fromEntries(PARTIES.map((p) => [p.shortName, p.color]));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-base font-bold text-gray-800 mb-1">Seat Projections by Agency</h2>
      <p className="text-xs text-gray-500 mb-5">
        Stacked bar — total {ELECTION.totalSeats} seats · dashed line = majority ({ELECTION.majorityMark})
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} domain={[0, 234]} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <ReferenceLine
            y={ELECTION.majorityMark}
            stroke="#374151"
            strokeDasharray="6 3"
            label={{ value: "Majority 118", position: "right", fontSize: 10, fill: "#374151" }}
          />
          {PARTIES.map((p) => (
            <Bar
              key={p.shortName}
              dataKey={p.shortName}
              stackId="a"
              fill={p.color}
              name={p.shortName}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
