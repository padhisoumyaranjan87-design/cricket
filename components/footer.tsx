"use client";

import React from "react";
import Link from "next/link";
import { Flame, ShieldCheck, HeartHandshake, AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-24 lg:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Compliance & Responsible Gambling Advisory Banner */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-sm flex items-center gap-2">
                Responsible Cricket Analytics & Gaming Integrity
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">18+ ONLY</span>
              </div>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-3xl">
                CRICPULSE provides statistical modeling, live ball-by-ball analysis, and licensed odds comparison for informational purposes. 
                Win probabilities and AI insights are model projections, not guaranteed outcomes. Never wager money you cannot afford to lose.
              </p>
            </div>
          </div>
          <Link
            href="/responsible-gambling"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium text-xs border border-emerald-500/30 transition shrink-0"
          >
            Responsible Gambling Hub
          </Link>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                CRIC<span className="text-emerald-400">PULSE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              The next-generation cricket command center. Live ball-by-ball broadcast events, real-time momentum analysis, official ticket discovery, and licensed odds intelligence.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer transition">X / Twitter</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer transition">Instagram</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer transition">YouTube</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer transition">Discord</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/match/ind-vs-pak-t20wc-final" className="hover:text-emerald-400 transition">Live Scores & Center</Link></li>
              <li><Link href="/matches" className="hover:text-emerald-400 transition">Match Schedules</Link></li>
              <li><Link href="/series" className="hover:text-emerald-400 transition">Series & Points Tables</Link></li>
              <li><Link href="/stats" className="hover:text-emerald-400 transition">Advanced Statistics</Link></li>
              <li><Link href="/analysis" className="hover:text-emerald-400 transition">AI Tactical Analysis</Link></li>
              <li><Link href="/news" className="hover:text-emerald-400 transition">Cricket News & Records</Link></li>
            </ul>
          </div>

          {/* Hubs */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/tickets" className="hover:text-emerald-400 transition">Official Tickets</Link></li>
              <li><Link href="/venues" className="hover:text-emerald-400 transition">Stadium Guides & Pitches</Link></li>
              <li><Link href="/teams" className="hover:text-emerald-400 transition">Team Profiles</Link></li>
              <li><Link href="/players" className="hover:text-emerald-400 transition">Player Directory</Link></li>
              <li><Link href="/betting" className="hover:text-emerald-400 transition">Licensed Odds Comparison</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition">Admin Command Room</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Legal & Safety</h4>
            <ul className="space-y-2">
              <li><Link href="/responsible-gambling" className="hover:text-emerald-400 transition">Responsible Gambling</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400 transition">Cookie Compliance</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Licensing Disclosures</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 CRICPULSE Sports Technologies. All rights reserved. Data sourced via licensed cricket data providers.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js & CricPulse Engine</span>
            <span>•</span>
            <span className="text-emerald-500 font-medium">All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
