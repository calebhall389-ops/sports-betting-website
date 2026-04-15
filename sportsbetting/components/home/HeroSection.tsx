import Link from 'next/link';
import { ArrowRight, ChartBar as BarChart2, Shield, Zap } from 'lucide-react';

const stats = [
  { label: "Sports Covered", value: "4+" },
  { label: "Markets Tracked", value: "Odds, Props, Picks" },
  { label: "Updated", value: "Daily" },
];

const features = [
  { icon: BarChart2, label: 'Real-time odds from all major books' },
  { icon: Zap, label: 'Sharp money alerts & steam moves' },
  { icon: Shield, label: 'Model-driven projections & edge scores' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-medium text-blue-400">Live odds updating now</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Bet Smarter.
            <br />
            <span className="text-blue-500">Win More.</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
            SharpEdge gives you professional-grade sports betting tools — live odds comparison, line movement, player props with edge scores, expert picks, and bet tracking analytics.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Start Free – No Credit Card
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/odds"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-surface-border px-6 py-3 text-base font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            >
              View Today's Odds
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 border-t border-surface-border pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
