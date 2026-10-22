"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  UltrasoundZone,
  ProbeType,
  ULTRASOUND_ZONES,
} from "@/data/simulators/ultrasoundCases";
import {
  Layers,
  Pause,
  Play,
  Ruler,
  Sliders,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface DynamicUltrasoundScreenProps {
  zone: UltrasoundZone;
  probeType: ProbeType;
  rotationDeg: number;
  tiltDeg: number;
  compression: number;
  isPathologyActive: boolean;
  onTogglePathology: () => void;
}

export const DynamicUltrasoundScreen: React.FC<DynamicUltrasoundScreenProps> = ({
  zone,
  probeType,
  rotationDeg,
  tiltDeg,
  compression,
  isPathologyActive,
  onTogglePathology,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<"B_MODE" | "M_MODE" | "COLOR_DOPPLER">("B_MODE");
  const [depthCm, setDepthCm] = useState<number>(15); // 5 - 25 cm
  const [gainPercent, setGainPercent] = useState<number>(65); // 20 - 100%
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  // Calipers measurement on frozen screen
  const [caliperDistMm, setCaliperDistMm] = useState<number | null>(null);
  const [caliperPoints, setCaliperPoints] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // Animation frame
  const animFrameIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const currentZoneDef =
    ULTRASOUND_ZONES.find((z) => z.id === zone) || ULTRASOUND_ZONES[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const topY = 30;

    let startTime = performance.now();

    const render = (now: number) => {
      if (!isFrozen) {
        timeRef.current = (now - startTime) / 1000;
      }
      const t = timeRef.current;

      // Clear dark background
      ctx.fillStyle = "#020406";
      ctx.fillRect(0, 0, width, height);

      // Depth scaling: higher depth = structures smaller
      const depthScale = 15 / depthCm;
      const gainFactor = gainPercent / 65;

      // Physiological cycles:
      // Cardiac cycle (75 bpm -> 0.8s period)
      const cardiacPhase = (t % 0.8) / 0.8;
      const heartBeatScale = 1.0 + 0.15 * Math.sin(cardiacPhase * Math.PI * 2);

      // Respiratory cycle (15 bpm -> 4.0s period)
      const respPhase = (t % 4.0) / 4.0;
      const lungSlidingOffset = Math.sin(respPhase * Math.PI * 2) * 25;

      // Rotation effect: interpolate between longitudinal (0 deg) and transverse (90 deg)
      const rotRad = (rotationDeg * Math.PI) / 180;
      const cosRot = Math.abs(Math.cos(rotRad));
      const sinRot = Math.abs(Math.sin(rotRad));

      // Draw Sector Ultrasound Fan Mask (Clip)
      ctx.save();
      ctx.beginPath();
      if (probeType === "linear") {
        // Linear probe: Rectangular field of view
        ctx.rect(centerX - 160, topY, 320, height - topY - 20);
      } else {
        // Convex or Phased array: Sector Fan / Cone
        const sectorAngle = probeType === "phased_array" ? Math.PI * 0.45 : Math.PI * 0.65;
        const radius = height - topY - 10;
        ctx.moveTo(centerX, topY);
        ctx.arc(
          centerX,
          topY,
          radius,
          Math.PI / 2 - sectorAngle / 2,
          Math.PI / 2 + sectorAngle / 2
        );
        ctx.closePath();
      }
      ctx.clip();

      // Background Sector Tissue Haze & Speckle Noise
      const gradient = ctx.createRadialGradient(
        centerX,
        topY,
        10,
        centerX,
        topY,
        height
      );
      gradient.addColorStop(0, `rgba(40, 50, 55, ${0.4 * gainFactor})`);
      gradient.addColorStop(0.5, `rgba(20, 26, 30, ${0.35 * gainFactor})`);
      gradient.addColorStop(1, `rgba(5, 10, 15, ${0.2 * gainFactor})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Procedural Speckle Texture (Simulation of acoustic backscatter)
      ctx.fillStyle = `rgba(180, 200, 210, ${0.04 * gainFactor})`;
      for (let i = 0; i < 400; i++) {
        const sx = centerX + (Math.sin(i * 13 + t * 2) * (width * 0.45));
        const sy = topY + ((i * 1.3) % (height - 60));
        ctx.fillRect(sx, sy, 2, 2);
      }

      // -----------------------------------------------------------------
      // RENDER ZONE SPECIFIC BIOLOGICAL ANATOMY
      // -----------------------------------------------------------------

      if (zone === "subxiphoid") {
        // SUBXIPHOID 4-CHAMBER CARDIAC VIEW
        // 1. Liver window at top (echoic triangular lobe)
        ctx.fillStyle = `rgba(100, 115, 125, ${0.6 * gainFactor})`;
        ctx.beginPath();
        ctx.moveTo(centerX - 140, topY + 40);
        ctx.lineTo(centerX + 140, topY + 40);
        ctx.lineTo(centerX, topY + 110);
        ctx.closePath();
        ctx.fill();

        // 2. Pericardial Effusion Fluid Space (Black crescent if active)
        if (isPathologyActive) {
          ctx.fillStyle = "#000000"; // Anechoic jet black fluid
          ctx.beginPath();
          ctx.ellipse(centerX, topY + 220, 150 * depthScale, 110 * depthScale, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Heart Ventricles & Atria (Co bóp nhịp nhàng theo cardiacPhase)
        ctx.save();
        ctx.translate(centerX, topY + 220);
        ctx.scale(heartBeatScale * depthScale, heartBeatScale * depthScale);

        // Myocardium Wall (Thành cơ tim dày tăng âm)
        ctx.strokeStyle = `rgba(170, 190, 200, ${0.85 * gainFactor})`;
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.ellipse(0, 0, 100, 80, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Ventricular Septum (Vách liên thất)
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.lineTo(0, 60);
        ctx.stroke();

        // Blood Pools inside Chambers (Echo trống đen bên trong buồng tim)
        ctx.fillStyle = "#020406";
        // Right Ventricle (RV)
        ctx.beginPath();
        ctx.ellipse(-45, -15, isPathologyActive ? 25 : 35, 45, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Left Ventricle (LV)
        ctx.beginPath();
        ctx.ellipse(45, -15, 40, 50, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Valve Leaflets (Lá van tim mở đóng liên tục)
        const valveOpen = Math.sin(cardiacPhase * Math.PI * 2) > 0;
        ctx.strokeStyle = `rgba(230, 245, 255, ${0.9 * gainFactor})`;
        ctx.lineWidth = 3;
        // Mitral valve
        ctx.beginPath();
        ctx.moveTo(30, 25);
        ctx.lineTo(valveOpen ? 25 : 45, valveOpen ? 45 : 30);
        ctx.stroke();

        ctx.restore();
      } else if (zone === "ruq") {
        // RUQ: KHOANG MORISON (GAN - THẬN PHẢI)
        // 1. Liver (Nhu mô gan trên bên trái)
        ctx.fillStyle = `rgba(110, 125, 135, ${0.65 * gainFactor})`;
        ctx.beginPath();
        ctx.ellipse(centerX - 40, topY + 140, 130 * depthScale, 100 * depthScale, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // 2. Kidney (Thận phải) - morphs from oval (longitudinal) to round (transverse)
        const kidneyRx = (70 * cosRot + 50 * sinRot) * depthScale;
        const kidneyRy = (110 * cosRot + 60 * sinRot) * depthScale;

        // Renal Cortex (Vỏ thận echo kém)
        ctx.fillStyle = `rgba(60, 75, 85, ${0.7 * gainFactor})`;
        ctx.beginPath();
        ctx.ellipse(centerX + 60, topY + 230, kidneyRx, kidneyRy, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Renal Sinus (Xoang thận tăng âm sáng ở trung tâm)
        ctx.fillStyle = `rgba(200, 220, 230, ${0.85 * gainFactor})`;
        ctx.beginPath();
        ctx.ellipse(centerX + 60, topY + 230, kidneyRx * 0.4, kidneyRy * 0.5, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // 3. Morison Pouch Interface / Fluid Collection
        if (isPathologyActive) {
          // Free fluid: Jet-black anechoic stripe at Morison's pouch!
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.moveTo(centerX - 10, topY + 160);
          ctx.quadraticCurveTo(centerX + 40, topY + 180, centerX + 110, topY + 270);
          ctx.lineWidth = 14;
          ctx.strokeStyle = "#000000";
          ctx.stroke();
        } else {
          // Normal hyperechoic bright capsule line
          ctx.strokeStyle = `rgba(220, 240, 250, ${0.9 * gainFactor})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(centerX - 10, topY + 160);
          ctx.quadraticCurveTo(centerX + 30, topY + 180, centerX + 90, topY + 260);
          ctx.stroke();
        }
      } else if (zone === "lung_anterior") {
        // LUNG POCUS (MÀNG PHỔI TRƯỚC)
        // 1. Rib Shadows (Hai bóng xương sườn với bóng lưng âm đen hoàn toàn)
        ctx.fillStyle = `rgba(200, 215, 225, ${0.8 * gainFactor})`;
        // Left Rib
        ctx.fillRect(centerX - 130, topY + 50, 45, 30);
        // Right Rib
        ctx.fillRect(centerX + 85, topY + 50, 45, 30);

        // Acoustic Shadow behind ribs (Bóng lưng đen tuyệt đối)
        ctx.fillStyle = "#000000";
        ctx.fillRect(centerX - 130, topY + 80, 45, height);
        ctx.fillRect(centerX + 85, topY + 80, 45, height);

        // 2. Pleural Line (Đường màng phổi trắng sáng)
        const pleuralY = topY + 100;
        ctx.strokeStyle = `rgba(250, 255, 255, ${0.95 * gainFactor})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 85, pleuralY);
        ctx.lineTo(centerX + 85, pleuralY);
        ctx.stroke();

        // 3. Lung Sliding / Comet-tails or Barcode
        if (isPathologyActive) {
          // PNEUMOTHORAX: Loss of sliding (motionless) + A-lines only
          // Static A-lines (Horizontal reflection lines)
          [pleuralY + 60, pleuralY + 120, pleuralY + 180].forEach((ay) => {
            ctx.strokeStyle = `rgba(160, 180, 195, ${0.4 * gainFactor})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX - 80, ay);
            ctx.lineTo(centerX + 80, ay);
            ctx.stroke();
          });
        } else {
          // NORMAL LUNG SLIDING: Shimmering sliding speckles moving back and forth!
          ctx.fillStyle = "#ffffff";
          for (let p = -70; p <= 70; p += 12) {
            const px = centerX + p + (lungSlidingOffset * 0.3);
            ctx.beginPath();
            ctx.arc(px, pleuralY, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // A-lines
          [pleuralY + 70, pleuralY + 140].forEach((ay) => {
            ctx.strokeStyle = `rgba(150, 175, 190, ${0.35 * gainFactor})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX - 75, ay);
            ctx.lineTo(centerX + 75, ay);
            ctx.stroke();
          });
        }
      } else {
        // LUQ / SUPRAPUBIC (Generic Abdominal Organs)
        ctx.fillStyle = `rgba(90, 110, 120, ${0.6 * gainFactor})`;
        ctx.beginPath();
        ctx.ellipse(centerX, topY + 180, 140 * depthScale, 110 * depthScale, 0, 0, Math.PI * 2);
        ctx.fill();

        if (isPathologyActive) {
          // Free fluid dark crescent
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.ellipse(centerX, topY + 270, 110 * depthScale, 40 * depthScale, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -----------------------------------------------------------------
      // COLOR DOPPLER BOX (BART: Blue Away, Red Towards)
      // -----------------------------------------------------------------
      if (activeMode === "COLOR_DOPPLER") {
        const boxW = 120;
        const boxH = 90;
        const boxX = centerX - boxW / 2;
        const boxY = topY + 140;

        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Simulated pulsating flow inside box
        const flowToward = Math.sin(t * 4) > 0;
        ctx.fillStyle = flowToward
          ? "rgba(239, 68, 68, 0.45)" // RED Towards
          : "rgba(59, 130, 246, 0.45)"; // BLUE Away
        ctx.beginPath();
        ctx.ellipse(centerX, boxY + boxH / 2, 35, 18, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------
      // M-MODE SWEEP STRIP (BOTTOM PANEL)
      // -----------------------------------------------------------------
      if (activeMode === "M_MODE") {
        const mModeH = 110;
        const mModeY = height - mModeH;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, mModeY, width, mModeH);
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, mModeY);
        ctx.lineTo(width, mModeY);
        ctx.stroke();

        // Draw Seashore vs Barcode pattern
        if (zone === "lung_anterior" && isPathologyActive) {
          // Stratosphere / Barcode sign (All parallel straight lines)
          ctx.strokeStyle = "rgba(180, 200, 210, 0.5)";
          for (let ly = mModeY + 10; ly < height; ly += 6) {
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(width, ly);
            ctx.stroke();
          }
        } else {
          // Seashore sign (Top straight waves, bottom granular sand)
          ctx.strokeStyle = "rgba(180, 200, 210, 0.6)";
          for (let ly = mModeY + 10; ly < mModeY + 40; ly += 8) {
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(width, ly);
            ctx.stroke();
          }
          // Granular beach noise
          ctx.fillStyle = "rgba(160, 190, 210, 0.35)";
          for (let s = 0; s < 250; s++) {
            const sx = (s * 7.5 + t * 40) % width;
            const sy = mModeY + 45 + (s * 3) % 60;
            ctx.fillRect(sx, sy, 2, 2);
          }
        }
      }

      ctx.restore(); // Restore clip

      // Depth tick marks on right edge
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      for (let d = 0; d <= depthCm; d += 5) {
        const tickY = topY + (d / depthCm) * (height - topY - 20);
        ctx.fillRect(width - 25, tickY, 6, 1);
        ctx.fillText(`${d}cm`, width - 20, tickY + 3);
      }

      if (!isFrozen) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    zone,
    probeType,
    rotationDeg,
    tiltDeg,
    compression,
    isPathologyActive,
    activeMode,
    depthCm,
    gainPercent,
    isFrozen,
  ]);

  return (
    <div className="space-y-4">
      {/* Ultrasound Machine Screen Monitor */}
      <div className="relative h-[480px] w-full rounded-3xl border-2 border-teal-500/50 bg-black overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Top Machine Status Bar */}
        <div className="flex items-center justify-between p-3.5 bg-gradient-to-b from-black via-black/80 to-transparent z-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-teal-400">MEDSIM POCUS 3000</span>
            <span className="text-slate-400">• {probeType.toUpperCase()}</span>
            <span className="text-slate-400">• Gain: {gainPercent}%</span>
            <span className="text-slate-400">• Depth: {depthCm}cm</span>
          </div>

          <div className="flex items-center gap-2">
            {isPathologyActive ? (
              <span className="flex items-center gap-1 rounded bg-rose-950/80 px-2.5 py-0.5 text-rose-300 font-bold border border-rose-800 animate-pulse">
                <AlertTriangle className="h-3.5 w-3.5" /> BỆNH LÝ DƯƠNG TÍNH
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-emerald-950/80 px-2.5 py-0.5 text-emerald-300 font-bold border border-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> BÌNH THƯỜNG
              </span>
            )}
            {isFrozen && (
              <span className="rounded bg-amber-500 text-slate-950 px-2 py-0.5 font-bold">
                FROZEN
              </span>
            )}
          </div>
        </div>

        {/* 60 FPS Procedural Biological Canvas */}
        <canvas
          ref={canvasRef}
          width={700}
          height={480}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Bottom Mode Toolbar */}
        <div className="flex items-center justify-between p-3.5 bg-gradient-to-t from-black via-black/90 to-transparent z-10 text-xs">
          {/* Mode Switchers */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveMode("B_MODE")}
              className={`rounded-xl px-3 py-1 font-bold border transition-all ${
                activeMode === "B_MODE"
                  ? "bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/30"
                  : "bg-hospital-900 border-hospital-800 text-slate-400 hover:text-white"
              }`}
            >
              B-Mode (2D)
            </button>
            <button
              onClick={() => setActiveMode("M_MODE")}
              className={`rounded-xl px-3 py-1 font-bold border transition-all ${
                activeMode === "M_MODE"
                  ? "bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/30"
                  : "bg-hospital-900 border-hospital-800 text-slate-400 hover:text-white"
              }`}
            >
              M-Mode (Vận động)
            </button>
            <button
              onClick={() => setActiveMode("COLOR_DOPPLER")}
              className={`rounded-xl px-3 py-1 font-bold border transition-all ${
                activeMode === "COLOR_DOPPLER"
                  ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30"
                  : "bg-hospital-900 border-hospital-800 text-slate-400 hover:text-white"
              }`}
            >
              Color Doppler (BART)
            </button>
          </div>

          {/* Freeze & Toggle Pathology */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePathology}
              className={`rounded-xl px-3 py-1 font-bold border transition-all ${
                isPathologyActive
                  ? "bg-rose-950 border-rose-700 text-rose-300 hover:bg-rose-900"
                  : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
              }`}
            >
              {isPathologyActive ? "Bệnh lý (+) BẬT" : "Chuyển sang Bệnh lý (+)"}
            </button>

            <button
              onClick={() => setIsFrozen(!isFrozen)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1 font-bold border transition-all ${
                isFrozen
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
              }`}
            >
              {isFrozen ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              <span>{isFrozen ? "Tiếp tục" : "Dừng hình (Freeze)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ultrasound Machine Knobs Deck */}
      <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-hospital-800 bg-hospital-900/90 p-4 text-xs">
        {/* Depth Knob */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span>Độ sâu chùm tia (Depth):</span>
            <span className="font-mono text-teal-400">{depthCm} cm</span>
          </div>
          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={depthCm}
            onChange={(e) => setDepthCm(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
        </div>

        {/* Gain Knob */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span>Độ khuếch đại âm (Gain):</span>
            <span className="font-mono text-cyan-400">{gainPercent}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={gainPercent}
            onChange={(e) => setGainPercent(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
