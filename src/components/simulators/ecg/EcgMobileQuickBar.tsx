"use client";

import React from "react";
import {
  HeartPulse,
  Sliders,
  Siren,
  FileCheck2,
  SlidersHorizontal,
} from "lucide-react";
import { EcgRhythmDefinition } from "@/domain/simulators/ecgWaveforms";

interface EcgMobileQuickBarProps {
  currentRhythm: EcgRhythmDefinition;
  bpm: number;
  sweepSpeed: number;
  calipersEnabled: boolean;
  onOpenPathologyDrawer: () => void;
  onOpenSettingsSheet: () => void;
  onOpenClinicalDeck: () => void;
  onOpenSevenSteps?: () => void;
  onToggleCalipers: () => void;
}

export function EcgMobileQuickBar({
  currentRhythm,
  bpm,
  sweepSpeed,
  calipersEnabled,
  onOpenPathologyDrawer,
  onOpenSettingsSheet,
  onOpenClinicalDeck,
  onOpenSevenSteps,
  onToggleCalipers,
}: EcgMobileQuickBarProps) {
  const isCritical =
    currentRhythm.category === "ventricular" ||
    (currentRhythm.id as string).startsWith("stemi") ||
    currentRhythm.id === "brugada_type1" ||
    currentRhythm.id === "torsades_de_pointes" ||
    currentRhythm.id === "asystole" ||
    currentRhythm.id === "hyperkalemia";

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-hospital-900/95 border border-hospital-800 shadow-md">
      {/* Rhythm Switcher Pill */}
      <button
        type="button"
        onClick={onOpenPathologyDrawer}
        className={`flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left transition active:scale-98 ${
          isCritical
            ? "bg-rose-950/70 border-rose-800 text-white"
            : "bg-hospital-800/90 border-hospital-700 text-white hover:bg-hospital-750"
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0 pr-1">
          <HeartPulse
            className={`h-3.5 w-3.5 shrink-0 ${
              isCritical ? "text-rose-400 animate-pulse" : "text-emerald-400"
            }`}
          />
          <div className="min-w-0">
            <div className="text-[11px] font-extrabold truncate leading-tight">
              {currentRhythm.name}
            </div>
            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <span>{bpm} bpm</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Chạm để đổi bệnh ▼</span>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 shrink-0 font-bold">
          ▼
        </div>
      </button>

      {/* Quick Settings Button */}
      <button
        type="button"
        onClick={onOpenSettingsSheet}
        className="flex flex-col items-center justify-center h-10 px-2 rounded-xl bg-hospital-800 border border-hospital-700 text-slate-300 hover:text-white transition active:scale-95 shrink-0"
        title="Cài đặt thông số sóng"
      >
        <Sliders className="h-3.5 w-3.5 text-cyan-400 mb-0.5" />
        <span className="text-[9px] font-bold">Cài đặt</span>
      </button>

      {/* Caliper 1-Tap Toggle */}
      <button
        type="button"
        onClick={onToggleCalipers}
        className={`flex flex-col items-center justify-center h-10 px-2 rounded-xl border transition active:scale-95 shrink-0 ${
          calipersEnabled
            ? "bg-cyan-950 border-cyan-700 text-cyan-300"
            : "bg-hospital-800 border-hospital-700 text-slate-400"
        }`}
        title="Bật/Tắt thước Caliper"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 mb-0.5" />
        <span className="text-[9px] font-bold">Thước</span>
      </button>

      {/* Clinical Deck Emergency Button */}
      <button
        type="button"
        onClick={onOpenClinicalDeck}
        className="flex flex-col items-center justify-center h-10 px-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 border border-rose-500 text-white shadow-sm transition active:scale-95 shrink-0"
        title="Phác đồ xử trí & Ca bệnh"
      >
        <Siren className="h-3.5 w-3.5 animate-pulse mb-0.5" />
        <span className="text-[9px] font-bold">Phác đồ</span>
      </button>
    </div>
  );
}
