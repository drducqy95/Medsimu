import { NextResponse } from "next/server";
import { getAllLessonsFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const lessons = getAllLessonsFromDb();
    return NextResponse.json({ success: true, count: lessons.length, data: lessons });
  } catch (error: any) {
    console.error("Error fetching lessons from SQLite:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
