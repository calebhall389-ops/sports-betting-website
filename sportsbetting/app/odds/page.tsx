'use client';

import { useState } from 'react';
import { mockGames, mockSportsbookOdds } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay, SpreadDisplay } from '@/components/shared/OddsDisplay';
import { Radio, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';

const sports = ['All', 'NFL', 'NBA', 'NHL', 'NCAAB'];

export default function OddsPage() {
  const [activeSport, setActiveSport] = useState('All');
  const [expandedGame, setExpandedGame] = useState<string | null>('1');

  const filteredGames =
    activeSport === 'All'
      ? mockGames
      : mockGames.filter((g) => g.league === activeSport || g.sport === activeSport);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Odds</h1>
        <p className="text-slate-500 text-sm">Live odds comparison from top sportsbooks</p>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-thin pb-1">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSport === sport
                ? 'bg-blue-600 text-white'
                : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredGames.map((game) => (
          <div key={game.id} className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
            <button
              onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
              className="w-full text-left"
            >
              <div className="px-5 py-4 flex items-center justify-between hover:bg-surface-elevated transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <SportBadge sport={game.league} />
                    {game.status === 'live' && (
                      <div className="flex items-center gap-1">
                        <Radio className="h-3 w-3 text-red-400 animate-pulse" />
                        <span className="text-xs font-semibold text-red-400">LIVE</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {game.awayTeam.abbreviation} @ {game.homeTeam.abbreviation}
                      </div>
                      <div className="text-xs text-slate-500">{game.time} · {game.date}</div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-8 mr-4">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-0.5">Spread</div>
                    <SpreadDisplay spread={game.homeSpread} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-0.5">Total</div>
                    <span className="text-sm font-semibold text-slate-200">{game.total}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-0.5">Home ML</div>
                    <OddsDisplay odds={game.homeML} />
                  </div>
                </div>

                {expandedGame === game.id ? (
                  <ChevronDown className="h-4 w-4 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
                )}
              </div>
            </button>

            {expandedGame === game.id && (
              <div className="border-t border-surface-border">
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center text-sm font-bold text-white">
                          {game.awayTeam.abbreviation.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{game.awayTeam.name}</div>
                          <div className="text-xs text-slate-500">{game.awayTeam.record}</div>
                        </div>
                      </div>
                      <span className="text-slate-600 font-light text-lg">vs</span>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center text-sm font-bold text-white">
                          {game.homeTeam.abbreviation.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{game.homeTeam.name}</div>
                          <div className="text-xs text-slate-500">{game.homeTeam.record}</div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/odds/${game.id}`}
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Full game page →
                    </Link>
                  </div>

                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-surface-border">
                          <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 pr-4">Book</th>
                          <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 px-3">{game.awayTeam.abbreviation} Spread</th>
                          <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 px-3">{game.homeTeam.abbreviation} Spread</th>
                          <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 px-3">{game.awayTeam.abbreviation} ML</th>
                          <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 px-3">{game.homeTeam.abbreviation} ML</th>
                          <th className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 pb-3 px-3">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border">
                        {mockSportsbookOdds.map((odds) => (
                          <tr key={odds.book} className="hover:bg-surface-elevated transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-12 rounded bg-surface-elevated flex items-center justify-center text-xs font-bold text-slate-300">
                                  {odds.logo}
                                </div>
                                <span className="text-sm text-slate-300 font-medium">{odds.book}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <SpreadDisplay spread={odds.awaySpread} odds={odds.awaySpreadOdds} />
                            </td>
                            <td className="py-3 px-3 text-center">
                              <SpreadDisplay spread={odds.homeSpread} odds={odds.homeSpreadOdds} />
                            </td>
                            <td className="py-3 px-3 text-center">
                              <OddsDisplay odds={odds.awayML} />
                            </td>
                            <td className="py-3 px-3 text-center">
                              <OddsDisplay odds={odds.homeML} />
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-xs text-slate-300">O{odds.total} <span className="text-slate-500">({odds.overOdds > 0 ? '+' : ''}{odds.overOdds})</span></span>
                                <span className="text-xs text-slate-300">U{odds.total} <span className="text-slate-500">({odds.underOdds > 0 ? '+' : ''}{odds.underOdds})</span></span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
