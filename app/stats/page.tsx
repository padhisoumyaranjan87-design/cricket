"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BarChart3, Filter, Award, Flame, Shield, ArrowRight } from "lucide-react";
import { PLAYERS } from "@/lib/mock-data";

export default function AdvancedStatsPage() {
  const [format, setFormat] = useState<"t20" | "odi" | "test">("t20");
  const [statCategory, setStatCategory] = useState<"BATTING" | "BOWLING" | "FIELDING">("BATTING");

  const playerList = Object.values(PLAYERS);

  // Sorted batting by runs
  const topRunScorers = [...playerList].sort((a, b) => b.stats[format].runs - a.stats[format].runs);

  // Sorted bowling by wickets
  const topWicketTakers = [...playerList].filter(p => p.stats[format].wickets > 0).sort((a, b) => b.stats[format].wickets - a.stats[format].wickets);

  // Sorted by catches
  const topFielders = [...playerList].sort((a, b) => b.stats[format].catches - a.stats[format].catches);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Cricket Historical Analytics & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ADVANCED STATISTICS DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deep dive into international batting, bowling and fielding metrics across all formats.
          </p>
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {(["t20", "odi", "test"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                format === f 
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f === "t20" ? "T20I" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
        {[
          { id: "BATTING", label: "Batting Leaderboards", icon: Award },
          { id: "BOWLING", label: "Bowling Leaderboards", icon: Flame },
          { id: "FIELDING", label: "Fielding & Dismissals", icon: Shield }
        ].map(cat => {
          const Icon = cat.icon;
          const isActive = statCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setStatCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                isActive 
                  ? "bg-slate-800 text-emerald-400 border border-slate-700" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. BATTING TABLE */}
      {statCategory === "BATTING" && (
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Batting Leaders ({format.toUpperCase()})
            </h2>
            <span className="text-xs text-slate-400">Ranked by Total Runs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-3 text-right">Matches</th>
                  <th className="py-3 px-3 text-right">Runs</th>
                  <th className="py-3 px-3 text-right">Average</th>
                  <th className="py-3 px-3 text-right">Strike Rate</th>
                  <th className="py-3 px-3 text-right">100s / 50s</th>
                  <th className="py-3 px-3 text-right">4s / 6s</th>
                  <th className="py-3 px-4 text-right">Boundary %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {topRunScorers.map(p => {
                  const s = p.stats[format];
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <Link href={`/players/${p.id}`} className="hover:text-emerald-400 transition">
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-normal">({p.country})</span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 tabular-numbers">{s.matches}</td>
                      <td className="py-3 px-3 text-right font-black text-white text-sm score-value">{s.runs.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold tabular-numbers">{s.battingAverage}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold tabular-numbers">{s.strikeRate}</td>
                      <td className="py-3 px-3 text-right text-slate-300 tabular-numbers">{s.hundreds} / {s.fifties}</td>
                      <td className="py-3 px-3 text-right text-slate-300 tabular-numbers">{s.fours} / {s.sixes}</td>
                      <td className="py-3 px-4 text-right text-amber-400 font-semibold tabular-numbers">{s.boundaryPercentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. BOWLING TABLE */}
      {statCategory === "BOWLING" && (
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Bowling Leaders ({format.toUpperCase()})
            </h2>
            <span className="text-xs text-slate-400">Ranked by Total Wickets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Bowler</th>
                  <th className="py-3 px-3 text-right">Matches</th>
                  <th className="py-3 px-3 text-right">Wickets</th>
                  <th className="py-3 px-3 text-right">Average</th>
                  <th className="py-3 px-3 text-right">Economy</th>
                  <th className="py-3 px-3 text-right">Best Bowling</th>
                  <th className="py-3 px-4 text-right">4w / 5w Hauls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {topWicketTakers.map(p => {
                  const s = p.stats[format];
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <Link href={`/players/${p.id}`} className="hover:text-emerald-400 transition">
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-normal">({p.country})</span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 tabular-numbers">{s.matches}</td>
                      <td className="py-3 px-3 text-right font-black text-red-400 text-sm score-value">{s.wickets}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold tabular-numbers">{s.bowlingAverage || "-"}</td>
                      <td className="py-3 px-3 text-right text-amber-400 font-bold tabular-numbers">{s.economy || "-"}</td>
                      <td className="py-3 px-3 text-right text-white font-mono">{s.bestBowling}</td>
                      <td className="py-3 px-4 text-right text-slate-300 tabular-numbers">{s.fourWickets} / {s.fiveWickets}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. FIELDING TABLE */}
      {statCategory === "FIELDING" && (
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Fielding Leaders ({format.toUpperCase()})
            </h2>
            <span className="text-xs text-slate-400">Ranked by Total Dismissals</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Fielder</th>
                  <th className="py-3 px-3 text-right">Matches</th>
                  <th className="py-3 px-3 text-right">Catches</th>
                  <th className="py-3 px-4 text-right">Stumpings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {topFielders.map(p => {
                  const s = p.stats[format];
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <Link href={`/players/${p.id}`} className="hover:text-emerald-400 transition">
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-normal">({p.country})</span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 tabular-numbers">{s.matches}</td>
                      <td className="py-3 px-3 text-right font-black text-white score-value">{s.catches}</td>
                      <td className="py-3 px-4 text-right text-slate-300 tabular-numbers">{s.stumpings}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
