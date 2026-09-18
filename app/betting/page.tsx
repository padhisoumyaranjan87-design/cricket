"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Lock, 
  Globe,
  ExternalLink,
  Info
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { BETTING_ODDS_COMPARISON, ODDS_MOVEMENT_HISTORY } from "@/lib/mock-data";

export default function BettingInformationPage() {
  const { jurisdiction, setJurisdictionCode, isAgeVerified, verifyAge } = useApp();
  const [selectedMarket, setSelectedMarket] = useState("Match Winner");

  const isPermitted = jurisdiction.isBettingPermitted;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Advisory Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-amber-300">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white text-sm block">18+ Regulatory Compliance & Responsible Gambling Notice</strong>
            <span>Betting involves significant financial risk and can become addictive. Odds fluctuate dynamically. Never bet more than you can afford to lose. Only participate where legal.</span>
          </div>
        </div>
        <Link
          href="/responsible-gambling"
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-xs border border-amber-500/40 transition shrink-0"
        >
          Helpline & Self-Exclusion
        </Link>
      </div>

      {/* Header & Jurisdiction Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Licensed Market Comparison Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CRICKET ODDS COMPARISON & MARKET MOVEMENTS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Displaying licensed bookmaker odds where legally sanctioned under {jurisdiction.licensingBody}.
          </p>
        </div>

        {/* Territory Switcher for Testing */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 text-[11px] font-medium hidden sm:inline flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            Jurisdiction:
          </span>
          <button
            onClick={() => setJurisdictionCode("UK")}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              jurisdiction.code === "UK" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            UK (18+)
          </button>
          <button
            onClick={() => setJurisdictionCode("IND")}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              jurisdiction.code === "IND" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            India (Restricted)
          </button>
        </div>
      </div>

      {/* JURISDICTION GUARD: RESTRICTED TERRITORY VIEW */}
      {!isPermitted ? (
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/90 border border-slate-800 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Betting Information Is Unavailable in Your Jurisdiction
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            {jurisdiction.disclaimer}
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/analysis"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Explore Free AI Match Outlook
            </Link>
            <Link
              href="/responsible-gambling"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
            >
              Responsible Gaming Guidelines
            </Link>
          </div>
        </div>
      ) : (
        /* PERMITTED JURISDICTION: FULL LICENSED COMPARISON */
        <div className="space-y-6">
          
          {/* Odds Comparison Table */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  India vs Pakistan — Grand Final Odds Comparison
                </h2>
                <p className="text-[11px] text-slate-400">Verified decimal odds from licensed bookmakers.</p>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Updated in Real-Time</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Market</th>
                    <th className="py-3 px-4">Licensed Bookmaker</th>
                    <th className="py-3 px-3 text-right">India Odds</th>
                    <th className="py-3 px-3 text-right">Pakistan Odds</th>
                    <th className="py-3 px-3 text-center">Movement</th>
                    <th className="py-3 px-4 text-right">Last Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {BETTING_ODDS_COMPARISON.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-bold text-white">{item.marketName}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">{item.providerName}</td>
                      <td className="py-3 px-3 text-right font-black text-white score-value text-sm">
                        {item.teamAOdds.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-black text-slate-300 score-value text-sm">
                        {item.teamBOdds.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.trend === "DOWN" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                        }`}>
                          {item.trend === "DOWN" ? "Shortening ↓" : "Drifting ↑"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500 text-[11px]">{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950/40 border-t border-slate-800 text-[11px] text-slate-500">
              Note: This table is an objective comparison of available licensed bookmaker odds. It is NOT a betting recommendation or endorsement.
            </div>
          </div>

          {/* Odds Movement Chart (Time -> Odds shift) */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Historical Odds Movement Progression (Toss to Current)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Tracking market sentiment shifts as the match situation evolved from Toss through the run-chase.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  India Odds (1.85 → 4.80 → 1.55)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Pakistan Odds (1.95 → 1.18 → 2.45)
                </span>
              </div>
            </div>

            {/* SVG Odds Chart */}
            <div className="h-56 w-full relative flex items-end pt-6 pb-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* India odds line (blue) */}
                <path
                  d={`M 0 ${180 - (ODDS_MOVEMENT_HISTORY[0].teamAOdds / 5) * 180} ${ODDS_MOVEMENT_HISTORY.map((pt, i) => {
                    const x = (i / (ODDS_MOVEMENT_HISTORY.length - 1)) * 500;
                    const y = 180 - (pt.teamAOdds / 5) * 180;
                    return `L ${x} ${y}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#00B0FF"
                  strokeWidth="3"
                />
                {/* Pakistan odds line (emerald) */}
                <path
                  d={`M 0 ${180 - (ODDS_MOVEMENT_HISTORY[0].teamBOdds / 5) * 180} ${ODDS_MOVEMENT_HISTORY.map((pt, i) => {
                    const x = (i / (ODDS_MOVEMENT_HISTORY.length - 1)) * 500;
                    const y = 180 - (pt.teamBOdds / 5) * 180;
                    return `L ${x} ${y}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#00E676"
                  strokeWidth="2.5"
                />
                {/* Dots */}
                {ODDS_MOVEMENT_HISTORY.map((pt, i) => (
                  <g key={i}>
                    <circle cx={(i / (ODDS_MOVEMENT_HISTORY.length - 1)) * 500} cy={180 - (pt.teamAOdds / 5) * 180} r="4" fill="#00B0FF" stroke="#080C14" strokeWidth="2" />
                    <circle cx={(i / (ODDS_MOVEMENT_HISTORY.length - 1)) * 500} cy={180 - (pt.teamBOdds / 5) * 180} r="4" fill="#00E676" stroke="#080C14" strokeWidth="2" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="grid grid-cols-7 text-[10px] text-slate-500 text-center font-mono pt-2 border-t border-slate-800">
              {ODDS_MOVEMENT_HISTORY.map((pt, i) => (
                <div key={i} className="truncate">
                  <span>{pt.overOrTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible Gambling Help Bar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Need confidential gambling support?</h4>
              <p className="text-slate-400">
                Free, anonymous help is available 24/7. GamCare: <strong>0808 8020 133</strong> • BeGambleAware.org
              </p>
            </div>
            <Link
              href="/responsible-gambling"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition shrink-0"
            >
              Responsible Gaming Hub
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
