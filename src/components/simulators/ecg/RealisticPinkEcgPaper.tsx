"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  EcgRhythmType,
  calculateLeadEcgVoltage,
  playMonitorBeep,
  ECG_RHYTHM_DEFINITIONS,
} from "@/domain/simulators/ecgWaveforms";
import { computeEcgMetrics, getWaveAnchors } from "@/domain/simulators/ecgMetricsCalculator";
import { COMPREHENSIVE_FALLBACK_ANNOTATIONS } from "@/domain/simulators/ecgAnnotationsData";
import { EcgLeadFocusModal } from "./EcgLeadFocusModal";
import {
  Printer,
  Download,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Heart,
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Activity,
  Siren,
  Smartphone,
  LayoutGrid,
  ZoomIn,
  RotateCw,
} from "lucide-react";

interface RealisticPinkEcgPaperProps {
  rhythm: EcgRhythmType;
  bpm?: number;
  patientName?: string;
  patientAge?: number;
  patientGender?: "Nam" | "Nữ";
  recordId?: string;
  onOpenClinicalDeck?: () => void;
}

interface EcgDiagnosisData {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  severity: "normal" | "borderline" | "abnormal" | "critical";
  criteria: string[];
  leadManifestations: Record<string, string>;
  annotations?: Array<{
    leadId: string;
    waveComponent: string;
    label: string;
    targetCyclePhase: number;
    color?: string;
    badgePlacement?: "top" | "bottom" | "interval" | "above" | "below";
    intervalEndPhase?: number;
    criterionIndex?: number;
  }>;
  ecgMetrics: {
    expected_hr: string;
    pr_interval: string;
    qrs_duration: string;
    qt_interval: string;
    qrs_axis: string;
  };
  clinicalAction: string;
  differentialDiagnoses: string[];
}

const FALLBACK_ANNOTATIONS = COMPREHENSIVE_FALLBACK_ANNOTATIONS;

