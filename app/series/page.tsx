"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Calendar, Users, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { TOURNAMENTS } from "@/lib/mock-data";

export default function SeriesOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
          <Trophy className="w-4 h-4" />
          <span>Major Cricket Competitions & Standings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          CRICKET TOURNAMENTS & SERIES
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore tournament fixtures, live points tables, net run rates (NRR), and venue schedules.
        </p>
      </div>

      {/* Series Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOURNAMENTS.map(tournament => (
          <div
            key={tournament.id}
            className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold uppercase border border-slate-700">
                  {tournament.format}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Host: <strong className="text-white">{tournament.hostCountry}</strong>
                </span>
              </div>

              <h2 className="text-xl font-black text-white mb-2">
                {tournament.name}
              </h2>

              <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Teams</span>
                  <span className="font-extrabold text-white text-sm">{tournament.teamsCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Matches</span>
                  <span className="font-extrabold text-white text-sm">{tournament.totalMatches}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Completed</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{tournament.completedMatches}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{tournament.startDate} to {tournament.endDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Points Table & Results</span>
              <Link
                href={`/series/${tournament.id}`}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/20"
              >
                <span>View Tournament Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
