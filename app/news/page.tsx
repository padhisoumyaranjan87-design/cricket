"use client";

import React, { useState } from "react";
import { Newspaper, Filter, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/mock-data";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const filteredArticles = NEWS_ARTICLES.filter(a => {
    if (selectedCategory !== "ALL" && a.category !== selectedCategory) return false;
    return true;
  });

  const activeArticle = NEWS_ARTICLES.find(a => a.id === activeArticleId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Editorial Intelligence & Match Wire</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CRICKET NEWS & TACTICAL BRIEFS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Authentic match reports, tactical breakdowns, pitch forecasts, and player milestone analyses.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs">
          {["ALL", "Tactical Analysis", "Match News", "Records", "Tournament News"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                selectedCategory === cat 
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map(article => (
          <div
            key={article.id}
            className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-semibold text-[10px] uppercase border border-slate-700">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {article.readingTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition leading-snug mb-3">
                {article.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="text-slate-400">
                <span>By {article.author}</span> • <span className="text-emerald-400 font-medium">{article.source}</span>
              </div>

              <button
                onClick={() => setActiveArticleId(article.id)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
              >
                <span>Read Full Brief</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[85vh] overflow-y-auto space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticleId(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close (ESC)
              </button>
            </div>

            <h2 className="text-xl font-bold text-white leading-snug">
              {activeArticle.title}
            </h2>

            <div className="text-xs text-slate-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span>By <strong>{activeArticle.author}</strong></span>
              <span>•</span>
              <span>Source: <strong className="text-emerald-400">{activeArticle.source}</strong></span>
              <span>•</span>
              <span>{activeArticle.readingTimeMinutes} min read</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeArticle.summary}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-3">
              <p>{activeArticle.content}</p>
              <p className="text-slate-400 italic">
                Published in the CricPulse Cricket Intelligence archive. Verified editorial wire.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
