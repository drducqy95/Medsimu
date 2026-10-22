"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  EcgRhythmType,
  calculateLeadEcgVoltage,
  playMonitorBeep,
} from "@/domain/simulators/ecgWaveforms";
import {
  X,
  ZoomIn,
  Ruler,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";

interface EcgLeadFocusModalProps {
  isOpen: boolean;
  onClose: () => void;
  rhythm: EcgRhythmType;
  bpm: number;
  initialLead?: string;
  annotations?: Array<{
    leadId: string;
    waveComponent: string;
    label: string;
    targetCyclePhase: number;
    color?: string;
    badgePlacement?: "top" | "bottom" | "interval" | "above" | "below";
  }>;
}

const ALL_LEADS = [
  { id: "DI", name: "Chuyển đạo I (DI)", region: "Thành bên cao" },
  { id: "DII", name: "Chuyển đạo II (DII)", region: "Thành dưới (Rhythm)" },
  { id: "DIII", name: "Chuyển đạo III (DIII)", region: "Thành dưới" },
  { id: "aVR", name: "Chuyển đạo aVR", region: "Đáy tim / Soi gương" },
  { id: "aVL", name: "Chuyển đạo aVL", region: "Thành bên cao" },
  { id: "aVF", name: "Chuyển đạo aVF", region: "Thành dưới" },
  { id: "V1", name: "Chuyển đạo V1", region: "Vách liên thất" },
  { id: "V2", name: "Chuyển đạo V2", region: "Vách liên thất" },
  { id: "V3", name: "Chuyển đạo V3", region: "Thành trước" },
  { id: "V4", name: "Chuyển đạo V4", region: "Thành trước" },
  { id: "V5", name: "Chuyển đạo V5", region: "Thành bên thấp" },
  { id: "V6", name: "Chuyển đạo V6", region: "Thành bên thấp" },
];

export const EcgLeadFocusModal: React.FC<EcgLeadFocusModalProps> = ({
  isOpen,
  onClose,
  rhythm,
  bpm,
  initialLead = "DII",
  annotations = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLead, setSelectedLead] = useState<string>(initialLead);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [paperSpeed, setPaperSpeed] = useState<25 | 50>(25);
  const [caliperActive, setCaliperActive] = useState<boolean>(false);
  const [caliperPoints, setCaliperPoints] = useState<{ x1: number; x2: number } | null>(null);

  useEffect(() => {
    if (initialLead) {
      setSelectedLead(initialLead);
    }
  }, [initialLead]);

  // Canvas drawing loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 640;
    const H = 260;
    canvas.width = W;
    canvas.height = H;

    let animId: number;
    let timeOffset = 0;
    let lastTime = 0;

    const pixelsPerMm = 5;
    const pixelsPerSec = paperSpeed * pixelsPerMm;
    const voltageScale = 45; // Magnified 1mV = 45px for crisp inspection
    const midY = 130;

    const drawGrid = () => {
      ctx.fillStyle = "#fff5f5";
      ctx.fillRect(0, 0, W, H);

      // 1mm grid
      ctx.strokeStyle = "rgba(244, 63, 94, 0.22)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += pixelsPerMm) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = 0; y <= H; y += pixelsPerMm) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // 5mm grid
      ctx.strokeStyle = "rgba(225, 29, 72, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += pixelsPerMm * 5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = 0; y <= H; y += pixelsPerMm * 5) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();
    };

    const loop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      if (isPlaying) {
        timeOffset += dt * (paperSpeed / 25);
      }

      drawGrid();

      // Lead Info Stamp
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 13px 'Courier New', monospace";
      ctx.fillText(`${selectedLead} • ${paperSpeed} mm/s • 10 mm/mV`, 15, 25);

      // Calibration pulse
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(10, midY);
      ctx.lineTo(15, midY);
      ctx.lineTo(15, midY - 45); // 1mV calibration
      ctx.lineTo(30, midY - 45);
      ctx.lineTo(30, midY);
      ctx.lineTo(38, midY);
      ctx.stroke();

      // Waveform
      const traceStart = 42;
      ctx.beginPath();
      let isFirst = true;
      for (let x = traceStart; x <= W - 10; x += 1.5) {
        const t = (x - traceStart) / pixelsPerSec + timeOffset;
        const v = calculateLeadEcgVoltage(t, selectedLead, rhythm, bpm);
        const y = midY - v * voltageScale;

        if (isFirst) {
          ctx.moveTo(x, y);
          isFirst = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Render annotations for this focused lead
      const activeAnns = annotations.filter(
        (a) => a.leadId.toUpperCase() === selectedLead.toUpperCase()
      );
      activeAnns.forEach((ann) => {
        const cycleDur = 60 / bpm;
        const targetCycle = Math.floor(timeOffset / cycleDur);
        for (let c = targetCycle; c <= targetCycle + 3; c++) {
          const tTarget = (c + ann.targetCyclePhase) * cycleDur;
          const xTarget = traceStart + (tTarget - timeOffset) * pixelsPerSec;
          if (xTarget >= traceStart + 10 && xTarget <= W - 30) {
            const vTarget = calculateLeadEcgVoltage(tTarget, selectedLead, rhythm, bpm);
            const yTarget = midY - vTarget * voltageScale;
            const col = ann.color || "#e11d48";

            // Pinpoint dot
            ctx.save();
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(xTarget, yTarget, 4, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            const tw = ctx.measureText(ann.label).width;
            const px = Math.min(W - tw - 12, Math.max(10, xTarget - tw / 2));
            const py = yTarget < midY ? yTarget - 22 : yTarget + 10;
            ctx.fillRect(px - 4, py, tw + 8, 16);
            ctx.strokeStyle = col;
            ctx.strokeRect(px - 4, py, tw + 8, 16);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 10px sans-serif";
            ctx.fillText(ann.label, px, py + 12);
            ctx.restore();
          }
        }
      });

      // Caliper overlay if active
      if (caliperPoints) {
        ctx.save();
        ctx.strokeStyle = "#3b82f6";
        ctx.fillStyle = "#3b82f6";
        ctx.lineWidth = 1.5;

        // Line 1
        ctx.beginPath();
        ctx.moveTo(caliperPoints.x1, 10);
        ctx.lineTo(caliperPoints.x1, H - 10);
        ctx.stroke();

        // Line 2
        ctx.beginPath();
        ctx.moveTo(caliperPoints.x2, 10);
        ctx.lineTo(caliperPoints.x2, H - 10);
        ctx.stroke();

        // Interval calculation
        const dxPx = Math.abs(caliperPoints.x2 - caliperPoints.x1);
        const dtSec = dxPx / pixelsPerSec;
        const dtMs = Math.round(dtSec * 1000);
        const smBoxes = (dxPx / pixelsPerMm).toFixed(1);

        ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
        ctx.fillRect((caliperPoints.x1 + caliperPoints.x2) / 2 - 40, H / 2 - 12, 80, 24);
        ctx.strokeStyle = "#3b82f6";
        ctx.strokeRect((caliperPoints.x1 + caliperPoints.x2) / 2 - 40, H / 2 - 12, 80, 24);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${dtMs} ms (${smBoxes} ô)`, (caliperPoints.x1 + caliperPoints.x2) / 2, H / 2 + 4);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, selectedLead, rhythm, bpm, isPlaying, paperSpeed, caliperPoints, annotations]);

  if (!isOpen) return null;

  const currentLeadInfo = ALL_LEADS.find((l) => l.id === selectedLead) || ALL_LEADS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl rounded-2xl border border-hospital-700 bg-hospital-900 p-3 sm:p-5 shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hospital-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <ZoomIn className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Soi Phóng To Chuyển Đạo: {currentLeadInfo.name}
                </h3>
                <span className="rounded bg-hospital-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                  {currentLeadInfo.region}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Phóng đại độ phân giải cao 60 FPS • Lưới hồng 1mm/5mm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-hospital-800 bg-hospital-850 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Lead Selector Chip Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {ALL_LEADS.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLead(l.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedLead === l.id
                  ? "bg-cyan-500 text-slate-950 shadow-md font-black"
                  : "bg-hospital-800 text-slate-300 hover:bg-hospital-750"
              }`}
            >
              {l.id}
            </button>
          ))}
        </div>

        {/* Magnified High-Definition Canvas */}
        <div className="rounded-xl border border-rose-400/80 overflow-hidden shadow-inner bg-[#fff5f5]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            onClick={(e) => {
              if (!caliperActive) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = ((e.clientX - rect.left) / rect.width) * 640;
              if (!caliperPoints) {
                setCaliperPoints({ x1: clickX, x2: clickX + 50 });
              } else {
                setCaliperPoints((prev) =>
                  prev ? { ...prev, x2: clickX } : { x1: clickX, x2: clickX + 50 }
                );
              }
            }}
          />
        </div>

        {/* Control Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-hospital-800 text-slate-200 hover:text-white border border-hospital-700"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? "Dừng" : "Chạy"}</span>
            </button>

            <button
              onClick={() => setPaperSpeed(paperSpeed === 25 ? 50 : 25)}
              className="px-2.5 py-1.5 rounded-lg bg-hospital-800 text-slate-300 border border-hospital-700 font-mono text-xs"
            >
              {paperSpeed} mm/s
            </button>

            <button
              onClick={() => {
                setCaliperActive(!caliperActive);
                if (caliperActive) setCaliperPoints(null);
                else setCaliperPoints({ x1: 150, x2: 230 });
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                caliperActive
                  ? "bg-blue-600 text-white border-blue-400 shadow-sm"
                  : "bg-hospital-800 text-slate-300 border-hospital-700"
              }`}
            >
              <Ruler className="h-3.5 w-3.5" />
              <span>{caliperActive ? "Tắt Caliper" : "Thước Đo Caliper"}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-md ml-auto"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
