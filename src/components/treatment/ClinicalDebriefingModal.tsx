"use client";

import React from "react";
import Link from "next/link";
import {
  DebriefingScoreResult,
  SimulationState,
} from "@/domain/simulation/treatmentStateMachine";
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface ClinicalDebriefingModalProps {
  state: SimulationState;
  onRestart: () => void;
}

export const ClinicalDebriefingModal: React.FC<ClinicalDebriefingModalProps> = ({
  state,
  onRestart,
}) => {
  const score = state.finalScore;
  if (!score) return null;

  const rubric = state.caseData.debriefingRubric;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-hospital-700 bg-hospital-950 p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
        {/* Top Result Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-hospital-800 border-2 border-hospital-700 shadow-xl">
            {score.passed ? (
              <Award className="h-9 w-9 text-amber-400" />
            ) : (
              <ShieldAlert className="h-9 w-9 text-rose-500" />
            )}
          </div>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                score.passed
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-300"
              }`}
            >
              {score.passed ? "CẤP CỨU THÀNH CÔNG" : "CẦN RÚT KINH NGHIỆM LÂM SÀNG"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Tổng Kết Ca Lâm Sàng & Phản Hồi (Debriefing)
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-5xl font-black text-white">
              {score.totalScore}
            </span>
            <span className="font-mono text-xl text-slate-400 font-bold">/ 100 Điểm</span>
          </div>
        </div>

        {/* 4 Pillars Scoring Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Pillar 1: Diagnostic */}
          <div className="p-3.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Chẩn Đoán</div>
            <div className="font-mono text-2xl font-black text-teal-400">
              {score.diagnosticPoints} / 40
            </div>
            <div className="text-[10px] text-slate-500">Độ chuẩn xác</div>
          </div>

          {/* Pillar 2: Safety */}
          <div className="p-3.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">An Toàn Người Bệnh</div>
            <div className={`font-mono text-2xl font-black ${score.safetyPoints < 20 ? "text-rose-400" : "text-emerald-400"}`}>
              {score.safetyPoints} / 30
            </div>
            <div className="text-[10px] text-slate-500">Chống chỉ định</div>
          </div>

          {/* Pillar 3: Treatment */}
          <div className="p-3.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Y Lệnh Đúng</div>
            <div className="font-mono text-2xl font-black text-purple-400">
              {score.treatmentPoints} / 20
            </div>
            <div className="text-[10px] text-slate-500">Phác đồ chuẩn</div>
          </div>

          {/* Pillar 4: Speed */}
          <div className="p-3.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Thời Gian Vàng</div>
            <div className="font-mono text-2xl font-black text-amber-400">
              {score.speedPoints} / 10
            </div>
            <div className="text-[10px] text-slate-500">{state.elapsedSeconds}s thực thi</div>
          </div>
        </div>

        {/* Detailed Feedback Notes */}
        <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-4 space-y-2.5">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Nhận xét chuyên môn từ Hội đồng Giám định Y khoa:
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            {score.feedbackNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Pearls & Gold Standard Summary */}
        <div className="rounded-2xl border border-teal-500/30 bg-teal-950/20 p-4 space-y-3">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
            <Sparkles className="h-4 w-4" />
            <span>Phác Đồ Xử Trí Chuẩn (Gold Standard Summary)</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {rubric.goldStandardSummary}
          </p>

          {/* Pitfalls */}
          <div className="pt-2 border-t border-hospital-800 space-y-1.5">
            <span className="text-[11px] font-bold text-amber-400 block">
              ⚠️ Các Cạm Bẫy Lâm Sàng Cần Tuyệt Đối Tránh:
            </span>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {rubric.pitfallsToAvoid.map((pitfall, idx) => (
                <li key={idx}>{pitfall}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Direct Link to Module 1 Academy Lesson for Remediation */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-800/40 bg-purple-950/20 p-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-purple-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Ôn tập kiến thức lý thuyết:</span>
              Đọc lại cơ chế bệnh học & dược lý liên quan tại Module 1
            </div>
          </div>
          <Link
            href="/academy"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
          >
            <span>Vào Viện Hàn Lâm</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-hospital-800">
          <Link
            href="/treatment"
            className="px-4 py-2 rounded-xl bg-hospital-800 text-slate-300 hover:bg-hospital-700 text-xs font-semibold transition-colors"
          >
            Quay Về Danh Sách Ca Bệnh
          </Link>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-teal-950/50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Thực Hành Lại Ca Này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
