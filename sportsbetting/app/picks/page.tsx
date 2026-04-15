'use client';

import { useState } from 'react';
import { mockPicks } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay } from '@/components/shared/OddsDisplay';
import { Star, TrendingUp, Lock, CircleCheck as CheckCircle2, CircleX as XCircle, CircleMinus as MinusCircle } from 'lucide-react';

const sports = ['All', 'NFL', 'NBA', 'NHL'];
const filters = ['All Picks', 'Best Bets', 'Pending', 'Winners'];

function ConfidenceMeter({ value }: { value: number }) {
  const segments = 5;
  const filled = Math.ceil((value / 100) * segments);
  const color = value >= 80 ? 'bg-emerald-500' : value >= 70 ? 'bg-blue-500' : 'bg-yellow-500';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div key={i} className={`h-1.5 w-3.5 rounded-sm ${i < filled ? color : 'bg-surface-border'}`} />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-400">{value}%</span>
    </div>
  );
}

function ResultIcon({ result }: { result?: string }) {
  if (result === 'win') return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
  if (result === 'loss') return <XCircle className="h-5 w-5 text-red-400" />;
  if (result === 'push') return <MinusCircle className="h-5 w-5 text-slate-500" />;
  return null;
}

export default function PicksPage() {
  const [activeSport, setActiveSport] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All Picks');

  const filtered = mockPicks.filter((p) => {
    const matchesSport = activeSport === 'All' || p.league === activeSport;
    const matchesFilter =
      activeFilter === 'All Picks' ||
      (activeFilter === 'Best Bets' && p.confidence >= 75) ||
      (activeFilter === 'Pending' && p.result === 'pending') ||
      (activeFilter === 'Winners' && p.result === 'win');
    return matchesSport && matchesFilter;
  });

  const record = {
    wins: mockPicks.filter(p => p.result === 'win').length,
    losses: mockPicks.filter(p => p.result === 'loss').length,
    pending: mockPicks.filter(p => p.result === 'pending').length,
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Expert Picks</h1>
        <p className="text-slate-500 text-sm">Data-driven picks from our team of professional analysts</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
          <div className="text-2xl font-black text-emerald-400">{record.wins}</div>
          <div className="text-xs text-slate-500 mt-1">Wins</div>
        </div>
        <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
          <div className="text-2xl font-black text-red-400">{record.losses}</div>
          <div className="text-xs text-slate-500 mt-1">Losses</div>
        </div>
        <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
          <div className="text-2xl font-black text-blue-400">
            {record.wins + record.losses > 0
              ? `${((record.wins / (record.wins + record.losses)) * 100).toFixed(0)}%`
              : '-'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Win Rate</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
        <div className="flex gap-2 flex-wrap sm:ml-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-surface-elevated border border-slate-600 text-white'
                  : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((pick) => (
          <div
            key={pick.id}
            className={`rounded-xl border bg-surface-card p-5 flex flex-col transition-colors hover:border-blue-500/30 ${
              pick.confidence >= 80 ? 'border-blue-500/30' : 'border-surface-border'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <SportBadge sport={pick.league} />
                <span className="text-xs text-slate-500">{pick.date}</span>
              </div>
              <div className="flex items-center gap-2">
                {pick.confidence >= 80 && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400" />
                    Best Bet
                  </div>
                )}
                <ResultIcon result={pick.result} />
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">{pick.game}</div>
              <div className="text-base font-bold text-white mb-1 leading-tight">{pick.pick}</div>
              <div className="flex items-center gap-2 mb-3">
                <OddsDisplay odds={pick.odds} size="sm" />
                <span className="text-xs text-slate-600">·</span>
                <span className="text-xs font-medium text-slate-400">{pick.units}u</span>
                <span className="text-xs text-slate-600">·</span>
                <span className="text-xs text-slate-400 capitalize">{pick.market}</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 mb-4">
                {pick.analysis}
              </p>
            </div>

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

      <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-600/5 p-6 text-center">
        <Lock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white mb-1">Unlock Premium Picks</h3>
        <p className="text-sm text-slate-400 mb-4 max-w-sm mx-auto">
          Get access to all picks, including model-driven best bets and early lines.
        </p>
        <a
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Start 7-Day Free Trial
        </a>
      </div>
    </main>
  );
}
