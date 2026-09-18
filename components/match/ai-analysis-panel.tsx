"use client";

import React from "react";
import { Brain, Sparkles, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";
import { MatchSituationAnalysis } from "@/lib/types";

interface AIAnalysisPanelProps {
  analysis: MatchSituationAnalysis;
  teamAName: string;
  teamBName: string;
}

export function AIAnalysisPanel({ analysis, teamAName, teamBName }: AIAnalysisPanelProps) {
  const getMomentumPosition = () => {
    if (analysis.momentum === "BATTER_DOMINANCE") return "75%";
    if (analysis.momentum === "BOWLER_DOMINANCE") return "25%";
    return "50%";
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Mandatory Non-Guaranteed Disclaimer */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-start gap-3">
        <Brain className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            CRICPULSE AI Match Analytics Engine
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold border border-cyan-500/30">
              Statistical Model
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Synthesized analytical insights based on real-time wagon wheels, phase scoring differentials, venue averages, and bowler-batter historical matchups.
            <strong className="text-slate-300 ml-1 font-semibold">AI analysis is informational and model-projected, not guaranteed.</strong>
          </p>
        </div>
      </div>

      {/* 1. Current Match Situation Synthesis */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Match Tactical Situation</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          {analysis.situation}
        </p>
      </div>

      {/* 2. Momentum Gauge */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Innings Momentum Indicator</span>
          <span className="text-xs font-extrabold text-emerald-400">
            {analysis.momentum.replace("_", " ")}
          </span>
        </h4>

        {/* Dynamic Indicator Track */}
        <div className="relative pt-2 pb-6">
          <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
            <div className="w-1/3 h-full bg-red-500/50" />
            <div className="w-1/3 h-full bg-amber-500/50" />
            <div className="w-1/3 h-full bg-emerald-500/50" />
          </div>

          {/* Slider Pin */}
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700"
            style={{ left: getMomentumPosition() }}
          >
            <div className="w-4 h-4 rounded-full bg-white border-2 border-emerald-400 shadow-md shadow-emerald-500/50" />
            <span className="text-[10px] font-bold text-white mt-1 uppercase">
              Current
            </span>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-3">
            <span className="text-red-400">Bowler Dominance</span>
            <span className="text-amber-400">Balanced Contest</span>
            <span className="text-emerald-400">Batter Dominance</span>
          </div>
        </div>
      </div>

      {/* 3. Batting vs Bowling Statistical Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Batting Phase Diagnostics */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Batting Phase Analytics
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Current Run Rate</span>
              <span className="font-bold text-emerald-400">{analysis.battingAnalysis.currentRunRate}</span>
            </div>
            {analysis.battingAnalysis.requiredRunRate && (
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Required Run Rate</span>
                <span className="font-bold text-amber-400">{analysis.battingAnalysis.requiredRunRate}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Boundary Percentage</span>
              <span className="font-bold text-white">{analysis.battingAnalysis.boundaryPercentage}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Dot Ball Percentage</span>
              <span className="font-bold text-white">{analysis.battingAnalysis.dotBallPercentage}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Strike Rotation Rate</span>
              <span className="font-bold text-white">{analysis.battingAnalysis.strikeRotationRate}%</span>
            </div>
            <div className="pt-1">
              <span className="text-[11px] text-slate-500 block">Death Over Execution:</span>
              <span className="text-xs text-slate-300 font-medium">{analysis.battingAnalysis.deathOverScoring}</span>
            </div>
          </div>
        </div>

        {/* Bowling Phase Diagnostics */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Bowling Phase Analytics
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Combined Economy</span>
              <span className="font-bold text-white">{analysis.bowlingAnalysis.economy}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Bowling Dot Ball %</span>
              <span className="font-bold text-white">{analysis.bowlingAnalysis.dotBallPercentage}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Boundaries Conceded</span>
              <span className="font-bold text-amber-400">{analysis.bowlingAnalysis.boundariesConceded}</span>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-[11px] text-slate-500 block">Crucial Matchup Driver:</span>
              <span className="text-xs text-slate-300 font-medium leading-relaxed">{analysis.bowlingAnalysis.keyMatchup}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Top Statistical Factors Influencing Match */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Key Decisive Statistical Factors</span>
        </h4>
        <div className="space-y-2.5">
          {analysis.keyFactors.map((factor, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
