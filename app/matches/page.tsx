"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Filter, Radio, Ticket, ArrowRight, Sparkles } from "lucide-react";
import { ALL_MATCHES } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { getDeliveryColor } from "@/lib/utils";

export default function MatchesPage() {
  const { liveMatch } = useApp();
  const [filterFormat, setFilterFormat] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Merge live simulator state
  const matches = [
    liveMatch,
    ...ALL_MATCHES.filter(m => m.id !== liveMatch.id)
  ];

  const filteredMatches = matches.filter(m => {
    if (filterFormat !== "ALL" && m.format !== filterFormat) return false;
    if (filterStatus === "LIVE" && m.status !== "LIVE") return false;
    if (filterStatus === "UPCOMING" && m.status !== "UPCOMING") return false;
    if (filterStatus === "COMPLETED" && m.status !== "COMPLETED") return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Calendar className="w-4 h-4" />
            <span>Cricket Match Center & Schedules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CRICKET FIXTURES & RESULTS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time ball tracking, upcoming match tickets and historical scorecards.
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {["ALL", "LIVE", "UPCOMING", "COMPLETED"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterStatus === status 
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Format Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Format:
        </span>
        {["ALL", "T20I", "T20", "ODI", "TEST"].map(fmt => (
          <button
            key={fmt}
            onClick={() => setFilterFormat(fmt)}
            className={`px-3 py-1 rounded-lg font-semibold transition shrink-0 ${
              filterFormat === fmt 
                ? "bg-slate-800 text-white border border-slate-700" 
                : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-900"
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMatches.map(match => {
          const isLive = match.status === "LIVE";
          const inn1 = match.innings[0];
          const inn2 = match.innings[1];

          return (
            <div
              key={match.id}
              className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-white truncate max-w-[200px]">
                    {match.tournamentName}
                  </span>
                  {isLive ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-extrabold border border-red-500/40 uppercase animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      LIVE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold">
                      {match.status}
                    </span>
                  )}
                </div>

                {/* Teams & Scores */}
                <div className="space-y-2.5 my-4">
                  {/* Team A */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 font-bold text-xs flex items-center justify-center text-white border border-slate-700">
                        {match.teamA.code}
                      </div>
                      <span className="font-bold text-sm text-white">{match.teamA.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white score-value">
                      {inn2?.battingTeamId === match.teamA.id ? `${inn2.runs}/${inn2.wickets} (${inn2.overs})` : inn1?.battingTeamId === match.teamA.id ? `${inn1.runs}/${inn1.wickets} (${inn1.overs})` : "-"}
                    </span>
                  </div>

                  {/* Team B */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 font-bold text-xs flex items-center justify-center text-white border border-slate-700">
                        {match.teamB.code}
                      </div>
                      <span className="font-bold text-sm text-white">{match.teamB.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white score-value">
                      {inn1?.battingTeamId === match.teamB.id ? `${inn1.runs}/${inn1.wickets} (${inn1.overs})` : inn2?.battingTeamId === match.teamB.id ? `${inn2.runs}/${inn2.wickets} (${inn2.overs})` : "-"}
                    </span>
                  </div>
                </div>

                {/* Status text */}
                <div className="text-xs font-medium text-emerald-400 mb-3 line-clamp-1">
                  {match.statusText}
                </div>

                {/* Venue & Date */}
                <div className="text-[11px] text-slate-500 mb-4">
                  {match.venue.name}, {match.venue.city}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {match.ticketInfo ? (
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                    Tickets Available
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">Match Overview</span>
                )}

                <Link
                  href={`/match/${match.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>{isLive ? "Live Center" : "View Scorecard"}</span>
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
