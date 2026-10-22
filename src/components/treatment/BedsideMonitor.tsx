"use client";

import React, { useRef, useEffect, useState } from "react";
import { Vitals } from "@/domain/treatment/types";
import {
  Activity,
  Heart,
  Volume2,
  VolumeX,
  AlertTriangle,
  Siren,
  Sparkles,
} from "lucide-react";

interface BedsideMonitorProps {
  vitals: Vitals;
  isCodeBlue: boolean;
  codeBlueReason: string | null;
}

export const BedsideMonitor: React.FC<BedsideMonitorProps> = ({
  vitals,
  isCodeBlue,
  codeBlueReason,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Play Beep on heartbeat
  const playHeartBeep = (freq: number = 880) => {
    if (isAudioMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio autoplay policy catch
    }
  };

  // Canvas Realtime ECG runner
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let sweepX = 0;
    let lastTime = performance.now();
    let beatAccumulator = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height * 0.45;

    // Clear background black
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    // Draw Subtle Grid
    ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Speed: ~120px / second
      const speed = 130;
      const dx = speed * dt;
      const nextSweepX = (sweepX + dx) % width;

      // Erase ahead of sweep bar
      ctx.fillStyle = "#020617";
      ctx.fillRect(sweepX, 0, Math.min(24, width - sweepX), height);
      if (nextSweepX < sweepX) {
        ctx.fillRect(0, 0, 24, height);
      }

      // Calculate ECG Waveform
      const beatInterval = 60 / Math.max(20, vitals.hr || 60);
      beatAccumulator += dt;
      if (beatAccumulator >= beatInterval) {
        beatAccumulator -= beatInterval;
        playHeartBeep(vitals.spO2 > 90 ? 880 : 660);
      }

      const phase = (beatAccumulator / beatInterval) % 1; // 0 to 1
      let waveY = 0;

      if (vitals.rhythmId === "ventricular_fibrillation") {
        // Chaotic fibrillation waveform
        waveY = Math.sin(time * 0.02) * 22 + Math.cos(time * 0.045) * 16 + (Math.random() - 0.5) * 10;
      } else if (vitals.rhythmId === "asystole" || vitals.hr === 0) {
        // Flatline
        waveY = (Math.random() - 0.5) * 2;
      } else {
        // Normal/tachy/brady/STEMI beat
        // P-Wave at 0.15
        if (phase > 0.1 && phase < 0.22) {
          waveY = -Math.sin(((phase - 0.1) / 0.12) * Math.PI) * 7;
        }
        // Q-Wave at 0.35
        else if (phase >= 0.35 && phase < 0.38) {
          waveY = 5;
        }
        // R-Wave spike at 0.40
        else if (phase >= 0.38 && phase < 0.44) {
          waveY = -Math.sin(((phase - 0.38) / 0.06) * Math.PI) * 45;
        }
        // S-Wave at 0.44
        else if (phase >= 0.44 && phase < 0.48) {
          waveY = 8;
        }
        // ST segment elevation (for STEMI)
        else if (phase >= 0.48 && phase < 0.62) {
          waveY = vitals.rhythmId.includes("stemi") ? -12 : 0;
        }
        // T-Wave at 0.65
        else if (phase >= 0.62 && phase < 0.8) {
          waveY = -Math.sin(((phase - 0.62) / 0.18) * Math.PI) * 14;
        }
      }

      // Draw green ECG trace
      ctx.strokeStyle = isCodeBlue ? "#f43f5e" : "#10b981";
      ctx.lineWidth = 2;
      ctx.shadowColor = isCodeBlue ? "#f43f5e" : "#10b981";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(sweepX, midY + waveY);
      ctx.lineTo(nextSweepX, midY + waveY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Cyan Pleth Wave at bottom
      const plethY = height * 0.82;
      const plethAmp = (vitals.spO2 / 100) * 14;
      const plethWave = -Math.max(0, Math.sin(phase * Math.PI * 2)) * plethAmp;

      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sweepX, plethY + plethWave);
      ctx.lineTo(nextSweepX, plethY + plethWave);
      ctx.stroke();

      sweepX = nextSweepX;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [vitals, isCodeBlue, isAudioMuted]);

  // Mean Arterial Pressure (MAP)
  const mapValue = Math.round((vitals.bpDia * 2 + vitals.bpSys) / 3);

  // Critical indicators
  const isHrDanger = vitals.hr < 45 || vitals.hr > 130;
  const isBpDanger = vitals.bpSys < 85 || vitals.bpSys > 180;
  const isSpO2Danger = vitals.spO2 < 90;

  return (
    <div className={`relative rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-2xl ${
      isCodeBlue
        ? "border-rose-500 bg-rose-950/40 ring-4 ring-rose-500/50 animate-pulse"
        : "border-hospital-800 bg-hospital-950/95"
    }`}>
      {/* Code Blue Top Alert Banner */}
      {isCodeBlue && (
        <div className="bg-rose-600 px-4 py-2 text-white flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
            <Siren className="h-5 w-5 animate-spin" />
            <span>CODE BLUE: CẤP CỨU NGỪNG TUẦN HOÀN HÔ HẤP</span>
          </div>
          <div className="text-xs font-bold text-rose-100">
            {codeBlueReason || "Kích hoạt ép tim CPR & Khử rung ngay!"}
          </div>
        </div>
      )}

      {/* Monitor Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-hospital-800/80 bg-hospital-900/50">
        <div className="flex items-center gap-2">
          <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
            ICU / ER BEDSIDE TELEMETRY MONITOR 1200
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              !isAudioMuted
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm"
                : "bg-hospital-800 text-slate-400 border-hospital-700 hover:text-white"
            }`}
          >
            {isAudioMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 animate-bounce" />}
            <span>{isAudioMuted ? "Âm thanh: Tắt" : "Bíp tim: Bật"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Waveform Canvas (Left 65%) + Vitals Digits (Right 35%) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
        {/* Canvas Waveforms */}
        <div className="md:col-span-8 p-4 relative bg-black/80 flex flex-col justify-center">
          <div className="absolute top-3 left-4 text-[10px] font-mono text-emerald-400 tracking-wider">
            LEAD II (1.0 mV/cm) | 25 mm/s
          </div>
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400 tracking-wider">
            PLETH (SpO2 PULSE WAVE)
          </div>

          <canvas
            ref={canvasRef}
            width={580}
            height={200}
            className="w-full h-[200px] block rounded-xl border border-hospital-800/60 bg-black"
          />
        </div>

        {/* Digital Readout Columns */}
        <div className="md:col-span-4 p-4 border-l border-hospital-800 bg-hospital-950/70 grid grid-cols-2 gap-3">
          {/* Heart Rate (HR) */}
          <div className={`p-3 rounded-2xl border ${
            isHrDanger
              ? "border-rose-500/60 bg-rose-950/40 text-rose-300"
              : "border-emerald-500/30 bg-emerald-950/20 text-emerald-400"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider">HR (BPM)</span>
              <Heart className={`h-3.5 w-3.5 ${vitals.hr > 0 ? "animate-pulse" : ""}`} />
            </div>
            <div className="mt-1 font-mono text-3xl font-black">
              {vitals.hr}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Chuẩn: 60 - 100
            </div>
          </div>

          {/* Blood Pressure (BP) */}
          <div className={`p-3 rounded-2xl border ${
            isBpDanger
              ? "border-rose-500/60 bg-rose-950/40 text-rose-300"
              : "border-rose-500/30 bg-rose-950/20 text-rose-400"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider">NIBP (mmHg)</span>
              <Activity className="h-3.5 w-3.5" />
            </div>
            <div className="mt-1 font-mono text-2xl font-black leading-tight">
              {vitals.bpSys}/{vitals.bpDia}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              MAP: <span className="font-bold text-white">{mapValue}</span>
            </div>
          </div>

          {/* SpO2 */}
          <div className={`p-3 rounded-2xl border ${
            isSpO2Danger
              ? "border-rose-500/60 bg-rose-950/40 text-rose-300"
              : "border-cyan-500/30 bg-cyan-950/20 text-cyan-400"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider">SpO2 (%)</span>
              <span className="text-xs font-bold">%</span>
            </div>
            <div className="mt-1 font-mono text-3xl font-black">
              {vitals.spO2}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Mục tiêu: &gt;= 95%
            </div>
          </div>

          {/* Respiratory Rate (RR) */}
          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-400">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider">RR (/min)</span>
              <span className="text-xs">Lồng ngực</span>
            </div>
            <div className="mt-1 font-mono text-3xl font-black">
              {vitals.rr}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Chuẩn: 12 - 20
            </div>
          </div>

          {/* Temperature & Glasgow */}
          <div className="p-2.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-slate-300">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Thân Nhiệt</span>
            <div className="font-mono text-lg font-bold text-white">{vitals.temp} °C</div>
          </div>

          <div className="p-2.5 rounded-2xl border border-hospital-800 bg-hospital-900/60 text-slate-300">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Glasgow (GCS)</span>
            <div className={`font-mono text-lg font-bold ${vitals.glasgow <= 8 ? "text-rose-400" : "text-emerald-400"}`}>
              {vitals.glasgow} / 15
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
