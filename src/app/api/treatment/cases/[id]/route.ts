import { NextResponse } from "next/server";
import { getCaseByIdFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseId = params.id;
    const clinicalCase = getCaseByIdFromDb(caseId);

    if (!clinicalCase) {
      return NextResponse.json(
        { error: `Clinical case with ID '${caseId}' not found in database` },
        { status: 404 }
      );
    }

    return NextResponse.json(clinicalCase);
  } catch (error) {
    console.error("API Error fetching clinical case by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinical case from database" },
      { status: 500 }
    );
  }
}
