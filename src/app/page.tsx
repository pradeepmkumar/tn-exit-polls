import Link from "next/link";
import { BarChart3, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Tamil Nadu Election 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore exit poll predictions and official results from the Tamil Nadu Assembly Election held on April 23, 2026.
          </p>
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

        {/* Info section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-4">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Note:</span> The election was held on April 23, 2026, with official results on May 4, 2026. Exit polls are projections based on voter surveys and actual results may vary.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
