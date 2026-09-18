"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Star, Trophy, Activity, Award, Flame } from "lucide-react";
import { PLAYERS } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { PlayerFormatStats } from "@/lib/types";

export default function PlayerProfilePage() {
  const params = useParams();
  const playerId = params?.id as string;
  const player = PLAYERS[playerId] || PLAYERS["virat-kohli"];
  const { favorites } = useApp();

  const [format, setFormat] = useState<"t20" | "odi" | "test">("t20");
  const isFav = favorites.players.includes(player.id);

  const stats: PlayerFormatStats = player.stats[format];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Back Link */}
      <Link
        href="/players"
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Players Directory</span>
      </Link>

      {/* Player Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-2xl sm:text-3xl text-emerald-400">
              {player.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{player.name}</h1>
                <button
                  onClick={() => favorites.togglePlayer(player.id)}
                  className={`p-1.5 rounded-lg border transition ${
                    isFav ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                  title="Favorite Player"
                >
                  <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-white">{player.country}</span>
                <span>•</span>
                <span>{player.role}</span>
                <span>•</span>
                <span>{player.battingStyle}</span>
                {player.bowlingStyle !== "None" && (
                  <>
                    <span>•</span>
                    <span>{player.bowlingStyle}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Format Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
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
      </div>

      {/* Recent Form Cards */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Recent 5 Innings Form Tracker</span>
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {player.recentForm.batting.map((score, i) => (
            <div
              key={i}
              className={`px-4 py-2.5 rounded-xl border text-center min-w-[70px] ${
                score >= 100 
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-300" 
                  : score >= 50 
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                  : "bg-slate-950 border-slate-800 text-slate-300"
              }`}
            >
              <div className="text-[10px] uppercase text-slate-500 font-semibold">Match {5 - i}</div>
              <div className="text-lg font-black">{score}</div>
            </div>
          ))}
          {player.recentForm.bowling && player.recentForm.bowling.map((fig, i) => (
            <div key={i} className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[70px]">
              <div className="text-[10px] uppercase text-slate-500 font-semibold">Spell {5 - i}</div>
              <div className="text-lg font-black text-red-400">{fig}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Career Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Batting Records */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Batting Statistics ({format.toUpperCase()})</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Matches</span>
              <span className="text-base font-extrabold text-white">{stats.matches}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Runs</span>
              <span className="text-base font-extrabold text-white">{stats.runs.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Average</span>
              <span className="text-base font-extrabold text-emerald-400">{stats.battingAverage}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Strike Rate</span>
              <span className="text-base font-extrabold text-emerald-400">{stats.strikeRate}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Highest Score</span>
              <span className="text-base font-extrabold text-amber-400">{stats.highestScore}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">100s / 50s</span>
              <span className="text-base font-extrabold text-white">{stats.hundreds} / {stats.fifties}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Fours (4s)</span>
              <span className="text-base font-extrabold text-white">{stats.fours}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Sixes (6s)</span>
              <span className="text-base font-extrabold text-white">{stats.sixes}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Boundary %</span>
              <span className="text-base font-extrabold text-emerald-400">{stats.boundaryPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Bowling & Fielding Records */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-400" />
            <span>Bowling & Fielding Statistics ({format.toUpperCase()})</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Wickets</span>
              <span className="text-base font-extrabold text-white">{stats.wickets}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Bowling Avg</span>
              <span className="text-base font-extrabold text-emerald-400">{stats.bowlingAverage || "-"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Economy</span>
              <span className="text-base font-extrabold text-amber-400">{stats.economy || "-"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Best Figures</span>
              <span className="text-base font-extrabold text-white">{stats.bestBowling}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">4w / 5w Hauls</span>
              <span className="text-base font-extrabold text-white">{stats.fourWickets} / {stats.fiveWickets}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Catches</span>
              <span className="text-base font-extrabold text-white">{stats.catches}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
