import { NextResponse } from "next/server";
import { getAllDrugsFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const drugs = getAllDrugsFromDb();
    return NextResponse.json({ success: true, count: drugs.length, data: drugs });
  } catch (error: any) {
    console.error("Error fetching drugs from SQLite:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
