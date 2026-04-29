"use client";

import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { PARTIES, getAverageVoteShare } from "@/lib/data";

export default function VoteShareChart() {
  const avg = getAverageVoteShare();

  const barData = PARTIES.filter((p) => p.shortName !== "OTH").map((p) => ({
    name: p.shortName,
    "Vote %": avg[p.shortName],
    fill: p.color,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-base font-bold text-gray-800 mb-1">Average Vote Share %</h2>
      <p className="text-xs text-gray-500 mb-5">Averaged across all exit polls (excluding Others)</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit="%" />
          <Tooltip
            formatter={(v) => [`${v}%`, "Vote Share"]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Bar dataKey="Vote %" radius={[4, 4, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3">
        {PARTIES.filter((p) => p.shortName !== "OTH").map((p) => (
          <div key={p.shortName} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-gray-600">{p.name.split(" ").slice(0, 3).join(" ")}</span>
            <span className="text-xs font-semibold text-gray-800">{avg[p.shortName]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
