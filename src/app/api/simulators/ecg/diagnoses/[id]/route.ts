import { NextRequest, NextResponse } from "next/server";
import { getEcgDiagnosisByIdFromDb } from "@/infrastructure/db/sqlite";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = getEcgDiagnosisByIdFromDb(params.id);
    if (!item) {
      return NextResponse.json(
        { error: `ECG Diagnosis not found for ID: ${params.id}` },
        { status: 404 }
      );
    }
    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch ECG diagnosis", details: err?.message },
      { status: 500 }
    );
  }
}
