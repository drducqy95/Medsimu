"use client";

import React, { useEffect } from "react";
import {
  X,
  Sliders,
  Gauge,
  Layers,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface EcgMobileSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  bpm: number;
  setBpm: (bpm: number) => void;
  defaultBpm: number;
  sweepSpeed: number;
  setSweepSpeed: (speed: number) => void;
  amplitude: number;
  setAmplitude: (amp: number) => void;
  calipersEnabled: boolean;
  setCalipersEnabled: (val: boolean) => void;
  viewMode: "runner" | "twelve_lead" | "pink_paper";
  setViewMode: (mode: "runner" | "twelve_lead" | "pink_paper") => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export function EcgMobileSettingsSheet({
  isOpen,
  onClose,
  bpm,
  setBpm,
  defaultBpm,
  sweepSpeed,
  setSweepSpeed,
  amplitude,
  setAmplitude,
  calipersEnabled,
  setCalipersEnabled,
  viewMode,
  setViewMode,
  audioEnabled,
  toggleAudio,
}: EcgMobileSettingsSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative z-10 flex flex-col max-h-[85vh] w-full rounded-t-3xl border-t border-hospital-700 bg-hospital-950 p-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Grab Handle */}
        <div className="flex justify-center pb-2 cursor-grab" onClick={onClose}>
          <div className="h-1.5 w-12 rounded-full bg-slate-700" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-hospital-800">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Cài Đặt Máy Điện Tim</h2>
              <p className="text-[10px] text-slate-400">Tần số, Tốc độ quét, Độ nhạy & Thước Caliper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-hospital-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="py-3 space-y-4 overflow-y-auto">
          {/* Chế độ hiển thị (View Mode) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-300 block">Chế độ hiển thị màn hình:</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setViewMode("pink_paper")}
                className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition text-center ${
                  viewMode === "pink_paper"
                    ? "bg-rose-600 text-white border-rose-500 shadow-md"
                    : "bg-hospital-900 text-slate-400 border-hospital-800 hover:bg-hospital-850"
                }`}
              >
                Giấy Hồng 12 Cần
              </button>
              <button
                type="button"
                onClick={() => setViewMode("runner")}
                className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition text-center ${
                  viewMode === "runner"
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                    : "bg-hospital-900 text-slate-400 border-hospital-800 hover:bg-hospital-850"
                }`}
              >
                Dải Lead II Monitor
              </button>
              <button
                type="button"
                onClick={() => setViewMode("twelve_lead")}
                className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition text-center ${
                  viewMode === "twelve_lead"
                    ? "bg-cyan-600 text-white border-cyan-500 shadow-md"
                    : "bg-hospital-900 text-slate-400 border-hospital-800 hover:bg-hospital-850"
                }`}
              >
                Lưới 12 Cần Đơn
              </button>
            </div>
          </div>

          {/* Tần số tim BPM */}
          <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Tần số tim (BPM):</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-extrabold text-emerald-400">{bpm} BPM</span>
                {bpm !== defaultBpm && (
                  <button
                    type="button"
                    onClick={() => setBpm(defaultBpm)}
                    className="flex items-center gap-0.5 text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-hospital-800 border border-hospital-700"
                    title="Về mặc định"
                  >
                    <RotateCcw className="h-2.5 w-2.5" />
                    <span>Mặc định ({defaultBpm})</span>
                  </button>
                )}
              </div>
            </div>

            <input
              type="range"
              min={30}
              max={220}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2"
            />

            <div className="flex gap-1.5 pt-1">
              {[45, 60, 75, 100, 150].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBpm(preset)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold border transition ${
                    bpm === preset
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-hospital-800 text-slate-400 border-hospital-700 hover:text-white"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Tốc độ quét giấy */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-300 block">Tốc độ quét giấy (Sweep Speed):</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSweepSpeed(25)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  sweepSpeed === 25
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                    : "bg-hospital-900 text-slate-400 border-hospital-800"
                }`}
              >
                25 mm/s (Tiêu chuẩn lâm sàng)
              </button>
              <button
                type="button"
                onClick={() => setSweepSpeed(50)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  sweepSpeed === 50
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                    : "bg-hospital-900 text-slate-400 border-hospital-800"
                }`}
              >
                50 mm/s (Phóng đại thời gian)
              </button>
            </div>
          </div>

          {/* Độ khuếch đại điện thế */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-300 block">Độ khuếch đại điện thế (Gain):</span>
            <div className="flex gap-2">
              {[5, 10, 20].map((amp) => (
                <button
                  key={amp}
                  type="button"
                  onClick={() => setAmplitude(amp)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    amplitude === amp
                      ? "bg-cyan-600 text-white border-cyan-500 shadow-md"
                      : "bg-hospital-900 text-slate-400 border-hospital-800"
                  }`}
                >
                  {amp} mm/mV {amp === 10 ? "(Chuẩn 1N)" : amp === 5 ? "(1/2N)" : "(2N)"}
                </button>
              ))}
            </div>
          </div>

          {/* Thước Caliper & Âm Thanh Toggle Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setCalipersEnabled(!calipersEnabled)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                calipersEnabled
                  ? "bg-cyan-950 border-cyan-700 text-cyan-300 shadow-sm"
                  : "bg-hospital-900 border-hospital-800 text-slate-400"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Thước Caliper: {calipersEnabled ? "BẬT" : "TẮT"}</span>
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                audioEnabled
                  ? "bg-emerald-950 border-emerald-700 text-emerald-300 shadow-sm"
                  : "bg-hospital-900 border-hospital-800 text-slate-400"
              }`}
            >
              {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>Âm Beeper: {audioEnabled ? "BẬT" : "TẮT"}</span>
            </button>
          </div>
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition active:scale-98"
        >
          Xong & Trở Về Quan Sát Sóng
        </button>
      </div>
    </div>
  );
}
