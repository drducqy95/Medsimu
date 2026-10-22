import { NextRequest, NextResponse } from "next/server";
import { getAllQuizzesFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const specialty = req.nextUrl.searchParams.get("specialty") || undefined;
    const quizzes = getAllQuizzesFromDb(specialty);
    return NextResponse.json({ success: true, count: quizzes.length, data: quizzes });
  } catch (error: any) {
    console.error("Error fetching quizzes from SQLite:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
