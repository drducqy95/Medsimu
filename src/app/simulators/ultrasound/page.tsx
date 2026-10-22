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
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-3 sm:py-5 space-y-3">
      {/* Top Navigation & Breadcrumbs (Compact) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hospital-800 pb-2">
        <Link
          href="/simulators"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Quay lại Trung Tâm Cận Lâm Sàng</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 font-semibold text-teal-400">
            FAST Protocol & POCUS
          </span>
          <span className="rounded-full border border-hospital-700 bg-hospital-800/80 px-2.5 py-0.5 text-slate-300">
            Đầu Dò 3D 6 DoF
          </span>
        </div>
      </div>

      {/* Header Banner (Compact) */}
      <div className="rounded-2xl border border-hospital-800 bg-gradient-to-r from-hospital-900/90 via-hospital-950/90 to-teal-950/40 p-3 sm:p-4 backdrop-blur shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-extrabold text-white">
                  Mô Phỏng Siêu Âm Đầu Dò 3D Động (Ultrasound POCUS)
                </h1>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-300 max-w-3xl line-clamp-1 hidden sm:block">
                Điều khiển đầu dò 3D (xoay, nghiêng, ấn mô), quan sát hình ảnh phản hồi
                siêu âm cắt lớp động thời gian thực (co bóp tim, trượt màng phổi, kho 1200+ ảnh thật CD).
              </p>
            </div>
          </div>

          {/* Quick FAST status indicator */}
          <div className="flex items-center gap-2.5 rounded-xl border border-hospital-700 bg-hospital-900/80 px-3 py-1.5 shrink-0 self-end md:self-center">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Tiến độ FAST</div>
              <div className="text-sm font-bold text-teal-400">
                {fastCompletedCount}/5 Cửa sổ
              </div>
            </div>
            <div className="h-7 w-7 rounded-full border border-teal-500/40 bg-teal-950/60 flex items-center justify-center text-[10px] font-bold text-teal-300">
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
        /* Main Dual-Panel Workstation with Mobile-First Order (Screen Top, Controls Bottom) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-start">
          {/* Right Column (Screen) rendered First on mobile: order-1 lg:order-2 (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 sm:space-y-6">
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
            <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-3 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-teal-400" />
                  <h3 className="font-bold text-white text-xs sm:text-sm">
                    Giao Thức FAST / eFAST Cấp Cứu
                  </h3>
                </div>
                <button
                  onClick={handleResetChecklist}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  <RotateCcw className="h-3 w-3" /> Làm Lại
                </button>
              </div>

              {/* FAST Checklist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {ULTRASOUND_ZONES.map((zone) => {
                  const isDone = completedFastZones[zone.id];
                  const isCurrent = currentZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => handleSelectZone(zone.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? "border-teal-500 bg-teal-950/40 text-teal-200 ring-1 ring-teal-500/50"
                          : isDone
                          ? "border-emerald-800/60 bg-emerald-950/20 text-slate-300"
                          : "border-hospital-800 bg-hospital-950/40 text-slate-400 hover:border-hospital-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            isDone ? "text-emerald-400" : "text-slate-600"
                          }`}
                        />
                        <span className="truncate font-medium">{zone.name.split(":")[0]}</span>
                      </div>
                      <span className="font-mono text-[10px] text-teal-400 shrink-0">
                        {zone.id === "lung_anterior" ? "Phổi" : "Bụng"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Left Column (Controls & 3D Probe): order-2 lg:order-1 (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-3 sm:space-y-6">
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
            <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-3 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-hospital-800 pb-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                  <Info className="h-4 w-4 text-teal-400" />
                  <span>Giải Phẫu Vùng: {activeZoneDef.name}</span>
                </div>
                <button
                  onClick={() => handleMarkZoneReviewed(currentZone)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    completedFastZones[currentZone]
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-hospital-800 hover:bg-teal-600/30 text-slate-300 border border-hospital-700"
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{completedFastZones[currentZone] ? "Đã Khảo Sát" : "Đánh Dấu"}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                <div>
                  <span className="font-semibold text-slate-200">Cấu trúc quan sát: </span>
                  <span className="text-teal-300">
                    {activeZoneDef.anatomicalStructures.join(", ")}
                  </span>
                </div>
                <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2.5 text-slate-300">
                  <p className="font-semibold text-slate-100 mb-0.5">🔍 Hình ảnh sinh lý:</p>
                  <p>{activeZoneDef.normalDescription}</p>
                </div>
                <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-2.5 text-amber-200">
                  <p className="font-semibold text-amber-300 mb-0.5">⚠️ Dấu hiệu bệnh lý cấp cứu:</p>
                  <p>{activeZoneDef.pathologyDescription}</p>
                </div>
                <div className="text-slate-400 italic text-[11px]">
                  💡 <span className="text-slate-300 font-medium">Ý nghĩa:</span> {activeZoneDef.clinicalSignificance}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
