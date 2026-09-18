import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlobalSearch } from "@/components/global-search";

export const metadata: Metadata = {
  title: "CRICPULSE — Live Cricket Scores, AI Analytics & Match Center",
  description: "Live ball-by-ball cricket events, model-based analytical projections, team & player records, official ticket discovery, and licensed odds comparison.",
  keywords: "cricket live scores, cricket statistics, match analysis, win probability, cricket tickets, cricket odds, T20 World Cup, IPL 2026",
  openGraph: {
    title: "CRICPULSE — Cricket. Live. Analyzed.",
    description: "The next-generation cricket command center with real-time ball tracking and AI analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <GlobalSearch />
        </AppProvider>
      </body>
    </html>
  );
}
