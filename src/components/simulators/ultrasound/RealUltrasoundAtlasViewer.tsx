"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UltrasoundAtlasChapter,
  UltrasoundAtlasTopic,
} from "@/domain/simulators/ultrasoundAtlasTypes";
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Ruler,
  Info,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

interface RealUltrasoundAtlasViewerProps {
  initialChapters?: UltrasoundAtlasChapter[];
  highlightChapterId?: string;
}

export const RealUltrasoundAtlasViewer: React.FC<RealUltrasoundAtlasViewerProps> = ({
  initialChapters,
  highlightChapterId,
}) => {
  const [chapters, setChapters] = useState<UltrasoundAtlasChapter[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("liver");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("normal-liver");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Image manipulation state
  const [zoom, setZoom] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [invert, setInvert] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Measurement tool
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Fetch chapters if not provided
  useEffect(() => {
    if (initialChapters && initialChapters.length > 0) {
      setChapters(initialChapters);
    } else {
      fetch("/api/ultrasound/atlas")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setChapters(data);
          }
        })
        .catch((err) => console.error("Error loading ultrasound atlas:", err));
    }
  }, [initialChapters]);

  // Sync when highlightChapterId changes (e.g. from 3D probe)
  useEffect(() => {
    if (highlightChapterId && chapters.some((c) => c.id === highlightChapterId)) {
      setSelectedChapterId(highlightChapterId);
      const targetChap = chapters.find((c) => c.id === highlightChapterId);
      if (targetChap && targetChap.topics.length > 0) {
        setSelectedTopicId(targetChap.topics[0].id);
        setSelectedImageIndex(0);
      }
    }
  }, [highlightChapterId, chapters]);

  const activeChapter =
    chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const activeTopic =
    activeChapter?.topics.find((t) => t.id === selectedTopicId) ||
    activeChapter?.topics[0];

  const currentImages = activeTopic?.images || [];
  const currentImageFilename = currentImages[selectedImageIndex] || currentImages[0];

  // Handle measurement click on image
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMeasuring) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (measurePoints.length >= 2) {
      setMeasurePoints([{ x, y }]);
    } else {
      setMeasurePoints([...measurePoints, { x, y }]);
    }
  };

  const handleResetAdjustments = () => {
    setZoom(1);
    setBrightness(100);
    setContrast(100);
    setInvert(false);
    setMeasurePoints([]);
    setIsMeasuring(false);
  };

  // Filter topics across all chapters if searching
  const filteredTopics = searchQuery.trim()
    ? chapters.flatMap((c) =>
        c.topics
          .filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((t) => ({ ...t, chapterId: c.id, chapterTitle: c.title }))
      )
    : [];

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 md:p-6 shadow-2xl space-y-5">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hospital-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-teal-400 animate-ping" />
            <h2 className="text-xl font-extrabold text-white">
              Atlas Hình Ảnh Siêu Âm Lâm Sàng Thực Tế (Viable Clinical Ultrasound)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dữ liệu nạp từ đĩa CD Viable Abdominal Ultrasound: 1,245 hình ảnh siêu âm thật từ bệnh viện, 9 cơ quan giải phẫu
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm bệnh lý (sỏi mật, u gan...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-hospital-700 bg-hospital-950 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Chapter Tabs (9 Organs) */}
      {!searchQuery && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {chapters.filter(c => c.id !== "author").map((chap) => {
            const isSelected = selectedChapterId === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  setSelectedChapterId(chap.id);
                  if (chap.topics.length > 0) {
                    setSelectedTopicId(chap.topics[0].id);
                    setSelectedImageIndex(0);
                    handleResetAdjustments();
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50 scale-105"
                    : "bg-hospital-950/80 text-slate-300 hover:bg-hospital-800 hover:text-white border border-hospital-800"
                }`}
              >
                <span>{chap.icon}</span>
                <span>{chap.title}</span>
                <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[10px]">
                  {chap.topics.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Workspace Layout: Topic List (Left) + High-Res Image Display (Center & Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Topic Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {searchQuery ? `Kết quả tìm kiếm (${filteredTopics.length})` : `Chủ Đề Bệnh Học: ${activeChapter?.title}`}
            </span>
          </div>

          <div className="max-h-[560px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {searchQuery ? (
              filteredTopics.map((top) => (
                <button
                  key={top.id}
                  onClick={() => {
                    setSelectedChapterId(top.chapterId);
                    setSelectedTopicId(top.id);
                    setSelectedImageIndex(0);
                    setSearchQuery("");
                    handleResetAdjustments();
                  }}
                  className="w-full text-left p-3 rounded-2xl border border-hospital-800 bg-hospital-950/60 hover:border-teal-500 hover:bg-teal-950/20 text-slate-200 transition-all"
                >
                  <div className="font-bold text-xs text-white">{top.title}</div>
                  <div className="text-[11px] text-teal-400 mt-0.5">{top.titleEn}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Thuộc chương: {top.chapterTitle}</div>
                </button>
              ))
            ) : (
              activeChapter?.topics.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setSelectedImageIndex(0);
                      handleResetAdjustments();
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-teal-500 bg-teal-950/40 text-teal-200 ring-1 ring-teal-500/50 shadow-md"
                        : "border-hospital-800 bg-hospital-950/50 text-slate-300 hover:border-hospital-700 hover:bg-hospital-850"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs text-white">{topic.title}</div>
                      <span className="shrink-0 rounded-full bg-hospital-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                        {topic.images.length} ảnh
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {topic.titleEn}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Real Image Display & Console (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeTopic && (
            <>
              {/* Medical Description Banner */}
              <div className="rounded-2xl border border-hospital-800 bg-hospital-950/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">
                    {activeTopic.title} ({activeTopic.titleEn})
                  </h3>
                  <span className="text-[11px] font-mono text-teal-400 font-bold">
                    Ảnh {selectedImageIndex + 1} / {currentImages.length}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeTopic.description}
                </p>
              </div>

              {/* Main Image Stage */}
              <div className="relative rounded-3xl border-2 border-hospital-800 bg-black p-3 shadow-inner overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
                {/* Image HUD Overlays */}
                <div className="absolute top-4 left-5 z-10 font-mono text-[11px] text-teal-400/90 pointer-events-none space-y-0.5">
                  <div>FILE: {currentImageFilename}</div>
                  <div>ZOOM: {Math.round(zoom * 100)}%</div>
                </div>

                <div className="absolute top-4 right-5 z-10 font-mono text-[11px] text-teal-400/90 text-right pointer-events-none space-y-0.5">
                  <div>BRIGHTNESS: {brightness}%</div>
                  <div>CONTRAST: {contrast}%</div>
                </div>

                {/* Caliper Measuring Overlay Line */}
                {measurePoints.length > 0 && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <svg className="w-full h-full">
                      {measurePoints.map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r={4}
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth={1.5}
                        />
                      ))}
                      {measurePoints.length === 2 && (
                        <>
                          <line
                            x1={measurePoints[0].x}
                            y1={measurePoints[0].y}
                            x2={measurePoints[1].x}
                            y2={measurePoints[1].y}
                            stroke="#38bdf8"
                            strokeWidth={2}
                            strokeDasharray="4 2"
                          />
                          <text
                            x={(measurePoints[0].x + measurePoints[1].x) / 2}
                            y={(measurePoints[0].y + measurePoints[1].y) / 2 - 8}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="bg-black font-mono"
                          >
                            {(
                              Math.hypot(
                                measurePoints[1].x - measurePoints[0].x,
                                measurePoints[1].y - measurePoints[0].y
                              ) * 0.28
                            ).toFixed(1)}{" "}
                            mm
                          </text>
                        </>
                      )}
                    </svg>
                  </div>
                )}

                {/* Real Clinical Image */}
                {currentImageFilename ? (
                  <div
                    onClick={handleImageClick}
                    className={`relative overflow-hidden select-none flex items-center justify-center max-w-full ${
                      isMeasuring ? "cursor-crosshair" : "cursor-default"
                    }`}
                  >
                    <img
                      ref={imgRef}
                      src={`/ultrasound/viable_images/${currentImageFilename}`}
                      alt={activeTopic.title}
                      className="max-h-[420px] w-auto object-contain rounded-xl transition-transform duration-200"
                      style={{
                        transform: `scale(${zoom})`,
                        filter: `brightness(${brightness}%) contrast(${contrast}%) ${
                          invert ? "invert(1)" : ""
                        }`,
                      }}
                      onError={(e) => {
                        // Fallback image if casing issues
                        const target = e.target as HTMLImageElement;
                        target.src = `/ultrasound/viable_images/${currentImageFilename.toLowerCase()}`;
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-12 flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-slate-600" />
                    <span>Không có hình ảnh cho chủ đề này</span>
                  </div>
                )}

                {/* Prev / Next Image Floating Arrows */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((p) =>
                          p > 0 ? p - 1 : currentImages.length - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-hospital-950/80 text-white hover:bg-teal-600 border border-hospital-700 transition-colors shadow-lg"
                      title="Ảnh trước"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((p) =>
                          p < currentImages.length - 1 ? p + 1 : 0
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-hospital-950/80 text-white hover:bg-teal-600 border border-hospital-700 transition-colors shadow-lg"
                      title="Ảnh tiếp"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Gallery Strip */}
              {currentImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-hospital-950/60 border border-hospital-800 scrollbar-thin">
                  {currentImages.map((img, idx) => (
                    <button
                      key={img + idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? "border-teal-400 ring-2 ring-teal-400/40 scale-105"
                          : "border-hospital-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={`/ultrasound/viable_images/${img}`}
                        alt={`Ảnh ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/ultrasound/viable_images/${img.toLowerCase()}`;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Adjustment Tools Toolbar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-hospital-950/60 p-4 rounded-2xl border border-hospital-800 text-xs">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Zoom:</span>
                  <button
                    onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
                    className="p-1.5 rounded-lg bg-hospital-800 text-slate-300 hover:bg-hospital-700"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono text-teal-400 min-w-[36px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                    className="p-1.5 rounded-lg bg-hospital-800 text-slate-300 hover:bg-hospital-700"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Brightness Slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Độ sáng:</span>
                    <span className="font-mono text-teal-400">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={180}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full h-1.5 bg-hospital-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                {/* Contrast Slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Độ tương phản:</span>
                    <span className="font-mono text-teal-400">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={180}
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full h-1.5 bg-hospital-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                {/* Caliper Toggle & Reset */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsMeasuring(!isMeasuring);
                      if (isMeasuring) setMeasurePoints([]);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition-all ${
                      isMeasuring
                        ? "bg-sky-500/20 border-sky-500/40 text-sky-300 shadow-sm"
                        : "bg-hospital-800 border-hospital-700 text-slate-300 hover:bg-hospital-700"
                    }`}
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>{isMeasuring ? "Đang Đo" : "Caliper"}</span>
                  </button>

                  <button
                    onClick={handleResetAdjustments}
                    className="p-1.5 rounded-xl bg-hospital-800 text-slate-400 hover:text-white border border-hospital-700"
                    title="Khôi phục mặc định"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
