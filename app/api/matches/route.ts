import { NextResponse } from "next/server";
import { ALL_MATCHES } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const format = searchParams.get("format");

  let matches = [...ALL_MATCHES];

  if (status) {
    matches = matches.filter(m => m.status.toLowerCase() === status.toLowerCase());
  }

  if (format) {
    matches = matches.filter(m => m.format.toLowerCase() === format.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: matches.length,
    matches,
  });
}
