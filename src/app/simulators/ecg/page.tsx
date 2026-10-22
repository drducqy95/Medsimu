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
} from "lucide-react";
import {
  ECG_RHYTHM_DEFINITIONS,
  EcgRhythmType,
  RHYTHM_TO_SYSTEM_MAP,
} from "@/domain/simulators/ecgWaveforms";
import { computeEcgMetrics } from "@/domain/simulators/ecgMetricsCalculator";
import { EcgCanvasRunner } from "@/components/simulators/ecg/EcgCanvasRunner";
import { TwelveLeadGrid } from "@/components/simulators/ecg/TwelveLeadGrid";
import { RealisticPinkEcgPaper } from "@/components/simulators/ecg/RealisticPinkEcgPaper";
import { EcgSystemCategoryTabs } from "@/components/simulators/ecg/EcgSystemCategoryTabs";
import { EcgClinicalDeckModal, PatientCaseData } from "@/components/simulators/ecg/EcgClinicalDeckModal";
import { EcgSevenStepAssistant } from "@/components/simulators/ecg/EcgSevenStepAssistant";
import { useGameSettingsStore } from "@/store/gameSettingsStore";

export default function EcgSimulatorPage() {
  const [selectedRhythmId, setSelectedRhythmId] = useState<EcgRhythmType>("normal_sinus");
  const [bpm, setBpm] = useState<number>(75);
  const [sweepSpeed, setSweepSpeed] = useState<number>(25); // 25 or 50 mm/s
  const [amplitude, setAmplitude] = useState<number>(10); // 5, 10, 20 mm/mV
  const [calipersEnabled, setCalipersEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"runner" | "twelve_lead" | "pink_paper">("pink_paper");

  // System selection for 9 clinical cardiology systems
  const [selectedSystem, setSelectedSystem] = useState<string>("all");

  // Clinical deck modal state
  const [clinicalDeckOpen, setClinicalDeckOpen] = useState<boolean>(false);
  const [loadedPatientCase, setLoadedPatientCase] = useState<PatientCaseData | undefined>(undefined);
  const [loadedCriteria, setLoadedCriteria] = useState<string[]>([]);

  const { audioEnabled, toggleAudio } = useGameSettingsStore();

  const currentRhythm =
    ECG_RHYTHM_DEFINITIONS.find((r) => r.id === selectedRhythmId) ||
    ECG_RHYTHM_DEFINITIONS[0];

  const currentSystemInfo = RHYTHM_TO_SYSTEM_MAP[selectedRhythmId];

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

  const handleSelectRhythm = (newRhythmId: EcgRhythmType) => {
    setSelectedRhythmId(newRhythmId);
    const def = ECG_RHYTHM_DEFINITIONS.find((r) => r.id === newRhythmId);
    if (def) {
      setBpm(def.defaultBpm);
    }
  };

  // Calculate dynamic pathology counts per system
  const systemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ECG_RHYTHM_DEFINITIONS.length };
    for (const r of ECG_RHYTHM_DEFINITIONS) {
      const sId = RHYTHM_TO_SYSTEM_MAP[r.id]?.systemId;
      if (sId) {
        counts[sId] = (counts[sId] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Filter rhythms by 9 systems
  const filteredRhythms = useMemo(() => {
    if (selectedSystem === "all") return ECG_RHYTHM_DEFINITIONS;
    return ECG_RHYTHM_DEFINITIONS.filter(
      (r) => RHYTHM_TO_SYSTEM_MAP[r.id]?.systemId === selectedSystem
    );
  }, [selectedSystem]);

  const currentMetrics = computeEcgMetrics(selectedRhythmId, bpm);

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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-md">
              <HeartPulse className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Hệ Thống Mô Phỏng Điện Tâm Đồ (ECG Simulator)
              </h1>
              <p className="text-xs text-slate-400">
                Mô hình sóng Gaussian 60 FPS • 9 Phân Hệ Lâm Sàng (31 Bệnh Lý) • Phác Đồ ACLS & Ca Bệnh Module 3
              </p>
            </div>
          </div>
        </div>

        {/* View Mode, Audio & Emergency CTA Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-xl bg-hospital-900 p-1 border border-hospital-800">
            <button
              onClick={() => setViewMode("pink_paper")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                viewMode === "pink_paper"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Giấy In Hồng 12 Cần</span>
            </button>
            <button
              onClick={() => setViewMode("runner")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                viewMode === "runner"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Dải Nhịp Lead II</span>
            </button>
            <button
              onClick={() => setViewMode("twelve_lead")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                viewMode === "twelve_lead"
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Lưới 12 Cần Monitor</span>
            </button>
          </div>

          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold border transition-all cursor-pointer ${
              audioEnabled
                ? "bg-emerald-950 border-emerald-800 text-emerald-300"
                : "bg-hospital-900 border-hospital-800 text-slate-400"
            }`}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span>{audioEnabled ? "Âm Thanh ON" : "Tắt Âm"}</span>
          </button>

          {/* Direct Emergency Management Deck Trigger */}
          <button
            type="button"
            onClick={() => setClinicalDeckOpen(true)}
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-md shadow-rose-950/60 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Siren className="h-4 w-4 animate-pulse" />
            <span>Phác Đồ & Ca Bệnh (Module 3)</span>
          </button>
        </div>
      </div>

      {/* Main Control Deck */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-hospital-800 bg-hospital-900/90 p-4 text-xs">
        {/* BPM Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span>Tần số tim (BPM):</span>
            <span className="text-emerald-400 font-mono text-sm">{bpm} BPM</span>
          </div>
          <input
            type="range"
            min={30}
            max={220}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Sweep Speed Toggle */}
        <div className="space-y-1.5">
          <span className="font-bold text-slate-300 block">Tốc độ quét giấy:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSweepSpeed(25)}
              className={`flex-1 rounded-xl py-1.5 font-bold border transition-all cursor-pointer ${
                sweepSpeed === 25
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                  : "bg-hospital-800 text-slate-300 border-hospital-700 hover:bg-hospital-750"
              }`}
            >
              25 mm/s (Chuẩn)
            </button>
            <button
              onClick={() => setSweepSpeed(50)}
              className={`flex-1 rounded-xl py-1.5 font-bold border transition-all cursor-pointer ${
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
        <div className="space-y-1.5">
          <span className="font-bold text-slate-300 block">Độ khuếch đại điện thế:</span>
          <div className="flex gap-2">
            {[5, 10, 20].map((amp) => (
              <button
                key={amp}
                onClick={() => setAmplitude(amp)}
                className={`flex-1 rounded-xl py-1.5 font-bold border transition-all cursor-pointer ${
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
        <div className="space-y-1.5 flex flex-col justify-end">
          <button
            onClick={() => setCalipersEnabled(!calipersEnabled)}
            className={`w-full rounded-xl py-2 font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
              calipersEnabled
                ? "bg-cyan-950 border-cyan-700 text-cyan-300 shadow-md"
                : "bg-hospital-800 border-hospital-700 text-slate-400 hover:bg-hospital-750"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Thước Đo Calipers: {calipersEnabled ? "BẬT" : "TẮT"}</span>
          </button>
        </div>
      </div>

      {/* Primary Simulator Viewport */}
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

      {/* Systematic 7-Step ECG Assistant */}
      <EcgSevenStepAssistant
        rhythmId={selectedRhythmId}
        metrics={currentMetrics}
        onOpenClinicalDeck={() => setClinicalDeckOpen(true)}
      />

      {/* Rhythm Selection Deck with 9 Clinical Systems Level 1 Tabs */}
      <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 space-y-4 shadow-xl">
        <EcgSystemCategoryTabs
          selectedSystem={selectedSystem}
          onSelectSystem={setSelectedSystem}
          systemCounts={systemCounts}
        />

        <div className="flex items-center justify-between border-t border-hospital-800/80 pt-3">
          <div className="text-xs text-slate-400">
            Hiển thị <strong className="text-white">{filteredRhythms.length}</strong> bệnh lý lâm sàng
            {selectedSystem !== "all" && " trong phân hệ đã chọn"}
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            60 FPS Gaussian Wavelet Engine
          </span>
        </div>

        {/* Rhythm Buttons Grid */}
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRhythms.map((r) => {
            const isSelected = selectedRhythmId === r.id;
            const sys = RHYTHM_TO_SYSTEM_MAP[r.id];
            const isCritical =
              r.category === "ventricular" ||
              (r.id as string).startsWith("stemi") ||
              r.id === "brugada_type1" ||
              r.id === "torsades_de_pointes" ||
              r.id === "asystole" ||
              r.id === "hyperkalemia";

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRhythm(r.id)}
                className={`rounded-2xl p-3.5 text-left border transition-all cursor-pointer relative ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-950/60 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500"
                    : "border-hospital-800 bg-hospital-950/70 hover:border-hospital-700 hover:bg-hospital-850"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    {sys?.systemName || r.category}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isCritical && (
                      <span className="rounded bg-rose-950 border border-rose-800 px-1.5 py-0.2 text-[8.5px] font-black text-rose-300 uppercase">
                        Cấp cứu
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      {r.defaultBpm} bpm
                    </span>
                  </div>
                </div>

                <div className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {r.name}
                </div>

                {sys?.anatomicalRegion && (
                  <div className="text-[10px] text-cyan-300 font-medium truncate mt-0.5">
                    📍 {sys.anatomicalRegion}
                  </div>
                )}

                <div className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                  {r.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clinical Deck Modal */}
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
