"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  User, 
  Users, 
  Calendar, 
  Trophy, 
  MapPin, 
  Newspaper,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { PLAYERS, TEAMS, ALL_MATCHES, TOURNAMENTS, VENUES, NEWS_ARTICLES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function GlobalSearch() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results Filtering
  const filteredPlayers = q ? Object.values(PLAYERS).filter(p => 
    p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const filteredTeams = q ? Object.values(TEAMS).filter(t => 
    t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q) || t.country.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredMatches = q ? ALL_MATCHES.filter(m => 
    m.teamA.name.toLowerCase().includes(q) || 
    m.teamB.name.toLowerCase().includes(q) || 
    m.tournamentName.toLowerCase().includes(q) ||
    m.venue.name.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const filteredTournaments = q ? TOURNAMENTS.filter(t => 
    t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const filteredVenues = q ? Object.values(VENUES).filter(v => 
    v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const filteredNews = q ? NEWS_ARTICLES.filter(n => 
    n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const hasResults = 
    filteredPlayers.length > 0 || 
    filteredTeams.length > 0 || 
    filteredMatches.length > 0 || 
    filteredTournaments.length > 0 || 
    filteredVenues.length > 0 || 
    filteredNews.length > 0;

  const handleSelect = (href: string) => {
    setIsSearchOpen(false);
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players (e.g. Virat, Bumrah), teams, matches, venues..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd 
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700 cursor-pointer"
          >
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-6 text-center text-slate-500 text-xs">
              <p className="font-medium text-slate-400 mb-2">Quick Search Directory</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                {["Virat Kohli", "India vs Pakistan", "T20 World Cup", "Jasprit Bumrah", "Melbourne MCG", "CSK"].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p>No results matching &ldquo;{query}&rdquo;</p>
              <p className="text-slate-500 mt-1">Try searching by player name, country code (e.g. IND, AUS), or venue.</p>
            </div>
          )}

          {/* Players */}
          {filteredPlayers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Players
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredPlayers.map(player => (
                  <button
                    key={player.id}
                    onClick={() => handleSelect(`/players/${player.id}`)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center">
                      {player.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition truncate">
                        {player.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {player.role} • {player.country}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matches */}
          {filteredMatches.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Matches
              </div>
              <div className="space-y-1.5">
                {filteredMatches.map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`/match/${m.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white group-hover:text-blue-400 transition">
                        {m.teamA.code} vs {m.teamB.code}
                      </span>
                      <span className="text-[11px] text-slate-400">({m.tournamentName})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase",
                        m.status === "LIVE" ? "bg-emerald-500/20 text-emerald-400 animate-pulse" : "bg-slate-700 text-slate-300"
                      )}>
                        {m.status}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teams */}
          {filteredTeams.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                Teams
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredTeams.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(`/teams/${t.id}`)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition text-left"
                  >
                    <div className="w-6 h-6 rounded bg-slate-700 font-bold text-xs flex items-center justify-center text-purple-400">
                      {t.code}
                    </div>
                    <span className="text-xs text-white font-medium truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Venues & News */}
          {(filteredVenues.length > 0 || filteredNews.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
              {filteredVenues.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Venues
                  </div>
                  <div className="space-y-1">
                    {filteredVenues.map(v => (
                      <button
                        key={v.id}
                        onClick={() => handleSelect(`/venues/${v.id}`)}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300 block truncate"
                      >
                        {v.name} ({v.city})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredNews.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
                    News
                  </div>
                  <div className="space-y-1">
                    {filteredNews.map(n => (
                      <button
                        key={n.id}
                        onClick={() => handleSelect(`/news/${n.slug}`)}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300 block truncate"
                      >
                        {n.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
