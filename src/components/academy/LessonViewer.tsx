"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  Activity,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
} from "lucide-react";
import { MedicalLesson, MedicalSpecialty } from "@/domain/academy/types";

interface LessonViewerProps {
  lessons: MedicalLesson[];
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lessons }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || "");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredLessons = lessons.filter((l) => {
    const matchSpecialty = selectedSpecialty === "all" || l.specialty === selectedSpecialty;
    const matchQuery =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpecialty && matchQuery;
  });

  const activeLesson = lessons.find((l) => l.id === selectedLessonId) || filteredLessons[0];

  const specialties: { id: string; label: string }[] = [
    { id: "all", label: "Tất cả chuyên khoa" },
    { id: "cardiology", label: "Tim mạch" },
    { id: "pulmonology", label: "Hô hấp" },
    { id: "emergency", label: "Cấp cứu - Hồi sức" },
    { id: "gastroenterology", label: "Tiêu hóa" },
    { id: "radiology", label: "Cận lâm sàng & Hình ảnh" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Sidebar: Lesson List */}
      <div className="lg:col-span-4 space-y-4">
        {/* Search & Filter */}
        <div className="space-y-3 rounded-2xl border border-hospital-800 bg-hospital-900/80 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm bài học bệnh học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-hospital-700 bg-hospital-950 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {specialties.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSpecialty(s.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  selectedSpecialty === s.id
                    ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                    : "bg-hospital-800 text-slate-300 hover:bg-hospital-750"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Lesson Cards */}
        <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
          {filteredLessons.map((lesson) => {
            const isSelected = activeLesson?.id === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonId(lesson.id)}
                className={`w-full text-left rounded-2xl p-4 border transition-all ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/40 shadow-lg shadow-cyan-950/30"
                    : "border-hospital-800 bg-hospital-900/60 hover:border-hospital-700 hover:bg-hospital-850"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span className="font-bold uppercase tracking-wider text-cyan-400">
                    {lesson.specialty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.readTimeMinutes} phút
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{lesson.title}</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{lesson.summary}</p>
              </button>
            );
          })}
          {filteredLessons.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-hospital-800 rounded-2xl">
              Không tìm thấy bài học phù hợp.
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Selected Lesson Detail */}
      <div className="lg:col-span-8">
        {activeLesson ? (
          <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header */}
            <div className="border-b border-hospital-800 pb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-cyan-950 px-3 py-0.5 text-xs font-bold text-cyan-300 border border-cyan-800">
                  {activeLesson.specialty.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Thời lượng đọc: {activeLesson.readTimeMinutes} phút
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{activeLesson.title}</h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{activeLesson.summary}</p>
            </div>

            {/* Red Flags Alert Box */}
            {activeLesson.clinicalPresentation.redFlags.length > 0 && (
              <div className="rounded-2xl border-2 border-rose-500/50 bg-rose-950/30 p-5 shadow-inner">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2.5">
                  <AlertTriangle className="h-5 w-5 animate-bounce" />
                  <span>DẤU HIỆU CẢNH BÁO ĐỎ NGUY KỊCH (RED FLAGS):</span>
                </div>
                <ul className="space-y-1.5 text-xs text-rose-200">
                  {activeLesson.clinicalPresentation.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pathophysiology (Cơ chế bệnh sinh) */}
            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-5 space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-cyan-400">
                <Activity className="h-5 w-5" />
                <span>1. Cơ Chế Sinh Lý Bệnh Học (Pathophysiology)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeLesson.pathophysiology.mechanism}
              </p>
              {activeLesson.pathophysiology.hemodynamicChanges && (
                <div className="mt-2 rounded-xl bg-hospital-900/80 p-3 text-xs text-slate-300 border border-hospital-800">
                  <span className="font-bold text-cyan-300">Biến đổi huyết động: </span>
                  {activeLesson.pathophysiology.hemodynamicChanges}
                </div>
              )}
            </div>

            {/* Clinical Presentation (Triệu chứng lâm sàng) */}
            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-5 space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-teal-400">
                <Stethoscope className="h-5 w-5" />
                <span>2. Khám & Triệu Chứng Lâm Sàng</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-xl bg-hospital-900/80 p-3.5 border border-hospital-800">
                  <h4 className="font-bold text-slate-200 mb-2">Triệu chứng cơ năng (Hỏi bệnh):</h4>
                  <ul className="space-y-1 text-slate-300">
                    {activeLesson.clinicalPresentation.chiefComplaints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-teal-400">▹</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-hospital-900/80 p-3.5 border border-hospital-800">
                  <h4 className="font-bold text-slate-200 mb-2">Triệu chứng thực thể (Khám):</h4>
                  <ul className="space-y-1 text-slate-300">
                    {activeLesson.clinicalPresentation.physicalFindings.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-teal-400">▹</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Diagnostic Criteria & Paraclinical */}
            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-5 space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-blue-400">
                <FileText className="h-5 w-5" />
                <span>3. Tiêu Chuẩn Vàng & Cận Lâm Sàng</span>
              </h3>
              <div className="text-xs space-y-2">
                <div className="rounded-xl bg-blue-950/30 border border-blue-800/40 p-3 text-blue-200">
                  <span className="font-bold">Tiêu chuẩn vàng: </span>
                  {activeLesson.diagnosticCriteria.goldStandard}
                </div>
                {activeLesson.diagnosticCriteria.ecgFindings && (
                  <div className="rounded-xl bg-hospital-900/80 p-3 border border-hospital-800 text-slate-300">
                    <span className="font-bold text-emerald-400">Dấu hiệu trên ECG: </span>
                    {activeLesson.diagnosticCriteria.ecgFindings}
                  </div>
                )}
                {activeLesson.diagnosticCriteria.imagingFindings && (
                  <div className="rounded-xl bg-hospital-900/80 p-3 border border-hospital-800 text-slate-300">
                    <span className="font-bold text-purple-400">Chẩn đoán hình ảnh (Siêu âm/X-quang/CT): </span>
                    {activeLesson.diagnosticCriteria.imagingFindings}
                  </div>
                )}
              </div>
            </div>

            {/* Management & Treatment Protocol */}
            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-5 space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>4. Phác Đồ Xử Trí Khẩn Cấp & Thuốc Đầu Tay</span>
              </h3>
              <div className="space-y-2 text-xs">
                {activeLesson.managementSummary.immediateSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-hospital-900/80 p-2.5 border border-hospital-800 text-slate-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {activeLesson.managementSummary.contraindicatedInterventions.length > 0 && (
                <div className="mt-3 rounded-xl border border-rose-800/50 bg-rose-950/20 p-3.5 text-xs text-rose-300">
                  <div className="flex items-center gap-1.5 font-bold mb-1.5 text-rose-400">
                    <XCircle className="h-4 w-4" />
                    <span>Chống chỉ định can thiệp nguy hại:</span>
                  </div>
                  <ul className="space-y-1">
                    {activeLesson.managementSummary.contraindicatedInterventions.map((contra, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>❌</span>
                        <span>{contra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 border border-hospital-800 rounded-3xl bg-hospital-900/40">
            Vui lòng chọn một bài học từ danh sách bên trái.
          </div>
        )}
      </div>
    </div>
  );
};
