import { NextResponse } from "next/server";
import { getAllUltrasoundChaptersFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const chapters = getAllUltrasoundChaptersFromDb();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Error fetching ultrasound atlas chapters:", error);
    return NextResponse.json(
      { error: "Failed to fetch ultrasound atlas from database" },
      { status: 500 }
    );
  }
}
