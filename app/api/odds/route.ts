import { NextResponse } from "next/server";
import { BETTING_ODDS_COMPARISON, ODDS_MOVEMENT_HISTORY } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jurisdiction = searchParams.get("jurisdiction") || "UK";

  if (jurisdiction === "IND" || jurisdiction === "RESTRICTED") {
    return NextResponse.json({
      success: true,
      isBettingPermitted: false,
      message: "Betting odds comparison is restricted in this jurisdiction in compliance with local sports integrity regulations.",
      odds: []
    });
  }

  return NextResponse.json({
    success: true,
    isBettingPermitted: true,
    disclaimer: "18+ only. Betting involves financial risk. Odds are subject to dynamic movement.",
    odds: BETTING_ODDS_COMPARISON,
    movementHistory: ODDS_MOVEMENT_HISTORY
  });
}
