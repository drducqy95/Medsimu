"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  EcgRhythmType,
  calculateLeadEcgVoltage,
  playMonitorBeep,
  ECG_RHYTHM_DEFINITIONS,
} from "@/domain/simulators/ecgWaveforms";
import { computeEcgMetrics } from "@/domain/simulators/ecgMetricsCalculator";
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

const FALLBACK_ANNOTATIONS: Record<
  string,
  Array<{
    leadId: string;
    waveComponent: string;
    label: string;
    targetCyclePhase: number;
    color: string;
    badgePlacement: "top" | "bottom" | "interval";
    intervalEndPhase?: number;
    criterionIndex?: number;
  }>
> = {
  stemi_inferior: [
    { leadId: "DII", waveComponent: "ST", label: "▲ ST chênh vòm +3.2mm (≥1mm)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "DIII", waveComponent: "Q", label: "Q hoại tử ≥0.04s", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 2 },
    { leadId: "DIII", waveComponent: "ST", label: "▲ ST chênh lên +3.8mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "aVF", waveComponent: "ST", label: "▲ ST chênh lên +3.4mm", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "aVL", waveComponent: "ST", label: "▼ ST soi gương -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "DI", waveComponent: "ST", label: "▼ ST soi gương -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "II", waveComponent: "ST", label: "▲ ST chênh vòm +3.2mm (≥1mm)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
  ],
  stemi_anterior: [
    { leadId: "V2", waveComponent: "ST", label: "▲ ST Vòm Bia Mộ (Tombstone) +4.8mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "V3", waveComponent: "ST", label: "▲ ST Tombstone +4.2mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "V1", waveComponent: "Q", label: "Mất sóng r dạng QS", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "DIII", waveComponent: "ST", label: "▼ ST soi gương -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
    { leadId: "aVF", waveComponent: "ST", label: "▼ ST soi gương -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
  ],
  av_block_first_degree: [
    { leadId: "DII", waveComponent: "PR", label: "↔ PR = 260ms (> 200ms / 5 ô nhỏ)", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
    { leadId: "V1", waveComponent: "PR", label: "↔ PR kéo dài cố định 260ms", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
    { leadId: "II", waveComponent: "PR", label: "↔ Dải nhịp Lead II: PR = 260ms cố định", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 1 },
  ],
  av_block_mobitz_1: [
    { leadId: "DII", waveComponent: "PR", label: "PR dài dần (160ms → 320ms)", targetCyclePhase: 0.06, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
    { leadId: "DII", waveComponent: "DROPPED", label: "❌ P không dẫn (Rớt QRS)", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
    { leadId: "II", waveComponent: "DROPPED", label: "❌ Chu kỳ Wenckebach: Rớt 1 nhát QRS", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
  ],
  av_block_mobitz_2: [
    { leadId: "DII", waveComponent: "PR", label: "PR cố định 180ms", targetCyclePhase: 0.08, intervalEndPhase: 0.26, color: "#2563eb", badgePlacement: "interval", criterionIndex: 0 },
    { leadId: "DII", waveComponent: "DROPPED", label: "❌ Đột ngột rớt QRS sau sóng P", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
    { leadId: "II", waveComponent: "DROPPED", label: "❌ Block dưới bó His: Rớt QRS 3:2", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top", criterionIndex: 2 },
  ],
  av_block_third_degree: [
    { leadId: "DII", waveComponent: "P", label: "Sóng P xoang (75 bpm) độc lập", targetCyclePhase: 0.15, color: "#059669", badgePlacement: "top", criterionIndex: 1 },
    { leadId: "DII", waveComponent: "R", label: "Nhịp thoát thất rộng 135ms (36 bpm)", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "bottom", criterionIndex: 2 },
    { leadId: "II", waveComponent: "RR", label: "⚡ Phân ly nhĩ - thất hoàn toàn (CHB)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
  ],
  atrial_fibrillation: [
    { leadId: "DII", waveComponent: "RR", label: "↔ R-R hoàn toàn không đều (Loạn nhịp)", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval", criterionIndex: 2 },
    { leadId: "V1", waveComponent: "P", label: "~ Sóng f lăn tăn 400-600 cpm (Mất P)", targetCyclePhase: 0.10, color: "#7c3aed", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "II", waveComponent: "RR", label: "↔ R-R không theo quy luật chu kỳ", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval", criterionIndex: 2 },
  ],
  atrial_flutter: [
    { leadId: "DII", waveComponent: "P", label: "Sóng răng cưa F (300 bpm, 2:1)", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "DIII", waveComponent: "P", label: "Sóng F âm liên tục không đẳng điện", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 2 },
    { leadId: "II", waveComponent: "P", label: "Răng cưa F tần số nhĩ 300 bpm", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 1 },
  ],
  hyperkalemia: [
    { leadId: "V2", waveComponent: "T", label: "▲ Sóng T lều nhọn hoắt đối xứng (9.8mm)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "V3", waveComponent: "T", label: "▲ Sóng T nhọn hình lều > 10mm", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "DII", waveComponent: "PR", label: "PR dài 220ms + QRS dãn rộng 130ms", targetCyclePhase: 0.12, intervalEndPhase: 0.29, color: "#d97706", badgePlacement: "interval", criterionIndex: 1 },
    { leadId: "II", waveComponent: "T", label: "▲ Sóng T cao nhọn đáy hẹp (Dấu hiệu lều)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
  ],
  normal_sinus: [
    { leadId: "DII", waveComponent: "P", label: "Sóng P xoang dương trước QRS", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top", criterionIndex: 0 },
    { leadId: "aVR", waveComponent: "P", label: "Sóng P âm ở aVR chuẩn", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "bottom", criterionIndex: 1 },
    { leadId: "DII", waveComponent: "PR", label: "↔ PR bình thường 160ms (3-5 ô nhỏ)", targetCyclePhase: 0.12, intervalEndPhase: 0.28, color: "#059669", badgePlacement: "interval", criterionIndex: 2 },
    { leadId: "II", waveComponent: "RR", label: "↔ R-R đều (HR = 75 bpm, 4 ô lớn)", targetCyclePhase: 0.20, intervalEndPhase: 0.80, color: "#059669", badgePlacement: "interval", criterionIndex: 3 },
    { leadId: "V1", waveComponent: "QRS", label: "QRS hẹp 85ms (< 120ms)", targetCyclePhase: 0.24, color: "#059669", badgePlacement: "top", criterionIndex: 4 },
    { leadId: "II", waveComponent: "ST", label: "ST đẳng điện, T dương bình thường", targetCyclePhase: 0.35, color: "#059669", badgePlacement: "top", criterionIndex: 4 },
  ],
  stemi_lateral: [
    { leadId: "aVL", waveComponent: "ST", label: "▲ ST chênh lên bên cao +2.5mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DI", waveComponent: "ST", label: "▲ ST chênh lên +2.0mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top" },
    { leadId: "V6", waveComponent: "ST", label: "▲ ST chênh lên bên thấp +2.0mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DIII", waveComponent: "ST", label: "▼ ST soi gương thành dưới -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
  ],
  stemi_posterior: [
    { leadId: "V2", waveComponent: "ST", label: "▼ ST chênh xuống đi ngang soi gương -2.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "V2", waveComponent: "R", label: "▲ R cao vượt trội R/S > 1 (Gương của Q)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top" },
    { leadId: "V2", waveComponent: "T", label: "▲ T dương cao nhọn đối xứng (Gương của T âm)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top" },
    { leadId: "V1", waveComponent: "ST", label: "▼ ST chênh xuống -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
  ],
  nemi_subendocardial: [
    { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống đi ngang -2.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "V5", waveComponent: "T", label: "▼ T âm sâu đối xứng", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "aVR", waveComponent: "ST", label: "▲ ST chênh lên aVR +1.5mm (Nguy cơ tắc LMCA)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
    { leadId: "V4", waveComponent: "ST", label: "▼ ST chênh xuống -2.0mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
  ],
  rbbb: [
    { leadId: "V1", waveComponent: "R", label: "▲ Dạng tai thỏ rsR' (RBBB) rộng 135ms", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top" },
    { leadId: "V1", waveComponent: "T", label: "▼ ST chênh xuống & T âm thứ phát", targetCyclePhase: 0.40, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "V6", waveComponent: "S", label: "▼ Sóng S rộng sâu > 40ms ở DI, V6", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom" },
    { leadId: "DI", waveComponent: "S", label: "▼ S rộng thành bên", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom" },
  ],
  lbbb: [
    { leadId: "V6", waveComponent: "R", label: "▲ R rộng có khía (LBBB) QRS 140ms", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top" },
    { leadId: "V1", waveComponent: "S", label: "▼ Sóng QS sâu rộng ở V1-V2", targetCyclePhase: 0.26, color: "#9333ea", badgePlacement: "bottom" },
    { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống thứ phát trái chiều QRS", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "DI", waveComponent: "R", label: "Mất sóng Q vách ở DI, aVL, V6", targetCyclePhase: 0.18, color: "#9333ea", badgePlacement: "top" },
  ],
  lafb: [
    { leadId: "aVL", waveComponent: "R", label: "Dạng qR ở aVL (Trục lệch trái -60°)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top" },
    { leadId: "DIII", waveComponent: "S", label: "▼ Sóng S sâu ở DII, DIII, aVF (dạng rS)", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom" },
    { leadId: "DI", waveComponent: "Q", label: "q nhỏ ở DI, aVL", targetCyclePhase: 0.18, color: "#9333ea", badgePlacement: "bottom" },
  ],
  wpw_syndrome: [
    { leadId: "DII", waveComponent: "PR", label: "↔ PR ngắn < 120ms (Kích thích sớm)", targetCyclePhase: 0.08, intervalEndPhase: 0.18, color: "#d97706", badgePlacement: "interval" },
    { leadId: "V1", waveComponent: "R", label: "▲ Sóng Delta (Delta wave) sườn dốc thoai thoải", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    { leadId: "V1", waveComponent: "QRS", label: "QRS dãn rộng 130ms do hợp nhất xung động", targetCyclePhase: 0.24, color: "#9333ea", badgePlacement: "top" },
  ],
  torsades_de_pointes: [
    { leadId: "DII", waveComponent: "R", label: "⚡ QRS xoay trục quanh đường đẳng điện (TdP)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DII", waveComponent: "RR", label: "Tần số 220 bpm đa dạng (Polymorphic)", targetCyclePhase: 0.15, intervalEndPhase: 0.50, color: "#e11d48", badgePlacement: "interval" },
    { leadId: "II", waveComponent: "RR", label: "Chu kỳ khởi phát Short-Long-Short trên nền QT dài", targetCyclePhase: 0.25, intervalEndPhase: 0.65, color: "#9333ea", badgePlacement: "interval" },
  ],
  lvh_strain: [
    { leadId: "V5", waveComponent: "R", label: "▲ R cao vút (Sokolow-Lyon = 47mm > 35mm)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top" },
    { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống không đối xứng (Strain pattern)", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "V1", waveComponent: "S", label: "▼ Sóng S sâu 22mm ở V1", targetCyclePhase: 0.26, color: "#9333ea", badgePlacement: "bottom" },
  ],
  brugada_type1: [
    { leadId: "V1", waveComponent: "ST", label: "▲ ST chênh vòm Coved-type ≥ 2mm (Brugada Type 1)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
    { leadId: "V1", waveComponent: "T", label: "▼ Sóng T âm sâu đối xứng tiếp nối vòm ST", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "V2", waveComponent: "ST", label: "ST vòm Brugada V2", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
  ],
  pulmonary_embolism: [
    { leadId: "DI", waveComponent: "S", label: "▼ S1: Sóng S sâu ở DI", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom" },
    { leadId: "DIII", waveComponent: "Q", label: "▲ Q3: Sóng Q bệnh lý ở DIII", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom" },
    { leadId: "DIII", waveComponent: "T", label: "▼ T3: Sóng T âm ở DIII (Dấu hiệu S1Q3T3)", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "DII", waveComponent: "RR", label: "Nhịp nhanh xoang 115 bpm (Dấu hiệu thường gặp nhất)", targetCyclePhase: 0.15, intervalEndPhase: 0.50, color: "#d97706", badgePlacement: "interval" },
    { leadId: "V1", waveComponent: "T", label: "▼ T âm đối xứng do tăng gánh thất phải cấp", targetCyclePhase: 0.40, color: "#2563eb", badgePlacement: "bottom" },
  ],
  acute_pericarditis: [
    { leadId: "DII", waveComponent: "ST", label: "▲ ST chênh lên lõm lòng thuyền lan tỏa", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DII", waveComponent: "PR", label: "▼ Đoạn PR chênh xuống đặc hiệu (PR depression)", targetCyclePhase: 0.10, intervalEndPhase: 0.22, color: "#2563eb", badgePlacement: "interval" },
    { leadId: "aVR", waveComponent: "PR", label: "▲ PR chênh lên ở aVR", targetCyclePhase: 0.10, intervalEndPhase: 0.22, color: "#059669", badgePlacement: "interval" },
    { leadId: "V5", waveComponent: "ST", label: "ST lõm lòng thuyền ở V5-V6", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top" },
  ],
  hypokalemia: [
    { leadId: "V2", waveComponent: "T", label: "▲ Sóng U nổi rõ > 1mm (Cao hơn sóng T)", targetCyclePhase: 0.55, color: "#9333ea", badgePlacement: "top" },
    { leadId: "V2", waveComponent: "ST", label: "▼ ST chênh xuống nhẹ & T dẹt", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "DII", waveComponent: "RR", label: "Khoảng QU giả kéo dài > 500ms", targetCyclePhase: 0.30, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval" },
  ],
  digoxin_toxicity: [
    { leadId: "V5", waveComponent: "ST", label: "▼ ST lõm hình đáy chén (Salvador Dali moustache)", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "bottom" },
    { leadId: "V5", waveComponent: "T", label: "QT ngắn lại + T dẹt hai pha", targetCyclePhase: 0.42, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "DII", waveComponent: "R", label: "Ngoại tâm thu thất nhịp đôi (Bigeminy do ngộ độc)", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "top" },
  ],
  ventricular_tachycardia: [
    { leadId: "DII", waveComponent: "R", label: "⚡ QRS dãn rộng dị dạng 160ms (VT) 175 bpm", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DII", waveComponent: "RR", label: "Cơn nhanh thất đơn dạng đều đặn", targetCyclePhase: 0.15, intervalEndPhase: 0.48, color: "#e11d48", badgePlacement: "interval" },
    { leadId: "V1", waveComponent: "QRS", label: "Dấu hiệu đồng hướng âm toàn bộ V1-V6", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "bottom" },
  ],
  ventricular_fibrillation: [
    { leadId: "DII", waveComponent: "R", label: "☠️ RUNG THẤT (VFib): Mất hoàn toàn QRS-T", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DII", waveComponent: "RR", label: "Sóng hỗn loạn vô tổ chức (Tử vong lâm sàng)", targetCyclePhase: 0.15, intervalEndPhase: 0.55, color: "#e11d48", badgePlacement: "interval" },
    { leadId: "II", waveComponent: "RR", label: "🚨 BÁO ĐỘNG ĐỎ: PHÁ RUNG KHẨN CẤP 200J", targetCyclePhase: 0.25, intervalEndPhase: 0.65, color: "#e11d48", badgePlacement: "top" },
  ],
  asystole: [
    { leadId: "DII", waveComponent: "DROPPED", label: "☠️ VÔ TÂM THU (Asystole): Đường thẳng phẳng lì", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    { leadId: "II", waveComponent: "DROPPED", label: "🚨 ÉP TIM CPR + ADRENALINE 1MG (KHÔNG SỐC ĐIỆN)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
  ],
  pvc_frequent: [
    { leadId: "DII", waveComponent: "R", label: "PVC dãn rộng 140ms đến sớm dị dạng", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "top" },
    { leadId: "DII", waveComponent: "T", label: "ST-T biến đổi trái chiều QRS", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom" },
    { leadId: "II", waveComponent: "RR", label: "Nghỉ bù hoàn toàn (Full compensatory pause)", targetCyclePhase: 0.30, intervalEndPhase: 0.70, color: "#d97706", badgePlacement: "interval" },
  ],
};

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
  const [showCriteriaPanel, setShowCriteriaPanel] = useState<boolean>(true);
  const [annotationsEnabled, setAnnotationsEnabled] = useState<boolean>(true);
  const [selectedCriterion, setSelectedCriterion] = useState<number | "all">("all");
  const [disabledAnnotationLabels, setDisabledAnnotationLabels] = useState<Set<string>>(new Set());

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

  const toggleAnnotationLabel = (label: string) => {
    setDisabledAnnotationLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
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
    setSelectedCriterion("all");
    setDisabledAnnotationLabels(new Set());
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

  // 12-Leads setup: 4 columns x 3 rows
  const matrixLeads = [
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

  // Canvas dimensions: Compact height 460px focused on waveforms
  const W = 1200;
  const H = 460;

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

    const rowH = 100;
    const colW = (W - 36) / 4;
    const marginLeft = 20;
    const pixelsPerMm = 6;
    const pixelsPerSecond = paperSpeed * pixelsPerMm; // 25mm/s -> 150px/s; 50mm/s -> 300px/s
    const voltageScale = 26; // 1mV = 26px (~4.3mm)

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
        if (!annotationsEnabled || !diagnosisData?.annotations || diagnosisData.annotations.length === 0) {
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

        // For rhythm strip: if there are specific "II" / "RHYTHM" annotations for the current criterion filter,
        // prioritize them over generic "DII" annotations to prevent crowding
        if (isRhythmStrip && selectedCriterion === "all") {
          const hasSpecificRhythmAnn = annotations.some((a) => {
            const tid = a.leadId.toUpperCase();
            return tid === "II" || tid === "RHYTHM" || tid === "RHYTHM_STRIP";
          });
          if (hasSpecificRhythmAnn) {
            annotations = annotations.filter((a) => {
              const tid = a.leadId.toUpperCase();
              return tid === "II" || tid === "RHYTHM" || tid === "RHYTHM_STRIP";
            });
          }
        }

        // 2. Filter by isolated criterion (if user selected a specific criterion)
        if (selectedCriterion !== "all") {
          annotations = annotations.filter((a) => {
            const critIdx = getAnnotationCriterionIndex(a, diagnosisData.criteria);
            return critIdx === selectedCriterion;
          });
        }

        // 3. Filter out individually disabled annotation labels
        if (disabledAnnotationLabels.size > 0) {
          annotations = annotations.filter((a) => !disabledAnnotationLabels.has(a.label));
        }

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

        for (const k of candidateCycles) {
          if (renderedLabels.size >= annotations.length) break;

          for (const ann of annotations) {
            if (renderedLabels.has(ann.label)) continue;

            if (ann.badgePlacement === "interval" && typeof ann.intervalEndPhase === "number") {
              const t1 = (k + ann.targetCyclePhase) * cycleDuration;
              const t2 = (k + ann.intervalEndPhase) * cycleDuration;
              const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
              const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;

              if (x2 >= traceStart + 10 && x1 <= leadEndX - 10) {
                ctx.font = "bold 8.5px monospace";
                const tw = ctx.measureText(ann.label).width;
                itemsToRender.push({
                  ann,
                  targetTime: t1,
                  targetX: (x1 + x2) / 2,
                  targetY: midY + (isRhythmStrip ? 24 : 27),
                  pillW: tw + 8,
                  pillH: 13,
                  isTop: false,
                  level: 0,
                  isInterval: true,
                  x1,
                  x2,
                });
                renderedLabels.add(ann.label);
              }
            } else {
              const targetTime = (k + ann.targetCyclePhase) * cycleDuration;
              const targetX = traceStart + (targetTime - tMin) * pixelsPerSecond;

              if (targetX >= traceStart + 16 && targetX <= leadEndX - 16) {
                const calcLead = isRhythmStrip ? "DII" : leadId;
                const waveV = calculateLeadEcgVoltage(targetTime, calcLead, rhythm, bpm);
                const targetY = midY - waveV * voltageScale;

                ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
                const tw = ctx.measureText(ann.label).width;

                // Smart polarity placement: negative waves (Q, S, depressed ST) go bottom, positive go top
                let isTop = ann.badgePlacement !== "bottom";
                if (ann.waveComponent === "Q" || waveV < -0.12) {
                  isTop = false;
                } else if (ann.waveComponent === "ST" && waveV > 0.12) {
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

            ctx.beginPath();
            ctx.setLineDash([3, 2]);
            ctx.moveTo(drawX1, calY);
            ctx.lineTo(drawX2, calY);
            ctx.stroke();
            ctx.setLineDash([]);

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
            ctx.fillText(item.ann.label, pillX + 4, pillY + 10);
            ctx.restore();
          } else {
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
            ctx.fillText(item.ann.label, pillX + 4, pillY + 10);
            ctx.restore();
          }
        }
      };

      // 3. Render 12 leads (3 rows x 4 columns) using calculateLeadEcgVoltage
      matrixLeads.forEach((row, rIdx) => {
        const midY = 65 + rIdx * rowH;

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
      const rhythmMidY = 385;
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
    annotationsEnabled,
    selectedCriterion,
    disabledAnnotationLabels,
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

        {/* Center / Right: Highly Visible Criteria Button & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Prominent High-Visibility Criteria Toggle Button */}
          <button
            onClick={() => setShowCriteriaPanel(!showCriteriaPanel)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              showCriteriaPanel
                ? "bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 shadow-cyan-500/40"
                : "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-cyan-900/40 border border-cyan-400/40"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Tiêu Chuẩn Chẩn Đoán (AHA/ESC)</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-mono">
              {showCriteriaPanel ? "Đang Mở ▲" : "Xem Chi Tiết ▼"}
            </span>
          </button>

          {/* Direct Wave-Mapped Annotations Live Toggle Button */}
          <button
            type="button"
            onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              annotationsEnabled
                ? "bg-rose-600 text-white shadow-rose-900/40 ring-2 ring-rose-400"
                : "bg-hospital-800 hover:bg-hospital-700 text-slate-300 border border-hospital-700"
            }`}
            title="Bật/Tắt ánh xạ vị trí tiêu chuẩn chẩn đoán trực tiếp trên đường điện tim"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Ánh Xạ Sóng: {annotationsEnabled ? "BẬT" : "TẮT"}</span>
          </button>

          <button
            onClick={handleExportPng}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-hospital-800 hover:bg-hospital-700 text-slate-200 text-[11px] font-semibold border border-hospital-700 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-teal-400" />
            <span>Tải PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition shadow-sm shadow-rose-950/40"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>In Giấy A4</span>
          </button>
        </div>
      </div>

      {/* Interactive Diagnostic Criteria & Waveform Mapping Panel */}
      {showCriteriaPanel && diagnosisData && (
        <div className="rounded-2xl border border-cyan-500/40 bg-hospital-900/95 p-4 shadow-2xl space-y-3.5 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hospital-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-cyan-400" />
              <div>
                <span className="font-bold text-white text-sm">
                  {diagnosisData.name}
                </span>
                <span className="text-[11px] text-slate-400 ml-2 font-mono">
                  ({diagnosisData.nameEn})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Phân loại:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                {diagnosisData.category}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                  diagnosisData.severity === "critical"
                    ? "bg-rose-600 text-white animate-pulse"
                    : diagnosisData.severity === "abnormal"
                    ? "bg-amber-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {diagnosisData.severity === "critical" ? "NGUY KỊCH (CODE RED)" : diagnosisData.severity}
              </span>
            </div>
          </div>

          {/* Criteria Checklist with Waveform Validation Badges */}
          <div className="space-y-1.5">
            <div className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>CÁC TIÊU CHUẨN VÀNG CHẨN ĐOÁN (GOLD STANDARD CRITERIA):</span>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {diagnosisData.criteria.map((crit, idx) => {
                const isSelected = selectedCriterion === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-2.5 flex items-start justify-between gap-2 transition ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400"
                        : "border-hospital-800 bg-hospital-950/70 text-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`flex-shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full font-black text-[10px] border ${
                          isSelected
                            ? "bg-cyan-500 text-slate-950 border-cyan-300"
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-[11px] leading-snug font-medium text-slate-200">{crit}</p>
                        <span
                          className={`text-[9.5px] font-mono block ${
                            isSelected ? "text-cyan-300 font-bold" : "text-emerald-400"
                          }`}
                        >
                          {isSelected
                            ? "⭐ ĐANG CHIẾU RIÊNG TRÊN SÓNG ĐIỆN TIM"
                            : "Đang phản ánh chính xác trên các chuyển đạo bên dưới"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCriterion(isSelected ? "all" : idx)}
                      className={`flex-shrink-0 text-[10px] px-2 py-1 rounded-md font-bold transition cursor-pointer border ${
                        isSelected
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm"
                          : "bg-hospital-800 hover:bg-hospital-700 text-slate-300 border-hospital-700 hover:text-white"
                      }`}
                      title={isSelected ? "Bấm để xem lại tất cả tiêu chuẩn" : "Chỉ chiếu riêng tiêu chuẩn này lên sóng"}
                    >
                      {isSelected ? "Bỏ Lọc" : "Chiếu Riêng"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Specific Manifestations Table */}
          {diagnosisData.leadManifestations && Object.keys(diagnosisData.leadManifestations).length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-hospital-800/80">
              <div className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
                <Activity className="h-3.5 w-3.5 text-rose-400" />
                <span>ĐỐI CHIẾU HÌNH THÁI SÓNG TRÊN TỪNG CHUYỂN ĐẠO BẤT THƯỜNG:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[11px]">
                {Object.entries(diagnosisData.leadManifestations).map(([leadKey, manifest]) => (
                  <div
                    key={leadKey}
                    className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-2 font-mono"
                  >
                    <span className="font-bold text-rose-300 block text-[10px] uppercase border-b border-rose-900/40 pb-0.5 mb-1">
                      Chuyển đạo {leadKey}
                    </span>
                    <span className="text-slate-300 text-[10.5px] leading-tight block">
                      {manifest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Wave-Mapped Clinical Markers List */}
          {diagnosisData.annotations && diagnosisData.annotations.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-hospital-800/80">
              <div className="font-bold text-slate-200 flex items-center justify-between text-[11px] flex-wrap gap-1">
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-rose-400" />
                  <span>ÁNH XẠ VỊ TRÍ TIÊU CHUẨN TRỰC TIẾP LÊN SÓNG ĐIỆN TIM:</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Bấm vào từng nhãn để bật/tắt riêng lẻ)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDisabledAnnotationLabels(new Set())}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    Bật tất cả
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    {annotationsEnabled ? "Tắt ghim trên sóng" : "Bật ghim trên sóng"}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10.5px]">
                {diagnosisData.annotations.map((ann, idx) => {
                  const isDisabled = disabledAnnotationLabels.has(ann.label);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleAnnotationLabel(ann.label)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono shadow-sm transition cursor-pointer text-left ${
                        isDisabled
                          ? "bg-hospital-950/40 border-hospital-800/60 text-slate-500 opacity-50 line-through"
                          : "bg-hospital-950/80 border-hospital-700 hover:border-cyan-500 text-slate-200 hover:text-white"
                      }`}
                      title={isDisabled ? "Bấm để bật lại nhãn này trên sóng" : "Bấm để tắt nhãn này trên sóng"}
                    >
                      <span
                        className="h-2 w-2 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: isDisabled ? "#64748b" : (ann.color || "#e11d48") }}
                      />
                      <strong className="font-bold">[{ann.leadId}]</strong>
                      <span>{ann.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Immediate Emergency Action */}
          {diagnosisData.clinicalAction && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-2.5 flex items-start justify-between gap-2.5 text-amber-200 text-[11px]">
              <div className="flex items-start gap-2">
                <AlertOctagon className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold">Hướng xử trí lâm sàng khẩn cấp: </strong>
                  <span>{diagnosisData.clinicalAction}</span>
                </div>
              </div>
              {onOpenClinicalDeck && (
                <button
                  type="button"
                  onClick={onOpenClinicalDeck}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-lg font-bold text-[10px] shadow transition cursor-pointer"
                >
                  <Siren className="h-3 w-3 animate-pulse" />
                  <span>Phác Đồ & Ca Bệnh →</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Quick Criteria Filter & Isolation Bar (Lọc & Chiếu Riêng Từng Tiêu Chuẩn - Tránh Chồng Lấp) */}
      {annotationsEnabled && diagnosisData && diagnosisData.criteria && diagnosisData.criteria.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-1.5 bg-hospital-900/90 px-3 py-1.5 rounded-xl border border-hospital-800 text-xs shadow-md print:hidden">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Activity className="h-3 w-3 text-cyan-400" />
              Lọc Tiêu Chuẩn:
            </span>

            {/* View All Button */}
            <button
              type="button"
              onClick={() => setSelectedCriterion("all")}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                selectedCriterion === "all"
                  ? "bg-rose-600 text-white shadow-sm ring-1 ring-rose-400"
                  : "bg-hospital-950/80 text-slate-300 hover:bg-hospital-800 hover:text-white border border-hospital-800"
              }`}
            >
              <span>✨ Xem Tất Cả</span>
              <span className="rounded-full bg-black/30 px-1.5 py-0.2 text-[8.5px] font-mono">
                {diagnosisData.annotations?.length || 0}
              </span>
            </button>

            {/* Individual Criteria Selector Tabs */}
            {diagnosisData.criteria.map((crit, idx) => {
              const isSelected = selectedCriterion === idx;
              const matchingCount = diagnosisData.annotations?.filter(
                (a) => getAnnotationCriterionIndex(a, diagnosisData.criteria) === idx
              ).length || 0;
              const shortTitle = getShortCriterionTitle(crit, idx);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCriterion(isSelected ? "all" : idx)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] transition cursor-pointer border ${
                    isSelected
                      ? "bg-cyan-600 border-cyan-400 text-white font-bold ring-1 ring-cyan-300 shadow-sm"
                      : "bg-hospital-950/80 border-hospital-800 text-slate-300 hover:bg-hospital-800 hover:text-white font-medium"
                  }`}
                  title={crit}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-cyan-400"}`} />
                  <span>{`TC ${idx + 1}: ${shortTitle}`}</span>
                  {matchingCount > 0 && (
                    <span className="rounded-full bg-white/20 px-1 py-0.2 text-[8.5px] font-mono">
                      {matchingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedCriterion !== "all" && (
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-amber-300 font-mono">
                Đang chiếu riêng TC {selectedCriterion + 1}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCriterion("all")}
                className="text-cyan-400 hover:text-cyan-300 underline font-mono cursor-pointer"
              >
                ↩ Xem lại tất cả
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ultra-Compact Medical ECG Paper Container */}
      <div className="rounded-2xl border border-rose-400/80 bg-[#fff5f5] p-2.5 sm:p-3 shadow-xl text-slate-900 select-none overflow-x-auto print:p-0 print:border-none print:shadow-none print:rounded-none">
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

            {/* Diagnostic Interpretation Pill with Direct Criteria Button */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {metrics.severity === "critical" && (
                <span className="bg-rose-600 text-white text-[8.5px] px-1.5 py-0.2 rounded font-black tracking-tight animate-pulse">
                  NGUY KỊCH
                </span>
              )}
              <span className="font-bold text-rose-950 truncate max-w-sm">
                {diagnosisData?.name || metrics.interpretationLines[0] || "Nhịp xoang đều bình thường"}
              </span>
              <button
                type="button"
                onClick={() => setShowCriteriaPanel(!showCriteriaPanel)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[9.5px] shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer ml-1"
                title="Bấm để xem danh sách tiêu chuẩn vàng và đối chiếu chuyển đạo"
              >
                <BookOpen className="h-3 w-3" />
                <span>{showCriteriaPanel ? "Ẩn Tiêu Chuẩn ▲" : "Xem Tiêu Chuẩn (AHA/ESC) ▼"}</span>
              </button>
              {onOpenClinicalDeck && (
                <button
                  type="button"
                  onClick={onOpenClinicalDeck}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-[9.5px] shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer ml-1"
                  title="Mở Bệnh Cảnh, Phác Đồ Cấp Cứu và Chuyển Buồng Cấp Cứu Module 3"
                >
                  <Siren className="h-3 w-3 animate-pulse" />
                  <span>Bệnh Cảnh & Cấp Cứu (Module 3)</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Criteria Preview Bar on Paper */}
          {diagnosisData && (
            <div className="flex items-center justify-between text-[9px] text-rose-950 bg-rose-100/90 px-2.5 py-1 rounded-lg border border-rose-300">
              <div className="truncate flex items-center gap-2">
                <span className="font-black text-rose-800">
                  {selectedCriterion === "all" ? "TIÊU CHUẨN VÀNG:" : `TIÊU CHUẨN ${selectedCriterion + 1} (RIÊNG LẺ):`}
                </span>
                <span className="truncate">
                  {selectedCriterion === "all"
                    ? diagnosisData.criteria[0]
                    : diagnosisData.criteria[selectedCriterion]}
                </span>
                {diagnosisData.annotations && diagnosisData.annotations.length > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-rose-200 text-rose-900 font-bold text-[8.5px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />
                    {selectedCriterion === "all"
                      ? `Đã ghim ${diagnosisData.annotations.length} tiêu chuẩn lên sóng`
                      : `Đang chiếu riêng TC ${selectedCriterion + 1}`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedCriterion !== "all" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedCriterion("all")}
                      className="font-bold text-cyan-800 hover:text-cyan-950 underline whitespace-nowrap cursor-pointer text-[9px]"
                    >
                      Xem tất cả
                    </button>
                    <span>•</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
                  className="font-bold text-rose-800 hover:text-rose-950 underline whitespace-nowrap cursor-pointer text-[9px]"
                >
                  {annotationsEnabled ? "Tắt ghim sóng" : "Bật ghim sóng"}
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setShowCriteriaPanel(!showCriteriaPanel)}
                  className="font-bold text-rose-700 hover:text-rose-950 underline whitespace-nowrap cursor-pointer"
                >
                  {showCriteriaPanel ? "Thu gọn ▲" : "Xem đủ 12 chuyển đạo →"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* High-Precision 12-Lead Pink Canvas (Compact Height 460px focused on leads) */}
        <div className="w-full overflow-x-auto relative">
          <canvas
            ref={canvasRef}
            className="block w-full min-w-[900px] h-auto shadow-inner rounded-lg"
          />
        </div>

        {/* Minimalist 1-Line Footer */}
        <div className="mt-1 pt-1 border-t border-rose-300/80 flex items-center justify-between font-mono text-[9px] text-slate-600">
          <div>
            Tiêu chuẩn: 1.0 mV = 10 mm (IEC 60601-2-25) • Lưu hồ sơ EMR • Lưới hồng milimet
          </div>
          <div className="font-semibold text-slate-800">
            BS Ký Duyệt: BS. CKII. NGUYỄN VĂN A
          </div>
        </div>
      </div>
    </div>
  );
};
