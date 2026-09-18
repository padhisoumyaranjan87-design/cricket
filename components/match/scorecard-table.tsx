"use client";

import React, { useState } from "react";
import { Match, Innings } from "@/lib/types";

interface ScorecardTableProps {
  match: Match;
}

export function ScorecardTable({ match }: ScorecardTableProps) {
  const [selectedInningsIdx, setSelectedInningsIdx] = useState(match.currentInningsIndex);

  const activeInnings: Innings | undefined = match.innings[selectedInningsIdx] || match.innings[0];

  if (!activeInnings) {
    return <div className="p-8 text-center text-slate-500 text-xs">Scorecard data not yet available.</div>;
  }

  const battingTeam = match.teamA.id === activeInnings.battingTeamId ? match.teamA : match.teamB;
  const bowlingTeam = match.teamA.id === activeInnings.bowlingTeamId ? match.teamA : match.teamB;

  return (
    <div className="space-y-6">
      
      {/* Innings Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {match.innings.map((inn, idx) => {
          const t = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
          const isSelected = selectedInningsIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedInningsIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                isSelected 
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span>{t.code} Innings {inn.inningsNumber}</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300 font-mono">
                {inn.runs}/{inn.wickets} ({inn.overs} ov)
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. Batting Table */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
            {battingTeam.name} Batting
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {activeInnings.runs}/{activeInnings.wickets} ({activeInnings.overs} ov)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-4">Batter</th>
                <th className="py-2.5 px-3">Dismissal</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">B</th>
                <th className="py-2.5 px-3 text-right">4s</th>
                <th className="py-2.5 px-3 text-right">6s</th>
                <th className="py-2.5 px-4 text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {activeInnings.batting.map((b, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-4 font-bold text-white flex items-center gap-1.5">
                    <span>{b.name}</span>
                    {b.dismissal === "not out" && (
                      <span className="text-emerald-400 font-bold">*</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[180px]">
                    {b.dismissal}
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-white score-value">
                    {b.runs}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 tabular-numbers">
                    {b.balls}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 tabular-numbers">
                    {b.fours}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 tabular-numbers">
                    {b.sixes}
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-400 font-semibold tabular-numbers">
                    {b.strikeRate.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extras & Total Summary */}
        <div className="p-3.5 bg-slate-950/40 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            <strong>Extras:</strong> {activeInnings.extras.total}{" "}
            <span className="text-[11px] text-slate-500">
              (b {activeInnings.extras.byes}, lb {activeInnings.extras.legByes}, w {activeInnings.extras.wides}, nb {activeInnings.extras.noBalls})
            </span>
          </div>
          <div className="text-white font-extrabold">
            Total: <span className="text-sm text-emerald-400 font-black">{activeInnings.runs}/{activeInnings.wickets}</span>{" "}
            <span className="text-slate-400 font-normal">({activeInnings.overs} Overs)</span>
          </div>
        </div>
      </div>

      {/* 2. Fall of Wickets */}
      {activeInnings.fallOfWickets && activeInnings.fallOfWickets.length > 0 && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Fall of Wickets
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {activeInnings.fallOfWickets.map((fow, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
              >
                <strong className="text-white">{fow.score}-{fow.wicketNumber}</strong>{" "}
                <span className="text-slate-400 text-[11px]">({fow.playerName}, {fow.over} ov)</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Bowling Table */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
            {bowlingTeam.name} Bowling
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-4">Bowler</th>
                <th className="py-2.5 px-3 text-right">O</th>
                <th className="py-2.5 px-3 text-right">M</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">Econ</th>
                <th className="py-2.5 px-4 text-right">Dots</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {activeInnings.bowling.map((bowler, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-4 font-bold text-white">
                    {bowler.name}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 tabular-numbers">
                    {bowler.overs}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 tabular-numbers">
                    {bowler.maidens}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-white tabular-numbers">
                    {bowler.runs}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-red-400 tabular-numbers">
                    {bowler.wickets}
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-400 font-semibold tabular-numbers">
                    {bowler.economy.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-400 tabular-numbers">
                    {bowler.dotBalls}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
