"use client";

import React, { useRef, useEffect } from "react";
import { EcgRhythmType, calculateEcgVoltage } from "@/domain/simulators/ecgWaveforms";

interface TwelveLeadGridProps {
  rhythm: EcgRhythmType;
  bpm: number;
}

export const TwelveLeadGrid: React.FC<TwelveLeadGridProps> = ({ rhythm, bpm }) => {
  const leads = [
    { id: "DI", name: "Chuyển đạo I (DI)", leadMultiplier: 0.8 },
    { id: "aVR", name: "aVR", leadMultiplier: -0.7 },
    { id: "V1", name: "V1", leadMultiplier: 0.6 },
    { id: "V4", name: "V4", leadMultiplier: 1.2 },
    { id: "DII", name: "Chuyển đạo II (DII)", leadMultiplier: 1.0 },
    { id: "aVL", name: "aVL", leadMultiplier: 0.5 },
    { id: "V2", name: "V2", leadMultiplier: 1.1 },
    { id: "V5", name: "V5", leadMultiplier: 1.3 },
    { id: "DIII", name: "Chuyển đạo III (DIII)", leadMultiplier: 0.7 },
    { id: "aVF", name: "aVF", leadMultiplier: 0.9 },
    { id: "V3", name: "V3", leadMultiplier: 1.4 },
    { id: "V6", name: "V6", leadMultiplier: 1.1 },
  ];

  return (
    <div className="space-y-4 rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 shadow-2xl">
      <div className="flex items-center justify-between border-b border-hospital-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Điện Tâm Đồ 12 Chuyển Đạo Hoàn Chỉnh (12-Lead Complete ECG)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Tiêu chuẩn định dạng 3 × 4 + 1 dải nhịp DII kéo dài • Tốc độ 25 mm/s • Biên độ 10 mm/mV
          </p>
        </div>
        <div className="text-right text-xs font-mono font-bold text-emerald-400">
          <span>{bpm} BPM</span>
        </div>
      </div>

      {/* 3 x 4 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {leads.map((lead) => (
          <SingleLeadMiniCanvas
            key={lead.id}
            leadId={lead.id}
            leadName={lead.name}
            multiplier={lead.leadMultiplier}
            rhythm={rhythm}
            bpm={bpm}
          />
        ))}
      </div>

      {/* Bottom Lead II Long Rhythm Strip */}
      <div className="pt-1 border-t border-hospital-800">
        <div className="text-[11px] font-mono font-bold text-emerald-400 mb-1">
          DẢI NHỊP DII KÉO DÀI (RHYTHM STRIP II - CONTINUOUS)
        </div>
        <SingleLeadMiniCanvas
          leadId="DII_LONG"
          leadName="Lead II Strip"
          multiplier={1.0}
          rhythm={rhythm}
          bpm={bpm}
          isLongStrip={true}
        />
      </div>
    </div>
  );
};

interface SingleLeadMiniCanvasProps {
  leadId: string;
  leadName: string;
  multiplier: number;
  rhythm: EcgRhythmType;
  bpm: number;
  isLongStrip?: boolean;
}

const SingleLeadMiniCanvas: React.FC<SingleLeadMiniCanvasProps> = ({
  leadId,
  leadName,
  multiplier,
  rhythm,
  bpm,
  isLongStrip = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const baselineY = height / 2;

    // Draw ECG paper grid
    ctx.fillStyle = "#050b07";
    ctx.fillRect(0, 0, width, height);

    // Minor grid (1mm = 4px)
    ctx.strokeStyle = "rgba(34, 197, 94, 0.08)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x < width; x += 4) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 4) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Major grid (5mm = 20px)
    ctx.strokeStyle = "rgba(34, 197, 94, 0.22)";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    for (let x = 0; x < width; x += 20) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 20) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Static waveform plotting across the box
    const cycleDuration = bpm > 0 ? 60 / bpm : 1.5;
    const pixelsPerSecond = 25 * 4; // 100 px/s
    const totalSeconds = width / pixelsPerSecond;

    // Invert modifier for aVR or lead vector
    let leadScale = multiplier;
    if (rhythm === "stemi_inferior") {
      if (leadId === "DII" || leadId === "DIII" || leadId === "aVF") {
        leadScale *= 1.4; // ST elevation
      } else if (leadId === "DI" || leadId === "aVL") {
        leadScale *= -0.7; // Reciprocal ST depression
      }
    } else if (rhythm === "stemi_anterior") {
      if (leadId === "V1" || leadId === "V2" || leadId === "V3" || leadId === "V4") {
        leadScale *= 1.6; // Massive ST elevation
      }
    }

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const timeInSec = (x / width) * totalSeconds;
      const tInCycle = timeInSec % cycleDuration;
      const v = calculateEcgVoltage(tInCycle, rhythm, cycleDuration) * leadScale;
      const y = baselineY - v * 40; // 40px per mV

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }, [leadId, multiplier, rhythm, bpm]);

  return (
    <div className="relative rounded-xl border border-hospital-800 overflow-hidden bg-black">
      <div className="absolute top-1 left-2 pointer-events-none text-[10px] font-mono font-bold text-emerald-400 bg-hospital-950/80 px-1.5 py-0.5 rounded border border-emerald-900/60 z-10">
        {leadId.replace("_LONG", "")}
      </div>
      <canvas
        ref={canvasRef}
        width={isLongStrip ? 900 : 220}
        height={isLongStrip ? 90 : 80}
        className="block w-full h-auto"
      />
    </div>
  );
};
