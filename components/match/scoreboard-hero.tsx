"use client";

import React from "react";
import { Radio, Target, Flame, Award } from "lucide-react";
import { Match } from "@/lib/types";
import { formatRunRate, calculateRequiredRunRate } from "@/lib/utils";

interface ScoreboardHeroProps {
  match: Match;
}

export function ScoreboardHero({ match }: ScoreboardHeroProps) {
  const currentInnings = match.innings[match.currentInningsIndex];
  const firstInnings = match.innings[0];

  const ballsBowled = Math.floor(currentInnings.overs) * 6 + Math.round((currentInnings.overs % 1) * 10);
  const ballsRemaining = Math.max(0, (currentInnings.maxOvers * 6) - ballsBowled);
  const runsRemaining = match.target ? Math.max(0, match.target - currentInnings.runs) : 0;
  const currentRR = formatRunRate(currentInnings.runs, currentInnings.overs);
  const reqRR = calculateRequiredRunRate(runsRemaining, ballsRemaining);

  const striker = match.currentBatters[0];
  const nonStriker = match.currentBatters[1];
  const bowler = match.currentBowler;

  const battingTeam = match.teamA.id === currentInnings.battingTeamId ? match.teamA : match.teamB;
  const bowlingTeam = match.teamA.id === currentInnings.bowlingTeamId ? match.teamA : match.teamB;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Top Details & Live Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-extrabold text-xs tracking-wider border border-red-500/40 uppercase">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            {match.status}
          </span>
          <span className="text-sm font-semibold text-white">{match.tournamentName}</span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">{match.matchNumber}</span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-3">
          <span>{match.venue.name}, {match.venue.city}</span>
          <span className="text-slate-600">|</span>
          <span>Toss: <strong>{match.toss.winnerTeamId} elected to {match.toss.decision.toLowerCase()}</strong></span>
        </div>
      </div>

      {/* Main Scoreboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Batting Team Primary Score */}
        <div className="lg:col-span-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-2xl text-blue-400 shadow-md">
            {battingTeam.code}
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {battingTeam.name}
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">BATTING</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white score-value tracking-tight">
              {currentInnings.runs}/{currentInnings.wickets}
            </div>
            <div className="text-xs text-slate-400 tabular-numbers mt-1 flex items-center gap-2">
              <span><strong>{currentInnings.overs}</strong> / {currentInnings.maxOvers} ov</span>
              <span>•</span>
              <span>CRR: <strong className="text-emerald-400">{currentRR}</strong></span>
            </div>
          </div>
        </div>

        {/* Center Target & Situation Card */}
        <div className="lg:col-span-4 text-center py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-800/80 px-4">
          {match.target ? (
            <>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Target: <strong className="text-white text-sm">{match.target}</strong></span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 leading-tight">
                {match.statusText}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-semibold">Need</div>
                  <div className="text-sm font-extrabold text-white tabular-numbers">{runsRemaining}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-semibold">Balls</div>
                  <div className="text-sm font-extrabold text-white tabular-numbers">{ballsRemaining}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-semibold">RRR</div>
                  <div className="text-sm font-extrabold text-amber-400 tabular-numbers">{reqRR}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-lg font-bold text-white">1st Innings in Progress</div>
          )}
        </div>

        {/* Bowling Team / 1st Innings Score */}
        <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-4">
          <div className="text-left lg:text-right">
            <div className="text-sm font-bold text-white flex items-center lg:justify-end gap-2">
              {bowlingTeam.name}
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">1ST INNINGS</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-300 score-value tracking-tight">
              {firstInnings.runs}/{firstInnings.wickets}
            </div>
            <div className="text-xs text-slate-400 tabular-numbers mt-1">
              ({firstInnings.overs} ov) • RR: {formatRunRate(firstInnings.runs, firstInnings.overs)}
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-2xl text-emerald-400 shadow-md">
            {bowlingTeam.code}
          </div>
        </div>

      </div>

      {/* Active Batters & Bowler Mini Dashboard */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Striker */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              On Strike
            </span>
            <span className="font-bold text-emerald-400 text-xs">SR {striker.strikeRate}</span>
          </div>
          <div className="font-bold text-sm text-white">{striker.name}</div>
          <div className="flex items-center justify-between mt-1 text-xs text-slate-300 tabular-numbers">
            <span className="text-lg font-black text-white">{striker.runs}* <span className="text-xs font-medium text-slate-400">({striker.balls}b)</span></span>
            <span className="text-slate-400">4s: <strong className="text-white">{striker.fours}</strong> • 6s: <strong className="text-white">{striker.sixes}</strong></span>
          </div>
        </div>

        {/* Non-Striker */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-slate-400">Non-Striker</span>
            <span className="font-bold text-slate-400 text-xs">SR {nonStriker.strikeRate}</span>
          </div>
          <div className="font-bold text-sm text-white">{nonStriker.name}</div>
          <div className="flex items-center justify-between mt-1 text-xs text-slate-300 tabular-numbers">
            <span className="text-lg font-black text-slate-200">{nonStriker.runs}* <span className="text-xs font-medium text-slate-400">({nonStriker.balls}b)</span></span>
            <span className="text-slate-400">4s: <strong className="text-white">{nonStriker.fours}</strong> • 6s: <strong className="text-white">{nonStriker.sixes}</strong></span>
          </div>
        </div>

        {/* Bowler */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-slate-400">Current Bowler</span>
            <span className="font-bold text-amber-400 text-xs">Econ {bowler.economy}</span>
          </div>
          <div className="font-bold text-sm text-white">{bowler.name}</div>
          <div className="flex items-center justify-between mt-1 text-xs text-slate-300 tabular-numbers">
            <span className="text-lg font-black text-red-400">{bowler.wickets}/{bowler.runs}</span>
            <span className="text-slate-400">Overs: <strong className="text-white">{bowler.overs}</strong> • Dots: <strong className="text-white">{bowler.dotBalls}</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
