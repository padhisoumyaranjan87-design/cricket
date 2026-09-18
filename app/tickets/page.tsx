"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ticket, ExternalLink, ShieldCheck, Filter, Calendar, MapPin, AlertCircle } from "lucide-react";
import { TICKETS } from "@/lib/mock-data";

export default function TicketsPage() {
  const [filterAvailability, setFilterAvailability] = useState<string>("ALL");

  const filteredTickets = TICKETS.filter(t => {
    if (filterAvailability === "AVAILABLE" && t.availability === "SOLD_OUT") return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
          <Ticket className="w-4 h-4" />
          <span>Sanctioned Event Discovery & Official Portals</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          OFFICIAL CRICKET TICKETS DISCOVERY
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Direct connections to authorized tournament ticketing partners (ICC Official, BookMyShow, Ticketmaster).
        </p>
      </div>

      {/* Verified Integrity Advisory */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-slate-300 leading-relaxed">
          <strong className="text-white">Authorized Ticketing Protocol:</strong> CRICPULSE only indexes sanctioned official ticket partners. We do not sell secondary tickets or markup prices. Always ensure you purchase through the verified official ticket provider.
          <span className="block mt-1 text-slate-400 italic">
            Ticket availability and pricing are managed solely by official authorized providers. Verify current status directly on the official ticketing portal.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Availability:
        </span>
        {["ALL", "AVAILABLE"].map(f => (
          <button
            key={f}
            onClick={() => setFilterAvailability(f)}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filterAvailability === f 
                ? "bg-slate-800 text-emerald-400 border border-slate-700" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            {f === "ALL" ? "All Fixtures" : "In Stock / Limited"}
          </button>
        ))}
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTickets.map(ticket => {
          const isSoldOut = ticket.availability === "SOLD_OUT";

          return (
            <div
              key={ticket.id}
              className="p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
                    {ticket.tournament}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                    isSoldOut 
                      ? "bg-red-500/20 text-red-400 border-red-500/40" 
                      : ticket.availability === "LIMITED" 
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40" 
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  }`}>
                    {ticket.availability.replace("_", " ")}
                  </span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition mb-2">
                  {ticket.matchTitle}
                </h2>

                <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ticket.venueName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ticket.date} • {ticket.time}</span>
                  </div>
                </div>

                {/* Pricing Banner */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Official Price Range</span>
                    <span className="font-extrabold text-white text-sm">
                      {ticket.currency} {ticket.minPrice.toLocaleString()} - {ticket.currency} {ticket.maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Provider</span>
                    <span className="font-bold text-emerald-400 text-xs">{ticket.officialProvider}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href={`/match/${ticket.matchId}`}
                  className="text-xs text-slate-400 hover:text-white font-medium"
                >
                  Match Details
                </Link>

                <a
                  href={ticket.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                    isSoldOut 
                      ? "bg-slate-800 text-slate-400 cursor-not-allowed" 
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                  }`}
                >
                  <span>{isSoldOut ? "Check Official Waitlist" : "View Official Tickets"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
