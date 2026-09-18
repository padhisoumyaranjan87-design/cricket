"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Flame, 
  Radio, 
  Calendar, 
  Trophy, 
  Users, 
  User, 
  BarChart3, 
  Brain, 
  Newspaper, 
  Ticket, 
  ShieldAlert, 
  Search, 
  Bell, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Live", href: "/match/ind-vs-pak-t20wc-final", icon: Radio, isLivePulse: true },
  { name: "Matches", href: "/matches", icon: Calendar },
  { name: "Series", href: "/series", icon: Trophy },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Players", href: "/players", icon: User },
  { name: "Stats", href: "/stats", icon: BarChart3 },
  { name: "Analysis", href: "/analysis", icon: Brain },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Betting", href: "/betting", icon: ShieldAlert },
  { name: "Admin", href: "/admin", icon: SlidersHorizontal }
];

export function Navbar() {
  const pathname = usePathname();
  const { 
    unreadNotificationCount, 
    setIsSearchOpen, 
    user,
    jurisdiction,
    setJurisdictionCode
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jurisdictionDropdownOpen, setJurisdictionDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Compliance & Ticker Notice Bar */}
      <div className="bg-slate-950 border-b border-slate-900 text-xs px-4 py-1.5 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE BROADCAST FEED
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 truncate">
            T20 World Cup Final: IND 184/5 (18.2 ov) need 26 runs from 10 balls vs PAK
          </span>
        </div>

        {/* Jurisdiction Switcher */}
        <div className="relative flex items-center gap-2">
          <span className="text-[11px] text-slate-500 hidden md:inline">Region:</span>
          <button 
            onClick={() => setJurisdictionDropdownOpen(!jurisdictionDropdownOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800 transition"
          >
            <span>{jurisdiction.name.split(" ")[0]} ({jurisdiction.code})</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {jurisdictionDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50">
              <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-400 tracking-wider border-b border-slate-800">
                Select Jurisdiction
              </div>
              <button
                onClick={() => { setJurisdictionCode("UK"); setJurisdictionDropdownOpen(false); }}
                className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between", jurisdiction.code === "UK" ? "text-emerald-400 font-medium" : "text-slate-300")}
              >
                <span>United Kingdom (18+)</span>
                <span className="text-[10px] text-emerald-500">Odds Active</span>
              </button>
              <button
                onClick={() => { setJurisdictionCode("EU"); setJurisdictionDropdownOpen(false); }}
                className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between", jurisdiction.code === "EU" ? "text-emerald-400 font-medium" : "text-slate-300")}
              >
                <span>European Union (18+)</span>
                <span className="text-[10px] text-emerald-500">Odds Active</span>
              </button>
              <button
                onClick={() => { setJurisdictionCode("US_NJ"); setJurisdictionDropdownOpen(false); }}
                className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between", jurisdiction.code === "US_NJ" ? "text-emerald-400 font-medium" : "text-slate-300")}
              >
                <span>US (Regulated - 21+)</span>
                <span className="text-[10px] text-emerald-500">Odds Active</span>
              </button>
              <button
                onClick={() => { setJurisdictionCode("IND"); setJurisdictionDropdownOpen(false); }}
                className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between", jurisdiction.code === "IND" ? "text-amber-400 font-medium" : "text-slate-300")}
              >
                <span>India (Restricted)</span>
                <span className="text-[10px] text-amber-400">Compliant Mode</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Fixed Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                  CRIC<span className="text-emerald-400">PULSE</span>
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                  Sports Analytics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 relative",
                      isActive 
                        ? "bg-slate-800 text-white shadow-sm border border-slate-700" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    )}
                  >
                    {link.isLivePulse && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & User */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 text-xs transition"
              title="Search players, teams, matches (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-slate-950 flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>

            {/* User Profile / Status */}
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="font-medium max-w-[90px] truncate">{user.name}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
                    isActive 
                      ? "bg-slate-800 text-emerald-400 border border-slate-700" 
                      : "text-slate-300 hover:bg-slate-900"
                  )}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.name}</span>
                  {link.isLivePulse && (
                    <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold uppercase">
                      LIVE
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
        <Link
          href="/"
          className={cn("flex flex-col items-center gap-1 py-1 px-2 rounded text-[11px]", pathname === "/" ? "text-emerald-400 font-semibold" : "text-slate-400")}
        >
          <Flame className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/match/ind-vs-pak-t20wc-final"
          className={cn("flex flex-col items-center gap-1 py-1 px-2 rounded text-[11px] relative", pathname.includes("/match") ? "text-emerald-400 font-semibold" : "text-slate-400")}
        >
          <div className="relative">
            <Radio className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span>Live</span>
        </Link>
        <Link
          href="/matches"
          className={cn("flex flex-col items-center gap-1 py-1 px-2 rounded text-[11px]", pathname.startsWith("/matches") ? "text-emerald-400 font-semibold" : "text-slate-400")}
        >
          <Calendar className="w-4 h-4" />
          <span>Matches</span>
        </Link>
        <Link
          href="/analysis"
          className={cn("flex flex-col items-center gap-1 py-1 px-2 rounded text-[11px]", pathname.startsWith("/analysis") ? "text-emerald-400 font-semibold" : "text-slate-400")}
        >
          <Brain className="w-4 h-4" />
          <span>Analysis</span>
        </Link>
        <Link
          href="/tickets"
          className={cn("flex flex-col items-center gap-1 py-1 px-2 rounded text-[11px]", pathname.startsWith("/tickets") ? "text-emerald-400 font-semibold" : "text-slate-400")}
        >
          <Ticket className="w-4 h-4" />
          <span>Tickets</span>
        </Link>
      </div>
    </>
  );
}
