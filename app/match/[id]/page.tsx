"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { ALL_MATCHES } from "@/lib/mock-data";
import { ScoreboardHero } from "@/components/match/scoreboard-hero";
import { SimulatorControls } from "@/components/match/simulator-controls";
import { CommentaryFeed } from "@/components/match/commentary-feed";
import { ScorecardTable } from "@/components/match/scorecard-table";
import { MatchEvents } from "@/components/match/match-events";
import { AIAnalysisPanel } from "@/components/match/ai-analysis-panel";
import { WinProbabilityChart } from "@/components/match/win-probability-chart";
import { 
  Radio, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Ticket, 
  ArrowLeft,
  Share2
} from "lucide-react";
import Link from "next/link";

export default function MatchCenterPage() {
  const params = useParams();
  const matchId = params?.id as string;
  const { liveMatch } = useApp();

  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "COMMENTARY" | "SCORECARD" | "EVENTS" | "ANALYTICS" | "TICKETS">("OVERVIEW");

  // If viewing the featured match, use live simulator state; otherwise look up in ALL_MATCHES
  const match = matchId === liveMatch.id ? liveMatch : (ALL_MATCHES.find(m => m.id === matchId) || liveMatch);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/matches"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Matches</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Match Center: <strong className="text-white">{match.teamA.code} vs {match.teamB.code}</strong>
          </span>
          <button 
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Match Center link copied to clipboard!");
              }
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs flex items-center gap-1"
            title="Share Match Center Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* 1. Scoreboard Hero */}
      <ScoreboardHero match={match} />

      {/* 2. Simulator Playback Controls Bar (if match is LIVE) */}
      {match.status === "LIVE" && (
        <SimulatorControls />
      )}

      {/* 3. Horizontal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "OVERVIEW", label: "Overview & Analytics", icon: TrendingUp },
          { id: "COMMENTARY", label: "Live Commentary", icon: MessageSquare },
          { id: "SCORECARD", label: "Full Scorecard", icon: FileText },
          { id: "EVENTS", label: "Match Events", icon: Clock },
          { id: "ANALYTICS", label: "AI Tactical Outlook", icon: Sparkles },
          { id: "TICKETS", label: "Tickets & Venue", icon: Ticket },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                isActive 
                  ? "bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Panels */}
      <div>
        
        {/* OVERVIEW TAB */}
        {activeTab === "OVERVIEW" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8 Cols: Charts & Commentary */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Win Probability & Momentum Charts */}
              <WinProbabilityChart
                winProbability={match.winProbability}
                teamAName={match.teamA.name}
                teamBName={match.teamB.name}
                teamACode={match.teamA.code}
                teamBCode={match.teamB.code}
                innings={match.innings}
              />

              {/* Real-time Commentary Timeline */}
              <CommentaryFeed commentary={match.commentary} />

            </div>

            {/* Right 4 Cols: AI Insights & Quick Scorecard Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* AI Situation & Momentum Brief */}
              <AIAnalysisPanel
                analysis={match.aiAnalysis}
                teamAName={match.teamA.name}
                teamBName={match.teamB.name}
              />

              {/* Head-to-Head & Form Guide Widget */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Recent Form Guide
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{match.teamA.name}</span>
                    <div className="flex items-center gap-1">
                      {match.teamA.recentForm.map((res, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                            res === "W" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{match.teamB.name}</span>
                    <div className="flex items-center gap-1">
                      {match.teamB.recentForm.map((res, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                            res === "W" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* COMMENTARY TAB */}
        {activeTab === "COMMENTARY" && (
          <div className="max-w-4xl mx-auto">
            <CommentaryFeed commentary={match.commentary} />
          </div>
        )}

        {/* SCORECARD TAB */}
        {activeTab === "SCORECARD" && (
          <div className="max-w-5xl mx-auto">
            <ScorecardTable match={match} />
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "EVENTS" && (
          <div className="max-w-3xl mx-auto">
            <MatchEvents events={match.events} />
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "ANALYTICS" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <WinProbabilityChart
              winProbability={match.winProbability}
              teamAName={match.teamA.name}
              teamBName={match.teamB.name}
              teamACode={match.teamA.code}
              teamBCode={match.teamB.code}
              innings={match.innings}
            />
            <AIAnalysisPanel
              analysis={match.aiAnalysis}
              teamAName={match.teamA.name}
              teamBName={match.teamB.name}
            />
          </div>
        )}

        {/* TICKETS & VENUE TAB */}
        {activeTab === "TICKETS" && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Venue Profile Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{match.venue.name}</h3>
                  <p className="text-xs text-slate-400">{match.venue.city}, {match.venue.country}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-800 text-xs text-emerald-400 font-semibold border border-slate-700">
                  Capacity: {match.venue.capacity.toLocaleString()} Seats
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {match.venue.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Pitch Type</span>
                  <span className="font-bold text-white">{match.venue.pitchType}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Avg 1st Innings</span>
                  <span className="font-bold text-white">{match.venue.avgFirstInnings}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Avg 2nd Innings</span>
                  <span className="font-bold text-white">{match.venue.avgSecondInnings}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Toss Chasing Win %</span>
                  <span className="font-bold text-emerald-400">{match.venue.tossWinChasePercentage}%</span>
                </div>
              </div>
            </div>

            {/* Official Tickets Section */}
            {match.ticketInfo && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                      Official Partner
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Official Authorized Ticket Discovery</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    Status: <strong className="text-amber-400">{match.ticketInfo.availability.replace("_", " ")}</strong>
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Official Ticket Provider:</div>
                    <div className="font-bold text-sm text-white">{match.ticketInfo.officialProvider}</div>
                    <div className="text-xs text-emerald-400 mt-1">
                      Price Range: {match.ticketInfo.currency} {match.ticketInfo.minPrice} - {match.ticketInfo.currency} {match.ticketInfo.maxPrice}
                    </div>
                  </div>

                  <a
                    href={match.ticketInfo.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition shrink-0"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>View Official Tickets</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  {match.ticketInfo.disclaimer}
                </p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
