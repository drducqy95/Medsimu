import { NextResponse } from "next/server";
import { getUltrasoundChapterByIdFromDb } from "@/infrastructure/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const chapter = getUltrasoundChapterByIdFromDb(params.chapterId);
    if (!chapter) {
      return NextResponse.json(
        { error: `Ultrasound chapter '${params.chapterId}' not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.error("Error fetching ultrasound chapter:", error);
    return NextResponse.json(
      { error: "Failed to fetch ultrasound chapter from database" },
      { status: 500 }
    );
  }
}
