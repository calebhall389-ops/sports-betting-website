'use client';

import { useState } from 'react';
import { mockBets } from '@/lib/mock-data';
import SportBadge from '@/components/shared/SportBadge';
import { OddsDisplay } from '@/components/shared/OddsDisplay';
import { TrendingUp, Filter, Plus, DollarSign, ChartBar as BarChart2, Target, CircleCheck as CheckCircle2, CircleX as XCircle, CircleMinus as MinusCircle, Clock } from 'lucide-react';

const sportFilters = ['All', 'NFL', 'NBA', 'NHL'];
const resultFilters = ['All', 'Win', 'Loss', 'Push', 'Pending'];
const marketFilters = ['All', 'Spread', 'Total', 'Moneyline', 'Player Prop'];

function ResultBadge({ result }: { result: string }) {
  const map: Record<string, { label: string; classes: string; icon: React.ReactNode }> = {
    win: { label: 'W', classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: <CheckCircle2 className="h-3 w-3" /> },
    loss: { label: 'L', classes: 'bg-red-500/20 text-red-400 border-red-500/30', icon: <XCircle className="h-3 w-3" /> },
    push: { label: 'P', classes: 'bg-slate-500/20 text-slate-400 border-slate-500/30', icon: <MinusCircle className="h-3 w-3" /> },
    pending: { label: 'TBD', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: <Clock className="h-3 w-3" /> },
  };
  const item = map[result] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${item.classes}`}>
      {item.icon}
      {item.label}
    </span>
  );
}

export default function BetTrackerPage() {
  const [activeSport, setActiveSport] = useState('All');
  const [activeResult, setActiveResult] = useState('All');
  const [activeMarket, setActiveMarket] = useState('All');

  const filtered = mockBets.filter((b) => {
    const matchesSport = activeSport === 'All' || b.league === activeSport;
    const matchesResult = activeResult === 'All' || b.result.toLowerCase() === activeResult.toLowerCase();
    const matchesMarket = activeMarket === 'All' || b.market === activeMarket;
    return matchesSport && matchesResult && matchesMarket;
  });

  const settledBets = mockBets.filter(b => b.result !== 'pending');
  const wins = settledBets.filter(b => b.result === 'win').length;
  const losses = settledBets.filter(b => b.result === 'loss').length;
  const totalUnits = mockBets.reduce((sum, b) => sum + b.units, 0);
  const totalProfit = mockBets.reduce((sum, b) => sum + b.profit, 0);
  const roi = totalUnits > 0 ? ((totalProfit / totalUnits) * 100).toFixed(1) : '0.0';
  const winRate = settledBets.length > 0 ? ((wins / settledBets.length) * 100).toFixed(1) : '0';

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Bet Tracker</h1>
          <p className="text-slate-500 text-sm">Track your bets, analyze performance, and improve your strategy</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
          <Plus className="h-4 w-4" />
          Add Bet
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-surface-border bg-surface-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total P&L</span>
          </div>
          <div className={`text-2xl font-black ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}u
          </div>
          <div className="text-xs text-slate-600 mt-1">{mockBets.length} total bets</div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">ROI</span>
          </div>
          <div className={`text-2xl font-black ${parseFloat(roi) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {parseFloat(roi) >= 0 ? '+' : ''}{roi}%
          </div>
          <div className="text-xs text-slate-600 mt-1">{totalUnits.toFixed(1)} units wagered</div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Win Rate</span>
          </div>
          <div className="text-2xl font-black text-white">{winRate}%</div>
          <div className="text-xs text-slate-600 mt-1">{wins}W - {losses}L</div>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Best Sport</span>
          </div>
          <div className="text-2xl font-black text-white">NBA</div>
          <div className="text-xs text-slate-600 mt-1">+3.14u profit</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1 mr-1">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-xs text-slate-500">Filter:</span>
        </div>
        {sportFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveSport(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeSport === f
                ? 'bg-blue-600 text-white'
                : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="w-px h-7 bg-surface-border mx-1" />
        {resultFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveResult(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeResult === f
                ? 'bg-surface-elevated border border-slate-600 text-white'
                : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="w-px h-7 bg-surface-border mx-1" />
        {marketFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveMarket(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeMarket === f
                ? 'bg-surface-elevated border border-slate-600 text-white'
                : 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-surface-elevated border-b border-surface-border">
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Date</div>
          <div className="col-span-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Bet</div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Market</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Odds</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Units</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Book</div>
          <div className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Result</div>
          <div className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500 text-right">Profit</div>
        </div>

        <div className="divide-y divide-surface-border">
          {filtered.map((bet) => (
            <div key={bet.id} className="px-5 py-4 hover:bg-surface-elevated transition-colors">
              <div className="md:grid md:grid-cols-12 md:gap-3 md:items-center flex flex-col gap-2">
                <div className="col-span-1 flex items-center gap-2 md:block">
                  <SportBadge sport={bet.league} />
                  <span className="text-xs text-slate-500 md:mt-1 md:block">{bet.date}</span>
                </div>

                <div className="col-span-3">
                  <div className="text-sm font-semibold text-white">{bet.pick}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{bet.game}</div>
                </div>

                <div className="col-span-2">
                  <span className="text-xs text-slate-400 bg-surface-elevated border border-surface-border rounded px-2 py-0.5">
                    {bet.market}
                  </span>
                </div>

                <div className="col-span-1 text-center">
                  <OddsDisplay odds={bet.odds} size="sm" />
                </div>

                <div className="col-span-1 text-center">
                  <span className="text-sm font-semibold text-white">{bet.units}u</span>
                </div>

                <div className="col-span-1">
                  <span className="text-xs text-slate-400">{bet.book}</span>
                </div>

                <div className="col-span-1 flex md:justify-center">
                  <ResultBadge result={bet.result} />
                </div>

                <div className="col-span-2 md:text-right">
                  <span className={`text-sm font-bold ${
                    bet.profit > 0 ? 'text-emerald-400' :
                    bet.profit < 0 ? 'text-red-400' :
                    'text-slate-500'
                  }`}>
                    {bet.profit > 0 ? '+' : ''}{bet.profit.toFixed(2)}u
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-600">
          <BarChart2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No bets match your filters</p>
        </div>
      )}
    </main>
  );
}
