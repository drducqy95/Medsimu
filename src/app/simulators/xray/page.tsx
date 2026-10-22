"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { XRAY_CASES, XrayCase } from "@/data/simulators/xrayCases";
import { XrayViewer } from "@/components/simulators/xray/XrayViewer";

export default function XraySimulatorPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(XRAY_CASES[0].id);

  const currentCase = XRAY_CASES.find((c) => c.id === selectedCaseId) || XRAY_CASES[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hospital-800 pb-5">
        <div>
          <Link
            href="/simulators"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại Phòng Mô Phỏng Cận Lâm Sàng</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-950 text-blue-400 border border-blue-800 shadow-md">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Phòng Soi Phim X-Quang Tương Tác (X-Ray Suite)
              </h1>
              <p className="text-xs text-slate-400">
                Viewer chuẩn DICOM • Chỉnh sáng/tương phản (Window/Level) • Thước đo CTR • Chỉ điểm bệnh lý
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2.5">
        {XRAY_CASES.map((c) => {
          const isSelected = selectedCaseId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`rounded-2xl border px-4 py-2.5 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-blue-950/80 border-blue-600 text-blue-300 shadow-lg shadow-blue-950/30"
                  : "border-hospital-800 bg-hospital-900/60 text-slate-400 hover:text-white hover:bg-hospital-850"
              }`}
            >
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive X-Ray Canvas Viewer */}
      <XrayViewer xrayCase={currentCase} />

      {/* Radiology Findings & Clinical Case Breakdown */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Patient Vignette & Key Findings */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-hospital-800 pb-3">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span>Báo Cáo Đọc Phim X-Quang Chi Tiết</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-400 bg-hospital-950 px-2.5 py-1 rounded-lg border border-hospital-800">
                Bệnh nhân: {currentCase.patientInfo.gender}, {currentCase.patientInfo.age} tuổi
              </span>
            </div>

            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-4 text-xs text-slate-300">
              <span className="font-bold text-cyan-300 block mb-1">Lý do chụp & Bệnh sử:</span>
              <p>{currentCase.patientInfo.chiefComplaint}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-emerald-400">Dấu hiệu nhận diện then chốt:</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentCase.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 rounded-xl bg-hospital-950/40 p-2.5 border border-hospital-800/80">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-800/40 bg-blue-950/20 p-4 text-xs text-blue-200">
              <span className="font-bold block mb-1 text-blue-300">Kết luận X-quang:</span>
              <p className="leading-relaxed">{currentCase.radiologyReport}</p>
            </div>
          </div>
        </div>

        {/* Right: Teaching Points & Clinical Pearls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white flex items-center gap-2 border-b border-hospital-800 pb-3">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>Kim Chỉ Nam Đọc Phim (Teaching Points)</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              {currentCase.teachingPoints.map((point, idx) => (
                <div key={idx} className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-4 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-950 text-[10px] text-amber-400">
                      {idx + 1}
                    </span>
                    <span>Quy tắc lâm sàng:</span>
                  </div>
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-hospital-800">
              <Link
                href="/simulators/ecg"
                className="flex items-center justify-center gap-2 rounded-xl bg-hospital-800 py-2.5 text-xs font-bold text-white hover:bg-hospital-750 transition-all border border-hospital-700"
              >
                <span>Chuyển sang Máy Chạy Điện Tâm Đồ (ECG)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
