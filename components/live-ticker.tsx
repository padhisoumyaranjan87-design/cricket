"use client";

import React from "react";
import Link from "next/link";
import { Radio, ArrowRight, Sparkles } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { ALL_MATCHES } from "@/lib/mock-data";
import { getDeliveryColor } from "@/lib/utils";

export function LiveTicker() {
  const { liveMatch } = useApp();

  // Combine active simulator live match with other matches
  const displayMatches = [
    liveMatch,
    ...ALL_MATCHES.filter(m => m.id !== liveMatch.id)
  ];

  return (
    <div className="w-full bg-slate-950/60 border-y border-slate-900 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Live Matches & Center
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
              Real-time Feed
            </span>
          </div>

          <Link
            href="/matches"
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
          >
            <span>All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {displayMatches.map((match) => {
            const isLive = match.status === "LIVE";
            const currentInnings = match.innings[match.currentInningsIndex];
            const teamAScore = match.innings[0] ? `${match.innings[0].runs}/${match.innings[0].wickets} (${match.innings[0].overs})` : "";
            const teamBScore = match.innings[1] ? `${match.innings[1].runs}/${match.innings[1].wickets} (${match.innings[1].overs})` : "";

            return (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="shrink-0 w-80 sm:w-88 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700/90 p-3.5 transition-all group flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Tournament & Status Header */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
                    <span className="truncate max-w-[180px] font-medium">{match.tournamentName}</span>
                    <div className="flex items-center gap-1.5">
                      {isLive ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px] uppercase border border-red-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          LIVE
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold">
                          {match.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Teams & Scores */}
                  <div className="space-y-1.5 mb-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-white flex items-center justify-center border border-slate-700">
                          {match.teamA.code}
                        </div>
                        <span className="text-xs font-semibold text-white">{match.teamA.name}</span>
                      </div>
                      <span className="text-xs font-bold text-white score-value">
                        {match.innings[0]?.battingTeamId === match.teamA.id ? teamAScore : teamBScore || "Yet to bat"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-white flex items-center justify-center border border-slate-700">
                          {match.teamB.code}
                        </div>
                        <span className="text-xs font-semibold text-white">{match.teamB.name}</span>
                      </div>
                      <span className="text-xs font-bold text-white score-value">
                        {match.innings[1]?.battingTeamId === match.teamB.id ? teamBScore : match.innings[0]?.battingTeamId === match.teamB.id ? teamAScore : "Yet to bat"}
                      </span>
                    </div>
                  </div>

                  {/* Status condition line */}
                  <div className="text-[11px] font-medium text-emerald-400 truncate mb-2">
                    {match.statusText}
                  </div>
                </div>

                {/* Recent balls strip if live */}
                {isLive && match.recentDeliveries && match.recentDeliveries.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-500 mr-1">Recent:</span>
                      {match.recentDeliveries.slice(-6).map((ball, idx) => {
                        const style = getDeliveryColor(ball.shortDesc);
                        return (
                          <span
                            key={idx}
                            className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border ${style.bg} ${style.text} ${style.border} ball-pill`}
                            title={`${ball.displayOver}: ${ball.shortDesc}`}
                          >
                            {ball.isWicket ? "W" : ball.isSix ? "6" : ball.isBoundary ? "4" : ball.isDot ? "•" : ball.runs}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 flex items-center gap-0.5 transition">
                      Center <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
