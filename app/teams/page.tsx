"use client";

import React from "react";
import Link from "next/link";
import { Users, Trophy, ArrowRight, Star } from "lucide-react";
import { TEAMS } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export default function TeamsPage() {
  const { favorites } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
          <Users className="w-4 h-4" />
          <span>International & Franchise Teams</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          CRICKET TEAMS DIRECTORY
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Official ICC rankings, squad rosters, recent form trackers and team leaders.
        </p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.values(TEAMS).map(team => {
          const isFav = favorites.teams.includes(team.code);
          return (
            <div
              key={team.id}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-lg text-emerald-400">
                    {team.code}
                  </div>
                  <button
                    onClick={() => favorites.toggleTeam(team.code)}
                    className={`p-2 rounded-lg border transition ${
                      isFav 
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40" 
                        : "bg-slate-800 text-slate-500 hover:text-slate-300 border-slate-700"
                    }`}
                    title={isFav ? "Unfollow Team" : "Follow Team"}
                  >
                    <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-1">
                  {team.name}
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  Captain: <strong className="text-slate-200">{team.captain}</strong> • Coach: <strong className="text-slate-200">{team.coach}</strong>
                </p>

                {/* ICC Rankings Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">T20 Rank</span>
                    <span className="font-extrabold text-emerald-400">#{team.iccRankings.t20}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">ODI Rank</span>
                    <span className="font-extrabold text-blue-400">#{team.iccRankings.odi}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Test Rank</span>
                    <span className="font-extrabold text-amber-400">#{team.iccRankings.test}</span>
                  </div>
                </div>

                {/* Form Tracker */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Recent 5 Form:</span>
                  <div className="flex items-center gap-1">
                    {team.recentForm.map((r, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                          r === "W" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{team.homeVenue}</span>
                <Link
                  href={`/teams/${team.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>Team Profile</span>
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
