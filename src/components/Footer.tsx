export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-white font-semibold text-sm mb-2">TN Exit Polls 2026</h3>
            <p className="text-xs leading-relaxed">
              Aggregating exit poll data from major polling agencies for Tamil Nadu
              Legislative Assembly Election 2026.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-2">Data Sources</h3>
            <ul className="text-xs space-y-1">
              <li>CVoter / India TV</li>
              <li>Axis My India / News18</li>
              <li>Today&apos;s Chanakya / Republic TV</li>
              <li>Jan Ki Baat / ABP News</li>
              <li>Matrize / News24</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-2">Disclaimer</h3>
            <p className="text-xs leading-relaxed">
              Exit polls are projections only and may differ from actual results.
              Data is compiled from publicly available sources. This site is not
              affiliated with any political party or polling agency.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-xs text-center">
          © {new Date().getFullYear()} TN Exit Polls. All rights reserved. · Data for informational purposes only.
        </div>
      </div>
    </footer>
  );
}
