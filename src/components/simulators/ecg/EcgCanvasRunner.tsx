"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  calculateEcgVoltage,
  playMonitorBeep,
  EcgRhythmType,
} from "@/domain/simulators/ecgWaveforms";
import { EcgCalipers } from "@/components/simulators/ecg/EcgCalipers";
import { useGameSettingsStore } from "@/store/gameSettingsStore";

interface EcgCanvasRunnerProps {
  rhythm: EcgRhythmType;
  bpm: number;
  sweepSpeedMmPerSec: number; // 25 or 50
  amplitudeMmPerMv: number; // 5, 10, 20
  calipersEnabled: boolean;
  onToggleCalipers: () => void;
}

export const EcgCanvasRunner: React.FC<EcgCanvasRunnerProps> = ({
  rhythm,
  bpm,
  sweepSpeedMmPerSec,
  amplitudeMmPerMv,
  calipersEnabled,
  onToggleCalipers,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 320,
  });

  const { audioEnabled, volume } = useGameSettingsStore();

  // Animation state references
  const animFrameIdRef = useRef<number | null>(null);
  const sweepXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const cycleTimeRef = useRef<number>(0);
  const hasBeepedThisCycleRef = useRef<boolean>(false);

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 320,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Standard scaling: 1mm = 4 canvas pixels
    const pixelsPerMm = 4;
    const pixelsPerSecond = sweepSpeedMmPerSec * pixelsPerMm;
    const pixelsPerMv = amplitudeMmPerMv * pixelsPerMm;
    const baselineY = dimensions.height / 2;

    const cycleDuration = bpm > 0 ? 60 / bpm : 2.0;

    // Draw static medical ECG grid on background
    const drawGrid = () => {
      ctx.fillStyle = "#040906";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const grid1mm = pixelsPerMm; // 4px
      const grid5mm = pixelsPerMm * 5; // 20px

      // Minor 1mm grid
      ctx.strokeStyle = "rgba(34, 197, 94, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < dimensions.width; x += grid1mm) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
      }
      for (let y = 0; y < dimensions.height; y += grid1mm) {
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
      }
      ctx.stroke();

      // Major 5mm grid
      ctx.strokeStyle = "rgba(34, 197, 94, 0.22)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      for (let x = 0; x < dimensions.width; x += grid5mm) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
      }
      for (let y = 0; y < dimensions.height; y += grid5mm) {
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
      }
      ctx.stroke();
    };

    drawGrid();

    let prevX = 0;
    let prevY = baselineY;

    const render = (currentTimeMs: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTimeMs;
      const deltaTime = (currentTimeMs - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTimeMs;

      // Cap delta time to prevent giant jumps when tab inactive
      const dt = Math.min(deltaTime, 0.05);

      // Advance cycle time
      cycleTimeRef.current = (cycleTimeRef.current + dt) % cycleDuration;

      // Advance sweep position
      const stepX = pixelsPerSecond * dt;
      let nextX = sweepXRef.current + stepX;

      // Calculate ECG voltage at this moment
      const voltageMv = calculateEcgVoltage(cycleTimeRef.current, rhythm, cycleDuration);
      // Invert Y so positive voltage goes upwards
      const nextY = baselineY - voltageMv * pixelsPerMv;

      // Sound Beep trigger: Trigger around peak R (at ~22-25% of cycle for normal sinus)
      const rPeakPoint = 0.22;
      if (
        rhythm !== "asystole" &&
        rhythm !== "ventricular_fibrillation" &&
        cycleTimeRef.current >= rPeakPoint &&
        cycleTimeRef.current < rPeakPoint + 0.08 &&
        !hasBeepedThisCycleRef.current
      ) {
        if (audioEnabled) {
          playMonitorBeep(volume, 880);
        }
        hasBeepedThisCycleRef.current = true;
      }

      if (cycleTimeRef.current < rPeakPoint) {
        hasBeepedThisCycleRef.current = false;
      }

      // If sweep reaches end of screen, wrap to 0
      if (nextX >= dimensions.width) {
        nextX = 0;
        prevX = 0;
      }

      // Erase ahead bar (20px width clear ahead with grid restore)
      const clearWidth = 24;
      ctx.fillStyle = "#040906";
      ctx.fillRect(nextX, 0, clearWidth, dimensions.height);

      // Restore grid lines in the cleared zone
      const grid5mm = pixelsPerMm * 5;
      ctx.strokeStyle = "rgba(34, 197, 94, 0.22)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      const startGridX = Math.floor(nextX / grid5mm) * grid5mm;
      for (let gx = startGridX; gx <= nextX + clearWidth; gx += grid5mm) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, dimensions.height);
      }
      ctx.stroke();

      // Draw the ECG Beam Wave line
      ctx.strokeStyle = "#22c55e"; // Bright Phosphor Green
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "#22c55e";
      ctx.shadowBlur = 4;

      if (prevX > 0 && nextX > prevX) {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }

      // Draw active cursor dot
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(nextX, nextY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadow for next tick
      ctx.shadowBlur = 0;

      prevX = nextX;
      prevY = nextY;
      sweepXRef.current = nextX;

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [rhythm, bpm, sweepSpeedMmPerSec, amplitudeMmPerMv, dimensions, audioEnabled, volume]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black shadow-2xl shadow-emerald-950/40"
    >
      {/* 60 FPS Canvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block w-full h-full"
      />

      {/* Top Left Lead Indicator */}
      <div className="absolute top-2.5 left-3 pointer-events-none flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 z-10">
        <span className="rounded bg-emerald-950/80 px-2 py-0.5 border border-emerald-800">
          CHUYỂN ĐẠO II (LEAD II)
        </span>
        <span className="text-[11px] text-slate-400">
          {sweepSpeedMmPerSec} mm/s • {amplitudeMmPerMv} mm/mV • {bpm} BPM
        </span>
      </div>

      {/* Calipers Interactive Overlay */}
      <EcgCalipers
        canvasWidth={dimensions.width}
        canvasHeight={dimensions.height}
        sweepSpeedMmPerSec={sweepSpeedMmPerSec}
        amplitudeMmPerMv={amplitudeMmPerMv}
        currentBpm={bpm}
        isVisible={calipersEnabled}
        onToggleVisible={onToggleCalipers}
      />
    </div>
  );
};
