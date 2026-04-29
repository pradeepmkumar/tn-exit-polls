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
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-xs text-blue-800">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Exit polls are projections based on voter surveys conducted on polling day. Actual results
            may vary. Data is sourced from major national polling agencies and updated as new polls are
            published.
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
          <h2 className="text-base font-bold text-gray-800 mb-4">Key Takeaways</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-red-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">DMK+ leads in 5 of 6 polls</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  DMK-led alliance projected at 127–152 seats across five agencies — above the 118 majority mark.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-yellow-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">TVK (Vijay) — blockbuster debut</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Axis My India predicts TVK wins 109 seats, making Vijay the kingmaker or even CM. All others put TVK at 13–21.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-green-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">AIADMK at historic low</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  AIADMK+ projected 57–93 seats — a dramatic fall from 75 seats in 2021, squeezed by TVK.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-orange-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-800">Record 85.10% voter turnout</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Highest turnout since Independence on April 23 — widely seen as anti-incumbency signal favouring change.
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
