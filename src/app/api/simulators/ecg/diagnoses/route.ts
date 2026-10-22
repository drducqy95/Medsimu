import { NextRequest, NextResponse } from "next/server";
import { getAllEcgDiagnosesFromDb } from "@/infrastructure/db/sqlite";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const system = searchParams.get("system") || undefined;
    const list = getAllEcgDiagnosesFromDb(system);
    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch ECG diagnoses from SQLite", details: err?.message },
      { status: 500 }
    );
  }
}
