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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumb & SQLite Indicator */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Portal Hub</span>
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-hospital-900 border border-hospital-800 px-3 py-1 text-[11px] font-semibold text-emerald-400">
          <Database className="h-3.5 w-3.5" />
          <span>SQLite Database: medsim.db ({lessons.length} bài học, {drugs.length} thuốc, {quizzes.length} quiz)</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hospital-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-950 px-3 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-800">
              MODULE 1
            </span>
            <span className="text-xs font-semibold text-slate-400">Viện Hàn Lâm Y Khoa</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Học Tập & Nghiên Cứu Y Khoa
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Toàn bộ cơ sở dữ liệu bệnh học, dược lý học lâm sàng và ngân hàng câu hỏi được lưu trữ và truy vấn động từ SQLite.
          </p>
        </div>
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
