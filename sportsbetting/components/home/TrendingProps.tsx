import Link from 'next/link';
import { mockPlayerProps } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay } from '@/components/shared/OddsDisplay';
import { ArrowRight, TrendingUp, Flame } from 'lucide-react';

function EdgeBadge({ edge }: { edge: number }) {
  const isHigh = edge >= 10;
  return (
    <div
      className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
        isHigh
          ? 'bg-emerald-500/20 text-emerald-400'
          : 'bg-blue-500/20 text-blue-400'
      }`}
    >
      <TrendingUp className="h-3 w-3" />
      +{edge.toFixed(1)}%
    </div>
  );
}

export default function TrendingProps() {
  const props = mockPlayerProps.slice(0, 6);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white">Trending Props</h2>
              <div className="flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                <Flame className="h-3 w-3" />
                Hot today
              </div>
            </div>
            <p className="text-sm text-slate-500">Best value props based on model projections</p>
          </div>
          <Link
            href="/props"
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            All props <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-surface-elevated border-b border-surface-border">
            <div className="col-span-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Player</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Market</div>
            <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Line</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Odds</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Projection</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Edge</div>
          </div>

          <div className="divide-y divide-surface-border">
            {props.map((prop, index) => (
              <Link
                key={prop.id}
                href="/props"
                className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-surface-elevated transition-colors items-center"
              >
                <div className="col-span-6 sm:col-span-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0">
                    {prop.player.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{prop.player}</div>
                    <div className="text-xs text-slate-500">{prop.position} · {prop.team} {prop.opponent}</div>
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <div className="text-sm text-slate-300 font-medium">{prop.market}</div>
                  <div className="sm:hidden text-xs text-slate-500 mt-0.5">{prop.gameTime}</div>
                </div>

                <div className="hidden sm:block col-span-1 text-center">
                  <span className="text-sm font-semibold text-slate-200">{prop.line}</span>
                </div>

                <div className="col-span-3 sm:col-span-2 text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">O</span>
                      <OddsDisplay odds={prop.overOdds} size="sm" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">U</span>
                      <OddsDisplay odds={prop.underOdds} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block col-span-2 text-center">
                  <span className="text-sm font-semibold text-blue-400">{prop.projection}</span>
                </div>

                <div className="hidden sm:flex col-span-2 justify-center">
                  <EdgeBadge edge={prop.edge} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
