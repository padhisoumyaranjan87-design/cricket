"use client";

import React from "react";
import { MatchEvent } from "@/lib/types";
import { 
  Trophy, 
  Flame, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  Award, 
  Flag,
  RotateCw
} from "lucide-react";

interface MatchEventsProps {
  events: MatchEvent[];
}

export function MatchEvents({ events }: MatchEventsProps) {
  const getEventIcon = (type: MatchEvent["eventType"]) => {
    switch (type) {
      case "FIFTY":
      case "HUNDRED":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "PARTNERSHIP_MILESTONE":
        return <Flame className="w-4 h-4 text-emerald-400" />;
      case "WICKET":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "REVIEW":
        return <RotateCw className="w-4 h-4 text-purple-400" />;
      case "MATCH_END":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      default:
        return <Flag className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Match Key Events & Milestones Timeline</span>
        </h3>
        <span className="text-[11px] text-slate-500">{events.length} Recorded Events</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500 transition">
              {getEventIcon(event.eventType)}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                  {event.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono font-semibold">
                  {event.timestamp}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 mb-1.5">
                <span>{event.team}</span> • <span>{event.player}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
