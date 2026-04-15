import { mockPricingPlans } from '@/lib/mock-data';
import { Check, Zap, Shield, TrendingUp } from 'lucide-react';

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your subscription at any time. You\'ll keep access until the end of your billing period.',
  },
  {
    q: 'Is the free plan actually free?',
    a: 'Yes, no credit card required. The free plan includes live odds, basic line movement, and 3 picks per day.',
  },
  {
    q: 'What sportsbooks do you cover?',
    a: 'We cover DraftKings, FanDuel, BetMGM, Caesars, PointsBet, bet365, and 9 more on the Pro and Elite plans.',
  },
  {
    q: 'Do you offer a money-back guarantee?',
    a: 'We offer a 7-day free trial on Pro with no charge. If you\'re not satisfied within 30 days, contact support for a full refund.',
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 mb-5">
          <Zap className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-xs font-medium text-blue-400">No credit card for free trial</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Start winning with the right tools
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          From casual bettors to professionals — SharpEdge has a plan for every level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mockPricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-7 flex flex-col ${
              plan.highlighted
                ? 'border-blue-500/60 bg-blue-600/5 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
                : 'border-surface-border bg-surface-card'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-5">{plan.description}</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-slate-500 mb-1.5">/{plan.billingPeriod}</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 flex-1 mb-7">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-400' : 'text-emerald-400'}`} />
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-xl py-3 text-sm font-bold transition-all ${
                plan.highlighted
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'border border-surface-border bg-surface-elevated hover:border-slate-500 text-white'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: Shield,
            title: 'Cancel anytime',
            desc: 'No long-term contracts. Upgrade, downgrade, or cancel whenever you want.',
          },
          {
            icon: Zap,
            title: '7-day free trial',
            desc: 'Try Pro for free. No credit card required, no commitment.',
          },
          {
            icon: TrendingUp,
            title: 'Money-back guarantee',
            desc: '30-day money-back guarantee if you\'re not completely satisfied.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 rounded-xl border border-surface-border bg-surface-card p-5">
            <div className="h-10 w-10 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">{title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-transparent p-10 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">Ready to get the edge?</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Join 180,000+ bettors using SharpEdge to find value and beat the books.
        </p>
        <button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 text-sm transition-colors shadow-lg shadow-blue-600/20">
          Start Free – No Credit Card
        </button>
      </div>
    </main>
  );
}
