"use client";

import React from "react";
import { Play, Pause, FastForward, RotateCcw, AlertTriangle, Zap } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function SimulatorControls() {
  const { 
    isSimulating, 
    toggleSimulation, 
    stepNextBall, 
    resetMatch 
  } = useApp();

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Simulator Info & Demo Label */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Live Delivery Simulator
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
            DEMO SIMULATOR — NOT LIVE
          </span>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              isSimulating 
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20" 
                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSimulating ? "Pause Auto-Delivery" : "Start Auto-Delivery"}</span>
          </button>

          <button
            onClick={() => stepNextBall()}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 disabled:opacity-40 transition"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Next Ball</span>
          </button>

          <button
            onClick={resetMatch}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset Match State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Manual Injection Triggers Bar */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Trigger Ball Event:
        </span>

        <button
          onClick={() => stepNextBall({ runs: 4, isBoundary: true, shortDesc: "FOUR", commentaryText: "CRACKING SHOT! Drifts on middle and leg, swiveled and whipped over square leg for a magnificent FOUR!" })}
          disabled={isSimulating}
          className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[11px] disabled:opacity-40 transition"
        >
          +4 FOUR
        </button>

        <button
          onClick={() => stepNextBall({ runs: 6, isBoundary: true, isSix: true, shortDesc: "SIX", commentaryText: "MAXIMUM! Massive strike towering high into the night sky, clears the deep mid-wicket ropes with ease!" })}
          disabled={isSimulating}
          className="px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30 text-[11px] disabled:opacity-40 transition"
        >
          +6 SIX
        </button>

        <button
          onClick={() => stepNextBall({ runs: 0, isWicket: true, isDot: true, shortDesc: "WICKET", commentaryText: "OUT! GONE! Castle broken! Yorker zeroes in on leg-stump, misses the flick and timber is disturbed!" })}
          disabled={isSimulating}
          className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/30 text-[11px] disabled:opacity-40 transition"
        >
          WICKET
        </button>

        <button
          onClick={() => stepNextBall({ runs: 0, isDot: true, shortDesc: "Dot ball", commentaryText: "Beaten all ends up! Seams away sharply outside off stump, beaten on the outside edge." })}
          disabled={isSimulating}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 text-[11px] disabled:opacity-40 transition"
        >
          Dot Ball
        </button>

        <button
          onClick={() => stepNextBall({ runs: 1, isWide: true, shortDesc: "1 run (WD)", commentaryText: "Fired well outside the tramlines on the off-side. Umpire signals Wide delivery." })}
          disabled={isSimulating}
          className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px] disabled:opacity-40 transition"
        >
          Wide (+1)
        </button>
      </div>
    </div>
  );
}
