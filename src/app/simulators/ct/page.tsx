"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scan,
  ArrowLeft,
  Sparkles,
  Layers,
  HeartPulse,
  Brain,
  Stethoscope,
  Info,
  HelpCircle,
} from "lucide-react";
import { CT_CASES, CtCase } from "@/data/simulators/ctCases";
import { CtSliceViewer } from "@/components/simulators/ct/CtSliceViewer";

export default function CtSimulatorPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CT_CASES[0].id);

  const activeCase = CT_CASES.find((c) => c.id === selectedCaseId) || CT_CASES[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/simulators"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Trung Tâm Cận Lâm Sàng</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
            Cắt Lớp Vi Tính Đa Lát Cắt (MDCT)
          </span>
          <span className="rounded-full border border-hospital-700 bg-hospital-800/80 px-3 py-1 text-xs text-slate-300">
            Đo Hounsfield (HU) Động
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="mb-8 rounded-3xl border border-hospital-800 bg-gradient-to-r from-hospital-900/90 via-hospital-950/90 to-purple-950/40 p-6 md:p-8 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-950/50">
              <Scan className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng (Multi-Slice CT Workstation)
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-300 max-w-3xl">
                Cuộn lát cắt liên tục (Scrubbing / Wheel Scroll), chuyển đổi cửa sổ Nhu mô / Xương / Phổi (Window Width/Level)
                và đo tỷ trọng mô thực theo đơn vị Hounsfield (HU) để phân biệt máu tụ, khí tự do, nhồi máu và huyết khối lòng mạch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CT_CASES.map((c) => {
          const isSelected = c.id === activeCase.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/50 shadow-lg"
                  : "border-hospital-800 bg-hospital-900/70 text-slate-300 hover:border-hospital-700"
              }`}
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hospital-800 text-purple-400 border border-hospital-700">
                {c.organ === "brain" && <Brain className="h-5 w-5" />}
                {c.organ === "chest" && <HeartPulse className="h-5 w-5" />}
                {c.organ === "abdomen" && <Stethoscope className="h-5 w-5" />}
              </div>
              <div>
                <div className="font-bold text-sm text-white">{c.title.split(":")[0]}</div>
                <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  {c.title.split(":")[1] || c.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Case Clinical Scenario Overview */}
      <div className="mb-6 rounded-2xl border border-hospital-800 bg-hospital-900/80 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hospital-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold text-purple-300 border border-purple-500/30">
              Bệnh Án Cấp Cứu
            </span>
            <span className="text-sm font-semibold text-white">Chỉ định: {activeCase.indication}</span>
          </div>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-lg">
            Dấu hiệu sinh tồn: {activeCase.vitals}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">Bối cảnh lâm sàng: </span>
          {activeCase.clinicalScenario}
        </p>
      </div>

      {/* Interactive CT Workstation Canvas & Console */}
      <CtSliceViewer ctCase={activeCase} />

      {/* Educational Reference Table: Hounsfield Unit Scale */}
      <div className="mt-8 rounded-3xl border border-hospital-800 bg-hospital-900/70 p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Info className="h-4 w-4 text-purple-400" />
          <span>Bảng Chuẩn Thang Đo Tỷ Trọng Hounsfield (HU) Trong Chẩn Đoán Cắt Lớp Vi Tính</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-slate-400">-1000 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Khí / Không khí</div>
            <div className="text-[10px] text-slate-500">Màu đen đậm</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-slate-400">-700 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Nhu mô phổi</div>
            <div className="text-[10px] text-slate-500">Đen xốp</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-slate-400">-100 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Mô mỡ dưới da</div>
            <div className="text-[10px] text-slate-500">Xám tối</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-teal-400">0 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Nước tinh khiết</div>
            <div className="text-[10px] text-slate-500">Chuẩn quy chiếu</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-slate-300">+15 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Dịch não tủy</div>
            <div className="text-[10px] text-slate-500">Não thất</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-slate-300">+35 → +45 HU</div>
            <div className="text-[11px] text-slate-200 mt-1 font-semibold">Nhu mô / Cơ</div>
            <div className="text-[10px] text-slate-500">Xám trung gian</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-rose-400">+60 → +85 HU</div>
            <div className="text-[11px] text-rose-300 mt-1 font-semibold">Máu tươi cấp</div>
            <div className="text-[10px] text-slate-500">Tăng tỷ trọng</div>
          </div>
          <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5">
            <div className="font-mono font-bold text-white">+800 → +1500 HU</div>
            <div className="text-[11px] text-white mt-1 font-semibold">Xương đặc / Vôi hóa</div>
            <div className="text-[10px] text-slate-500">Trắng sáng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
