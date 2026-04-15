import Link from 'next/link';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay } from '@/components/shared/OddsDisplay';
import { ArrowRight, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

function ConfidenceMeter({ value }: { value: number }) {
  const segments = 5;
  const filled = Math.ceil((value / 100) * segments);
  const color = value >= 80 ? 'bg-emerald-500' : value >= 70 ? 'bg-blue-500' : 'bg-yellow-500';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-4 rounded-sm ${i < filled ? color : 'bg-surface-border'}`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-400">{value}%</span>
    </div>
  );
}

function ResultBadge({ result }: { result?: string }) {
  if (!result || result === 'pending') return null;

  const map = {
    win: { label: 'WIN', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    loss: { label: 'LOSS', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
    push: { label: 'PUSH', class: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  };

  const item = map[result as keyof typeof map];
  if (!item) return null;

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${item.class}`}>
      {item.label}
    </span>
  );
}

export default function BestBets() {
  const picks = mockPicks.slice(0, 3);

  return (
    <section className="py-12 bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Best Bets</h2>
            <p className="text-sm text-slate-500 mt-0.5">Expert picks with highest conviction</p>
          </div>
          <Link
            href="/picks"
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            All picks <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {picks.map((pick) => (
            <div
              key={pick.id}
              className="rounded-xl border border-surface-border bg-surface-card p-5 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <SportBadge sport={pick.league} />
                  <span className="text-xs text-slate-500">{pick.date}</span>
                </div>
                <ResultBadge result={pick.result} />
              </div>

              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1">{pick.game}</div>
                <div className="text-base font-bold text-white leading-tight">{pick.pick}</div>
                <div className="flex items-center gap-2 mt-1">
                  <OddsDisplay odds={pick.odds} size="sm" />
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-500">{pick.units}u</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400 capitalize">{pick.market}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                {pick.analysis}
              </p>

              <div className="border-t border-surface-border pt-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">{pick.analyst}</div>
                  <div className="text-xs text-slate-600">{pick.record}</div>
                </div>
                <ConfidenceMeter value={pick.confidence} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
