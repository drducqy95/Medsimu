"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  CtCase,
  WindowPreset,
  CtAnnotation,
} from "@/data/simulators/ctCases";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Crosshair,
  Ruler,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

interface CtSliceViewerProps {
  ctCase: CtCase;
}

export const CtSliceViewer: React.FC<CtSliceViewerProps> = ({ ctCase }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Viewer state
  const [currentSlice, setCurrentSlice] = useState<number>(ctCase.defaultSlice);
  const [windowWidth, setWindowWidth] = useState<number>(ctCase.windowPresets[0].windowWidth);
  const [windowLevel, setWindowLevel] = useState<number>(ctCase.windowPresets[0].windowLevel);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Tools & Overlays
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);
  const [mouseHU, setMouseHU] = useState<{ x: number; y: number; hu: number; tissue: string } | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<CtAnnotation | null>(null);

  // Sync state when case changes
  useEffect(() => {
    setCurrentSlice(ctCase.defaultSlice);
    setWindowWidth(ctCase.windowPresets[0].windowWidth);
    setWindowLevel(ctCase.windowPresets[0].windowLevel);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setMeasurePoints([]);
    setActiveAnnotation(null);
  }, [ctCase]);

  // Map simulated coordinate to Hounsfield Unit (HU)
  const calculateHUAtPoint = useCallback((x: number, y: number, slice: number, organ: string): number => {
    // Normalised coordinates 0 to 1 relative to center
    const cx = (x - 256) / 200;
    const cy = (y - 256) / 200;
    const distSq = cx * cx + cy * cy;

    // Outside patient body -> Air
    if (distSq > 1.05) {
      return -1000;
    }

    // Subcutaneous fat rim
    if (distSq > 0.92) {
      return -105 + Math.sin(x * 0.1) * 10;
    }

    if (organ === "brain") {
      // Skull bone ring
      if (distSq > 0.82 && distSq <= 0.92) {
        // Skull fracture gap on right side on slices 8-14
        if (x > 380 && y > 210 && y < 270 && slice >= 8 && slice <= 14) {
          return 50; // Fracture gap
        }
        return 1200 + Math.sin(x * y) * 200; // Dense cortical bone
      }

      // Epidural Hematoma (Right temporal side: x > 310, y ~ 210 to 310) on key slices
      if (slice >= 8 && slice <= 14 && x > 300 && x < 400 && y > 200 && y < 320) {
        const edhCenterDist = Math.hypot((x - 360) / 45, (y - 260) / 60);
        if (edhCenterDist < 1.0) {
          return 75 + Math.sin(x * 0.5) * 6; // Hyperdense acute blood
        }
      }

      // Lateral ventricles (CSF)
      const ventX = cx + (slice >= 8 && slice <= 14 ? -0.15 : 0); // midline shift
      const isLeftVent = Math.hypot(ventX - 0.12, cy) < 0.16;
      const isRightVent = Math.hypot(ventX + 0.12, cy) < (slice >= 8 && slice <= 14 ? 0.04 : 0.16);
      if (isLeftVent || isRightVent) {
        return 10; // CSF
      }

      // Brain parenchyma: White vs Gray matter
      return 35 + Math.sin(x * 0.05 + y * 0.05) * 8;
    }

    if (organ === "chest") {
      // Ribs & spine bone
      const isSpine = Math.hypot(cx, cy - 0.6) < 0.22;
      const isRib = Math.abs(Math.hypot(cx, cy) - 0.85) < 0.08 && Math.sin(Math.atan2(cy, cx) * 8) > 0.5;
      if (isSpine || isRib) {
        return 950;
      }

      // Heart & great vessels (central area)
      const isMediastinum = Math.hypot(cx, cy - 0.05) < 0.42;
      if (isMediastinum) {
        // Pulmonary artery bifurcation on slices 9-13
        if (slice >= 9 && slice <= 13 && Math.hypot(cx, cy - 0.05) < 0.22) {
          // Thrombus in lumen center
          if (Math.hypot(cx, cy - 0.03) < 0.09) {
            return 42; // Low HU filling defect
          }
          return 340; // High contrast blood
        }
        return 65; // Soft tissue mediastinum
      }

      // Hampton hump infarct (wedge shaped in right lung)
      if (slice >= 13 && slice <= 16 && x > 120 && x < 190 && y > 280 && y < 360) {
        return 35; // Consolidated lung
      }

      // Lung parenchyma: Air-filled alveoli
      return -720 + Math.sin(x * 0.1 + y * 0.1) * 35;
    }

    if (organ === "abdomen") {
      // Spine
      if (Math.hypot(cx, cy - 0.65) < 0.2) return 850;

      // Appendicitis lesion in RLQ (x ~ 160-230, y ~ 300-380) on slices 11-16
      if (slice >= 11 && slice <= 16 && x > 150 && x < 235 && y > 300 && y < 380) {
        const appDist = Math.hypot((x - 195) / 25, (y - 340) / 30);
        if (appDist < 0.3) {
          return 450; // Appendicolith calcification
        }
        if (appDist < 0.8) {
          return 58; // Thickened enhancing wall
        }
        if (appDist < 1.3) {
          return -38; // Inflamed fat stranding
        }
      }

      // Abdominal wall & muscles
      if (distSq > 0.75) return 48;

      // Bowel loops & organs
      return 35 + Math.sin(x * 0.08 + y * 0.08) * 15;
    }

    return 30;
  }, []);

  // Classify HU to clinical tissue name
  const getTissueDescription = (hu: number): string => {
    if (hu <= -900) return "Khí (Air)";
    if (hu <= -500) return "Nhu mô phổi (Lung)";
    if (hu <= -30) return "Mô mỡ (Fat)";
    if (hu <= 15) return "Nước / Dịch não tủy (Water / CSF)";
    if (hu <= 50) return "Mô mềm / Chất trắng (Soft Tissue)";
    if (hu <= 90) return "Máu tươi / Xuất huyết (Acute Blood)";
    if (hu <= 400) return "Thuốc cản quang (IV Contrast)";
    return "Xương / Vôi hóa (Bone / Calcification)";
  };

  // Convert HU to 8-bit Grayscale using Window Width & Window Level
  const huToGray = useCallback((hu: number, ww: number, wl: number): number => {
    const minVal = wl - ww / 2;
    const maxVal = wl + ww / 2;
    if (hu <= minVal) return 0;
    if (hu >= maxVal) return 255;
    return Math.round(((hu - minVal) / ww) * 255);
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Render Procedural CT Matrix with Windowing
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const hu = calculateHUAtPoint(x, y, currentSlice, ctCase.organ);
        const gray = huToGray(hu, windowWidth, windowLevel);

        // 2x2 pixel block for smooth 60fps rendering
        for (let dy = 0; dy < 2; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            data[idx] = gray;
            data[idx + 1] = gray;
            data[idx + 2] = gray;
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Apply pan & zoom for vector overlays
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw Annotations for current slice
    if (showAnnotations) {
      const activeAnnotations = ctCase.annotations.filter(
        (a) => Math.abs(a.sliceIndex - currentSlice) <= 1
      );

      activeAnnotations.forEach((ann) => {
        const ax = (ann.xPercent / 100) * width;
        const ay = (ann.yPercent / 100) * height;

        ctx.save();
        // Target crosshair
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ax, ay, 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ax - 16, ay);
        ctx.lineTo(ax + 16, ay);
        ctx.moveTo(ax, ay - 16);
        ctx.lineTo(ax, ay + 16);
        ctx.stroke();

        // Label flag
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1;
        const textWidth = ctx.measureText(ann.label).width;
        ctx.fillRect(ax + 18, ay - 12, textWidth + 14, 24);
        ctx.strokeRect(ax + 18, ay - 12, textWidth + 14, 24);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(ann.label, ax + 25, ay + 4);
        ctx.restore();
      });
    }

    // Draw Caliper Ruler points
    if (measurePoints.length > 0) {
      ctx.save();
      ctx.strokeStyle = "#38bdf8";
      ctx.fillStyle = "#38bdf8";
      ctx.lineWidth = 2;

      measurePoints.forEach((pt, i) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      if (measurePoints.length === 2) {
        const p1 = measurePoints[0];
        const p2 = measurePoints[1];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const distPx = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const distMm = (distPx * 0.45).toFixed(1); // Scale: ~0.45mm / px
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        ctx.fillStyle = "rgba(14, 165, 233, 0.9)";
        ctx.fillRect(midX - 35, midY - 14, 70, 20);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.fillText(`${distMm} mm`, midX - 25, midY);
      }
      ctx.restore();
    }

    ctx.restore();
  }, [
    currentSlice,
    windowWidth,
    windowLevel,
    zoom,
    pan,
    showAnnotations,
    measurePoints,
    ctCase,
    calculateHUAtPoint,
    huToGray,
  ]);

  // Handle Mouse Wheel for Slice Scrolling
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setCurrentSlice((prev) => Math.min(ctCase.totalSlices, prev + 1));
    } else {
      setCurrentSlice((prev) => Math.max(1, prev - 1));
    }
  };

  // Handle Mouse Hover for real-time Hounsfield Unit (HU) probe
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (512 / rect.width));
    const y = Math.round((e.clientY - rect.top) * (512 / rect.height));

    if (x >= 0 && x < 512 && y >= 0 && y < 512) {
      const hu = calculateHUAtPoint(x, y, currentSlice, ctCase.organ);
      const tissue = getTissueDescription(hu);
      setMouseHU({ x, y, hu, tissue });
    }

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // Handle Click for Ruler Measurement
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMeasuring) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (512 / rect.width);
    const y = (e.clientY - rect.top) * (512 / rect.height);

    if (measurePoints.length >= 2) {
      setMeasurePoints([{ x, y }]);
    } else {
      setMeasurePoints([...measurePoints, { x, y }]);
    }
  };

  const handleApplyPreset = (preset: WindowPreset) => {
    setWindowWidth(preset.windowWidth);
    setWindowLevel(preset.windowLevel);
  };

  const isKeySlice =
    currentSlice >= ctCase.keyFindingSliceRange[0] &&
    currentSlice <= ctCase.keyFindingSliceRange[1];

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-6 backdrop-blur shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hospital-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{ctCase.title}</h2>
            {isKeySlice && (
              <span className="animate-pulse rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-300">
                Lát Cắt Bệnh Lý
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Độ dày lát: {ctCase.sliceThickness} | Tổng số lát: {ctCase.totalSlices} | Kỹ thuật: Cắt lớp vi tính đa dãy (MDCT)
          </p>
        </div>

        {/* Window Presets Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Sliders className="h-3.5 w-3.5" /> Preset:
          </span>
          {ctCase.windowPresets.map((preset) => {
            const isActive =
              windowWidth === preset.windowWidth && windowLevel === preset.windowLevel;
            return (
              <button
                key={preset.name}
                onClick={() => handleApplyPreset(preset)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                    : "bg-hospital-800 text-slate-300 hover:bg-hospital-700"
                }`}
                title={preset.description}
              >
                {preset.name.split("(")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Grid: Screen (Left) + Console / HUD (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CT Display Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative rounded-2xl border-2 border-hospital-800 bg-black p-2 shadow-inner overflow-hidden select-none">
            {/* DICOM Corner Overlay HUD */}
            <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-teal-400/90 pointer-events-none space-y-0.5">
              <div>SLICE: {currentSlice} / {ctCase.totalSlices}</div>
              <div>THICK: {ctCase.sliceThickness}</div>
              <div>MATRIX: 512 x 512</div>
            </div>

            <div className="absolute top-4 right-4 z-10 font-mono text-[11px] text-teal-400/90 text-right pointer-events-none space-y-0.5">
              <div>WW: {windowWidth}</div>
              <div>WL: {windowLevel}</div>
              <div>FOV: 250 mm</div>
            </div>

            {/* Live Hounsfield Unit (HU) Probe HUD at bottom left */}
            {mouseHU && (
              <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-teal-500/40 bg-hospital-950/90 px-3 py-1.5 font-mono text-xs text-teal-300 pointer-events-none shadow-lg">
                <div className="flex items-center gap-2">
                  <Crosshair className="h-3.5 w-3.5 text-teal-400 animate-spin" />
                  <span className="font-bold text-white">
                    {mouseHU.hu >= 0 ? `+${mouseHU.hu}` : mouseHU.hu} HU
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-teal-200">{mouseHU.tissue}</span>
                </div>
              </div>
            )}

            {/* Key Slice Warning indicator */}
            {isKeySlice && (
              <div className="absolute bottom-4 right-4 z-10 rounded-lg border border-rose-500/50 bg-rose-950/80 px-2.5 py-1 text-[11px] font-bold text-rose-300 pointer-events-none">
                Vùng tổn thương chính
              </div>
            )}

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              onWheel={handleWheel}
              onMouseMove={handleMouseMove}
              onClick={handleCanvasClick}
              className={`rounded-xl block w-full max-w-[480px] aspect-square ${
                isMeasuring ? "cursor-crosshair" : "cursor-default"
              }`}
            />
          </div>

          {/* Interactive Slice Slider Bar */}
          <div className="w-full mt-4 flex items-center gap-3 px-2">
            <button
              onClick={() => setCurrentSlice((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-hospital-800 text-slate-300 hover:bg-hospital-700"
              title="Lát cắt trước (Scroll up)"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex-1 flex flex-col gap-1">
              <input
                type="range"
                min={1}
                max={ctCase.totalSlices}
                value={currentSlice}
                onChange={(e) => setCurrentSlice(Number(e.target.value))}
                className="w-full h-2 bg-hospital-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Đỉnh (Cranial)</span>
                <span className="font-bold text-white">Lát {currentSlice}</span>
                <span>Đáy (Caudal)</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentSlice((p) => Math.min(ctCase.totalSlices, p + 1))}
              className="p-1.5 rounded-lg bg-hospital-800 text-slate-300 hover:bg-hospital-700"
              title="Lát cắt tiếp (Scroll down)"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Console Controls, Annotations & Findings (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Workstation Controls Panel */}
          <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-hospital-800 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Công cụ đo lường & hiển thị
              </span>
              <button
                onClick={() => {
                  setWindowWidth(ctCase.windowPresets[0].windowWidth);
                  setWindowLevel(ctCase.windowPresets[0].windowLevel);
                  setMeasurePoints([]);
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Quick Action Toggles */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  showAnnotations
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    : "bg-hospital-800 text-slate-400 border-hospital-700 hover:text-white"
                }`}
              >
                {showAnnotations ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                <span>{showAnnotations ? "Ẩn Chú Thích" : "Hiện Chú Thích"}</span>
              </button>

              <button
                onClick={() => {
                  setIsMeasuring(!isMeasuring);
                  if (isMeasuring) setMeasurePoints([]);
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  isMeasuring
                    ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                    : "bg-hospital-800 text-slate-400 border-hospital-700 hover:text-white"
                }`}
              >
                <Ruler className="h-3.5 w-3.5" />
                <span>{isMeasuring ? "Đang Đo Thước" : "Thước Đo Caliper"}</span>
              </button>
            </div>

            {/* Manual Window Width / Level Fine Tuning */}
            <div className="space-y-2 pt-2 border-t border-hospital-800/60">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Window Width (WW):</span>
                <span className="font-mono text-teal-400">{windowWidth} HU</span>
              </div>
              <input
                type="range"
                min={20}
                max={3000}
                value={windowWidth}
                onChange={(e) => setWindowWidth(Number(e.target.value))}
                className="w-full h-1.5 bg-hospital-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />

              <div className="flex justify-between text-xs text-slate-300">
                <span>Window Level (WL):</span>
                <span className="font-mono text-teal-400">{windowLevel} HU</span>
              </div>
              <input
                type="range"
                min={-800}
                max={1000}
                value={windowLevel}
                onChange={(e) => setWindowLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-hospital-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
            </div>
          </div>

          {/* Jump to Key Findings on Slices */}
          <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Crosshair className="h-4 w-4 text-rose-400" />
              <span>Các Điểm Tổn Thương Cần Khảo Sát:</span>
            </div>
            <div className="space-y-1.5">
              {ctCase.annotations.map((ann) => {
                const isCurrent = currentSlice === ann.sliceIndex;
                return (
                  <button
                    key={ann.id}
                    onClick={() => {
                      setCurrentSlice(ann.sliceIndex);
                      setActiveAnnotation(ann);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs border transition-all ${
                      isCurrent
                        ? "bg-rose-950/40 border-rose-500/50 text-rose-200"
                        : "bg-hospital-900/60 border-hospital-800 text-slate-300 hover:border-hospital-700"
                    }`}
                  >
                    <span className="font-medium">{ann.label}</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Lát {ann.sliceIndex} ({ann.expectedHU >= 0 ? `+${ann.expectedHU}` : ann.expectedHU} HU)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pathology Interpretation & Management */}
          <div className="rounded-2xl border border-purple-900/30 bg-purple-950/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              <Info className="h-4 w-4" />
              <span>Kết Luận Hình Ảnh & Xử Trí Khẩn Cấp</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ctCase.pathologySummary}
            </p>
            <div className="rounded-xl border border-hospital-800 bg-hospital-950/80 p-3 text-xs leading-relaxed text-amber-200">
              <span className="font-bold text-amber-400">⚡ Hành động lâm sàng: </span>
              {ctCase.clinicalAction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
