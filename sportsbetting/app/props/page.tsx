'use client';

import { useState } from 'react';
import { mockPlayerProps } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay } from '@/components/shared/OddsDisplay';
import { TrendingUp, Filter, ChevronDown, Search } from 'lucide-react';

const sports = ['All', 'NFL', 'NBA', 'NHL'];
const markets = ['All Markets', 'Points', 'Rebounds', 'Assists', 'Pass Yards', 'Rush Yards', 'Receiving Yards', '3-Pointers Made', 'Pass Touchdowns'];

function EdgePill({ edge }: { edge: number }) {
  const isHot = edge >= 10;
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
        isHot ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
      }`}
    >
      <TrendingUp className="h-3 w-3" />
      +{edge.toFixed(1)}%
    </div>
  );
}

export default function PropsPage() {
  const [activeSport, setActiveSport] = useState('All');
  const [activeMarket, setActiveMarket] = useState('All Markets');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'edge' | 'line'>('edge');

  const filtered = mockPlayerProps
    .filter((p) => {
      const matchesSport = activeSport === 'All' || p.sport === activeSport;
      const matchesMarket = activeMarket === 'All Markets' || p.market === activeMarket;
      const matchesSearch = search === '' || p.player.toLowerCase().includes(search.toLowerCase());
      return matchesSport && matchesMarket && matchesSearch;
    })
    .sort((a, b) => sortBy === 'edge' ? b.edge - a.edge : b.line - a.line);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Player Props</h1>
        <p className="text-slate-500 text-sm">Model projections, edge scores, and odds from top books</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-card border border-surface-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {sports.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSport(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSport === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-surface-card border border-surface-border text-slate-400 hover:text-white transition-colors"
          onClick={() => setSortBy(sortBy === 'edge' ? 'line' : 'edge')}
        >
          <Filter className="h-4 w-4" />
          Sort: {sortBy === 'edge' ? 'Best Edge' : 'Line'}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-surface-elevated border-b border-surface-border">
          <div className="col-span-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Player</div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Market</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Line</div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Over / Under</div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Projection</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Edge</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Pick</div>
        </div>

        <div className="divide-y divide-surface-border">
          {filtered.map((prop) => {
            const overEdge = prop.projection > prop.line;
            return (
              <div
                key={prop.id}
                className="px-6 py-4 hover:bg-surface-elevated transition-colors"
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
                  <div className="col-span-3 flex items-center gap-3 mb-3 lg:mb-0">
                    <div className="h-10 w-10 rounded-full bg-surface-elevated flex items-center justify-center text-sm font-bold text-slate-300 flex-shrink-0">
                      {prop.player.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{prop.player}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <SportBadge sport={prop.sport} />
                        <span className="text-xs text-slate-500">{prop.position} · {prop.team} {prop.opponent}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{prop.gameTime}</div>
                    </div>
                  </div>

                  <div className="col-span-2 mb-2 lg:mb-0">
                    <span className="text-sm font-medium text-slate-300">{prop.market}</span>
                  </div>

                  <div className="col-span-1 text-center mb-2 lg:mb-0">
                    <span className="text-base font-bold text-white">{prop.line}</span>
                  </div>

                  <div className="col-span-2 mb-2 lg:mb-0">
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-0.5">Over</div>
                        <OddsDisplay odds={prop.overOdds} size="md" />
                      </div>
                      <div className="w-px h-8 bg-surface-border" />
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-0.5">Under</div>
                        <OddsDisplay odds={prop.underOdds} size="md" />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center mb-2 lg:mb-0">
                    <div className={`text-base font-bold ${overEdge ? 'text-emerald-400' : 'text-red-400'}`}>
                      {prop.projection}
                    </div>
                    <div className="text-xs text-slate-500">projected</div>
                  </div>

                  <div className="col-span-1 flex justify-center mb-2 lg:mb-0">
                    <EdgePill edge={prop.edge} />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        overEdge
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/30'
                          : 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30'
                      }`}
                    >
                      {overEdge ? 'Over' : 'Under'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
