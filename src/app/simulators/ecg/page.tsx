"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  HeartPulse,
  Activity,
  ArrowLeft,
  Volume2,
  VolumeX,
  Gauge,
  Sliders,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Layers,
  BookOpen,
  Siren,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import {
  ECG_RHYTHM_DEFINITIONS,
  EcgRhythmType,
  RHYTHM_TO_SYSTEM_MAP,
  getRhythmAllowedBpmRange,
} from "@/domain/simulators/ecgWaveforms";
import { computeEcgMetrics } from "@/domain/simulators/ecgMetricsCalculator";
import { EcgCanvasRunner } from "@/components/simulators/ecg/EcgCanvasRunner";
import { TwelveLeadGrid } from "@/components/simulators/ecg/TwelveLeadGrid";
import { RealisticPinkEcgPaper } from "@/components/simulators/ecg/RealisticPinkEcgPaper";
import { EcgClinicalDeckModal, PatientCaseData } from "@/components/simulators/ecg/EcgClinicalDeckModal";
import { EcgSevenStepAssistant } from "@/components/simulators/ecg/EcgSevenStepAssistant";
import { EcgMobilePathologyDrawer } from "@/components/simulators/ecg/EcgMobilePathologyDrawer";
import { EcgMobileSettingsSheet } from "@/components/simulators/ecg/EcgMobileSettingsSheet";
import { EcgMobileQuickBar } from "@/components/simulators/ecg/EcgMobileQuickBar";
import { EcgPathologySelectDropdown } from "@/components/simulators/ecg/EcgPathologySelectDropdown";
import { useGameSettingsStore } from "@/store/gameSettingsStore";

