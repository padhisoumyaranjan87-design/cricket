import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRunRate(runs: number, overs: number): string {
  if (overs === 0) return "0.00";
  const balls = Math.floor(overs) * 6 + Math.round((overs % 1) * 10);
  if (balls === 0) return "0.00";
  return ((runs / balls) * 6).toFixed(2);
}

export function calculateRequiredRunRate(runsNeeded: number, ballsRemaining: number): string {
  if (ballsRemaining <= 0) return "0.00";
  return ((runsNeeded / ballsRemaining) * 6).toFixed(2);
}

export function formatOvers(balls: number): string {
  const completeOvers = Math.floor(balls / 6);
  const remBalls = balls % 6;
  return `${completeOvers}.${remBalls}`;
}

export function getDeliveryColor(shortDesc: string): { bg: string; text: string; border: string } {
  const desc = shortDesc.toUpperCase();
  if (desc.includes("WICKET") || desc === "W") {
    return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/50" };
  }
  if (desc.includes("6") || desc.includes("SIX")) {
    return { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/50" };
  }
  if (desc.includes("4") || desc.includes("FOUR")) {
    return { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/50" };
  }
  if (desc.includes("WD") || desc.includes("NB")) {
    return { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/50" };
  }
  if (desc === "0" || desc.includes("DOT")) {
    return { bg: "bg-slate-800/60", text: "text-slate-400", border: "border-slate-700" };
  }
  return { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/30" };
}
