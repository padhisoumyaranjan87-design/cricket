"use client";

import React, { useState } from "react";
import { WinProbability, Innings } from "@/lib/types";
import { Activity, BarChart2, TrendingUp, AlertCircle } from "lucide-react";

interface WinProbabilityChartProps {
  winProbability: WinProbability;
  teamAName: string;
  teamBName: string;
  teamACode: string;
  teamBCode: string;
  innings: Innings[];
}

export function WinProbabilityChart({
  winProbability,
  teamAName,
  teamBName,
  teamACode,
  teamBCode,
  innings
}: WinProbabilityChartProps) {
  const [activeTab, setActiveTab] = useState<"PROBABILITY" | "WORM" | "MANHATTAN">("PROBABILITY");

  // Worm graph calculation
  const inn1 = innings[0];
  const inn2 = innings[1];

  let cumulative1 = 0;
  const wormData1 = inn1?.runsPerOver.map(r => {
    cumulative1 += r.runs;
    return { over: r.over, runs: cumulative1, wickets: r.wickets };
  }) || [];

  let cumulative2 = 0;
  const wormData2 = inn2?.runsPerOver.map(r => {
    cumulative2 += r.runs;
    return { over: r.over, runs: cumulative2, wickets: r.wickets };
  }) || [];

  const maxWormRuns = Math.max(
    inn1?.runs || 200,
    inn2?.runs || 200,
    220
  );

  return (
    <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5 shadow-sm space-y-4">
      
      {/* Chart Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("PROBABILITY")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "PROBABILITY" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Win Probability</span>
          </button>

          <button
            onClick={() => setActiveTab("WORM")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "WORM" 
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/40" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Worm Comparison</span>
          </button>

          <button
            onClick={() => setActiveTab("MANHATTAN")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "MANHATTAN" 
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/40" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Manhattan (RPO)</span>
          </button>
        </div>

        {/* Real-time probability numbers */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-blue-400">{teamACode}: {winProbability.teamAWinPercentage}%</span>
          <span className="text-slate-500">vs</span>
          <span className="text-emerald-400">{teamBCode}: {winProbability.teamBWinPercentage}%</span>
        </div>
      </div>

      {/* 1. Dynamic Win Probability Chart */}
      {activeTab === "PROBABILITY" && (
        <div className="space-y-4">
          <div className="h-60 w-full relative flex items-end pt-8 pb-6 px-2">
            {/* Background probability grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-slate-400">
              <div className="border-b border-slate-700 w-full">100% ({teamACode})</div>
              <div className="border-b border-slate-700 w-full">75%</div>
              <div className="border-b border-slate-700 border-dashed w-full">50% (TIE / EVEN)</div>
              <div className="border-b border-slate-700 w-full">25%</div>
              <div className="border-b border-slate-700 w-full">0% ({teamBCode})</div>
            </div>

            {/* Render SVG Line Chart */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="probGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00B0FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00E676" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Area path */}
              {winProbability.history.length > 1 && (
                <path
                  d={`M 0 200 ${winProbability.history.map((pt, i) => {
                    const x = (i / (winProbability.history.length - 1)) * 500;
                    const y = 200 - (pt.teamAPercentage / 100) * 200;
                    return `L ${x} ${y}`;
                  }).join(" ")} L 500 200 Z`}
                  fill="url(#probGrad)"
                />
              )}

              {/* Line path */}
              {winProbability.history.length > 1 && (
                <path
                  d={`M 0 ${200 - (winProbability.history[0].teamAPercentage / 100) * 200} ${winProbability.history.map((pt, i) => {
                    const x = (i / (winProbability.history.length - 1)) * 500;
                    const y = 200 - (pt.teamAPercentage / 100) * 200;
                    return `L ${x} ${y}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#00B0FF"
                  strokeWidth="3"
                />
              )}

              {/* Data points */}
              {winProbability.history.map((pt, i) => {
                const x = (i / (winProbability.history.length - 1)) * 500;
                const y = 200 - (pt.teamAPercentage / 100) * 200;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#00E676" stroke="#080C14" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Innings Start (0 ov)</span>
            <span>Middle Phase (10 ov)</span>
            <span>Death Overs (18.2 ov)</span>
          </div>

          {/* Model Outlook Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Model-based match outlook:</strong> {winProbability.modelNote}
            </div>
          </div>
        </div>
      )}

      {/* 2. Worm Chart (Cumulative Runs Comparison) */}
      {activeTab === "WORM" && (
        <div className="space-y-4">
          <div className="h-60 w-full relative flex items-end pt-8 pb-6 px-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* Innings 1 Line (Team B / Pakistan 209) */}
              {wormData1.length > 1 && (
                <path
                  d={`M 0 200 ${wormData1.map((pt, i) => {
                    const x = (i / 19) * 500;
                    const y = 200 - (pt.runs / maxWormRuns) * 200;
                    return `L ${x} ${y}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#00E676"
                  strokeWidth="2.5"
                />
              )}

              {/* Innings 2 Line (Team A / India 184) */}
              {wormData2.length > 1 && (
                <path
                  d={`M 0 200 ${wormData2.map((pt, i) => {
                    const x = (i / 19) * 500;
                    const y = 200 - (pt.runs / maxWormRuns) * 200;
                    return `L ${x} ${y}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#00B0FF"
                  strokeWidth="3"
                />
              )}
            </svg>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3 h-1 bg-blue-500 rounded" />
              {teamAName} (Chasing: {inn2?.runs}/{inn2?.wickets})
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-1 bg-emerald-500 rounded" />
              {teamBName} (1st Inn: {inn1?.runs}/{inn1?.wickets})
            </span>
          </div>
        </div>
      )}

      {/* 3. Manhattan Chart (Runs Per Over) */}
      {activeTab === "MANHATTAN" && (
        <div className="space-y-4">
          <div className="h-60 w-full flex items-end justify-between gap-1 pt-6 pb-2">
            {inn1?.runsPerOver.slice(0, 20).map((over, i) => {
              const r2 = inn2?.runsPerOver[i]?.runs || 0;
              const maxBar = 25;
              const h1 = (over.runs / maxBar) * 100;
              const h2 = (r2 / maxBar) * 100;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end group">
                  <div className="flex items-end gap-0.5 w-full justify-center">
                    {/* Team A bar */}
                    <div 
                      className="w-1.5 sm:w-2.5 rounded-t bg-blue-500 group-hover:bg-blue-400 transition" 
                      style={{ height: `${Math.min(100, Math.max(8, h2))}%` }}
                      title={`${teamACode} Ov ${i+1}: ${r2} runs`}
                    />
                    {/* Team B bar */}
                    <div 
                      className="w-1.5 sm:w-2.5 rounded-t bg-emerald-500 group-hover:bg-emerald-400 transition" 
                      style={{ height: `${Math.min(100, Math.max(8, h1))}%` }}
                      title={`${teamBCode} Ov ${i+1}: ${over.runs} runs`}
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1">{i + 1}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
              {teamACode} Runs Per Over
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
              {teamBCode} Runs Per Over
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
