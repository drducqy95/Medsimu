import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Pill,
  HelpCircle,
  Brain,
  ArrowLeft,
  Database,
  Sparkles,
} from "lucide-react";
import {
  getAllLessonsFromDb,
  getAllDrugsFromDb,
  getAllQuizzesFromDb,
  getAllFlashcardsFromDb,
} from "@/infrastructure/db/sqlite";
import { AcademyClientTabs } from "@/components/academy/AcademyClientTabs";

export const dynamic = "force-dynamic";

export default function AcademyPage() {
  // Query all knowledge directly from SQLite database file (data/medsim.db)
  const lessons = getAllLessonsFromDb();
  const drugs = getAllDrugsFromDb();
  const quizzes = getAllQuizzesFromDb();
  const flashcards = getAllFlashcardsFromDb();

  return (
    <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-5">
      {/* Top Breadcrumb & SQLite Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Quay lại Trang Chủ</span>
        </Link>

        <div className="flex items-center gap-1.5 rounded-full bg-hospital-900 border border-hospital-800 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
          <Database className="h-3 w-3" />
          <span>SQLite: {lessons.length} bài học • {drugs.length} thuốc • {quizzes.length} quiz</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-hospital-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-cyan-950 px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-800">
            MODULE 1
          </span>
          <h1 className="text-base sm:text-xl font-bold text-white tracking-tight">
            Viện Hàn Lâm Y Khoa & Dược Lý Học
          </h1>
        </div>
        <p className="mt-0.5 text-xs text-slate-400 line-clamp-1 sm:line-clamp-none">
          Cơ sở dữ liệu bệnh học, dược lý học lâm sàng và ngân hàng câu hỏi truy vấn động từ SQLite.
        </p>
      </div>

      {/* Interactive Tabs for the 4 Sections */}
      <AcademyClientTabs
        lessons={lessons}
        drugs={drugs}
        quizzes={quizzes}
        flashcards={flashcards}
      />
    </div>
  );
}
