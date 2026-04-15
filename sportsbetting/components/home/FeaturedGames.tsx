import Link from 'next/link';
import { mockGames } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay, SpreadDisplay } from '@/components/shared/OddsDisplay';
import { ArrowRight, Radio } from 'lucide-react';

export default function FeaturedGames() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Featured Games</h2>
            <p className="text-sm text-slate-500 mt-0.5">Today's top matchups with live odds</p>
          </div>
          <Link
            href="/odds"
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            All games <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {mockGames.slice(0, 4).map((game) => (
            <Link
              href={`/odds/${game.id}`}
              key={game.id}
              className="group block rounded-xl border border-surface-border bg-surface-card hover:border-blue-500/40 hover:bg-surface-elevated transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SportBadge sport={game.league} />
                    <span className="text-xs text-slate-500">{game.time}</span>
                  </div>
                  {game.status === 'live' && (
                    <div className="flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5 text-red-400 animate-pulse" />
                      <span className="text-xs font-semibold text-red-400">LIVE</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-surface-elevated flex items-center justify-center text-xs font-bold text-slate-300">
                          {game.awayTeam.abbreviation.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{game.awayTeam.name}</div>
                          <div className="text-xs text-slate-500">{game.awayTeam.record}</div>
                        </div>
                      </div>
                      {game.status === 'live' && (
                        <span className="text-xl font-bold text-white">{game.awayScore}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-surface-elevated flex items-center justify-center text-xs font-bold text-slate-300">
                          {game.homeTeam.abbreviation.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{game.homeTeam.name}</div>
                          <div className="text-xs text-slate-500">{game.homeTeam.record}</div>
                        </div>
                      </div>
                      {game.status === 'live' && (
                        <span className="text-xl font-bold text-white">{game.homeScore}</span>
                      )}
                    </div>
                  </div>

                  <div className="ml-4 grid grid-cols-3 gap-x-4 text-right">
                    <div className="text-xs text-slate-500 mb-1 text-center">Spread</div>
                    <div className="text-xs text-slate-500 mb-1 text-center">ML</div>
                    <div className="text-xs text-slate-500 mb-1 text-center">Total</div>

                    <div className="text-center">
                      <SpreadDisplay spread={game.awaySpread} />
                    </div>
                    <div className="text-center">
                      <OddsDisplay odds={game.awayML} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-slate-200">O{game.total}</span>
                    </div>

                    <div className="text-center">
                      <SpreadDisplay spread={game.homeSpread} />
                    </div>
                    <div className="text-center">
                      <OddsDisplay odds={game.homeML} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-slate-200">U{game.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
