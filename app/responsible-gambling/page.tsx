"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Phone, AlertTriangle, CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";

export default function ResponsibleGamblingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back Link */}
      <Link
        href="/betting"
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Betting Information</span>
      </Link>

      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Player Protection & Regulatory Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          RESPONSIBLE GAMBLING & PLAYER SAFETY
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          CRICPULSE is committed to safe, transparent sports analytics. We promote informed decision-making and strictly adhere to licensed gambling standards.
        </p>
      </div>

      {/* 5 Core Principles of Responsible Play */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Never Chase Losses",
            desc: "Trying to recoup lost money by placing larger or riskier bets almost always leads to escalating financial losses."
          },
          {
            title: "Set Time & Financial Limits",
            desc: "Determine your maximum wagering limit and stick to it strictly regardless of match momentum or outcome shifts."
          },
          {
            title: "Gambling Is Not An Investment",
            desc: "Never treat sports wagering as a source of steady income, emergency funding, or financial plan."
          },
          {
            title: "Keep Track of Time",
            desc: "Set alarm reminders and take frequent breaks. Sports betting should never interfere with work or family life."
          }
        ].map((rule, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{rule.title}</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Helplines Directory */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Phone className="w-5 h-5 text-emerald-400" />
          <span>24/7 Confidential Helpline Directory</span>
        </h2>
        <p className="text-xs text-slate-400">
          If you or someone you know is struggling with gambling, trained counselors are available right now to offer free, non-judgmental guidance:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">United Kingdom</span>
            <div className="font-bold text-white text-sm">GamCare National Helpline</div>
            <div className="text-emerald-400 font-mono font-bold text-xs mt-1">0808 8020 133</div>
            <div className="text-slate-500 text-[11px] mt-1">Free 24/7 Phone & Webchat</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-[10px] text-blue-400 uppercase font-bold block mb-1">United States</span>
            <div className="font-bold text-white text-sm">National Council on Problem Gambling</div>
            <div className="text-blue-400 font-mono font-bold text-xs mt-1">1-800-522-4700</div>
            <div className="text-slate-500 text-[11px] mt-1">Call or Text 24/7 Confidential</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-[10px] text-purple-400 uppercase font-bold block mb-1">International</span>
            <div className="font-bold text-white text-sm">Gambling Therapy</div>
            <div className="text-purple-400 font-mono font-bold text-xs mt-1">gamblingtherapy.org</div>
            <div className="text-slate-500 text-[11px] mt-1">Multilingual Global Live Chat</div>
          </div>
        </div>
      </div>

      {/* Self-Exclusion & Safeguards Tools */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-emerald-400" />
          <span>Self-Exclusion & Account Safeguards</span>
        </h2>
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Licensed betting operators are legally required to provide self-exclusion programs. If you wish to exclude yourself from sports wagering:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>UK GAMSTOP:</strong> Register at <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">gamstop.co.uk</a> to exclude yourself from all UK-licensed gambling websites with a single request.</li>
            <li><strong>Deposit Limits:</strong> Set daily, weekly, or monthly deposit ceilings with your licensed provider before placing any bet.</li>
            <li><strong>Reality Checks:</strong> Turn on timed popup reminders that show you how long your session has lasted and net spend.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
