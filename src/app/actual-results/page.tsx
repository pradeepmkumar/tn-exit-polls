import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ActualResults() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Navigation breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 sm:py-20 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Actual Results
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Official results from the Election Commission of India are coming soon. This page will display the final seat counts and vote share distribution across all parties and alliances.
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-8">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Election Date:</span> April 23, 2026
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Counting Date:</span> May 4, 2026
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Seats:</span> 234 (Majority: 118)
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-4 mb-8">
            <p className="text-sm text-amber-900">
              In the meantime, you can view <Link href="/exit-polls" className="font-semibold text-amber-900 underline hover:no-underline">exit poll predictions</Link> from major polling agencies to see what's expected.
            </p>
          </div>

          <Link
            href="/exit-polls"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Exit Polls
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
