"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  SlidersHorizontal, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Server, 
  Database, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { useApp } from "@/lib/app-context";

export default function AdminDashboardPage() {
  const { 
    liveMatch, 
    isSimulating, 
    toggleSimulation, 
    stepNextBall, 
    resetMatch,
    jurisdiction,
    setJurisdictionCode
  } = useApp();

  const [apiHealth, setApiHealth] = useState([
    { name: "CricAPI Official Gateway", status: "HEALTHY", latency: "42ms", uptime: "99.98%" },
    { name: "Sportradar Radarfeed Connector", status: "HEALTHY", latency: "68ms", uptime: "99.95%" },
    { name: "Sportmonks WebSocket Server", status: "ONLINE", latency: "18ms", uptime: "100%" },
    { name: "Bet365 / Licensed Odds Ingestion", status: "HEALTHY", latency: "115ms", uptime: "99.91%" },
    { name: "Official Ticket Partner Sync (BookMyShow)", status: "HEALTHY", latency: "88ms", uptime: "99.90%" }
  ]);

  const [killSwitchActive, setKillSwitchActive] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <SlidersHorizontal className="w-4 h-4" />
            <span>CRICPULSE Operations & Broadcast Control Room</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ADMIN & BROADCAST DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time delivery injection engine, licensed API health monitoring and regulatory compliance switchboard.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold">Admin Console Mode</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400">Authenticated (Root)</span>
        </div>
      </div>

      {/* Grid: 1. Live Simulator Ingestion & 2. API Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Simulator Ingestion Console (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Live Match Event Dispatcher</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
              Broadcast Simulator
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-400">Active Live Match:</div>
            <div className="text-sm font-bold text-white">
              {liveMatch.teamA.name} vs {liveMatch.teamB.name} ({liveMatch.tournamentName})
            </div>
            <div className="text-emerald-400 font-mono font-semibold">
              Score: {liveMatch.innings[1]?.runs}/{liveMatch.innings[1]?.wickets} ({liveMatch.innings[1]?.overs} ov) • Need {Math.max(0, (liveMatch.target || 0) - (liveMatch.innings[1]?.runs || 0))} in {Math.max(0, 120 - Math.floor(liveMatch.innings[1]?.overs || 0)*6 - Math.round(((liveMatch.innings[1]?.overs || 0)%1)*10))} balls
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                isSimulating 
                  ? "bg-amber-500 text-slate-950" 
                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              }`}
            >
              {isSimulating ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isSimulating ? "Pause Simulator" : "Autoplay Live Deliveries"}</span>
            </button>

            <button
              onClick={() => stepNextBall()}
              disabled={isSimulating}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 disabled:opacity-40 transition"
            >
              Deliver Random Ball
            </button>

            <button
              onClick={resetMatch}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Match</span>
            </button>
          </div>

          {/* Force Specific Broadcast Events */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Inject Delivery Event Directly:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => stepNextBall({ runs: 4, isBoundary: true, shortDesc: "FOUR", commentaryText: "[ADMIN INJECTED] Smashed past point for FOUR!" })}
                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30"
              >
                +4 FOUR Runs
              </button>
              <button
                onClick={() => stepNextBall({ runs: 6, isBoundary: true, isSix: true, shortDesc: "SIX", commentaryText: "[ADMIN INJECTED] Towering maximum over long-off!" })}
                className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30"
              >
                +6 SIX Runs
              </button>
              <button
                onClick={() => stepNextBall({ runs: 0, isWicket: true, isDot: true, shortDesc: "WICKET", commentaryText: "[ADMIN INJECTED] Bowled him! Off-stump knocked out of ground!" })}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/30"
              >
                WICKET (Timber)
              </button>
              <button
                onClick={() => stepNextBall({ runs: 1, shortDesc: "1 run", commentaryText: "[ADMIN INJECTED] Pushed to deep mid-wicket for a single." })}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                1 Single Run
              </button>
              <button
                onClick={() => stepNextBall({ runs: 0, isDot: true, shortDesc: "Dot ball", commentaryText: "[ADMIN INJECTED] Play and a miss outside off!" })}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                Dot Ball
              </button>
              <button
                onClick={() => stepNextBall({ runs: 1, isWide: true, shortDesc: "1 run (WD)", commentaryText: "[ADMIN INJECTED] Fired wide down leg side." })}
                className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
              >
                Wide Ball (+1)
              </button>
            </div>
          </div>
        </div>

        {/* API Health & Gateway Status (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">External API Health</h2>
            </div>
            <button 
              onClick={() => alert("API ping refreshed: All endpoints nominal.")}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
              title="Refresh Health Status"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {apiHealth.map((api, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{api.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Latency: <span className="text-slate-300 font-mono">{api.latency}</span> • Uptime: <span className="text-emerald-400 font-mono">{api.uptime}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                  {api.status}
                </span>
              </div>
            ))}
          </div>

          {/* Cache & System Diagnostics */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">System Infrastructure</div>
            <div className="flex justify-between text-slate-300">
              <span>WebSocket / SSE Subscribers:</span>
              <strong className="text-emerald-400 font-mono">1,482 Active</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Redis Cache Hit Rate:</span>
              <strong className="text-blue-400 font-mono">98.4%</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Event Latency to Clients:</span>
              <strong className="text-emerald-400 font-mono">~18ms</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Compliance & Regulatory Kill Switches */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Regulatory Compliance & Regional Kill Switches</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-white">Global Betting Kill-Switch</div>
            <p className="text-slate-400 text-[11px]">
              Instantly disable odds comparison across all frontend pages globally.
            </p>
            <button
              onClick={() => setKillSwitchActive(!killSwitchActive)}
              className={`w-full py-1.5 rounded-lg font-bold transition ${
                killSwitchActive ? "bg-red-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {killSwitchActive ? "KILL SWITCH ENGAGED (ALL OFF)" : "Status: Normal (Regulated Only)"}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-white">Jurisdiction Override (Testing)</div>
            <p className="text-slate-400 text-[11px]">
              Currently simulating: <strong className="text-emerald-400">{jurisdiction.name}</strong>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setJurisdictionCode("UK")}
                className="flex-1 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
              >
                Set UK
              </button>
              <button
                onClick={() => setJurisdictionCode("IND")}
                className="flex-1 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
              >
                Set India
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-white">Responsible Gambling Banner</div>
            <p className="text-slate-400 text-[11px]">
              Persistent footer and odds advisory banners are strictly mandated by platform policy.
            </p>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mandatory Enforced Active</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
