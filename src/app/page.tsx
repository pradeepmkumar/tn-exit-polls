import AdBanner from "@/components/AdBanner";
import Header from "@/components/Header";
import MajorityMeter from "@/components/MajorityMeter";
import PollTable from "@/components/PollTable";
import SeatChart from "@/components/SeatChart";
import VoteShareChart from "@/components/VoteShareChart";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Majority meter / alliance summary */}
        <MajorityMeter />

        {/* Mid-page ad */}
        <AdBanner slot="2222222222" format="horizontal" />

        {/* Comparison table */}
        <PollTable />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeatChart />
          <VoteShareChart />
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
