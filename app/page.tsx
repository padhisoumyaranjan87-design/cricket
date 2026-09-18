"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Radio, 
  Flame, 
  ArrowRight, 
  TrendingUp, 
  Ticket, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Pause, 
  FastForward, 
  RotateCcw,
  Activity,
  BarChart2,
  Calendar
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { LiveTicker } from "@/components/live-ticker";
import { TOURNAMENTS, NEWS_ARTICLES, UPCOMING_MATCHES } from "@/lib/mock-data";
import { formatRunRate, calculateRequiredRunRate, getDeliveryColor } from "@/lib/utils";

export default function HomePage() {
  const { 
    liveMatch, 
    isSimulating, 
    toggleSimulation, 
    stepNextBall, 
    resetMatch 
  } = useApp();

  const [selectedTournament, setSelectedTournament] = useState("all");

  const currentInnings = liveMatch.innings[liveMatch.currentInningsIndex];
  const firstInnings = liveMatch.innings[0];

  const ballsBowled = Math.floor(currentInnings.overs) * 6 + Math.round((currentInnings.overs % 1) * 10);
  const ballsRemaining = Math.max(0, (currentInnings.maxOvers * 6) - ballsBowled);
  const runsRemaining = liveMatch.target ? Math.max(0, liveMatch.target - currentInnings.runs) : 0;
  const currentRR = formatRunRate(currentInnings.runs, currentInnings.overs);
  const reqRR = calculateRequiredRunRate(runsRemaining, ballsRemaining);

  const striker = liveMatch.currentBatters[0];
  const nonStriker = liveMatch.currentBatters[1];
  const bowler = liveMatch.currentBowler;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-[#0B0F19] to-[#080C14]">
        {/* Subtle grid pattern & glow effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Broadcast Command Center</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Live 2026 Season</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
              CRICKET. LIVE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">ANALYZED.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Live scores, ball-by-ball events, advanced statistics, match analysis and cricket insights — all in one place.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link
                href={`/match/${liveMatch.id}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5"
              >
                <Radio className="w-4 h-4 text-slate-950" />
                <span>View Live Matches</span>
              </Link>

              <Link
                href="/matches"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 flex items-center gap-2 transition"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Explore Matches</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Scores Horizontal Ticker */}
      <LiveTicker />

      {/* 3. Featured Live Match Spotlight Hero Card */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-extrabold text-white tracking-tight">FEATURED MATCH SPOTLIGHT</h2>
          </div>
          
          {/* Live Simulator Toolbar */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 hidden sm:inline">
              Interactive Simulator:
            </span>
            <button
              onClick={toggleSimulation}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                isSimulating ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              }`}
              title={isSimulating ? "Pause live stream simulation" : "Play real-time simulation"}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isSimulating ? "Pause" : "Simulate Live"}</span>
            </button>
            <button
              onClick={() => stepNextBall()}
              disabled={isSimulating}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 disabled:opacity-50 transition"
              title="Deliver Next Ball"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Next Ball</span>
            </button>
            <button
              onClick={resetMatch}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Reset Live Match State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mega Live Match Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          
          {/* Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-extrabold tracking-wider border border-red-500/40 uppercase flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                LIVE CHASE
              </span>
              <span className="text-sm font-semibold text-white">{liveMatch.tournamentName}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{liveMatch.matchNumber}</span>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>{liveMatch.venue.name}, {liveMatch.venue.city}</span>
              <Link
                href={`/match/${liveMatch.id}`}
                className="ml-3 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition"
              >
                <span>Full Match Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Teams Scoreboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Team A (India) */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-1 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-blue-400">
                  {liveMatch.teamA.code}
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  {liveMatch.teamA.name}
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">CHASING</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white score-value tracking-tight">
                  {currentInnings.runs}/{currentInnings.wickets}
                </div>
                <div className="text-xs text-slate-400 tabular-numbers mt-0.5">
                  ({currentInnings.overs} / {currentInnings.maxOvers} ov) • CRR: {currentRR}
                </div>
              </div>
            </div>

            {/* VS & Target Center Pillar */}
            <div className="lg:col-span-4 text-center py-3 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-800/80 px-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                TARGET: <span className="text-white font-extrabold text-sm">{liveMatch.target}</span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-400 leading-tight">
                {liveMatch.statusText}
              </div>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                <span>Need: <strong className="text-white">{runsRemaining}</strong> runs</span>
                <span>•</span>
                <span>From: <strong className="text-white">{ballsRemaining}</strong> balls</span>
                <span>•</span>
                <span>RRR: <strong className="text-amber-400">{reqRR}</strong></span>
              </div>

              {/* Dynamic Win Probability Quick Bar */}
              <div className="mt-3 max-w-xs mx-auto">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-blue-400">{liveMatch.teamA.code} {liveMatch.winProbability.teamAWinPercentage}%</span>
                  <span className="text-slate-400 text-[10px]">Win Outlook</span>
                  <span className="text-emerald-400">{liveMatch.teamB.code} {liveMatch.winProbability.teamBWinPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" 
                    style={{ width: `${liveMatch.winProbability.teamAWinPercentage}%` }} 
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                    style={{ width: `${liveMatch.winProbability.teamBWinPercentage}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Team B (Pakistan) */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-4">
              <div className="text-left lg:text-right">
                <div className="text-base font-bold text-white flex items-center lg:justify-end gap-2">
                  {liveMatch.teamB.name}
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">1ST INN</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-300 score-value tracking-tight">
                  {firstInnings.runs}/{firstInnings.wickets}
                </div>
                <div className="text-xs text-slate-400 tabular-numbers mt-0.5">
                  ({firstInnings.overs} ov) • RR: {formatRunRate(firstInnings.runs, firstInnings.overs)}
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-emerald-400">
                  {liveMatch.teamB.code}
                </div>
              </div>
            </div>

          </div>

          {/* Active Field Personnel: Batters & Bowler */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Striker */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                <span>Batter (On Strike)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="font-bold text-sm text-white">{striker.name}</div>
              <div className="flex items-center gap-3 mt-1 text-slate-300 font-medium tabular-numbers">
                <span className="text-emerald-400 font-bold">{striker.runs}* ({striker.balls})</span>
                <span>4s: {striker.fours}</span>
                <span>6s: {striker.sixes}</span>
                <span>SR: {striker.strikeRate}</span>
              </div>
            </div>

            {/* Non-Striker */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Batter (Non-Striker)
              </div>
              <div className="font-bold text-sm text-white">{nonStriker.name}</div>
              <div className="flex items-center gap-3 mt-1 text-slate-300 font-medium tabular-numbers">
                <span className="text-slate-200 font-bold">{nonStriker.runs}* ({nonStriker.balls})</span>
                <span>4s: {nonStriker.fours}</span>
                <span>6s: {nonStriker.sixes}</span>
                <span>SR: {nonStriker.strikeRate}</span>
              </div>
            </div>

            {/* Bowler */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Current Bowler
              </div>
              <div className="font-bold text-sm text-white">{bowler.name}</div>
              <div className="flex items-center gap-3 mt-1 text-slate-300 font-medium tabular-numbers">
                <span className="text-red-400 font-bold">{bowler.wickets}/{bowler.runs}</span>
                <span>({bowler.overs} ov)</span>
                <span>Econ: {bowler.economy}</span>
                <span>Dots: {bowler.dotBalls}</span>
              </div>
            </div>

          </div>

          {/* Recent Balls Strip & AI Situation */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 shrink-0">Recent Deliveries:</span>
              {liveMatch.recentDeliveries.slice(-6).map((ball, i) => {
                const style = getDeliveryColor(ball.shortDesc);
                return (
                  <div
                    key={i}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${style.bg} ${style.text} ${style.border} flex items-center gap-1 shrink-0`}
                    title={`${ball.displayOver}: ${ball.commentary}`}
                  >
                    <span>{ball.displayOver}</span>
                    <span>•</span>
                    <span>{ball.isWicket ? "W" : ball.shortDesc}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Brief: <strong>Kohli strikes at 170.83; Death overs scoring at 13.4 RPO.</strong></span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Tournaments & Standings Quick Filter */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Active Tournaments & Series</h2>
            <p className="text-xs text-slate-400">Explore points tables, schedules and team standings</p>
          </div>
          <Link href="/series" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
            <span>View All Series</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOURNAMENTS.map(t => (
            <Link
              key={t.id}
              href={`/series/${t.id}`}
              className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                    {t.format}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">{t.hostCountry}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition mb-1">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {t.totalMatches} Matches • {t.completedMatches} Completed
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>{t.startDate} to {t.endDate}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Upcoming Matches Grid & Ticket Discovery */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Upcoming Fixtures & Official Tickets</h2>
              <p className="text-xs text-slate-400">Discover sanctioned match tickets from verified providers</p>
            </div>
          </div>
          <Link href="/tickets" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
            <span>Tickets Hub</span>
            <Ticket className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UPCOMING_MATCHES.map(m => (
            <div
              key={m.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-white">{m.tournamentName}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                    {m.statusText}
                  </span>
                </div>

                <div className="flex items-center justify-between my-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-800 font-bold text-xs flex items-center justify-center text-white border border-slate-700">
                      {m.teamA.code}
                    </div>
                    <span className="font-bold text-sm text-white">{m.teamA.name}</span>
                  </div>

                  <span className="text-xs font-bold text-slate-500">VS</span>

                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-white">{m.teamB.name}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-800 font-bold text-xs flex items-center justify-center text-white border border-slate-700">
                      {m.teamB.code}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                  <span>Venue: {m.venue.name}, {m.venue.city}</span>
                </div>
              </div>

              {m.ticketInfo && (
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Official Tickets:</div>
                    <div className="text-xs font-bold text-emerald-400">
                      From {m.ticketInfo.currency} {m.ticketInfo.minPrice.toLocaleString()}
                    </div>
                  </div>
                  <Link
                    href="/tickets"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Official Tickets</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Trending News & Analytical Insights */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 w-full mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Cricket Insights & Match Reports</h2>
              <p className="text-xs text-slate-400">Analytical essays, data breakdowns and player form records</p>
            </div>
          </div>
          <Link href="/news" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
            <span>All Articles</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS_ARTICLES.slice(0, 3).map(article => (
            <Link
              key={article.id}
              href="/news"
              className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold text-[10px] uppercase">
                    {article.category}
                  </span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>By {article.author}</span>
                <span className="text-slate-400 font-medium">{article.source}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
