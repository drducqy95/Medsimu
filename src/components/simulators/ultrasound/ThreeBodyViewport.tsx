"use client";

import React, { useState, useRef } from "react";
import {
  RotateCw,
  Compass,
  Layers,
  Sparkles,
  Move,
  Activity,
  Check,
} from "lucide-react";
import {
  UltrasoundZone,
  ProbeType,
  ULTRASOUND_ZONES,
} from "@/data/simulators/ultrasoundCases";

interface ThreeBodyViewportProps {
  currentZone: UltrasoundZone;
  onSelectZone: (zone: UltrasoundZone) => void;
  probeType: ProbeType;
  onChangeProbeType: (type: ProbeType) => void;
  rotationDeg: number;
  onChangeRotation: (deg: number) => void;
  tiltDeg: number;
  onChangeTilt: (deg: number) => void;
  compression: number; // 0 - 1
  onChangeCompression: (val: number) => void;
}

export const ThreeBodyViewport: React.FC<ThreeBodyViewportProps> = ({
  currentZone,
  onSelectZone,
  probeType,
  onChangeProbeType,
  rotationDeg,
  onChangeRotation,
  tiltDeg,
  onChangeTilt,
  compression,
  onChangeCompression,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Probe position on the torso map (in % of width/height)
  const zoneCoordinates: Record<UltrasoundZone, { x: number; y: number }> = {
    subxiphoid: { x: 50, y: 38 }, // Center lower chest
    ruq: { x: 34, y: 46 }, // Right upper quadrant
    luq: { x: 66, y: 46 }, // Left upper quadrant
    suprapubic: { x: 50, y: 76 }, // Lower pelvis
    lung_anterior: { x: 38, y: 24 }, // Right 2nd intercostal space
  };

  const currentCoords = zoneCoordinates[currentZone];

  const probeTypes: { id: ProbeType; name: string; freq: string; shape: string }[] = [
    { id: "convex", name: "Đầu Dò Cong (Convex)", freq: "3.5 MHz", shape: "Quạt rộng ổ bụng" },
    { id: "phased_array", name: "Đầu Dò Tim (Phased Array)", freq: "2.5 MHz", shape: "Nón hẹp khe sườn" },
    { id: "linear", name: "Đầu Dò Thẳng (Linear)", freq: "10.0 MHz", shape: "Hình chữ nhật màng phổi" },
  ];

  return (
    <div className="space-y-4">
      {/* 3D Torso Anatomy Viewport */}
      <div
        ref={containerRef}
        className="relative h-[480px] w-full select-none overflow-hidden rounded-3xl border-2 border-teal-500/40 bg-gradient-to-b from-hospital-950 via-hospital-900 to-black p-4 shadow-2xl flex flex-col justify-between"
      >
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono z-10">
          <span className="rounded-xl bg-teal-950/80 border border-teal-800 px-3 py-1 font-bold text-teal-300 backdrop-blur-md">
            MÔ HÌNH KHÔNG GIAN 3 CHIỀU (TORSO 3D)
          </span>
          <span className="rounded-xl bg-hospital-900/80 border border-hospital-800 px-3 py-1 text-slate-300">
            Xoay trục: {rotationDeg}° • Nghiêng: {tiltDeg}° • Tỳ đè: {Math.round(compression * 100)}%
          </span>
        </div>

        {/* Anatomical Human Torso Graphic Rendering */}
        <div className="relative mx-auto my-auto w-[340px] h-[400px]">
          {/* Torso SVG Contour */}
          <svg viewBox="0 0 340 400" className="w-full h-full drop-shadow-2xl">
            {/* Ambient Body Glow */}
            <defs>
              <radialGradient id="torsoGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="340" height="400" fill="url(#torsoGlow)" />

            {/* Neck & Shoulders */}
            <path
              d="M 130 30 L 210 30 L 230 70 L 310 90 C 330 110, 320 180, 290 220 L 290 350 C 270 380, 230 390, 170 390 C 110 390, 70 380, 50 350 L 50 220 C 20 180, 10 110, 30 90 L 110 70 Z"
              fill="#101826"
              stroke="#1e293b"
              strokeWidth="3"
            />

            {/* Clavicles & Sternum */}
            <path d="M 110 70 Q 170 85, 230 70" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <path d="M 170 85 L 170 170" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            {/* Ribcage Outline */}
            <path d="M 170 170 C 130 175, 90 200, 80 230" fill="none" stroke="#334155" strokeWidth="3" />
            <path d="M 170 170 C 210 175, 250 200, 260 230" fill="none" stroke="#334155" strokeWidth="3" />

            {/* Umbilicus (Rốn) */}
            <circle cx="170" cy="265" r="4" fill="#334155" />

            {/* Pelvic Arch (Xương chậu) */}
            <path d="M 90 330 Q 170 365, 250 330" fill="none" stroke="#334155" strokeWidth="4" />
          </svg>

          {/* FAST Landmarks Click Targets on Body */}
          {ULTRASOUND_ZONES.map((zone) => {
            const coords = zoneCoordinates[zone.id];
            const isSelected = currentZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all group ${
                  isSelected
                    ? "h-9 w-9 bg-teal-500/30 border-2 border-teal-400 shadow-lg shadow-teal-500/50 scale-110 z-20"
                    : "h-7 w-7 bg-hospital-800/80 border border-hospital-700 hover:border-teal-400 hover:scale-105 z-10"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isSelected ? "bg-teal-400 animate-ping" : "bg-slate-400 group-hover:bg-teal-300"
                  }`}
                />
              </button>
            );
          })}

          {/* Interactive 3D Ultrasound Probe Graphic positioned at current active landmark */}
          <div
            style={{
              left: `${currentCoords.x}%`,
              top: `${currentCoords.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotationDeg}deg) skewX(${tiltDeg * 0.4}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="absolute pointer-events-none z-30 flex flex-col items-center"
          >
            {/* Probe Handle */}
            <div className="w-7 h-14 rounded-t-xl bg-gradient-to-r from-slate-200 via-white to-slate-300 shadow-2xl border border-slate-400 flex flex-col items-center justify-between p-1">
              <div className="w-3 h-1.5 rounded-full bg-teal-500" />
              {/* Orientation Marker Dot */}
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" title="Probe Orientation Marker" />
              <div className="text-[7px] font-black tracking-tighter text-slate-800">PROBE</div>
            </div>

            {/* Probe Scanning Footprint Head */}
            <div
              className={`w-9 h-4 bg-teal-600 border border-teal-400 shadow-lg ${
                probeType === "convex"
                  ? "rounded-b-2xl"
                  : probeType === "phased_array"
                  ? "rounded-b-lg w-6"
                  : "rounded-b-none"
              }`}
            />

            {/* Virtual Ultrasound Sound Cone Projection */}
            <div
              style={{ opacity: 0.25 + compression * 0.3 }}
              className="w-24 h-24 bg-gradient-to-b from-teal-400 to-transparent clip-triangle pointer-events-none"
            />
          </div>
        </div>

        {/* Bottom Fast Zone Selection Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 z-10">
          {ULTRASOUND_ZONES.map((zone) => {
            const isSelected = currentZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                className={`rounded-xl px-3 py-1 text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/30"
                    : "bg-hospital-900/90 text-slate-300 border-hospital-800 hover:bg-hospital-800 hover:text-white"
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Probe Fine-Tuning Controls Deck */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-hospital-800 bg-hospital-900/90 p-4 text-xs">
        {/* Probe Type Selection */}
        <div className="space-y-1.5">
          <span className="font-bold text-slate-300 block">Loại đầu dò (Transducer):</span>
          <select
            value={probeType}
            onChange={(e) => onChangeProbeType(e.target.value as ProbeType)}
            className="w-full rounded-xl border border-hospital-700 bg-hospital-950 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
          >
            {probeTypes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.freq})
              </option>
            ))}
          </select>
        </div>

        {/* Axial Rotation Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span className="flex items-center gap-1">
              <RotateCw className="h-3.5 w-3.5 text-teal-400" />
              <span>Xoay trục (0° - 360°):</span>
            </span>
            <span className="font-mono text-teal-300">{rotationDeg}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={15}
            value={rotationDeg}
            onChange={(e) => onChangeRotation(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0° (Trục dọc)</span>
            <span>90° (Trục ngang)</span>
            <span>180°</span>
          </div>
        </div>

        {/* Fanning / Tilt Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span className="flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-cyan-400" />
              <span>Góc quét quạt (Tilt ±45°):</span>
            </span>
            <span className="font-mono text-cyan-300">{tiltDeg}°</span>
          </div>
          <input
            type="range"
            min={-45}
            max={45}
            value={tiltDeg}
            onChange={(e) => onChangeTilt(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>-45°</span>
            <span>0° (Vuông góc)</span>
            <span>+45°</span>
          </div>
        </div>

        {/* Compression Pressure Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-slate-300">
            <span>Áp lực tỳ đè (Pressure):</span>
            <span className="font-mono text-emerald-300">{Math.round(compression * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={compression}
            onChange={(e) => onChangeCompression(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Nhẹ</span>
            <span>Vừa phải</span>
            <span>Ấn sâu</span>
          </div>
        </div>
      </div>
    </div>
  );
};
