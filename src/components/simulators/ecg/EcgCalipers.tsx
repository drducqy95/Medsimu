"use client";

import React, { useState } from "react";
import { MoveHorizontal, MoveVertical, HelpCircle, CheckCircle2, AlertTriangle } from "lucide-react";

interface EcgCalipersProps {
  canvasWidth: number;
  canvasHeight: number;
  sweepSpeedMmPerSec: number; // 25 or 50
  amplitudeMmPerMv: number; // 10 (10mm = 1mV)
  currentBpm: number;
  isVisible: boolean;
  onToggleVisible: () => void;
}

export const EcgCalipers: React.FC<EcgCalipersProps> = ({
  canvasWidth,
  canvasHeight,
  sweepSpeedMmPerSec,
  amplitudeMmPerMv,
  currentBpm,
  isVisible,
  onToggleVisible,
}) => {
  // Vertical Time Calipers (X positions in pixels)
  const [caliperX1, setCaliperX1] = useState<number>(120);
  const [caliperX2, setCaliperX2] = useState<number>(240);

  // Horizontal Voltage Calipers (Y positions in pixels)
  const [caliperY1, setCaliperY1] = useState<number>(100);
  const [caliperY2, setCaliperY2] = useState<number>(180);

  const [activeHandle, setActiveHandle] = useState<"x1" | "x2" | "y1" | "y2" | null>(null);

  if (!isVisible) return null;

  // Pixels per mm: Standard ECG grid has major lines every 5mm.
  // In our canvas, let 1mm = 4 pixels (so 10mm/mV = 40px/mV, 25mm/s = 100px/s)
  const pixelsPerMm = 4;
  const pixelsPerSecond = sweepSpeedMmPerSec * pixelsPerMm;
  const pixelsPerMv = amplitudeMmPerMv * pixelsPerMm;

  // Calculate Delta Time in seconds & milliseconds
  const deltaXPixels = Math.abs(caliperX2 - caliperX1);
  const deltaTimeSeconds = deltaXPixels / pixelsPerSecond;
  const deltaTimeMs = Math.round(deltaTimeSeconds * 1000);

  // Calculate Delta Voltage in mV
  const deltaYPixels = Math.abs(caliperY2 - caliperY1);
  const deltaVoltageMv = Number((deltaYPixels / pixelsPerMv).toFixed(2));

  // Calculate Heart Rate from delta t
  const calculatedHeartRate = deltaTimeMs > 0 ? Math.round(60000 / deltaTimeMs) : 0;

  // Calculate QTc using Bazett Formula: QTc = QT / sqrt(RR in seconds)
  const rrSeconds = currentBpm > 0 ? 60 / currentBpm : 0.8;
  const calculatedQtc = Math.round(deltaTimeMs / Math.sqrt(rrSeconds));

  const handlePointerDown = (handle: "x1" | "x2" | "y1" | "y2", e: React.PointerEvent) => {
    e.stopPropagation();
    setActiveHandle(handle);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeHandle) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvasWidth, e.clientX - rect.left));
    const y = Math.max(0, Math.min(canvasHeight, e.clientY - rect.top));

    if (activeHandle === "x1") setCaliperX1(x);
    if (activeHandle === "x2") setCaliperX2(x);
    if (activeHandle === "y1") setCaliperY1(y);
    if (activeHandle === "y2") setCaliperY2(y);
  };

  const handlePointerUp = () => {
    setActiveHandle(null);
  };

  // Diagnostic Interpretation helpers
  let measurementType = "Tùy chọn";
  let interpretationText = "";
  let isAbnormal = false;

  if (deltaTimeMs >= 100 && deltaTimeMs <= 220) {
    measurementType = "Khoảng PR";
    if (deltaTimeMs > 200) {
      interpretationText = "PR kéo dài > 200ms -> Dấu hiệu Block AV độ I";
      isAbnormal = true;
    } else if (deltaTimeMs < 120) {
      interpretationText = "PR ngắn < 120ms -> Hội chứng tiền kích thích (WPW)";
      isAbnormal = true;
    } else {
      interpretationText = "PR bình thường (120 - 200ms)";
    }
  } else if (deltaTimeMs >= 60 && deltaTimeMs < 100) {
    measurementType = "Độ rộng QRS";
    interpretationText = "QRS thanh mảnh bình thường (< 120ms)";
  } else if (deltaTimeMs >= 120 && deltaTimeMs <= 180) {
    measurementType = "Độ rộng QRS (Dãn rộng)";
    interpretationText = "QRS dãn rộng >= 120ms -> Block nhánh (LBBB/RBBB) hoặc ổ ngoại vị thất";
    isAbnormal = true;
  } else if (deltaTimeMs >= 300 && deltaTimeMs <= 500) {
    measurementType = "Khoảng QT / QTc";
    if (calculatedQtc > 460) {
      interpretationText = `QTc kéo dài (${calculatedQtc}ms > 460ms) -> Nguy cơ xoắn đỉnh Torsades de Pointes!`;
      isAbnormal = true;
    } else {
      interpretationText = `QTc bình thường (${calculatedQtc}ms)`;
    }
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 z-20 select-none overflow-hidden touch-none"
    >
      {/* Time Caliper 1 (Vertical Line) */}
      <div
        style={{ left: `${caliperX1}px` }}
        className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 cursor-ew-resize hover:bg-cyan-300"
      >
        <div
          onPointerDown={(e) => handlePointerDown("x1", e)}
          className="absolute top-2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-black text-slate-950 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        >
          C1
        </div>
      </div>

      {/* Time Caliper 2 (Vertical Line) */}
      <div
        style={{ left: `${caliperX2}px` }}
        className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 cursor-ew-resize hover:bg-cyan-300"
      >
        <div
          onPointerDown={(e) => handlePointerDown("x2", e)}
          className="absolute top-2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-black text-slate-950 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        >
          C2
        </div>
      </div>

      {/* Voltage Caliper 1 (Horizontal Line) */}
      <div
        style={{ top: `${caliperY1}px` }}
        className="absolute left-0 right-0 h-0.5 bg-amber-400/80 cursor-ns-resize hover:bg-amber-300"
      >
        <div
          onPointerDown={(e) => handlePointerDown("y1", e)}
          className="absolute left-2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        >
          V1
        </div>
      </div>

      {/* Voltage Caliper 2 (Horizontal Line) */}
      <div
        style={{ top: `${caliperY2}px` }}
        className="absolute left-0 right-0 h-0.5 bg-amber-400/80 cursor-ns-resize hover:bg-amber-300"
      >
        <div
          onPointerDown={(e) => handlePointerDown("y2", e)}
          className="absolute left-2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        >
          V2
        </div>
      </div>

      {/* Measurement Telemetry HUD Pill */}
      <div
        style={{
          left: `${Math.min(caliperX1, caliperX2) + deltaXPixels / 2}px`,
          top: `${Math.min(caliperY1, caliperY2) + deltaYPixels / 2}px`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-xl border border-cyan-700/80 bg-hospital-950/95 px-3 py-1.5 shadow-xl backdrop-blur-md text-[11px] font-mono text-cyan-300 space-y-0.5 whitespace-nowrap z-30"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-white flex items-center gap-1">
            <MoveHorizontal className="h-3 w-3 text-cyan-400" />
            Δt = {deltaTimeMs} ms
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <MoveVertical className="h-3 w-3" />
            ΔV = {deltaVoltageMv} mV
          </span>
        </div>
        {interpretationText && (
          <div className={`text-[10px] flex items-center gap-1 font-sans ${isAbnormal ? "text-rose-400 font-bold" : "text-emerald-400"}`}>
            {isAbnormal ? <AlertTriangle className="h-3 w-3 shrink-0" /> : <CheckCircle2 className="h-3 w-3 shrink-0" />}
            <span>{interpretationText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
