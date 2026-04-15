'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { TrendingUp, Menu, X, Bell } from 'lucide-react';

const navLinks = [
  { label: 'Odds', href: '/odds' },
  { label: 'Props', href: '/props' },
  { label: 'Picks', href: '/picks' },
  { label: 'Bet Tracker', href: '/bet-tracker' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface-dark/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 group-hover:bg-blue-500 transition-colors">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Sharp<span className="text-blue-500">Edge</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white bg-surface-elevated'
                      : 'text-slate-400 hover:text-white hover:bg-surface-elevated'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Start Free
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-dark">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-white bg-surface-elevated'
                    : 'text-slate-400 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white text-center hover:bg-blue-500 transition-colors"
              >
                Start Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
