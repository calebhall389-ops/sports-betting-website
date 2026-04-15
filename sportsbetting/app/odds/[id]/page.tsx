import { mockGames, mockSportsbookOdds, mockLineMovement } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay, SpreadDisplay } from '@/components/shared/OddsDisplay';
import { Radio, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const game = mockGames.find((g) => g.id === params.id) ?? mockGames[0];

  const trends = [
    { label: `${game.homeTeam.abbreviation} ATS (Home)`, value: '7-3', positive: true },
    { label: `${game.awayTeam.abbreviation} ATS (Away)`, value: '4-6', positive: false },
    { label: 'Over/Under trend', value: 'Over 6-4 L10', positive: true },
    { label: `${game.homeTeam.abbreviation} vs Top-10 QB`, value: '3-7 L10', positive: false },
    { label: 'Sharp money', value: `${game.homeTeam.abbreviation} 68%`, positive: true },
    { label: 'Public betting', value: `${game.awayTeam.abbreviation} 54%`, positive: false },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/odds"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Odds
      </Link>

      <div className="rounded-xl border border-surface-border bg-surface-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <SportBadge sport={game.league} size="md" />
          <span className="text-sm text-slate-500">{game.time} · {game.date}</span>
          {game.status === 'live' && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Radio className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-400">LIVE</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-surface-elevated flex items-center justify-center text-xl font-black text-white mx-auto mb-2">
              {game.awayTeam.abbreviation}
            </div>
            <div className="text-lg font-bold text-white">{game.awayTeam.name}</div>
            <div className="text-sm text-slate-500">{game.awayTeam.record}</div>
            {game.status === 'live' && (
              <div className="text-3xl font-black text-white mt-2">{game.awayScore}</div>
            )}
          </div>

          <div className="text-center">
            <div className="text-2xl font-light text-slate-600 mb-2">@</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">Spread</div>
                <div className="text-sm font-bold text-white">{game.homeSpread > 0 ? '+' : ''}{game.homeSpread}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">Total</div>
                <div className="text-sm font-bold text-white">{game.total}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">ML</div>
                <OddsDisplay odds={game.homeML} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-surface-elevated flex items-center justify-center text-xl font-black text-white mx-auto mb-2">
              {game.homeTeam.abbreviation}
            </div>
            <div className="text-lg font-bold text-white">{game.homeTeam.name}</div>
            <div className="text-sm text-slate-500">{game.homeTeam.record}</div>
            {game.status === 'live' && (
              <div className="text-3xl font-black text-white mt-2">{game.homeScore}</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-border bg-surface-elevated">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Sportsbook Odds</h2>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-500 px-5 py-3">Book</th>
                    <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 px-3 py-3">Spread</th>
                    <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 px-3 py-3">Moneyline</th>
                    <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 px-3 py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {mockSportsbookOdds.map((odds) => (
                    <tr key={odds.book} className="hover:bg-surface-elevated transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-12 rounded bg-surface-elevated flex items-center justify-center text-xs font-bold text-slate-300">
                            {odds.logo}
                          </div>
                          <span className="text-sm font-medium text-slate-200">{odds.book}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <SpreadDisplay spread={odds.awaySpread} odds={odds.awaySpreadOdds} />
                          <SpreadDisplay spread={odds.homeSpread} odds={odds.homeSpreadOdds} />
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <OddsDisplay odds={odds.awayML} size="sm" />
                          <OddsDisplay odds={odds.homeML} size="sm" />
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-xs text-slate-300">O{odds.total} ({odds.overOdds})</span>
                          <span className="text-xs text-slate-300">U{odds.total} ({odds.underOdds})</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-border bg-surface-elevated flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Line Movement</h2>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-400" />Spread</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Total</span>
              </div>
            </div>
            <div className="p-5">
              <div className="relative h-40 flex items-end gap-2">
                {mockLineMovement.map((point, i) => {
                  const maxSpread = Math.max(...mockLineMovement.map(p => Math.abs(p.spread)));
                  const height = (Math.abs(point.spread) / (maxSpread + 1)) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-blue-600/70 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-slate-600 whitespace-nowrap">{point.timestamp}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3 border-t border-surface-border pt-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Open Spread</div>
                  <div className="text-sm font-bold text-white">{mockLineMovement[0].spread}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Current</div>
                  <div className="text-sm font-bold text-white">{mockLineMovement[mockLineMovement.length - 1].spread}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Open Total</div>
                  <div className="text-sm font-bold text-white">{mockLineMovement[0].total}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Current</div>
                  <div className="text-sm font-bold text-white">{mockLineMovement[mockLineMovement.length - 1].total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-border bg-surface-elevated">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Trends</h2>
            </div>
            <div className="divide-y divide-surface-border">
              {trends.map((trend) => (
                <div key={trend.label} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 flex-1">{trend.label}</span>
                  <div className="flex items-center gap-1.5">
                    {trend.positive ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${trend.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {trend.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-5">
            <h3 className="text-sm font-bold text-white mb-3">Betting Splits</h3>
            <div className="space-y-3">
              {[
                { label: 'Spread Tickets', away: 46, home: 54 },
                { label: 'Spread Money', away: 32, home: 68 },
                { label: 'ML Tickets', away: 54, home: 46 },
              ].map((split) => (
                <div key={split.label}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{game.awayTeam.abbreviation} {split.away}%</span>
                    <span className="text-center">{split.label}</span>
                    <span>{game.homeTeam.abbreviation} {split.home}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-elevated overflow-hidden flex">
                    <div
                      className="h-full bg-orange-500 rounded-l-full"
                      style={{ width: `${split.away}%` }}
                    />
                    <div
                      className="h-full bg-blue-500 rounded-r-full"
                      style={{ width: `${split.home}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
