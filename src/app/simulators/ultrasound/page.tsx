"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Sparkles,
  Info,
  CheckCircle2,
  Stethoscope,
  RotateCcw,
} from "lucide-react";
import {
  UltrasoundZone,
  ProbeType,
  ULTRASOUND_ZONES,
} from "@/data/simulators/ultrasoundCases";
import { ThreeBodyViewport } from "@/components/simulators/ultrasound/ThreeBodyViewport";
import { DynamicUltrasoundScreen } from "@/components/simulators/ultrasound/DynamicUltrasoundScreen";
import { RealUltrasoundAtlasViewer } from "@/components/simulators/ultrasound/RealUltrasoundAtlasViewer";

export default function UltrasoundSimulatorPage() {
  const [activeMode, setActiveMode] = useState<"3d_probe" | "real_atlas">("real_atlas");
  const [currentZone, setCurrentZone] = useState<UltrasoundZone>("subxiphoid");
  const [probeType, setProbeType] = useState<ProbeType>("phased_array");
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [tiltDeg, setTiltDeg] = useState<number>(0);
  const [compression, setCompression] = useState<number>(0.3);
  const [isPathologyActive, setIsPathologyActive] = useState<boolean>(true);
  const [completedFastZones, setCompletedFastZones] = useState<Record<UltrasoundZone, boolean>>({
    subxiphoid: false,
    ruq: false,
    luq: false,
    suprapubic: false,
    lung_anterior: false,
  });

  const activeZoneDef = ULTRASOUND_ZONES.find((z) => z.id === currentZone) || ULTRASOUND_ZONES[0];

  const handleSelectZone = (zone: UltrasoundZone) => {
    setCurrentZone(zone);
    const targetDef = ULTRASOUND_ZONES.find((z) => z.id === zone);
    if (targetDef) {
      setProbeType(targetDef.recommendedProbe);
    }
  };

  const handleMarkZoneReviewed = (zone: UltrasoundZone) => {
    setCompletedFastZones((prev) => ({
      ...prev,
      [zone]: true,
    }));
  };

  const handleResetChecklist = () => {
    setCompletedFastZones({
      subxiphoid: false,
      ruq: false,
      luq: false,
      suprapubic: false,
      lung_anterior: false,
    });
  };

  const fastCompletedCount = Object.values(completedFastZones).filter(Boolean).length;

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
          <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-400">
            FAST Protocol & POCUS
          </span>
          <span className="rounded-full border border-hospital-700 bg-hospital-800/80 px-3 py-1 text-xs text-slate-300">
            Đầu Dò 3D Động 6 DoF
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="mb-8 rounded-3xl border border-hospital-800 bg-gradient-to-r from-hospital-900/90 via-hospital-950/90 to-teal-950/40 p-6 md:p-8 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-lg shadow-teal-950/50">
              <Activity className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  Mô Phỏng Siêu Âm Đầu Dò 3D Động (Ultrasound POCUS)
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-300 max-w-3xl">
                Thao tác tay điều khiển đầu dò ảo 3D (xoay, nghiêng, ấn mô), quan sát hình ảnh phản hồi
                siêu âm cắt lớp động thời gian thực (co bóp tim, trượt màng phổi, B-Mode, M-Mode, Color Doppler).
              </p>
            </div>
          </div>

          {/* Quick FAST status indicator */}
          <div className="flex items-center gap-3 rounded-2xl border border-hospital-700 bg-hospital-900/80 px-4 py-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Tiến độ FAST Exam</div>
              <div className="text-lg font-bold text-teal-400">
                {fastCompletedCount}/5 Cửa sổ
              </div>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-teal-500/40 bg-teal-950/60 flex items-center justify-center text-xs font-bold text-teal-300">
              {Math.round((fastCompletedCount / 5) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex rounded-2xl bg-hospital-900 p-1 border border-hospital-800">
          <button
            onClick={() => setActiveMode("real_atlas")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeMode === "real_atlas"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Kho Ảnh Siêu Âm Lâm Sàng Thật (Viable CD Atlas)</span>
          </button>
          <button
            onClick={() => setActiveMode("3d_probe")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeMode === "3d_probe"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Mô Phỏng Đầu Dò 3D Động (FAST POCUS)</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {activeMode === "real_atlas" ? "1,245 ảnh thật • 9 chương" : "Đầu dò 6 DoF • 5 cửa sổ FAST"}
        </span>
      </div>

      {activeMode === "real_atlas" ? (
        <RealUltrasoundAtlasViewer />
      ) : (
        /* Main Dual-Panel Workstation */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3D Body & Hand Probe Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ThreeBodyViewport
            currentZone={currentZone}
            onSelectZone={handleSelectZone}
            probeType={probeType}
            onChangeProbeType={setProbeType}
            rotationDeg={rotationDeg}
            onChangeRotation={setRotationDeg}
            tiltDeg={tiltDeg}
            onChangeTilt={setTiltDeg}
            compression={compression}
            onChangeCompression={setCompression}
          />

          {/* Clinical Context & Anatomical Guide */}
          <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-hospital-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Info className="h-4 w-4 text-teal-400" />
                <span>Giải Phẫu Cắt Lớp Vùng: {activeZoneDef.name}</span>
              </div>
              <button
                onClick={() => handleMarkZoneReviewed(currentZone)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  completedFastZones[currentZone]
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-hospital-800 hover:bg-teal-600/30 text-slate-300 border border-hospital-700"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{completedFastZones[currentZone] ? "Đã Khảo Sát" : "Đánh Dấu Xong"}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div>
                <span className="font-semibold text-slate-200">Cấu trúc quan sát: </span>
                <span className="text-teal-300">
                  {activeZoneDef.anatomicalStructures.join(", ")}
                </span>
              </div>
              <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-3 text-slate-300">
                <p className="font-semibold text-slate-100 mb-1">🔍 Hình ảnh sinh lý bình thường:</p>
                <p>{activeZoneDef.normalDescription}</p>
              </div>
              <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-3 text-amber-200">
                <p className="font-semibold text-amber-300 mb-1">⚠️ Dấu hiệu bệnh lý cấp cứu:</p>
                <p>{activeZoneDef.pathologyDescription}</p>
              </div>
              <div className="text-slate-400 italic">
                💡 <span className="text-slate-300 font-medium">Ý nghĩa lâm sàng:</span> {activeZoneDef.clinicalSignificance}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ultrasound Dynamic Screen (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <DynamicUltrasoundScreen
            zone={currentZone}
            probeType={probeType}
            rotationDeg={rotationDeg}
            tiltDeg={tiltDeg}
            compression={compression}
            isPathologyActive={isPathologyActive}
            onTogglePathology={() => setIsPathologyActive(!isPathologyActive)}
          />

          {/* FAST Protocol Checklist & Clinical Decision Box */}
          <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-teal-400" />
                <h3 className="font-bold text-white text-sm">
                  Quy Trình Khám FAST (Focused Assessment with Sonography for Trauma)
                </h3>
              </div>
              <button
                onClick={handleResetChecklist}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                title="Làm lại từ đầu"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Chỉ định khám 5 vị trí chuẩn trong cấp cứu chấn thương ngực-bụng kín để phát hiện tràn dịch màng ngoài tim,
              tràn máu ổ bụng và tràn khí màng phổi:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {ULTRASOUND_ZONES.map((z) => {
                const isSelected = currentZone === z.id;
                const isDone = completedFastZones[z.id];
                return (
                  <button
                    key={z.id}
                    onClick={() => handleSelectZone(z.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "border-teal-500 bg-teal-950/40 text-teal-200 ring-1 ring-teal-500/50"
                        : "border-hospital-800 bg-hospital-950/40 text-slate-300 hover:border-hospital-700"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isDone
                          ? "border-emerald-500 bg-emerald-500 text-hospital-950"
                          : "border-slate-600 bg-hospital-800"
                      }`}
                    >
                      {isDone && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                    <div className="text-xs leading-tight">
                      <div className="font-semibold text-slate-200">{z.name.split("(")[0]}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Đầu dò: {z.recommendedProbe}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Alert Box */}
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white">Mẹo Thực Hành Lâm Sàng: </span>
                  Khi xoay đầu dò 90 độ, mặt cắt siêu âm chuyển từ trục dọc sang trục ngang (Short axis / Transverse).
                  Nếu ấn đầu dò quá nhẹ, tín hiệu âm phản hồi yếu do tiếp xúc kém với gel âm học. Hãy tăng độ nén (Compression)
                  lên 30-60% để đạt độ xuyên thấu tối ưu.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
