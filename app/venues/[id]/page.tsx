"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, ArrowRight, Calendar } from "lucide-react";
import { VENUES, ALL_MATCHES } from "@/lib/mock-data";

export default function VenueDetailPage() {
  const params = useParams();
  const venueId = params?.id as string;
  const venue = VENUES[venueId] || VENUES.mcg;

  const venueMatches = ALL_MATCHES.filter(m => m.venue.id === venue.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Back Link */}
      <Link
        href="/venues"
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Venues Directory</span>
      </Link>

      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase border border-amber-500/40">
              {venue.pitchType} Surface
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {venue.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{venue.city}, {venue.country} • Capacity: {venue.capacity.toLocaleString()} spectators</span>
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Toss Chasing Win Rate</span>
            <span className="text-xl font-black text-emerald-400">{venue.tossWinChasePercentage}%</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          {venue.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Average 1st Innings</span>
            <span className="text-base font-extrabold text-white">{venue.avgFirstInnings}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Average 2nd Innings</span>
            <span className="text-base font-extrabold text-white">{venue.avgSecondInnings}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Highest Match Total</span>
            <span className="text-base font-extrabold text-emerald-400">{venue.highestTotal}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Lowest Match Total</span>
            <span className="text-base font-extrabold text-red-400">{venue.lowestTotal}</span>
          </div>
        </div>
      </div>

      {/* Matches hosted at this venue */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>Matches Hosted at {venue.name}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venueMatches.map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">{m.tournamentName}</span>
                <span className="text-xs font-bold text-white">{m.teamA.code} vs {m.teamB.code}</span>
                <span className="text-xs text-emerald-400 block mt-1">{m.statusText}</span>
              </div>
              <Link
                href={`/match/${m.id}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Match Center
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
