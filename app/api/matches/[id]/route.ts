import { NextResponse } from "next/server";
import { ALL_MATCHES } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const matchId = params.id;
  const match = ALL_MATCHES.find(m => m.id === matchId);

  if (!match) {
    return NextResponse.json(
      { success: false, error: "Match not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    match,
  });
}
