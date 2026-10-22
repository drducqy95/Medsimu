import { NextResponse } from "next/server";
import { getAllEcgSystemsFromDb } from "@/infrastructure/db/sqlite";

export async function GET() {
  try {
    const systems = getAllEcgSystemsFromDb();
    return NextResponse.json(systems);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch ECG clinical systems", details: err?.message },
      { status: 500 }
    );
  }
}
