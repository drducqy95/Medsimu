import { NextRequest, NextResponse } from "next/server";
import { getAllFlashcardsFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const specialty = req.nextUrl.searchParams.get("specialty") || undefined;
    const flashcards = getAllFlashcardsFromDb(specialty);
    return NextResponse.json({ success: true, count: flashcards.length, data: flashcards });
  } catch (error: any) {
    console.error("Error fetching flashcards from SQLite:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
