import { NextResponse } from "next/server";
import { TICKETS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    disclaimer: "Ticket information may change. Verify availability and pricing with the official authorized provider.",
    tickets: TICKETS,
  });
}
