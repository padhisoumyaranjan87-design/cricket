"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Users, Award, ArrowRight, Shield } from "lucide-react";
import { VENUES } from "@/lib/mock-data";

export default function VenuesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
          <MapPin className="w-4 h-4" />
          <span>Stadium Profiles & Pitch Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          CRICKET VENUES & PITCH REPORTS
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical venue statistics, boundary dimensions, toss win percentages and pitch soil conditions.
        </p>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(VENUES).map(venue => (
          <div
            key={venue.id}
            className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
                  {venue.pitchType}
                </span>
                <span className="text-xs text-slate-400">
                  Capacity: <strong className="text-white">{venue.capacity.toLocaleString()}</strong>
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition mb-1">
                {venue.name}
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                {venue.city}, {venue.country}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {venue.description}
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-center mb-4">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Avg 1st Inn</span>
                  <span className="font-extrabold text-white text-sm">{venue.avgFirstInnings}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Avg 2nd Inn</span>
                  <span className="font-extrabold text-white text-sm">{venue.avgSecondInnings}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Bat 1st Win %</span>
                  <span className="font-extrabold text-blue-400 text-sm">{venue.tossWinBatFirstPercentage}%</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Chase Win %</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{venue.tossWinChasePercentage}%</span>
                </div>
              </div>

              {/* Records */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Highest Total: <strong className="text-slate-200">{venue.highestTotal}</strong></span>
                <span>Lowest Total: <strong className="text-slate-200">{venue.lowestTotal}</strong></span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">Historical Ground Profile</span>
              <Link
                href={`/venues/${venue.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
              >
                <span>View Venue Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
