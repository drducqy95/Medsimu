"use client";

import React, { useState, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Contrast as ContrastIcon,
  Eye,
  EyeOff,
  Move,
  Ruler,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { XrayCase } from "@/data/simulators/xrayCases";

interface XrayViewerProps {
  xrayCase: XrayCase;
}

export const XrayViewer: React.FC<XrayViewerProps> = ({ xrayCase }) => {
  const [brightness, setBrightness] = useState<number>(100); // 50% - 200%
  const [contrast, setContrast] = useState<number>(100); // 50% - 300%
  const [isInverted, setIsInverted] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Overlays
  const [showAnatomy, setShowAnatomy] = useState<boolean>(false);
  const [showPathology, setShowPathology] = useState<boolean>(false);
  const [showCtrRuler, setShowCtrRuler] = useState<boolean>(false);

  // CTR Measurements in SVG space (0 - 800)
  const [heartWidthPx, setHeartWidthPx] = useState<number>(240);
  const [thoraxWidthPx, setThoraxWidthPx] = useState<number>(540);
  const calculatedCtr = Number((heartWidthPx / thoraxWidthPx).toFixed(2));

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setBrightness(100);
    setContrast(100);
    setIsInverted(false);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    setShowCtrRuler(false);
  };

  return (
    <div className="space-y-4">
      {/* Radiology Tool Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-hospital-800 bg-hospital-900/90 p-3.5 text-xs text-slate-300">
        {/* Left: Window & Level */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-400" />
            <span>Độ sáng:</span>
            <input
              type="range"
              min={50}
              max={200}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-20 accent-amber-500 cursor-pointer"
            />
            <span className="w-8 text-[11px] font-mono text-slate-400">{brightness}%</span>
          </div>

          <div className="flex items-center gap-2">
            <ContrastIcon className="h-4 w-4 text-cyan-400" />
            <span>Tương phản:</span>
            <input
              type="range"
              min={50}
              max={250}
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-20 accent-cyan-500 cursor-pointer"
            />
            <span className="w-8 text-[11px] font-mono text-slate-400">{contrast}%</span>
          </div>

          <button
            onClick={() => setIsInverted(!isInverted)}
            className={`rounded-lg px-2.5 py-1 font-bold border transition-all ${
              isInverted
                ? "bg-cyan-600 text-white border-cyan-500"
                : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
            }`}
          >
            {isInverted ? "Dương bản (White)" : "Âm bản (Black)"}
          </button>
        </div>

        {/* Right: Zoom, Calipers & Overlay Toggles */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.2, 2.5))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-hospital-800 bg-hospital-850 hover:text-white"
            title="Phóng to"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.6))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-hospital-800 bg-hospital-850 hover:text-white"
            title="Thu nhỏ"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={resetView}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-hospital-800 bg-hospital-850 hover:text-white"
            title="Đặt lại góc nhìn"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-hospital-700" />

          {/* CTR Caliper Toggle */}
          <button
            onClick={() => setShowCtrRuler(!showCtrRuler)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold border transition-all ${
              showCtrRuler
                ? "bg-purple-950 border-purple-700 text-purple-300"
                : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
            }`}
          >
            <Ruler className="h-3.5 w-3.5" />
            <span>Thước Đo CTR ({calculatedCtr})</span>
          </button>

          {/* Anatomical Highlights Toggle */}
          <button
            onClick={() => setShowAnatomy(!showAnatomy)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold border transition-all ${
              showAnatomy
                ? "bg-blue-950 border-blue-700 text-blue-300"
                : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Giải Phẫu</span>
          </button>

          {/* Pathology Highlights Toggle */}
          <button
            onClick={() => setShowPathology(!showPathology)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold border transition-all ${
              showPathology
                ? "bg-amber-950 border-amber-700 text-amber-300"
                : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-750"
            }`}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Chỉ Điểm Bệnh Lý</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative h-[550px] w-full select-none overflow-hidden rounded-3xl border-2 border-hospital-800 bg-black cursor-grab active:cursor-grabbing shadow-2xl"
      >
        {/* Transformable Canvas/SVG Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            filter: `brightness(${brightness}%) contrast(${contrast}%) ${
              isInverted ? "invert(1)" : ""
            }`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
          className="relative h-full w-full flex items-center justify-center"
        >
          {/* Authentic SVG Medical X-Ray Silhouette */}
          <svg
            viewBox="0 0 800 650"
            className="w-[720px] h-[550px] pointer-events-none drop-shadow-2xl"
          >
            {/* Dark background */}
            <rect width="800" height="650" fill="#040406" />

            {/* Thorax Silhouette & Rib Cage */}
            <g opacity="0.85">
              {/* Spine vertebrae column */}
              <rect x="385" y="80" width="30" height="480" rx="4" fill="#30353b" />
              {[110, 150, 190, 230, 270, 310, 350, 390, 430, 470, 510].map((y, idx) => (
                <rect key={idx} x="380" y={y} width="40" height="24" rx="3" fill="#4d535a" opacity="0.7" />
              ))}

              {/* Trachea (air filled dark column) */}
              <rect
                x={xrayCase.id === "pneumothorax_tension" ? "420" : "395"}
                y="80"
                width="14"
                height="130"
                rx="6"
                fill="#000000"
                opacity="0.95"
              />

              {/* Ribs Pairs (L/R) */}
              {[150, 190, 235, 280, 330, 385, 440, 495].map((y, idx) => (
                <g key={idx}>
                  {/* Right Rib */}
                  <path
                    d={`M 380 ${y - 15} C 260 ${y - 10}, 160 ${y + 20}, 150 ${y + 60}`}
                    fill="none"
                    stroke="#50565e"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  {/* Left Rib */}
                  <path
                    d={`M 420 ${y - 15} C 540 ${y - 10}, 640 ${y + 20}, 650 ${y + 60}`}
                    fill="none"
                    stroke="#50565e"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </g>
              ))}

              {/* Clavicles */}
              <path d="M 390 120 C 300 115, 200 100, 140 90" fill="none" stroke="#636b75" strokeWidth="14" strokeLinecap="round" />
              <path d="M 410 120 C 500 115, 600 100, 660 90" fill="none" stroke="#636b75" strokeWidth="14" strokeLinecap="round" />
            </g>

            {/* Right Lung Field */}
            {xrayCase.id === "pneumothorax_tension" ? (
              // Collapsed lung into hilum, pure jet-black hyperlucent pneumothorax
              <g>
                <path d="M 370 140 C 240 160, 170 240, 160 480 C 260 490, 340 485, 370 470 Z" fill="#000000" />
                {/* Collapsed Visceral Pleura line & shrunken lung */}
                <path d="M 370 240 C 310 260, 280 320, 290 400 C 340 420, 360 410, 370 390 Z" fill="#2d333b" stroke="#717a85" strokeWidth="2.5" />
              </g>
            ) : xrayCase.id === "lobar_pneumonia" ? (
              // Lobar pneumonia: dense white consolidation in lower lobe with air bronchograms
              <g>
                <path d="M 370 140 C 240 160, 170 240, 160 500 C 260 510, 340 495, 370 480 Z" fill="#090f13" />
                {/* White dense consolidation right lower lobe */}
                <path d="M 370 360 C 260 380, 200 420, 190 490 C 270 505, 340 495, 370 480 Z" fill="#6d7580" opacity="0.85" />
                {/* Air bronchograms (black branching air tubes inside white consolidation) */}
                <path d="M 330 380 L 290 420 L 260 450" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                <path d="M 290 420 L 300 460" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : (
              // Normal aeration right lung
              <path d="M 370 140 C 240 160, 170 240, 160 500 C 260 510, 340 495, 370 480 Z" fill="#0c1318" />
            )}

            {/* Left Lung Field */}
            {xrayCase.id === "pleural_effusion" ? (
              // Left pleural effusion: dense meniscus Damoiseau curve blunting left costophrenic angle
              <g>
                <path d="M 430 140 C 560 160, 630 240, 640 500 C 540 510, 460 495, 430 480 Z" fill="#0c1318" />
                {/* Damoiseau meniscus effusion curve */}
                <path d="M 430 450 C 480 430, 560 390, 640 330 L 640 510 C 540 520, 460 500, 430 485 Z" fill="#636a73" opacity="0.9" />
              </g>
            ) : (
              // Normal aeration left lung
              <path d="M 430 140 C 560 160, 630 240, 640 500 C 540 510, 460 495, 430 480 Z" fill="#0c1318" />
            )}

            {/* Cardiac Silhouette (Bóng Tim) */}
            {xrayCase.id === "pneumothorax_tension" ? (
              // Pushed violently to the left
              <path
                d="M 430 260 C 480 270, 560 330, 580 430 C 560 480, 460 490, 420 480 C 400 380, 410 300, 430 260 Z"
                fill="#424952"
                opacity="0.95"
              />
            ) : (
              // Standard cardiac silhouette
              <path
                d="M 390 260 C 360 310, 340 370, 350 440 C 370 480, 480 485, 520 450 C 540 390, 480 270, 430 250 Z"
                fill="#3c434b"
                opacity="0.9"
              />
            )}

            {/* Diaphragm Curves */}
            {xrayCase.id === "pneumoperitoneum" ? (
              // Free air crescent under right hemidiaphragm!
              <g>
                {/* Free air black crescent */}
                <path d="M 230 480 C 280 460, 360 460, 390 485 C 360 472, 280 472, 230 480 Z" fill="#000000" />
                {/* Diaphragm dome above free air */}
                <path d="M 220 478 C 280 458, 360 458, 400 484" fill="none" stroke="#6b737d" strokeWidth="4" />
              </g>
            ) : (
              // Normal Diaphragms
              <g>
                <path d="M 160 500 C 240 470, 340 475, 400 500" fill="none" stroke="#484f58" strokeWidth="5" />
                <path d="M 420 505 C 500 485, 590 485, 640 515" fill="none" stroke="#484f58" strokeWidth="5" />
              </g>
            )}

            {/* Anatomical Highlights Overlay */}
            {showAnatomy &&
              xrayCase.anatomicalHighlights.map((item, idx) => (
                <g key={idx}>
                  <circle cx={item.coords.x} cy={item.coords.y} r="8" fill={item.color} opacity="0.8" />
                  <circle cx={item.coords.x} cy={item.coords.y} r="14" fill="none" stroke={item.color} strokeWidth="1.5" className="animate-ping" />
                  <text
                    x={item.coords.x + 16}
                    y={item.coords.y + 4}
                    fill={item.color}
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {item.label}
                  </text>
                </g>
              ))}

            {/* Pathology Highlights Overlay */}
            {showPathology &&
              xrayCase.pathologyHighlights.map((path, idx) => (
                <g key={idx}>
                  <rect
                    x={path.box.x}
                    y={path.box.y}
                    width={path.box.width}
                    height={path.box.height}
                    rx="12"
                    fill={path.color}
                    fillOpacity="0.2"
                    stroke={path.color}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <rect
                    x={path.box.x}
                    y={path.box.y - 28}
                    width={path.label.length * 9.5}
                    height="24"
                    rx="6"
                    fill={path.color}
                  />
                  <text
                    x={path.box.x + 8}
                    y={path.box.y - 12}
                    fill="#000000"
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {path.label}
                  </text>
                </g>
              ))}
          </svg>
        </div>

        {/* CTR Caliper Tool Overlay (When toggled on) */}
        {showCtrRuler && (
          <div className="absolute bottom-4 left-4 z-20 rounded-2xl border border-purple-700/80 bg-hospital-950/95 p-4 text-xs shadow-2xl backdrop-blur-md space-y-2 w-80">
            <div className="flex items-center justify-between font-bold text-purple-300">
              <span className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4" />
                <span>Thước Đo Chỉ Số Tim / Lồng Ngực (CTR)</span>
              </span>
              <span className="font-mono text-sm text-white">CTR = {calculatedCtr}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Đường kính bóng tim (H): {heartWidthPx} px</span>
              </div>
              <input
                type="range"
                min={150}
                max={400}
                value={heartWidthPx}
                onChange={(e) => setHeartWidthPx(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Đường kính lồng ngực (T): {thoraxWidthPx} px</span>
              </div>
              <input
                type="range"
                min={400}
                max={650}
                value={thoraxWidthPx}
                onChange={(e) => setThoraxWidthPx(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div
              className={`rounded-xl p-2 text-[11px] font-bold flex items-center gap-1.5 ${
                calculatedCtr > 0.5
                  ? "bg-rose-950/80 text-rose-300 border border-rose-800"
                  : "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
              }`}
            >
              {calculatedCtr > 0.5 ? (
                <>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>CTR &gt; 0.50: Dấu hiệu BÓNG TIM TO (Cardiomegaly)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>CTR &le; 0.50: Bóng tim kích thước bình thường</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Viewport Info Pill */}
        <div className="absolute top-4 left-4 pointer-events-none rounded-xl border border-hospital-800/80 bg-hospital-950/80 px-3 py-1.5 text-xs font-mono text-slate-300 backdrop-blur-md">
          <span className="font-bold text-cyan-400">{xrayCase.modality}</span> • Zoom: {zoom.toFixed(1)}x
        </div>
      </div>
    </div>
  );
};
