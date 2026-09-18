"use client";

import React, { useState } from "react";
import { BallDelivery } from "@/lib/types";
import { getDeliveryColor } from "@/lib/utils";
import { Filter, Sparkles, Activity } from "lucide-react";

interface CommentaryFeedProps {
  commentary: BallDelivery[];
}

export function CommentaryFeed({ commentary }: CommentaryFeedProps) {
  const [filter, setFilter] = useState<"ALL" | "BOUNDARIES" | "WICKETS">("ALL");

  const filteredList = commentary.filter(item => {
    if (filter === "BOUNDARIES") return item.isBoundary || item.isSix;
    if (filter === "WICKETS") return item.isWicket;
    return true;
  });

  return (
    <div className="space-y-3">
      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Ball-by-Ball Live Commentary</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              filter === "ALL" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All Balls
          </button>
          <button
            onClick={() => setFilter("BOUNDARIES")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              filter === "BOUNDARIES" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Boundaries (4s & 6s)
          </button>
          <button
            onClick={() => setFilter("WICKETS")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              filter === "WICKETS" ? "bg-red-500/20 text-red-400 border border-red-500/40" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Wickets
          </button>
        </div>
      </div>

      {/* Commentary Items List */}
      <div className="space-y-2.5">
        {filteredList.map((ball) => {
          const badgeStyle = getDeliveryColor(ball.shortDesc);

          return (
            <div
              key={ball.id}
              className={`p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border transition flex items-start gap-3.5 ${
                ball.isWicket 
                  ? "border-red-500/40 bg-red-500/[0.03]" 
                  : ball.isSix 
                  ? "border-purple-500/40 bg-purple-500/[0.03]" 
                  : ball.isBoundary 
                  ? "border-emerald-500/40 bg-emerald-500/[0.03]" 
                  : "border-slate-800/80"
              }`}
            >
              {/* Over & Outcome Badge */}
              <div className="flex flex-col items-center shrink-0 w-12 text-center">
                <span className="text-xs font-black text-slate-300 tabular-numbers">
                  {ball.displayOver}
                </span>
                <span
                  className={`mt-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} ball-pill`}
                >
                  {ball.isWicket ? "W" : ball.shortDesc}
                </span>
              </div>

              {/* Delivery Narrative Body */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                  <span className="font-bold text-white">{ball.bowlerName}</span>
                  <span className="text-slate-500">to</span>
                  <span className="font-bold text-white">{ball.batsmanName}</span>
                  {ball.speedKmph && (
                    <span className="ml-auto text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 tabular-numbers">
                      {ball.speedKmph} km/h
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {ball.commentary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
