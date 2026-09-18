"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Trophy, Calendar, Users, MapPin, ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { TOURNAMENTS, POINTS_TABLE_T20WC, ALL_MATCHES, VENUES } from "@/lib/mock-data";

export default function TournamentDetailPage() {
  const params = useParams();
  const seriesId = params?.id as string;
  const tournament = TOURNAMENTS.find(t => t.id === seriesId) || TOURNAMENTS[0];

  const [activeTab, setActiveTab] = useState<"STANDINGS" | "MATCHES" | "VENUES">("STANDINGS");

  const tournamentMatches = ALL_MATCHES.filter(m => m.tournamentId === tournament.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Back Link */}
      <Link
        href="/series"
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Series List</span>
      </Link>

      {/* Tournament Banner Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/40">
              {tournament.format} Tournament
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {tournament.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Host: {tournament.hostCountry} • Dates: {tournament.startDate} to {tournament.endDate}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Matches</span>
              <span className="text-base font-extrabold text-white">{tournament.totalMatches}</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Completed</span>
              <span className="text-base font-extrabold text-emerald-400">{tournament.completedMatches}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {[
            { id: "STANDINGS", label: "Points Table / Standings" },
            { id: "MATCHES", label: "Fixtures & Results" },
            { id: "VENUES", label: "Official Venues" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-800/60 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. STANDINGS TAB */}
      {activeTab === "STANDINGS" && (
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Super 8s / Tournament Standings
              </h2>
              <p className="text-xs text-slate-400">
                Top 2 advance to the Grand Final. Ranked by Points, then Net Run Rate (NRR).
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Qualified Zone
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                Eliminated
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3 text-center">Pos</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-3 text-right">P</th>
                  <th className="py-3 px-3 text-right">W</th>
                  <th className="py-3 px-3 text-right">L</th>
                  <th className="py-3 px-3 text-right">NR</th>
                  <th className="py-3 px-3 text-right">Pts</th>
                  <th className="py-3 px-4 text-right">NRR</th>
                  <th className="py-3 px-4 text-center">Recent Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {POINTS_TABLE_T20WC.map((entry) => {
                  const isQualified = entry.qualificationStatus === "QUALIFIED";
                  return (
                    <tr 
                      key={entry.teamId}
                      className={`hover:bg-slate-800/40 transition ${
                        isQualified ? "bg-emerald-500/[0.03]" : ""
                      }`}
                    >
                      <td className="py-3 px-3 text-center font-bold text-white">
                        <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                          isQualified ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                        }`}>
                          {entry.position}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-black text-emerald-400">
                          {entry.team.code}
                        </div>
                        <span>{entry.team.name}</span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 tabular-numbers">{entry.played}</td>
                      <td className="py-3 px-3 text-right font-bold text-white tabular-numbers">{entry.won}</td>
                      <td className="py-3 px-3 text-right text-slate-400 tabular-numbers">{entry.lost}</td>
                      <td className="py-3 px-3 text-right text-slate-500 tabular-numbers">{entry.noResult}</td>
                      <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm tabular-numbers">{entry.points}</td>
                      <td className={`py-3 px-4 text-right font-semibold tabular-numbers ${
                        entry.netRunRate >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {entry.netRunRate > 0 ? `+${entry.netRunRate.toFixed(3)}` : entry.netRunRate.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {entry.recentForm.map((res, i) => (
                            <span
                              key={i}
                              className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                                res === "W" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. MATCHES TAB */}
      {activeTab === "MATCHES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournamentMatches.map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-white">{m.matchNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                    {m.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-white my-2">
                  {m.teamA.name} vs {m.teamB.name}
                </div>
                <p className="text-xs text-emerald-400 mb-2">{m.statusText}</p>
                <p className="text-[11px] text-slate-500">{m.venue.name}</p>
              </div>
              <div className="pt-3 border-t border-slate-800 mt-3 flex justify-end">
                <Link
                  href={`/match/${m.id}`}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Match Center</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. VENUES TAB */}
      {activeTab === "VENUES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(VENUES).map(v => (
            <div key={v.id} className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <h3 className="font-bold text-sm text-white mb-1">{v.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{v.city}, {v.country} • Capacity: {v.capacity.toLocaleString()}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{v.description}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/60">
                <span className="text-slate-400">Pitch: <strong className="text-white">{v.pitchType}</strong></span>
                <span className="text-slate-400">Avg 1st Innings: <strong className="text-white">{v.avgFirstInnings}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
