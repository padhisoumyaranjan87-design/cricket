"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Filter, ArrowRight, Star } from "lucide-react";
import { PLAYERS } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export default function PlayersPage() {
  const { favorites } = useApp();
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const playerList = Object.values(PLAYERS).filter(p => {
    if (roleFilter !== "ALL" && p.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <User className="w-4 h-4" />
            <span>Cricket Elite Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            PLAYERS & CAREER ARCHIVES
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Career batting and bowling records across T20I, ODI, and Test cricket with form trackers.
          </p>
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar text-xs">
          {["ALL", "Batter", "Bowler", "Wicket-Keeper"].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                roleFilter === role 
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {playerList.map(player => {
          const isFav = favorites.players.includes(player.id);
          const t20Stats = player.stats.t20;

          return (
            <div
              key={player.id}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-lg text-emerald-400">
                    {player.name.charAt(0)}
                  </div>
                  <button
                    onClick={() => favorites.togglePlayer(player.id)}
                    className={`p-2 rounded-lg border transition ${
                      isFav 
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40" 
                        : "bg-slate-800 text-slate-500 hover:text-slate-300 border-slate-700"
                    }`}
                    title={isFav ? "Unfollow Player" : "Follow Player"}
                  >
                    <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                    {player.name}
                  </h2>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                    {player.country}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">
                  {player.role} • {player.battingStyle}
                </p>

                {/* Key Stats Quick Box */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
                  {player.role === "Bowler" ? (
                    <>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Wickets</span>
                        <span className="font-extrabold text-white text-sm">{t20Stats.wickets}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Avg</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{t20Stats.bowlingAverage}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Economy</span>
                        <span className="font-extrabold text-amber-400 text-sm">{t20Stats.economy}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Runs</span>
                        <span className="font-extrabold text-white text-sm">{t20Stats.runs}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Avg</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{t20Stats.battingAverage}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Strike Rate</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{t20Stats.strikeRate}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Recent 5 Form Chips */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Recent 5 Form:</span>
                  <div className="flex items-center gap-1">
                    {player.recentForm.batting.map((score, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-200 border border-slate-700"
                      >
                        {score}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{t20Stats.matches} T20 Matches</span>
                <Link
                  href={`/players/${player.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
