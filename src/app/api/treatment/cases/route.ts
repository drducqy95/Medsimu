import { NextResponse } from "next/server";
import { getAllCasesFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get("specialty") || undefined;

    const cases = getAllCasesFromDb(specialty);
    return NextResponse.json(cases);
  } catch (error) {
    console.error("API Error fetching clinical cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinical cases from database" },
      { status: 500 }
    );
  }
}
