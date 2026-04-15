import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-dark mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">
                Sharp<span className="text-blue-500">Edge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Professional sports betting tools, analytics, and picks. Get the edge with data-driven insights.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Tools</h4>
            <ul className="space-y-2.5">
              {['Odds', 'Props', 'Picks', 'Bet Tracker'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Sports</h4>
            <ul className="space-y-2.5">
              {['NFL', 'NBA', 'NHL', 'NCAAB', 'MLB', 'Soccer'].map((sport) => (
                <li key={sport}>
                  <Link href="/odds" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Pricing', 'Blog', 'Responsible Gaming', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} SharpEdge. All rights reserved. Must be 21+ to gamble. Please bet responsibly.
          </p>
          <p className="text-xs text-slate-600">
            Gambling problem? Call 1-800-GAMBLER
          </p>
        </div>
      </div>
    </footer>
  );
}
