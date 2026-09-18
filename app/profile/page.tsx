"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Star, Bell, Shield, Heart, Clock, Check, LogOut } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { TEAMS, PLAYERS } from "@/lib/mock-data";

export default function ProfilePage() {
  const { user, favorites, notifications } = useApp();

  const [notifSettings, setNotifSettings] = useState({
    matchStart: true,
    toss: true,
    wickets: true,
    milestones: true,
    sixes: false,
    matchResult: true
  });

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const followedTeams = Object.values(TEAMS).filter(t => favorites.teams.includes(t.code));
  const followedPlayers = Object.values(PLAYERS).filter(p => favorites.players.includes(p.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-2xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                Active Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => alert("Session management: Preferences saved.")}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
        >
          Save Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Followed Teams & Players */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Followed Teams & Athletes</span>
          </h2>

          <div>
            <h3 className="text-xs font-semibold text-slate-400 mb-2">Favorite Teams</h3>
            <div className="flex flex-wrap gap-2">
              {followedTeams.map(t => (
                <div key={t.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
                  <span className="font-bold text-emerald-400">{t.code}</span>
                  <span>{t.name}</span>
                  <button onClick={() => favorites.toggleTeam(t.code)} className="text-slate-500 hover:text-red-400 ml-1">×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <h3 className="text-xs font-semibold text-slate-400 mb-2">Followed Players</h3>
            <div className="flex flex-wrap gap-2">
              {followedPlayers.map(p => (
                <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
                  <span>{p.name}</span>
                  <button onClick={() => favorites.togglePlayer(p.id)} className="text-slate-500 hover:text-red-400 ml-1">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Notification Preferences */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Match Alert Preferences</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            {[
              { id: "matchStart", label: "Match Starting Alert" },
              { id: "toss", label: "Toss & Team Lineups" },
              { id: "wickets", label: "Wicket Dismissals" },
              { id: "milestones", label: "Fifties & Centuries (50s / 100s)" },
              { id: "sixes", label: "Maximum Sixes Alert" },
              { id: "matchResult", label: "Final Match Result" },
            ].map(item => {
              const checked = notifSettings[item.id as keyof typeof notifSettings];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleNotif(item.id as keyof typeof notifSettings)}
                  className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer transition"
                >
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition ${
                    checked ? "bg-emerald-500 text-slate-950 font-bold" : "border border-slate-700"
                  }`}>
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