export default function EcgSimulatorPage() {
  const [selectedRhythmId, setSelectedRhythmId] = useState<EcgRhythmType>("normal_sinus");
  const [bpm, setBpm] = useState<number>(75);
  const [sweepSpeed, setSweepSpeed] = useState<number>(25); // 25 or 50 mm/s
  const [amplitude, setAmplitude] = useState<number>(10); // 5, 10, 20 mm/mV
  const [calipersEnabled, setCalipersEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"runner" | "twelve_lead" | "pink_paper">("pink_paper");

  // Mobile Bottom Sheet states
  const [pathologyDrawerOpen, setPathologyDrawerOpen] = useState<boolean>(false);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState<boolean>(false);

  // Clinical deck modal state
  const [clinicalDeckOpen, setClinicalDeckOpen] = useState<boolean>(false);
  const [loadedPatientCase, setLoadedPatientCase] = useState<PatientCaseData | undefined>(undefined);
  const [loadedCriteria, setLoadedCriteria] = useState<string[]>([]);

  const { audioEnabled, toggleAudio } = useGameSettingsStore();

  const currentRhythm =
    ECG_RHYTHM_DEFINITIONS.find((r) => r.id === selectedRhythmId) ||
    ECG_RHYTHM_DEFINITIONS[0];

  const currentSystemInfo = RHYTHM_TO_SYSTEM_MAP[selectedRhythmId];
  const allowedBpmRange = getRhythmAllowedBpmRange(selectedRhythmId);

  // Fetch patient case and detailed criteria dynamically when rhythm changes
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/simulators/ecg/diagnoses/${selectedRhythmId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && !data.error) {
          if (data.patientCase) {
            setLoadedPatientCase(data.patientCase);
          }
          if (data.criteria && Array.isArray(data.criteria)) {
            setLoadedCriteria(data.criteria);
          }
        }
      })
      .catch((err) => console.warn("Could not load dynamic patient case:", err));

    return () => {
      isMounted = false;
    };
  }, [selectedRhythmId]);

  // Handle switching rhythm: lock and clamp BPM to physiological limits
  const handleSelectRhythm = (newRhythmId: EcgRhythmType) => {
    setSelectedRhythmId(newRhythmId);
    const def = ECG_RHYTHM_DEFINITIONS.find((r) => r.id === newRhythmId);
    const newRange = getRhythmAllowedBpmRange(newRhythmId);

    if (def) {
      if (newRange.min === 0 && newRange.max === 0) {
        setBpm(0);
      } else {
        // Clamp current BPM to new allowed range, or reset to defaultBpm
        setBpm(def.defaultBpm);
      }
    }
  };

  const currentMetrics = computeEcgMetrics(selectedRhythmId, bpm);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 py-2 sm:py-5 space-y-2.5 sm:space-y-3">
      {/* ============================================================== */}
      {/* 1. MOBILE MICRO TOP STRIP WITH DROPDOWN (< lg screens)         */}
      {/* ============================================================== */}
      <div className="flex lg:hidden items-center justify-between gap-1.5 pb-1 border-b border-hospital-800">
        <Link
          href="/simulators"
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-hospital-900 border border-hospital-800 text-slate-300 hover:text-white shrink-0"
          aria-label="Quay lại"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        {/* Pathology Grouped Dropdown for Mobile */}
        <EcgPathologySelectDropdown
          selectedRhythmId={selectedRhythmId}
          onSelectRhythm={handleSelectRhythm}
          className="flex-1 min-w-0"
        />

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs transition ${
              audioEnabled
                ? "bg-emerald-950 border-emerald-800 text-emerald-300"
                : "bg-hospital-900 border-hospital-800 text-slate-400"
            }`}
            title={audioEnabled ? "Tắt âm" : "Bật âm"}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setClinicalDeckOpen(true)}
            className="flex items-center gap-1 h-8 px-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 border border-rose-500 text-white font-extrabold text-[10.5px] shadow-sm transition active:scale-95"
            title="Phác đồ xử trí & Ca bệnh"
          >
            <Siren className="h-3.5 w-3.5 animate-pulse" />
            <span className="hidden xs:inline">Phác đồ</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DESKTOP HEADER & BREADCRUMB (>= lg screens)                */}
      {/* ============================================================== */}
      <div className="hidden lg:flex items-center justify-between gap-3 border-b border-hospital-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <Link
            href="/simulators"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-hospital-900 border border-hospital-800 text-slate-400 hover:text-white transition-colors"
            title="Quay lại Phòng Mô Phỏng"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Mô Phỏng Điện Tâm Đồ (ECG Simulator)</span>
              <span className="rounded-full bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                12 Cần IEC 60601-2-25
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Sóng Gaussian 60 FPS • Tiêu Chuẩn In Trực Tiếp Trên Giấy Hồng • Khóa Tần Số Tim Theo Mặt Bệnh
            </p>
          </div>
        </div>

        {/* Top Dropdown Pathology Selector for Desktop */}
        <EcgPathologySelectDropdown
          selectedRhythmId={selectedRhythmId}
          onSelectRhythm={handleSelectRhythm}
          className="w-80 xl:w-96"
        />

        {/* View Mode, Audio & Emergency CTA Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex rounded-xl bg-hospital-900 p-0.5 border border-hospital-800 text-[11px]">
            <button
              onClick={() => setViewMode("pink_paper")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                viewMode === "pink_paper"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Giấy Hồng 12 Cần</span>
            </button>
            <button
              onClick={() => setViewMode("runner")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                viewMode === "runner"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Dải Lead II</span>
            </button>
            <button
              onClick={() => setViewMode("twelve_lead")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                viewMode === "twelve_lead"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Lưới 12 Cần</span>
            </button>
          </div>

          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold border transition-all cursor-pointer ${
              audioEnabled
                ? "bg-emerald-950 border-emerald-800 text-emerald-300"
                : "bg-hospital-900 border-hospital-800 text-slate-400"
            }`}
          >
            {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span>{audioEnabled ? "Âm ON" : "Tắt Âm"}</span>
          </button>

          <button
            type="button"
            onClick={() => setClinicalDeckOpen(true)}
            className="flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Siren className="h-3.5 w-3.5 animate-pulse" />
            <span>Phác Đồ & Ca Bệnh</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. DESKTOP CONTROL DECK WITH PHYSIOLOGICAL BPM LOCKING         */}
      {/* ============================================================== */}
      <div className="hidden lg:grid gap-2 grid-cols-4 rounded-xl border border-hospital-800 bg-hospital-900/90 p-3 text-[11px]">
        {/* BPM Slider Bound to Allowed Range */}
        <div className="space-y-1">
          <div className="flex justify-between font-bold text-slate-300">
            <span>Tần số tim (BPM):</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-mono">
                {allowedBpmRange.min === 0 && allowedBpmRange.max === 0
                  ? "(Vô mạch)"
                  : `(${allowedBpmRange.min}-${allowedBpmRange.max} bpm)`}
              </span>
              <span className="text-emerald-400 font-mono text-xs font-black">{bpm} BPM</span>
            </div>
          </div>
          {allowedBpmRange.min === 0 && allowedBpmRange.max === 0 ? (
            <div className="text-[10px] text-rose-400 font-bold bg-rose-950/60 p-1 rounded border border-rose-800 text-center">
              Ngừng tuần hoàn (Cố định 0 bpm)
            </div>
          ) : (
            <input
              type="range"
              min={allowedBpmRange.min}
              max={allowedBpmRange.max}
              value={Math.max(allowedBpmRange.min, Math.min(allowedBpmRange.max, bpm))}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5"
            />
          )}
        </div>

        {/* Sweep Speed Toggle */}
        <div className="space-y-1">
          <span className="font-bold text-slate-300 block">Tốc độ quét giấy:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSweepSpeed(25)}
              className={`flex-1 rounded-lg py-1 font-bold border transition-all cursor-pointer ${
                sweepSpeed === 25
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                  : "bg-hospital-800 text-slate-300 border-hospital-700 hover:bg-hospital-750"
              }`}
            >
              25 mm/s (Chuẩn)
            </button>
            <button
              onClick={() => setSweepSpeed(50)}
              className={`flex-1 rounded-lg py-1 font-bold border transition-all cursor-pointer ${
                sweepSpeed === 50
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                  : "bg-hospital-800 text-slate-300 border-hospital-700 hover:bg-hospital-750"
              }`}
            >
              50 mm/s (Phóng đại)
            </button>
          </div>
        </div>

        {/* Amplitude Scale Toggle */}
        <div className="space-y-1">
          <span className="font-bold text-slate-300 block">Độ khuếch đại điện thế:</span>
          <div className="flex gap-1.5">
            {[5, 10, 20].map((amp) => (
              <button
                key={amp}
                onClick={() => setAmplitude(amp)}
                className={`flex-1 rounded-lg py-1 font-bold border transition-all cursor-pointer ${
                  amplitude === amp
                    ? "bg-cyan-600 text-white border-cyan-500 shadow-sm"
                    : "bg-hospital-800 text-slate-300 border-hospital-700 hover:bg-hospital-750"
                }`}
              >
                {amp} mm/mV
              </button>
            ))}
          </div>
        </div>

        {/* Calipers Tool Toggle */}
        <div className="space-y-1 flex flex-col justify-end">
          <button
            onClick={() => setCalipersEnabled(!calipersEnabled)}
            className={`w-full rounded-lg py-1 font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              calipersEnabled
                ? "bg-cyan-950 border-cyan-700 text-cyan-300 shadow-sm"
                : "bg-hospital-800 border-hospital-700 text-slate-400 hover:bg-hospital-750"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Thước Calipers: {calipersEnabled ? "BẬT" : "TẮT"}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. PRIMARY SIMULATOR VIEWPORT                                  */}
      {/* ============================================================== */}
      <div className="w-full">
        {viewMode === "pink_paper" ? (
          <RealisticPinkEcgPaper
            rhythm={selectedRhythmId}
            bpm={bpm}
            onOpenClinicalDeck={() => setClinicalDeckOpen(true)}
          />
        ) : viewMode === "runner" ? (
          <EcgCanvasRunner
            rhythm={selectedRhythmId}
            bpm={bpm}
            sweepSpeedMmPerSec={sweepSpeed}
            amplitudeMmPerMv={amplitude}
            calipersEnabled={calipersEnabled}
            onToggleCalipers={() => setCalipersEnabled(!calipersEnabled)}
          />
        ) : (
          <TwelveLeadGrid rhythm={selectedRhythmId} bpm={bpm} />
        )}
      </div>

      {/* ============================================================== */}
      {/* 5. MOBILE THUMB QUICK BAR                                      */}
      {/* ============================================================== */}
      <div className="block lg:hidden">
        <EcgMobileQuickBar
          currentRhythm={currentRhythm}
          bpm={bpm}
          sweepSpeed={sweepSpeed}
          calipersEnabled={calipersEnabled}
          onOpenPathologyDrawer={() => setPathologyDrawerOpen(true)}
          onOpenSettingsSheet={() => setSettingsSheetOpen(true)}
          onOpenClinicalDeck={() => setClinicalDeckOpen(true)}
          onToggleCalipers={() => setCalipersEnabled(!calipersEnabled)}
        />
      </div>

      {/* ============================================================== */}
      {/* 6. SYSTEMATIC 7-STEP ECG ASSISTANT                            */}
      {/* ============================================================== */}
      <EcgSevenStepAssistant
        rhythmId={selectedRhythmId}
        metrics={currentMetrics}
        onOpenClinicalDeck={() => setClinicalDeckOpen(true)}
      />

      {/* ============================================================== */}
      {/* 7. MOBILE BOTTOM SHEET: PATHOLOGY PICKER                       */}
      {/* ============================================================== */}
      <EcgMobilePathologyDrawer
        isOpen={pathologyDrawerOpen}
        onClose={() => setPathologyDrawerOpen(false)}
        selectedRhythmId={selectedRhythmId}
        onSelectRhythm={handleSelectRhythm}
      />

      {/* ============================================================== */}
      {/* 8. MOBILE BOTTOM SHEET: SETTINGS                              */}
      {/* ============================================================== */}
      <EcgMobileSettingsSheet
        isOpen={settingsSheetOpen}
        onClose={() => setSettingsSheetOpen(false)}
        bpm={bpm}
        setBpm={setBpm}
        defaultBpm={currentRhythm.defaultBpm}
        allowedBpmRange={allowedBpmRange}
        sweepSpeed={sweepSpeed}
        setSweepSpeed={setSweepSpeed}
        amplitude={amplitude}
        setAmplitude={setAmplitude}
        calipersEnabled={calipersEnabled}
        setCalipersEnabled={setCalipersEnabled}
        viewMode={viewMode}
        setViewMode={setViewMode}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
      />

      {/* ============================================================== */}
      {/* 9. CLINICAL DECK MODAL                                        */}
      {/* ============================================================== */}
      <EcgClinicalDeckModal
        isOpen={clinicalDeckOpen}
        onClose={() => setClinicalDeckOpen(false)}
        rhythmId={selectedRhythmId}
        rhythmName={currentRhythm.name}
        anatomicalRegion={currentSystemInfo?.anatomicalRegion}
        systemName={currentSystemInfo?.systemName}
        criteria={loadedCriteria.length > 0 ? loadedCriteria : [
          currentRhythm.ecgCharacteristics.rate,
          currentRhythm.ecgCharacteristics.rhythm,
          currentRhythm.ecgCharacteristics.pWave,
          currentRhythm.ecgCharacteristics.prInterval,
          currentRhythm.ecgCharacteristics.qrsComplex,
          currentRhythm.ecgCharacteristics.stSegmentTwave,
        ]}
        patientCase={loadedPatientCase}
      />
    </div>
  );
}
