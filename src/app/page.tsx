import Link from "next/link";
import { BarChart3, TrendingUp, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Top ad */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <AdBanner slot="1111111111" format="horizontal" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Info banner */}
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-xs text-green-800">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Official Results Released:</strong> The Election Commission of India has announced the final results
            from the May 4, 2026 counting. TVK emerges as the single largest party with 108 seats, while DMK+ secured 51 seats.
            Exit polls and official results shown below.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Exit Polls Card */}
          <Link
            href="/exit-polls"
            className="group rounded-2xl border-2 border-gray-200 bg-white p-8 sm:p-10 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exit Polls</h2>
            <p className="text-gray-600 mb-6">
              View predictions from major polling agencies based on surveys conducted on polling day. Compare seat projections and vote share across alliances.
            </p>
            <div className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-2">
              Explore Exit Polls
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Actual Results Card */}
          <Link
            href="/actual-results"
            className="group rounded-2xl border-2 border-gray-200 bg-white p-8 sm:p-10 hover:border-green-400 hover:shadow-lg transition-all duration-300 opacity-75 hover:opacity-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Actual Results</h2>
            <p className="text-gray-600 mb-6">
              Official results from the Election Commission of India. View final seat counts and vote share distribution across all constituencies.
            </p>
            <div className="text-sm font-semibold text-green-600 group-hover:text-green-700 flex items-center gap-2">
              View Results
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Bottom ad */}
        <AdBanner slot="3333333333" format="rectangle" />

        {/* Key insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">2026 Election Results — Historic Verdict</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-yellow-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">TVK wins with 108 seats</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Actor Vijay's debut party emerges as the single largest party but falls short of the 118 majority mark. A historic political realignment.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-red-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">DMK+ collapses to 51 seats</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  The ruling alliance faces a historic defeat, dropping from 159 seats in 2021 to just 51 — anti-incumbency against MK Stalin.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-green-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">AIADMK+ recovers to 75 seats</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  The traditional opposition alliance makes a comeback but still below 2021 levels, as the Dravidian duopoly breaks.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-orange-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">No clear majority — horse-trading ahead</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  With no party/alliance at 118 seats, coalition negotiations and support arrangements will determine who forms the next government.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
