"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Trophy, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { TEAMS, PLAYERS, ALL_MATCHES } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export default function TeamProfilePage() {
  const params = useParams();
  const teamId = params?.id as string;
  const team = TEAMS[teamId] || TEAMS.IND;
  const { favorites } = useApp();

  const isFav = favorites.teams.includes(team.code);
  const teamPlayers = Object.values(PLAYERS).filter(p => p.teamCode === team.code);
  const teamMatches = ALL_MATCHES.filter(m => m.teamA.code === team.code || m.teamB.code === team.code);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Back Link */}
      <Link
        href="/teams"
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Teams Directory</span>
      </Link>

      {/* Team Profile Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-2xl text-emerald-400">
              {team.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{team.name}</h1>
                <button
                  onClick={() => favorites.toggleTeam(team.code)}
                  className={`p-1.5 rounded-lg border transition ${
                    isFav ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                  title="Favorite Team"
                >
                  <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Captain: <strong className="text-white">{team.captain}</strong> • Head Coach: <strong className="text-white">{team.coach}</strong>
              </p>
            </div>
          </div>

          {/* ICC Rankings Badges */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">T20I</span>
              <span className="font-extrabold text-emerald-400 text-sm">#{team.iccRankings.t20}</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">ODI</span>
              <span className="font-extrabold text-blue-400 text-sm">#{team.iccRankings.odi}</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Test</span>
              <span className="font-extrabold text-amber-400 text-sm">#{team.iccRankings.test}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Roster & Players */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <span>Active Squad Roster</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamPlayers.map(player => (
            <Link
              key={player.id}
              href={`/players/${player.id}`}
              className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-emerald-400">
                  {player.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition flex items-center gap-1.5">
                    <span>{player.name}</span>
                    {player.isCaptain && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">C</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {player.role} • {player.battingStyle}
                  </div>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition" />
            </Link>
          ))}
        </div>
      </div>

      {/* Team Matches & Schedule */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Fixtures & Recent Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMatches.map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">{m.tournamentName}</span>
                <span className="text-xs font-bold text-white">{m.teamA.code} vs {m.teamB.code}</span>
                <span className="text-xs text-emerald-400 block mt-1">{m.statusText}</span>
              </div>
              <Link
                href={`/match/${m.id}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Match Center
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