export const RealisticPinkEcgPaper: React.FC<RealisticPinkEcgPaperProps> = ({
  rhythm,
  bpm = 75,
  patientName = "NGUYỄN VĂN HẢI",
  patientAge = 61,
  patientGender = "Nam",
  recordId = "ECG-2026-9812",
  onOpenClinicalDeck,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenGridRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Motion state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [motionMode, setMotionMode] = useState<"rolling" | "sweep">("rolling");
  const [paperSpeed, setPaperSpeed] = useState<25 | 50>(25);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isHeartBeating, setIsHeartBeating] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Criteria & SQLite Data State
  const [diagnosisData, setDiagnosisData] = useState<EcgDiagnosisData | null>(() => {
    const def = ECG_RHYTHM_DEFINITIONS.find((r) => r.id === rhythm);
    if (!def) return null;
    return {
      id: def.id,
      name: def.name,
      nameEn: def.id,
      category: def.category,
      severity: def.category === "ventricular" || (def.id as string).startsWith("stemi") ? "critical" : "normal",
      criteria: rhythm === "normal_sinus" ? [
        "Sóng P xoang: Đồng dạng đi trước mỗi phức bộ QRS",
        "Sóng P âm ở aVR: Sóng P âm ở aVR, dương ở DI, DII, aVF",
        "Khoảng PR bình thường: Cố định và bình thường từ 0.12s đến 0.20s (3 - 5 ô nhỏ)",
        "Khoảng cách R-R đều: Tần số tim bình thường 60 - 100 chu kỳ/phút",
        "QRS hẹp & ST đẳng điện: QRS < 120ms, đoạn ST đẳng điện và sóng T bình thường",
      ] : [
        `Tần số: ${def.ecgCharacteristics.rate}`,
        `Nhịp điệu: ${def.ecgCharacteristics.rhythm}`,
        `Sóng P: ${def.ecgCharacteristics.pWave}`,
        `Khoảng PR: ${def.ecgCharacteristics.prInterval}`,
        `Phức bộ QRS: ${def.ecgCharacteristics.qrsComplex}`,
        `Đoạn ST & T: ${def.ecgCharacteristics.stSegmentTwave}`,
      ],
      leadManifestations: {},
      annotations: FALLBACK_ANNOTATIONS[rhythm] || [],
      ecgMetrics: {
        expected_hr: def.ecgCharacteristics.rate,
        pr_interval: def.ecgCharacteristics.prInterval,
        qrs_duration: def.ecgCharacteristics.qrsComplex,
        qt_interval: "380 - 420 ms",
        qrs_axis: "Bình thường",
      },
      clinicalAction: def.treatmentSummary,
      differentialDiagnoses: [],
    };
  });
  const [activeCriteriaIndices, setActiveCriteriaIndices] = useState<Set<number>>(new Set());
  const [showCriteriaBlock, setShowCriteriaBlock] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<"portrait" | "a4">("portrait");
  const [focusModalLead, setFocusModalLead] = useState<string | null>(null);
  const [isVirtualLandscape, setIsVirtualLandscape] = useState<boolean>(false);

  const toggleCriterion = useCallback((idx: number) => {
    setActiveCriteriaIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  // Helper function to extract concise criterion title for filter tabs
  const getShortCriterionTitle = (crit: string, idx: number): string => {
    if (!crit) return `Tiêu chuẩn ${idx + 1}`;

    // 1. If criterion has a title before a colon (e.g. "Tiêu chuẩn Sokolow-Lyon: S ở V1...")
    if (crit.includes(":")) {
      const parts = crit.split(":");
      const header = parts[0].trim();
      if (header.length >= 4 && header.length <= 42 && !header.toLowerCase().startsWith("lưu ý")) {
        return header;
      }
    }

    // 2. Remove generic preamble words if present
    let cleaned = crit
      .replace(/^(Hiện tượng|Dấu hiệu|Hình ảnh|Tiêu chuẩn|Tam chứng)\s+/i, "")
      .trim();

    // 3. Cut at first semicolon, or comma if preceding part is meaningful
    const firstSemi = cleaned.indexOf(";");
    if (firstSemi > 8 && firstSemi <= 38) {
      return cleaned.slice(0, firstSemi).trim();
    }

    const firstComma = cleaned.indexOf(",");
    if (firstComma >= 12 && firstComma <= 34) {
      return cleaned.slice(0, firstComma).trim();
    }

    // 4. Cut before parentheses if the text before it is descriptive
    const firstParen = cleaned.indexOf("(");
    if (firstParen >= 10 && firstParen <= 34) {
      return cleaned.slice(0, firstParen).trim();
    }

    // 5. If still too long, truncate cleanly at word boundary
    if (cleaned.length <= 32) {
      return cleaned;
    }

    const words = cleaned.slice(0, 30).split(" ");
    if (words.length > 1) {
      words.pop();
      return words.join(" ") + "...";
    }

    return cleaned.slice(0, 28) + "...";
  };

  // Smart matcher linking an annotation to a criterion index
  const getAnnotationCriterionIndex = (
    ann: NonNullable<EcgDiagnosisData["annotations"]>[number],
    criteria: string[]
  ): number => {
    if (typeof ann.criterionIndex === "number" && ann.criterionIndex >= 0 && ann.criterionIndex < criteria.length) {
      return ann.criterionIndex;
    }
    const labelLower = (ann.label + " " + ann.waveComponent + " " + ann.leadId).toLowerCase();
    for (let i = 0; i < criteria.length; i++) {
      const cLower = criteria[i].toLowerCase();
      if (labelLower.includes("soi gương") && cLower.includes("soi gương")) return i;
      if (labelLower.includes("q hoại tử") && (cLower.includes("sóng q") || cLower.includes("q hoại tử"))) return i;
      if ((labelLower.includes("tombstone") || labelLower.includes("bia mộ")) &&
          (cLower.includes("bia mộ") || cLower.includes("tombstoning"))) return i;
      if (labelLower.includes("delta") && cLower.includes("delta")) return i;
      if (labelLower.includes("coved") && (cLower.includes("coved") || cLower.includes("brugada"))) return i;
      if (labelLower.includes("tai thỏ") && cLower.includes("tai thỏ")) return i;
      if (labelLower.includes("lbbb") && cLower.includes("lbbb")) return i;
      if (labelLower.includes("s1q3t3") && cLower.includes("s1q3t3")) return i;
      if (labelLower.includes("lòng thuyền") && cLower.includes("lòng thuyền")) return i;
      if (labelLower.includes("sóng u") && cLower.includes("sóng u")) return i;
      if (labelLower.includes("đáy chén") && (cLower.includes("đáy chén") || cLower.includes("digoxin"))) return i;
      if (labelLower.includes("sokolow") && cLower.includes("sokolow")) return i;
      if (labelLower.includes("xoay trục") && cLower.includes("xoay")) return i;
      if (labelLower.includes("thoát thất") && cLower.includes("thoát thất")) return i;
      if (labelLower.includes("phân ly") && cLower.includes("phân ly")) return i;
      if (labelLower.includes("răng cưa") && cLower.includes("răng cưa")) return i;
      if (labelLower.includes("sóng f") && (cLower.includes("sóng f") || cLower.includes("lăn tăn"))) return i;
      if (labelLower.includes("pr") && cLower.includes("pr")) return i;
      if (labelLower.includes("sóng p") && cLower.includes("sóng p")) return i;
      if (labelLower.includes("st chênh") && cLower.includes("st chênh")) return i;
    }
    return 0;
  };

  // Refs for 60 FPS animation loop
  const animFrameIdRef = useRef<number | null>(null);
  const timeOffsetRef = useRef<number>(0);
  const sweepProgressRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const hasTriggeredBeepThisCycleRef = useRef<boolean>(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  // Fetch Authoritative Diagnostic Criteria dynamically from SQLite API
  useEffect(() => {
    let isMounted = true;
    setActiveCriteriaIndices(new Set()); // Mặc định không ánh xạ nhãn khi tải bệnh mới
    const def = ECG_RHYTHM_DEFINITIONS.find((r) => r.id === rhythm);
    if (def) {
      setDiagnosisData({
        id: def.id,
        name: def.name,
        nameEn: def.id,
        category: def.category,
        severity: def.category === "ventricular" || (def.id as string).startsWith("stemi") ? "critical" : "normal",
        criteria: rhythm === "normal_sinus" ? [
          "Sóng P xoang: Đồng dạng đi trước mỗi phức bộ QRS",
          "Sóng P âm ở aVR: Sóng P âm ở aVR, dương ở DI, DII, aVF",
          "Khoảng PR bình thường: Cố định và bình thường từ 0.12s đến 0.20s (3 - 5 ô nhỏ)",
          "Khoảng cách R-R đều: Tần số tim bình thường 60 - 100 chu kỳ/phút",
          "QRS hẹp & ST đẳng điện: QRS < 120ms, đoạn ST đẳng điện và sóng T bình thường",
        ] : [
          `Tần số: ${def.ecgCharacteristics.rate}`,
          `Nhịp điệu: ${def.ecgCharacteristics.rhythm}`,
          `Sóng P: ${def.ecgCharacteristics.pWave}`,
          `Khoảng PR: ${def.ecgCharacteristics.prInterval}`,
          `Phức bộ QRS: ${def.ecgCharacteristics.qrsComplex}`,
          `Đoạn ST & T: ${def.ecgCharacteristics.stSegmentTwave}`,
        ],
        leadManifestations: {},
        annotations: FALLBACK_ANNOTATIONS[rhythm] || [],
        ecgMetrics: {
          expected_hr: def.ecgCharacteristics.rate,
          pr_interval: def.ecgCharacteristics.prInterval,
          qrs_duration: def.ecgCharacteristics.qrsComplex,
          qt_interval: "380 - 420 ms",
          qrs_axis: "Bình thường",
        },
        clinicalAction: def.treatmentSummary,
        differentialDiagnoses: [],
      });
    }

    fetch(`/api/simulators/ecg/diagnoses/${rhythm}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && !data.error) {
          setDiagnosisData(data);
        }
      })
      .catch((err) => console.warn("Failed to load SQLite ECG criteria:", err));

    return () => {
      isMounted = false;
    };
  }, [rhythm]);

  const metrics = computeEcgMetrics(rhythm, bpm);
  const cycleDuration = 60 / Math.max(30, metrics.heartRate || 60);

  // Standard A4 Layout: 4 columns x 3 rows
  const a4MatrixLeads = [
    // Row 1
    [
      { id: "DI", name: "I" },
      { id: "aVR", name: "aVR" },
      { id: "V1", name: "V1" },
      { id: "V4", name: "V4" },
    ],
    // Row 2
    [
      { id: "DII", name: "II" },
      { id: "aVL", name: "aVL" },
      { id: "V2", name: "V2" },
      { id: "V5", name: "V5" },
    ],
    // Row 3
    [
      { id: "DIII", name: "III" },
      { id: "aVF", name: "aVF" },
      { id: "V3", name: "V3" },
      { id: "V6", name: "V6" },
    ],
  ];

  // Mobile Portrait Layout: 2 columns x 6 rows (no horizontal scrolling required)
  const portraitMatrixLeads = [
    // Row 1
    [{ id: "DI", name: "I" }, { id: "V1", name: "V1" }],
    // Row 2
    [{ id: "DII", name: "II" }, { id: "V2", name: "V2" }],
    // Row 3
    [{ id: "DIII", name: "III" }, { id: "V3", name: "V3" }],
    // Row 4
    [{ id: "aVR", name: "aVR" }, { id: "V4", name: "V4" }],
    // Row 5
    [{ id: "aVL", name: "aVL" }, { id: "V5", name: "V5" }],
    // Row 6
    [{ id: "aVF", name: "aVF" }, { id: "V6", name: "V6" }],
  ];

  const isPortraitMode = displayMode === "portrait";
  const matrixLeads = isPortraitMode ? portraitMatrixLeads : a4MatrixLeads;

  // Canvas dimensions: Dynamic based on layout mode
  const W = isPortraitMode ? 600 : 1200;
  const H = isPortraitMode ? 680 : 460;

  // Pre-render static pink millimeter grid onto Offscreen Canvas
  useEffect(() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#fff5f5";
    ctx.fillRect(0, 0, W, H);

    // Minor Grid Lines (1mm squares: 6px spacing)
    const mmSpacing = 6;
    ctx.strokeStyle = "rgba(244, 63, 94, 0.22)";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (let x = 0; x <= W; x += mmSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = 0; y <= H; y += mmSpacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();

    // Major Grid Lines (5mm squares: 30px spacing)
    ctx.strokeStyle = "rgba(225, 29, 72, 0.45)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    for (let x = 0; x <= W; x += mmSpacing * 5) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = 0; y <= H; y += mmSpacing * 5) {
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();

    // Outer Border
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 1.8;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    offscreenGridRef.current = offscreen;
  }, [W, H]);

  // Main 60 FPS Render & Motion Loop with Authentic Lead Waveforms
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    const rowH = isPortraitMode ? 85 : 100;
    const colCount = isPortraitMode ? 2 : 4;
    const colW = (W - 36) / colCount;
    const marginLeft = 20;
    const pixelsPerMm = 6;
    const pixelsPerSecond = paperSpeed * pixelsPerMm; // 25mm/s -> 150px/s; 50mm/s -> 300px/s
    const voltageScale = isPortraitMode ? 23 : 26; // Adjusted voltage scale for portrait height
    const rhythmMidY = isPortraitMode ? 600 : 385;

    const renderFrame = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      if (isPlaying) {
        timeOffsetRef.current += dt * (paperSpeed / 25);
        sweepProgressRef.current = (sweepProgressRef.current + (dt * pixelsPerSecond) / colW) % 1.0;

        const currentPhase = (timeOffsetRef.current % cycleDuration) / cycleDuration;
        if (currentPhase >= 0.20 && currentPhase <= 0.32) {
          if (!hasTriggeredBeepThisCycleRef.current) {
            hasTriggeredBeepThisCycleRef.current = true;
            setIsHeartBeating(true);
            setTimeout(() => setIsHeartBeating(false), 130);
            if (audioEnabled) {
              playMonitorBeep(0.3, 840);
            }
          }
        } else {
          hasTriggeredBeepThisCycleRef.current = false;
        }
      }

      // 1. Draw cached pink millimeter grid
      if (offscreenGridRef.current) {
        ctx.drawImage(offscreenGridRef.current, 0, 0);
      } else {
        ctx.fillStyle = "#fff5f5";
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Wave pen styling
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.35;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Helper function to render mapped diagnostic criteria annotations directly onto waveforms
      // with Advanced Anti-Collision Layout & Individual Criteria Isolation
      const drawWaveAnnotations = (
        leadId: string,
        leadName: string,
        traceStart: number,
        leadEndX: number,
        midY: number,
        isRhythmStrip: boolean = false
      ) => {
        // MẶC ĐỊNH KHÔNG ÁNH XẠ: Nếu bác sĩ chưa click chọn tiêu chuẩn nào, trả về ngay (sóng sạch sẽ 100%)
        if (
          activeCriteriaIndices.size === 0 ||
          !diagnosisData?.annotations ||
          diagnosisData.annotations.length === 0
        ) {
          return;
        }

        // 1. Filter annotations for this lead
        let annotations = diagnosisData.annotations.filter((a) => {
          const tid = a.leadId.toUpperCase();
          if (isRhythmStrip) {
            return tid === "DII" || tid === "II" || tid === "RHYTHM" || tid === "RHYTHM_STRIP";
          }
          return tid === leadId.toUpperCase() || tid === leadName.toUpperCase();
        });

        // 2. Chỉ lọc lấy các nhãn thuộc những tiêu chuẩn đang được kích hoạt (click bật [✓])
        annotations = annotations.filter((a) => {
          const critIdx = getAnnotationCriterionIndex(a, diagnosisData.criteria);
          return critIdx !== -1 && activeCriteriaIndices.has(critIdx);
        });

        if (annotations.length === 0) return;

        const leadLen = leadEndX - traceStart;
        const tMin = motionMode === "rolling" ? timeOffsetRef.current : Math.floor(timeOffsetRef.current);
        const leadDuration = leadLen / pixelsPerSecond;
        const tCenter = tMin + leadDuration * 0.5;

        interface RenderItem {
          ann: NonNullable<EcgDiagnosisData["annotations"]>[number];
          targetTime: number;
          targetX: number;
          targetY: number;
          pillW: number;
          pillH: number;
          isTop: boolean;
          level: number;
          isInterval: boolean;
          x1?: number;
          x2?: number;
          y1?: number;
          y2?: number;
          isVerticalDimension?: boolean;
          displayText: string;
        }

        const itemsToRender: RenderItem[] = [];
        const renderedLabels = new Set<string>();

        // Generate candidate heartbeat cycles:
        // Prioritize the heartbeat closest to tCenter so badges sit centered on the lead / rhythm strip
        const focalCycle = Math.round(tCenter / cycleDuration);
        const candidateCycles: number[] = [];

        if (isRhythmStrip) {
          const startCycle = Math.floor(tMin / cycleDuration);
          const endCycle = Math.ceil((tMin + leadDuration) / cycleDuration);
          for (let k = startCycle; k <= endCycle; k++) {
            candidateCycles.push(k);
          }
        } else {
          candidateCycles.push(focalCycle, focalCycle - 1, focalCycle + 1, focalCycle - 2, focalCycle + 2);
        }

        // Sort candidate cycles by proximity to tCenter (most centered cycle gets first placement)
        candidateCycles.sort((a, b) => {
          const distA = Math.abs((a + 0.5) * cycleDuration - tCenter);
          const distB = Math.abs((b + 0.5) * cycleDuration - tCenter);
          return distA - distB;
        });

        const anchors = getWaveAnchors(rhythm, metrics);

        for (const k of candidateCycles) {
          if (renderedLabels.size >= annotations.length) break;

          const tCycleStart = k * cycleDuration;

          for (const ann of annotations) {
            if (renderedLabels.has(ann.label)) continue;
            const calcLead = isRhythmStrip ? "DII" : leadId;

            // 1. HORIZONTAL INTERVAL CALIPERS (RR, PR, QT)
            if (
              ann.badgePlacement === "interval" ||
              ann.waveComponent === "RR" ||
              ann.waveComponent === "PR" ||
              ann.waveComponent === "QT"
            ) {
              if (ann.waveComponent === "RR") {
                const t1 = tCycleStart + anchors.rPeak;
                const t2 = tCycleStart + cycleDuration + anchors.rPeak;
                const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
                const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;

                if (x2 >= traceStart + 10 && x1 <= leadEndX - 10) {
                  const v1 = calculateLeadEcgVoltage(t1, calcLead, rhythm, bpm);
                  const v2 = calculateLeadEcgVoltage(t2, calcLead, rhythm, bpm);
                  const y1 = midY - v1 * voltageScale;
                  const y2 = midY - v2 * voltageScale;
                  const deltaMs = Math.round(((x2 - x1) / pixelsPerSecond) * 1000);
                  const boxes = (deltaMs / 200).toFixed(1);
                  let calY = Math.min(y1, y2) - (isRhythmStrip ? 14 : 16);
                  if (calY < midY - (isPortraitMode ? 36 : 46)) calY = midY - (isPortraitMode ? 36 : 46);

                  let labelText = isRhythmStrip
                    ? `|<── R-R = ${deltaMs}ms (${boxes} ô lớn) • ${bpm} bpm • Tiêu chuẩn: Đều 60 - 100 chu kỳ/phút ──>|`
                    : `|<── R-R = ${deltaMs}ms (${boxes} ô) • ${bpm} bpm • Chuẩn: 60-100 ──>|`;
                  if (rhythm === "atrial_fibrillation") {
                    labelText = isRhythmStrip
                      ? `|<── R-R = ${deltaMs}ms (${boxes} ô) [Không đều] • Tiêu chuẩn: Loạn nhịp hoàn toàn ──>|`
                      : `|<── R-R = ${deltaMs}ms [Không đều] • Chuẩn: Loạn nhịp ──>|`;
                  } else if (bpm > 100) {
                    labelText = isRhythmStrip
                      ? `|<── R-R = ${deltaMs}ms (${boxes} ô lớn) • ${bpm} bpm • Tiêu chuẩn: Nhịp nhanh > 100 bpm ──>|`
                      : `|<── R-R = ${deltaMs}ms • ${bpm} bpm • Chuẩn: >100 ──>|`;
                  } else if (bpm < 60) {
                    labelText = isRhythmStrip
                      ? `|<── R-R = ${deltaMs}ms (${boxes} ô lớn) • ${bpm} bpm • Tiêu chuẩn: Nhịp chậm < 60 bpm ──>|`
                      : `|<── R-R = ${deltaMs}ms • ${bpm} bpm • Chuẩn: <60 ──>|`;
                  }

                  ctx.font = "bold 8px monospace";
                  let tw = ctx.measureText(labelText).width;
                  if (tw + 12 > leadLen) {
                    labelText = `|<── R-R = ${deltaMs}ms • ${bpm} bpm ──>|`;
                    tw = ctx.measureText(labelText).width;
                  }

                  itemsToRender.push({
                    ann,
                    targetTime: t1,
                    targetX: (x1 + x2) / 2,
                    targetY: calY,
                    pillW: tw + 8,
                    pillH: 14,
                    isTop: true,
                    level: 0,
                    isInterval: true,
                    x1,
                    x2,
                    y1,
                    y2,
                    displayText: labelText,
                  });
                  renderedLabels.add(ann.label);
                }
              } else if (ann.waveComponent === "PR") {
                const t1 = tCycleStart + anchors.pOnset;
                const t2 = tCycleStart + anchors.qrsOnset;
                const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
                const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;

                if (x2 >= traceStart + 10 && x1 <= leadEndX - 10) {
                  const v1 = calculateLeadEcgVoltage(t1, calcLead, rhythm, bpm);
                  const v2 = calculateLeadEcgVoltage(t2, calcLead, rhythm, bpm);
                  const y1 = midY - v1 * voltageScale;
                  const y2 = midY - v2 * voltageScale;
                  const deltaMs = metrics?.prIntervalMs || Math.round(((x2 - x1) / pixelsPerSecond) * 1000);
                  const smallBoxes = (deltaMs / 40).toFixed(1);

                  let critContext = "Chuẩn: 0.12-0.20s";
                  if (deltaMs > 200) critContext = "Chuẩn: >0.20s Kéo dài";
                  else if (deltaMs < 120) critContext = "Chuẩn: <0.12s Ngắn";

                  let labelText = isRhythmStrip
                    ? `|<── PR = ${deltaMs}ms (${smallBoxes} ô nhỏ) • Tiêu chuẩn: ${deltaMs > 200 ? "Kéo dài > 0.20s (> 200ms)" : deltaMs < 120 ? "Ngắn < 0.12s (< 120ms)" : "Cố định 0.12s - 0.20s"} ──>|`
                    : `|<── PR = ${deltaMs}ms (${smallBoxes} ô) • ${critContext} ──>|`;

                  ctx.font = "bold 8px monospace";
                  let tw = ctx.measureText(labelText).width;
                  if (tw + 12 > leadLen) {
                    labelText = `|<── PR = ${deltaMs}ms • ${critContext} ──>|`;
                    tw = ctx.measureText(labelText).width;
                  }

                  const calY = midY + (isRhythmStrip ? 22 : 25);
                  itemsToRender.push({
                    ann,
                    targetTime: t1,
                    targetX: (x1 + x2) / 2,
                    targetY: calY,
                    pillW: tw + 8,
                    pillH: 14,
                    isTop: false,
                    level: 0,
                    isInterval: true,
                    x1,
                    x2,
                    y1,
                    y2,
                    displayText: labelText,
                  });
                  renderedLabels.add(ann.label);
                }
              } else if (ann.waveComponent === "QT") {
                const qtSec = (metrics?.qtIntervalMs || 384) / 1000;
                const t1 = tCycleStart + anchors.qrsOnset;
                const t2 = t1 + qtSec;
                const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
                const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;

                if (x2 >= traceStart + 10 && x1 <= leadEndX - 10) {
                  const v1 = calculateLeadEcgVoltage(t1, calcLead, rhythm, bpm);
                  const v2 = calculateLeadEcgVoltage(t2, calcLead, rhythm, bpm);
                  const y1 = midY - v1 * voltageScale;
                  const y2 = midY - v2 * voltageScale;
                  const deltaMs = metrics?.qtIntervalMs || Math.round(((x2 - x1) / pixelsPerSecond) * 1000);
                  const qtcMs = metrics?.qtcIntervalMs || 429;

                  let labelText = isRhythmStrip
                    ? `|<── QT = ${deltaMs}ms (QTc = ${qtcMs}ms) • Tiêu chuẩn: ${qtcMs > 480 ? "QT kéo dài (> 480ms)" : "Bình thường"} ──>|`
                    : `|<── QT = ${deltaMs}ms (QTc = ${qtcMs}ms) • ${qtcMs > 480 ? "Kéo dài" : "Bình thường"} ──>|`;
                  if (ann.label.includes("QU")) {
                    labelText = isRhythmStrip
                      ? `|<── QU = ${deltaMs}ms (Kéo dài) • Tiêu chuẩn: Sóng U nổi bật ──>|`
                      : `|<── QU = ${deltaMs}ms • Sóng U nổi bật ──>|`;
                  }

                  ctx.font = "bold 8px monospace";
                  let tw = ctx.measureText(labelText).width;
                  if (tw + 12 > leadLen) {
                    labelText = `|<── QT = ${deltaMs}ms (QTc = ${qtcMs}ms) ──>|`;
                    tw = ctx.measureText(labelText).width;
                  }

                  const calY = midY + (isRhythmStrip ? 24 : 27);
                  itemsToRender.push({
                    ann,
                    targetTime: t1,
                    targetX: (x1 + x2) / 2,
                    targetY: calY,
                    pillW: tw + 8,
                    pillH: 14,
                    isTop: false,
                    level: 0,
                    isInterval: true,
                    x1,
                    x2,
                    y1,
                    y2,
                    displayText: labelText,
                  });
                  renderedLabels.add(ann.label);
                }
              } else if (typeof ann.intervalEndPhase === "number") {
                const t1 = tCycleStart + ann.targetCyclePhase * cycleDuration;
                const t2 = tCycleStart + ann.intervalEndPhase * cycleDuration;
                const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
                const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;

                if (x2 >= traceStart + 10 && x1 <= leadEndX - 10) {
                  ctx.font = "bold 8px monospace";
                  const tw = ctx.measureText(ann.label).width;
                  itemsToRender.push({
                    ann,
                    targetTime: t1,
                    targetX: (x1 + x2) / 2,
                    targetY: midY + (isRhythmStrip ? 24 : 27),
                    pillW: tw + 8,
                    pillH: 14,
                    isTop: false,
                    level: 0,
                    isInterval: true,
                    x1,
                    x2,
                    displayText: ann.label,
                  });
                  renderedLabels.add(ann.label);
                }
              }
            }
            // 2. VERTICAL AMPLITUDE DIMENSIONS (ST, T, S, R)
            else if (
              ann.waveComponent === "ST" ||
              ann.waveComponent === "T" ||
              ann.waveComponent === "S" ||
              ann.waveComponent === "R"
            ) {
              let targetTime = tCycleStart + ann.targetCyclePhase * cycleDuration;
              if (ann.waveComponent === "ST") {
                targetTime = tCycleStart + anchors.stMid;
              } else if (ann.waveComponent === "T") {
                targetTime = tCycleStart + anchors.tPeak;
              } else if (ann.waveComponent === "S") {
                targetTime = tCycleStart + anchors.sPeak;
              } else if (ann.waveComponent === "R") {
                targetTime = tCycleStart + anchors.rPeak;
              }

              const targetX = traceStart + (targetTime - tMin) * pixelsPerSecond;

              if (targetX >= traceStart + 16 && targetX <= leadEndX - 16) {
                const waveV = calculateLeadEcgVoltage(targetTime, calcLead, rhythm, bpm);
                const targetY = midY - waveV * voltageScale;
                const mm = waveV * 10;

                let labelText = ann.label;
                if (ann.waveComponent === "ST") {
                  const prefix = waveV >= 0 ? "▲ ST +" : "▼ ST ";
                  if (ann.label.includes("soi gương")) {
                    labelText = isRhythmStrip
                      ? `${prefix}${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Tiêu chuẩn: ST soi gương thành dưới`
                      : `${prefix}${Math.abs(mm).toFixed(1)}mm • Soi gương`;
                  } else if (ann.label.includes("vòm") || ann.label.includes("Vòm") || ann.label.includes("bia mộ")) {
                    labelText = isRhythmStrip
                      ? `${prefix}${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Tiêu chuẩn: ST chênh vòm ≥ 1mm`
                      : `${prefix}${Math.abs(mm).toFixed(1)}mm • ST vòm ≥1mm`;
                  } else if (ann.label.includes("lõm") || ann.label.includes("thuyền")) {
                    labelText = isRhythmStrip
                      ? `${prefix}${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Tiêu chuẩn: Cong lõm lan tỏa`
                      : `${prefix}${Math.abs(mm).toFixed(1)}mm • Cong lõm`;
                  } else if (ann.label.includes("đáy chén") || ann.label.includes("Dali")) {
                    labelText = isRhythmStrip
                      ? `${prefix}${Math.abs(mm).toFixed(1)}mm • Tiêu chuẩn: ST lõm đáy chén Salvador Dali`
                      : `${prefix}${Math.abs(mm).toFixed(1)}mm • Lõm đáy chén`;
                  } else {
                    labelText = `${prefix}${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Chuẩn: ST`;
                  }
                } else if (ann.waveComponent === "T") {
                  if (ann.label.includes("lều") || ann.label.includes("nhọn")) {
                    labelText = isRhythmStrip
                      ? `▲ Sóng T = +${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Tiêu chuẩn: T lều cao nhọn đối xứng > 10mm (Tăng K+)`
                      : `▲ T = +${Math.abs(mm).toFixed(1)}mm • T lều >10mm`;
                  } else if (ann.label.includes("âm") || waveV < 0) {
                    labelText = isRhythmStrip
                      ? `▼ Sóng T âm = -${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Tiêu chuẩn: T âm sâu thiếu máu`
                      : `▼ T = -${Math.abs(mm).toFixed(1)}mm • T âm sâu`;
                  } else {
                    labelText = `↕ T = ${Math.abs(mm).toFixed(1)}mm (${waveV.toFixed(2)}mV) • Chuẩn: T bình thường`;
                  }
                } else if (ann.waveComponent === "S") {
                  labelText = isRhythmStrip
                    ? `▼ S = -${Math.abs(mm).toFixed(1)}mm (${Math.abs(waveV).toFixed(2)}mV) • Tiêu chuẩn: Sokolow-Lyon (SV1 + RV5/V6 > 35mm)`
                    : `▼ S = -${Math.abs(mm).toFixed(1)}mm • Chuẩn: Sokolow-Lyon`;
                } else if (ann.waveComponent === "R") {
                  if (ann.label.includes("Delta")) {
                    labelText = isRhythmStrip
                      ? `▲ Sóng Delta (+${Math.abs(mm).toFixed(1)}mm) • Tiêu chuẩn: Dốc thoai thoải kích thích sớm WPW`
                      : `▲ Delta (+${Math.abs(mm).toFixed(1)}mm) • WPW`;
                  } else {
                    labelText = isRhythmStrip
                      ? `▲ R = +${Math.abs(mm).toFixed(1)}mm (${Math.abs(waveV).toFixed(2)}mV) • Tiêu chuẩn: Sokolow-Lyon (SV1 + RV5/V6 > 35mm)`
                      : `▲ R = +${Math.abs(mm).toFixed(1)}mm • Chuẩn: Sokolow-Lyon`;
                  }
                }

                ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
                let tw = ctx.measureText(labelText).width;
                if (tw + 12 > leadLen) {
                  labelText = ann.label;
                  tw = ctx.measureText(labelText).width;
                }

                let isTop = ann.badgePlacement !== "bottom";
                if (ann.waveComponent === "S" || waveV < -0.10) {
                  isTop = false;
                } else if (ann.waveComponent === "ST" && waveV > 0.10) {
                  isTop = true;
                }

                itemsToRender.push({
                  ann,
                  targetTime,
                  targetX,
                  targetY,
                  pillW: tw + 8,
                  pillH: 14,
                  isTop,
                  level: 0,
                  isInterval: false,
                  isVerticalDimension: true,
                  displayText: labelText,
                });
                renderedLabels.add(ann.label);
              }
            }
            // 3. OTHER GENERAL WAVE COMPONENTS (P, Q, QRS, U, DROPPED)
            else {
              let targetTime = tCycleStart + ann.targetCyclePhase * cycleDuration;
              if (ann.waveComponent === "P") {
                targetTime = tCycleStart + anchors.pPeak;
              } else if (ann.waveComponent === "Q") {
                targetTime = tCycleStart + anchors.qrsOnset + 0.015;
              } else if (ann.waveComponent === "QRS") {
                targetTime = tCycleStart + anchors.rPeak;
              }

              const targetX = traceStart + (targetTime - tMin) * pixelsPerSecond;

              if (targetX >= traceStart + 16 && targetX <= leadEndX - 16) {
                const waveV = calculateLeadEcgVoltage(targetTime, calcLead, rhythm, bpm);
                const targetY = midY - waveV * voltageScale;

                let displayText = ann.label;
                if (ann.waveComponent === "P") {
                  if (ann.leadId.toUpperCase() === "AVR") {
                    displayText = isRhythmStrip
                      ? `▼ Sóng P âm ở aVR (-0.12 mV) • Tiêu chuẩn: P luôn luôn âm ở aVR`
                      : `▼ P âm ở aVR • Chuẩn: P luôn âm`;
                  } else if (["DI", "DII", "AVF", "II"].includes(ann.leadId.toUpperCase())) {
                    if (ann.criterionIndex === 0) {
                      displayText = isRhythmStrip
                        ? `Sóng P xoang đồng dạng, luôn đi trước mỗi phức bộ QRS`
                        : `P xoang đồng dạng, trước QRS`;
                    } else {
                      displayText = isRhythmStrip
                        ? `▲ Sóng P dương ở ${ann.leadId} (+${Math.abs(waveV * 10).toFixed(1)}mm) • Tiêu chuẩn: P xoang dương DI, DII, aVF`
                        : `▲ P dương ở ${ann.leadId} • Chuẩn: P dương`;
                    }
                  }
                }

                ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
                let tw = ctx.measureText(displayText).width;
                if (tw + 12 > leadLen) {
                  displayText = ann.label;
                  tw = ctx.measureText(displayText).width;
                }

                let isTop = ann.badgePlacement !== "bottom";
                if (ann.waveComponent === "Q" || waveV < -0.12) {
                  isTop = false;
                }

                itemsToRender.push({
                  ann,
                  targetTime,
                  targetX,
                  targetY,
                  pillW: tw + 8,
                  pillH: 14,
                  isTop,
                  level: 0,
                  isInterval: false,
                  displayText,
                });
                renderedLabels.add(ann.label);
              }
            }
          }
        }

        if (itemsToRender.length === 0) return;

        // Anti-Collision 2: Resolve overlapping badges on the same heartbeat
        itemsToRender.sort((a, b) => a.targetX - b.targetX);

        for (let i = 0; i < itemsToRender.length; i++) {
          for (let j = i + 1; j < itemsToRender.length; j++) {
            const itemA = itemsToRender[i];
            const itemB = itemsToRender[j];
            if (itemA.isInterval || itemB.isInterval) continue;

            const dist = Math.abs(itemA.targetX - itemB.targetX);
            const minAllowedDist = (itemA.pillW + itemB.pillW) / 2 + 6;

            if (dist < minAllowedDist) {
              if (itemA.isTop === itemB.isTop) {
                if (itemA.ann.waveComponent === "Q" || itemA.targetY > midY) {
                  itemA.isTop = false;
                  itemB.isTop = true;
                } else if (itemB.ann.waveComponent === "Q" || itemB.targetY > midY) {
                  itemA.isTop = true;
                  itemB.isTop = false;
                } else {
                  itemB.level = itemA.level + 1;
                }
              }
            }
          }
        }

        // Render each resolved item
        for (const item of itemsToRender) {
          if (item.isInterval && item.x1 !== undefined && item.x2 !== undefined) {
            ctx.save();
            const col = item.ann.color || "#d97706";
            ctx.strokeStyle = col;
            ctx.fillStyle = col;
            ctx.lineWidth = 1.3;

            const calY = item.targetY;
            const drawX1 = Math.max(item.x1, traceStart + 4);
            const drawX2 = Math.min(item.x2, leadEndX - 4);

            // Vertical guide lines connecting directly to wave onsets or R peaks
            if (typeof item.y1 === "number") {
              ctx.beginPath();
              ctx.setLineDash([2, 2]);
              ctx.strokeStyle = col;
              ctx.moveTo(item.x1, item.y1);
              ctx.lineTo(item.x1, calY);
              ctx.stroke();
              ctx.setLineDash([]);
            }
            if (typeof item.y2 === "number") {
              ctx.beginPath();
              ctx.setLineDash([2, 2]);
              ctx.strokeStyle = col;
              ctx.moveTo(item.x2, item.y2);
              ctx.lineTo(item.x2, calY);
              ctx.stroke();
              ctx.setLineDash([]);
            }

            // Horizontal Caliper Bar
            ctx.beginPath();
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.4;
            ctx.moveTo(drawX1, calY);
            ctx.lineTo(drawX2, calY);
            ctx.stroke();

            // Caliper End Ticks
            if (item.x1 >= traceStart + 4 && item.x1 <= leadEndX - 4) {
              ctx.beginPath();
              ctx.moveTo(item.x1, calY - 5);
              ctx.lineTo(item.x1, calY + 5);
              ctx.stroke();
            }
            if (item.x2 >= traceStart + 4 && item.x2 <= leadEndX - 4) {
              ctx.beginPath();
              ctx.moveTo(item.x2, calY - 5);
              ctx.lineTo(item.x2, calY + 5);
              ctx.stroke();
            }

            // Clinical Dimension Pill
            const midX = (drawX1 + drawX2) / 2;
            const pillX = Math.max(traceStart + 2, Math.min(leadEndX - item.pillW - 2, midX - item.pillW / 2));
            const pillY = calY - 7;

            ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(pillX, pillY, item.pillW, item.pillH, 3);
            else ctx.rect(pillX, pillY, item.pillW, item.pillH);
            ctx.fill();

            ctx.strokeStyle = col;
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 8px monospace";
            ctx.fillText(item.displayText, pillX + 4, pillY + 10);
            ctx.restore();
          } else if (item.isVerticalDimension) {
            ctx.save();
            const col = item.ann.color || "#e11d48";

            // 1. Isoelectric baseline (0 mV)
            ctx.beginPath();
            ctx.setLineDash([3, 2]);
            ctx.strokeStyle = "rgba(100, 116, 139, 0.75)";
            ctx.lineWidth = 1;
            ctx.moveTo(item.targetX - 16, midY);
            ctx.lineTo(item.targetX + 16, midY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = "bold 7px monospace";
            ctx.fillStyle = "rgba(100, 116, 139, 0.9)";
            ctx.fillText("0mV", item.targetX + 18, midY + 2.5);

            // 2. Vertical dimension caliper line from baseline to target point
            ctx.beginPath();
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.4;
            ctx.moveTo(item.targetX, midY);
            ctx.lineTo(item.targetX, item.targetY);
            ctx.stroke();

            // End caps
            ctx.beginPath();
            ctx.moveTo(item.targetX - 3.5, midY);
            ctx.lineTo(item.targetX + 3.5, midY);
            ctx.moveTo(item.targetX - 3.5, item.targetY);
            ctx.lineTo(item.targetX + 3.5, item.targetY);
            ctx.stroke();

            // 3. Target Pinpoint Dot
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 4, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 2.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 0.9, 0, Math.PI * 2);
            ctx.fill();

            // 4. Staggered Leader Guide Line & Label Pill
            const leaderLen = 13 + item.level * 14;
            const leaderEndY = item.isTop
              ? Math.max(item.targetY - leaderLen, midY - 42)
              : Math.min(item.targetY + leaderLen, midY + 42);

            ctx.beginPath();
            ctx.setLineDash([2, 1.5]);
            ctx.moveTo(item.targetX, item.targetY + (item.isTop ? -4 : 4));
            ctx.lineTo(item.targetX, leaderEndY);
            ctx.stroke();
            ctx.setLineDash([]);

            const pillX = Math.max(traceStart + 2, Math.min(leadEndX - item.pillW - 2, item.targetX - item.pillW / 2));
            const pillY = item.isTop ? leaderEndY - item.pillH : leaderEndY;

            ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(pillX, pillY, item.pillW, item.pillH, 3);
            else ctx.rect(pillX, pillY, item.pillW, item.pillH);
            ctx.fill();

            ctx.strokeStyle = col;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            ctx.fillText(item.displayText, pillX + 4, pillY + 10);
            ctx.restore();
          } else {
            // Standard pinpoint dot + leader line + badge
            ctx.save();
            const col = item.ann.color || "#e11d48";

            // 1. Target Pinpoint Dot directly on wave
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 4, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 2.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(item.targetX, item.targetY, 0.9, 0, Math.PI * 2);
            ctx.fill();

            // 2. Staggered Leader Guide Line
            const leaderLen = 13 + item.level * 14;
            const leaderEndY = item.isTop
              ? Math.max(item.targetY - leaderLen, midY - 42)
              : Math.min(item.targetY + leaderLen, midY + 42);

            ctx.beginPath();
            ctx.setLineDash([2, 1.5]);
            ctx.moveTo(item.targetX, item.targetY + (item.isTop ? -4 : 4));
            ctx.lineTo(item.targetX, leaderEndY);
            ctx.stroke();
            ctx.setLineDash([]);

            // 3. Clinical Label Pill
            const pillX = Math.max(traceStart + 2, Math.min(leadEndX - item.pillW - 2, item.targetX - item.pillW / 2));
            const pillY = item.isTop ? leaderEndY - item.pillH : leaderEndY;

            ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(pillX, pillY, item.pillW, item.pillH, 3);
            else ctx.rect(pillX, pillY, item.pillW, item.pillH);
            ctx.fill();

            ctx.strokeStyle = col;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            ctx.fillText(item.displayText, pillX + 4, pillY + 10);
            ctx.restore();
          }
        }
      };

      // 3. Render 12 leads using calculateLeadEcgVoltage
      matrixLeads.forEach((row, rIdx) => {
        const midY = (isPortraitMode ? 46 : 65) + rIdx * rowH;

        row.forEach((lead, cIdx) => {
          const leadStartX = marginLeft + cIdx * colW;
          const leadEndX = leadStartX + colW - 8;
          const traceStart = cIdx === 0 ? leadStartX + 26 : leadStartX + 4;
          const leadLen = leadEndX - traceStart;

          // Lead Label
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 12px 'Courier New', monospace";
          ctx.fillText(lead.name, leadStartX + 2, midY - 34);

          // 1mV Calibration step at beginning of column 0
          if (cIdx === 0) {
            ctx.beginPath();
            ctx.moveTo(leadStartX, midY);
            ctx.lineTo(leadStartX + 5, midY);
            ctx.lineTo(leadStartX + 5, midY - 24); // 1mV step pulse
            ctx.lineTo(leadStartX + 18, midY - 24);
            ctx.lineTo(leadStartX + 18, midY);
            ctx.lineTo(leadStartX + 24, midY);
            ctx.stroke();
          }

          if (motionMode === "rolling") {
            ctx.beginPath();
            let isFirst = true;
            for (let x = traceStart; x <= leadEndX; x += 1.5) {
              const relativeTime = (x - traceStart) / pixelsPerSecond + timeOffsetRef.current;
              // Call calculateLeadEcgVoltage to generate authentic lead waveform
              const v = calculateLeadEcgVoltage(relativeTime, lead.id, rhythm, bpm);
              const y = midY - v * voltageScale;

              if (isFirst) {
                ctx.moveTo(x, y);
                isFirst = false;
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
          } else {
            // Sweep Stylus Mode
            const sweepCursorX = traceStart + sweepProgressRef.current * leadLen;
            const eraseGap = 16;

            ctx.beginPath();
            let isFirst = true;
            for (let x = traceStart; x <= leadEndX; x += 1.5) {
              if (x > sweepCursorX && x < sweepCursorX + eraseGap) continue;

              const relativeTime = (x - traceStart) / pixelsPerSecond + Math.floor(timeOffsetRef.current);
              const v = calculateLeadEcgVoltage(relativeTime, lead.id, rhythm, bpm);
              const y = midY - v * voltageScale;

              if (isFirst || x === Math.ceil(sweepCursorX + eraseGap)) {
                ctx.moveTo(x, y);
                isFirst = false;
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();

            // Stylus tip
            const cursorTime = (sweepCursorX - traceStart) / pixelsPerSecond + Math.floor(timeOffsetRef.current);
            const cursorV = calculateLeadEcgVoltage(cursorTime, lead.id, rhythm, bpm);
            const cursorY = midY - cursorV * voltageScale;

            ctx.fillStyle = "#e11d48";
            ctx.beginPath();
            ctx.arc(sweepCursorX, cursorY, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(225, 29, 72, 0.22)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sweepCursorX, midY - 34);
            ctx.lineTo(sweepCursorX, midY + 34);
            ctx.stroke();
            ctx.strokeStyle = "#09090b";
            ctx.lineWidth = 1.35;
          }

          // Column separator tick
          if (cIdx < 3) {
            ctx.strokeStyle = "rgba(225, 29, 72, 0.45)";
            ctx.beginPath();
            ctx.moveTo(leadEndX + 4, midY - 34);
            ctx.lineTo(leadEndX + 4, midY + 34);
            ctx.stroke();
            ctx.strokeStyle = "#09090b";
          }

          // Render mapped criteria annotations for this lead
          drawWaveAnnotations(lead.id, lead.name, traceStart, leadEndX, midY, false);
        });
      });

      // 4. Render Bottom Rhythm Strip (Lead II)
      const rhythmMidY = isPortraitMode ? 605 : 385;
      const rhythmStartX = marginLeft + 28;
      const rhythmEndX = W - marginLeft;
      const rhythmLen = rhythmEndX - rhythmStartX;

      // Rhythm label
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 12px 'Courier New', monospace";
      ctx.fillText(
        `II (Dải Nhịp Chuẩn Lead II • ${paperSpeed} mm/s, 10 mm/mV)`,
        marginLeft + 2,
        rhythmMidY - 36
      );

      // Calibration pulse
      ctx.beginPath();
      ctx.moveTo(marginLeft, rhythmMidY);
      ctx.lineTo(marginLeft + 5, rhythmMidY);
      ctx.lineTo(marginLeft + 5, rhythmMidY - 24);
      ctx.lineTo(marginLeft + 18, rhythmMidY - 24);
      ctx.lineTo(marginLeft + 18, rhythmMidY);
      ctx.lineTo(marginLeft + 26, rhythmMidY);
      ctx.stroke();

      if (motionMode === "rolling") {
        ctx.beginPath();
        let isFirst = true;
        for (let x = rhythmStartX; x <= rhythmEndX; x += 1.5) {
          const relativeTime = (x - rhythmStartX) / pixelsPerSecond + timeOffsetRef.current;
          const v = calculateLeadEcgVoltage(relativeTime, "DII", rhythm, bpm);
          const y = rhythmMidY - v * voltageScale;

          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      } else {
        const rhythmSweepCursorX = rhythmStartX + sweepProgressRef.current * rhythmLen;
        const eraseGap = 20;

        ctx.beginPath();
        let isFirst = true;
        for (let x = rhythmStartX; x <= rhythmEndX; x += 1.5) {
          if (x > rhythmSweepCursorX && x < rhythmSweepCursorX + eraseGap) continue;
          const relativeTime = (x - rhythmStartX) / pixelsPerSecond + Math.floor(timeOffsetRef.current);
          const v = calculateLeadEcgVoltage(relativeTime, "DII", rhythm, bpm);
          const y = rhythmMidY - v * voltageScale;

          if (isFirst || x === Math.ceil(rhythmSweepCursorX + eraseGap)) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        const rCursorTime =
          (rhythmSweepCursorX - rhythmStartX) / pixelsPerSecond + Math.floor(timeOffsetRef.current);
        const rCursorV = calculateLeadEcgVoltage(rCursorTime, "DII", rhythm, bpm);
        const rCursorY = rhythmMidY - rCursorV * voltageScale;

        ctx.fillStyle = "#e11d48";
        ctx.beginPath();
        ctx.arc(rhythmSweepCursorX, rCursorY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(225, 29, 72, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rhythmSweepCursorX, rhythmMidY - 34);
        ctx.lineTo(rhythmSweepCursorX, rhythmMidY + 34);
        ctx.stroke();
      }

      // Render mapped criteria annotations on bottom rhythm strip
      drawWaveAnnotations("DII", "II", rhythmStartX, rhythmEndX, rhythmMidY, true);

      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    rhythm,
    bpm,
    metrics,
    cycleDuration,
    isPlaying,
    motionMode,
    paperSpeed,
    audioEnabled,
    activeCriteriaIndices,
    diagnosisData,
    W,
    H,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ECG_12Lead_${patientName.replace(/\s+/g, "_")}_${recordId}.png`;
    link.href = url;
    link.click();
  };

  const handleReset = () => {
    timeOffsetRef.current = 0;
    sweepProgressRef.current = 0;
  };

  return (
    <div className="space-y-2">
      {/* Sleek Compact Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-hospital-900/90 px-3 py-2 rounded-xl border border-hospital-800 shadow-md print:hidden text-xs">
        {/* Left: Quick Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition shadow-sm ${
              isPlaying
                ? "bg-amber-600 hover:bg-amber-500 text-white"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Tạm Dừng" : "Chạy Tiếp"}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-hospital-800 hover:bg-hospital-700 text-slate-300 text-[11px] font-semibold border border-hospital-700 transition"
            title="Reset vị trí sóng"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>

          {/* Mode switch */}
          <div className="flex rounded-lg bg-hospital-950 p-0.5 border border-hospital-800 text-[11px]">
            <button
              onClick={() => setMotionMode("rolling")}
              className={`px-2 py-0.5 rounded font-bold transition ${
                motionMode === "rolling" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Cuộn Giấy
            </button>
            <button
              onClick={() => setMotionMode("sweep")}
              className={`px-2 py-0.5 rounded font-bold transition ${
                motionMode === "sweep" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Kim Quét
            </button>
          </div>

          {/* Speed switch */}
          <div className="flex rounded-lg bg-hospital-950 p-0.5 border border-hospital-800 text-[11px]">
            <button
              onClick={() => setPaperSpeed(25)}
              className={`px-2 py-0.5 rounded font-bold transition ${
                paperSpeed === 25 ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              25 mm/s
            </button>
            <button
              onClick={() => setPaperSpeed(50)}
              className={`px-2 py-0.5 rounded font-bold transition ${
                paperSpeed === 50 ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              50 mm/s
            </button>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border transition ${
              audioEnabled
                ? "bg-rose-950/60 border-rose-800 text-rose-300"
                : "bg-hospital-800 border-hospital-700 text-slate-400"
            }`}
          >
            {audioEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
            <span>{audioEnabled ? "Bíp ON" : "Tắt Bíp"}</span>
          </button>

          {/* Heart rate indicator */}
          <div
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-mono font-bold transition-all duration-100 ${
              isHeartBeating
                ? "bg-rose-600 border-rose-500 text-white scale-105"
                : "bg-hospital-950 border-hospital-800 text-slate-400"
            }`}
          >
            <Heart
              className={`h-3 w-3 transition-transform ${
                isHeartBeating ? "scale-125 text-white fill-white" : "text-rose-500"
              }`}
            />
            <span>{metrics.heartRate} BPM</span>
          </div>
        </div>

        {/* Center / Right: Export Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportPng}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-hospital-800 hover:bg-hospital-700 text-slate-200 text-[11px] font-semibold border border-hospital-700 transition shadow-sm cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-teal-400" />
            <span>Tải PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition shadow-sm shadow-rose-950/40 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>In Giấy A4</span>
          </button>
        </div>
      </div>

      {/* Display Mode Bar for Portrait vs A4 EMR */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 bg-hospital-900/90 px-3 py-1.5 rounded-xl border border-hospital-800 text-xs shadow-sm print:hidden">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Smartphone className="h-3 w-3 text-cyan-400" />
            Hiển Thị:
          </span>
          <button
            type="button"
            onClick={() => setDisplayMode("portrait")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
              isPortraitMode
                ? "bg-cyan-600 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-300"
                : "bg-hospital-950/80 border-hospital-800 text-slate-300 hover:bg-hospital-800"
            }`}
          >
            <Smartphone className="h-3 w-3" />
            <span>📱 Dọc Điện Thoại (6x2)</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode("a4")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
              !isPortraitMode
                ? "bg-rose-600 border-rose-400 text-white shadow-sm ring-1 ring-rose-300"
                : "bg-hospital-950/80 border-hospital-800 text-slate-300 hover:bg-hospital-800"
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            <span>📄 Khổ Ngang A4 EMR (3x4)</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFocusModalLead("DII")}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-teal-600/20 border border-teal-500/40 text-teal-300 hover:bg-teal-600/30 font-bold text-[10px] transition cursor-pointer"
            title="Phóng to 1 chuyển đạo duy nhất kèm thước đo caliper"
          >
            <ZoomIn className="h-3 w-3" />
            <span>🔍 Soi 1 Chuyển Đạo</span>
          </button>
        </div>
      </div>

      {/* Ultra-Compact Medical ECG Paper Container */}
      <div className={`rounded-2xl border border-rose-400/80 bg-[#fff5f5] p-2.5 sm:p-3 shadow-xl text-slate-900 select-none print:p-0 print:border-none print:shadow-none print:rounded-none ${
        isPortraitMode ? "max-w-[640px] mx-auto overflow-hidden" : "overflow-x-auto"
      }`}>
        {/* Condensed Administrative & Metrics Header Strip (Ultra-Dense 2-Row Layout) */}
        <div className="border-b border-rose-300 pb-2 mb-1.5 font-mono text-[10px] space-y-1">
          {/* Row 1: Hospital Name + Patient Info + Machine Setup in a Single Clean Line */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-slate-950 tracking-tight">
                BV ĐA KHOA TRUNG ƯƠNG • TIM MẠCH
              </span>
              <span className="text-slate-400">•</span>
              <span>
                BN: <strong className="text-slate-950">{patientName}</strong> ({patientAge}T/{patientGender})
              </span>
              <span className="text-slate-400">•</span>
              <span>
                BA: <strong className="text-slate-950">{recordId}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-[9.5px]">
              <span>{currentDate}</span>
              <span>•</span>
              <span className="font-bold text-rose-800">
                {paperSpeed} mm/s • 10 mm/mV
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    isPlaying ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                <span>60 FPS REALTIME</span>
              </span>
            </div>
          </div>

          {/* Row 2: Clinical Metrics + Auto Diagnosis Inline */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 pt-0.5 text-[9.5px] border-t border-rose-200/70">
            {/* Inline Metrics */}
            <div className="flex items-center gap-3 text-slate-700 flex-wrap">
              <span>
                HR: <strong className="text-slate-950">{metrics.heartRate} bpm</strong>
              </span>
              <span>
                PR: <strong className="text-slate-950">{metrics.prIntervalMs > 0 ? `${metrics.prIntervalMs}ms` : "---"}</strong>
              </span>
              <span>
                QRS: <strong className="text-slate-950">{metrics.qrsDurationMs > 0 ? `${metrics.qrsDurationMs}ms` : "---"}</strong>
              </span>
              <span>
                QT/QTc: <strong className={metrics.qtcIntervalMs > 460 ? "text-rose-700 font-black" : "text-slate-950"}>{metrics.qtIntervalMs}/{metrics.qtcIntervalMs}ms</strong>
              </span>
              <span>
                Trục: <strong className="text-slate-950">{metrics.pAxisDeg}°/{metrics.qrsAxisDeg}°/{metrics.tAxisDeg}°</strong>
              </span>
            </div>

            {/* Direct Emergency Module 3 Button */}
            {onOpenClinicalDeck && (
              <button
                type="button"
                onClick={onOpenClinicalDeck}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-[9px] shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer ml-1"
                title="Mở Bệnh Cảnh, Phác Đồ Cấp Cứu và Chuyển Buồng Cấp Cứu Module 3"
              >
                <Siren className="h-3 w-3 animate-pulse" />
                <span>Bệnh Cảnh & Cấp Cứu</span>
              </button>
            )}
          </div>

          {/* Row 3: Diagnostic Interpretation & Gold Standard Criteria Printed Directly on Paper */}
          {diagnosisData && (
            <div className="pt-1.5 pb-0.5 border-t border-rose-300 font-mono text-[9.5px] leading-tight space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1 text-slate-900 font-bold">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-rose-950 uppercase font-black tracking-tight">
                    KẾT LUẬN: {diagnosisData.name.toUpperCase()}
                  </span>
                  <span className="text-slate-500 font-normal">
                    ({diagnosisData.nameEn})
                  </span>
                  {diagnosisData.severity === "critical" && (
                    <span className="bg-rose-600 text-white text-[8px] px-1.5 py-0.2 rounded font-black tracking-tight animate-pulse">
                      NGUY KỊCH
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[9px] text-slate-600">
                  <button
                    type="button"
                    onClick={() => setShowCriteriaBlock((prev) => !prev)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-200/90 hover:bg-rose-300 text-rose-950 font-bold border border-rose-400 cursor-pointer shadow-2xs transition"
                    title={showCriteriaBlock ? "Thu gọn tiêu chuẩn để dải giấy in thông thoáng" : "Mở rộng danh mục tiêu chuẩn để click ánh xạ"}
                  >
                    <span>{showCriteriaBlock ? "📋 Thu Gọn Tiêu Chuẩn ▲" : `📋 Tiêu Chuẩn Chẩn Đoán AHA/ESC (${diagnosisData.criteria.length}) ▼`}</span>
                  </button>
                  {activeCriteriaIndices.size > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveCriteriaIndices(new Set())}
                      className="text-rose-700 hover:text-rose-950 underline font-bold cursor-pointer"
                    >
                      Tắt hết ánh xạ ({activeCriteriaIndices.size})
                    </button>
                  )}
                </div>
              </div>

              {/* Individual Clickable Criteria Lines */}
              {showCriteriaBlock && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 pt-1 border-t border-rose-200/70 mt-1">
                  {diagnosisData.criteria.map((crit, idx) => {
                    const isActive = activeCriteriaIndices.has(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCriterion(idx)}
                        className={`flex items-start gap-1.5 text-left py-1 px-1.5 rounded transition cursor-pointer ${
                          isActive
                            ? "bg-rose-200/90 text-rose-950 font-bold border border-rose-400 shadow-xs"
                            : "text-slate-800 hover:bg-rose-100/70 border border-transparent"
                        }`}
                        title={
                          isActive
                            ? "Bấm để tắt ánh xạ tiêu chuẩn này trên đường điện tim"
                            : "Bấm để bật ánh xạ tiêu chuẩn này lên các chuyển đạo tương ứng"
                        }
                      >
                        <span
                          className={`font-mono font-bold shrink-0 text-[10px] ${
                            isActive ? "text-rose-700" : "text-slate-400"
                          }`}
                        >
                          {isActive ? "[✓]" : "[  ]"}
                        </span>
                        <span className="text-[9.5px] leading-tight">
                          <strong>{idx + 1}.</strong> {crit}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* High-Precision 12-Lead Pink Canvas */}
        <div className={`w-full relative ${isPortraitMode ? "max-w-[620px] mx-auto overflow-hidden" : "overflow-x-auto"}`}>
          <canvas
            ref={canvasRef}
            className={`block w-full h-auto shadow-inner rounded-lg ${
              isPortraitMode ? "max-w-[620px]" : "min-w-[900px]"
            }`}
          />
        </div>

        {/* Minimalist 1-Line Footer */}
        <div className="mt-1 pt-1 border-t border-rose-300/80 flex items-center justify-between font-mono text-[9px] text-slate-600">
          <div>
            Tiêu chuẩn: 1.0 mV = 10 mm (IEC 60601-2-25) • {isPortraitMode ? "Chế độ Dọc (6x2)" : "Khổ A4 (3x4)"} • Lưới hồng
          </div>
          <div className="font-semibold text-slate-800">
            BS Ký Duyệt: BS. CKII. NGUYỄN VĂN A
          </div>
        </div>
      </div>

      {/* Lead Focus Inspection Modal */}
      {focusModalLead && (
        <EcgLeadFocusModal
          isOpen={Boolean(focusModalLead)}
          onClose={() => setFocusModalLead(null)}
          rhythm={rhythm}
          bpm={bpm}
          initialLead={focusModalLead}
          annotations={diagnosisData?.annotations || []}
        />
      )}
    </div>
  );
};
