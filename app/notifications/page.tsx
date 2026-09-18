"use client";

import React from "react";
import Link from "next/link";
import { Bell, CheckCheck, Clock, Flame, Award, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/app-context";

export default function NotificationsPage() {
  const { notifications, markNotificationsRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Bell className="w-4 h-4" />
            <span>Cricket Pulse Alert Stream</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            MATCH NOTIFICATIONS
          </h1>
        </div>

        <button
          onClick={markNotificationsRead}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
              !notif.read 
                ? "bg-slate-900/90 border-emerald-500/30 shadow-md" 
                : "bg-slate-900/50 border-slate-800/80 text-slate-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                {notif.type === "MILESTONE" ? <Award className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white">{notif.title}</h3>
                  {!notif.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">{notif.time}</span>
              </div>
            </div>

            {notif.matchId && (
              <Link
                href={`/match/${notif.matchId}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition shrink-0"
              >
                <span>View Match</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
