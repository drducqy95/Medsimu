"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Activity,
  Heart,
  Gauge,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  evaluate7StepApproach,
  EcgStepAnalysis,
  EcgFull7StepReport,
} from "@/domain/simulators/ecgApproachEngine";
import { EcgCalculatedMetrics } from "@/domain/simulators/ecgMetricsCalculator";

interface EcgSevenStepAssistantProps {
  rhythmId: string;
  metrics: EcgCalculatedMetrics;
  onOpenClinicalDeck?: () => void;
}

export function EcgSevenStepAssistant({
  rhythmId,
  metrics,
  onOpenClinicalDeck,
}: EcgSevenStepAssistantProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(true);

  const report: EcgFull7StepReport = evaluate7StepApproach(rhythmId, metrics);

  const toggleStep = (stepNum: number) => {
    setExpandedStep(expandedStep === stepNum ? null : stepNum);
  };

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hospital-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-sm sm:text-base">
                Trợ Lý Lâm Sàng: Quy Trình Đọc ECG 7 Bước Chuẩn Y Khoa
              </h3>
              <span className="rounded-full bg-cyan-950/80 border border-cyan-700/60 px-2 py-0.2 text-[10px] font-bold text-cyan-300">
                VNHA / AHA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Phân tích đối chiếu theo thứ tự logic: Kỹ thuật → Tần số → Nhịp → Trục → P & PR → QRS-ST-T → QT & Kết luận
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="rounded-xl border border-hospital-700 bg-hospital-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-hospital-750 transition cursor-pointer"
          >
            {showAllSteps ? "Thu Gọn Từng Bước" : "Mở Rộng Toàn Bộ"}
          </button>

          {onOpenClinicalDeck && (
            <button
              type="button"
              onClick={onOpenClinicalDeck}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 text-xs font-bold shadow-md shadow-rose-950/50 transition cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Phác Đồ Cấp Cứu</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Diagnostic Conclusion Banner */}
      <div className="rounded-2xl border border-rose-900/50 bg-gradient-to-r from-hospital-950 via-hospital-900 to-rose-950/30 p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
            KẾT LUẬN TỔNG QUAN BƯỚC 7:
          </span>
          <div className="text-sm font-extrabold text-white">
            {report.primaryDiagnosis}
          </div>
        </div>
        {report.keyDifferentials.length > 0 && (
          <div className="text-right text-[11px] text-slate-400 sm:max-w-xs truncate">
            Chẩn đoán phân biệt: <span className="text-slate-300 font-medium">{report.keyDifferentials.join(" • ")}</span>
          </div>
        )}
      </div>

      {/* 7-Step Cards Deck */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
        {report.steps.map((step) => {
          const isExpanded = showAllSteps || expandedStep === step.stepNumber;
          const isAbnormal = !step.isNormal;

          return (
            <div
              key={step.stepNumber}
              onClick={() => toggleStep(step.stepNumber)}
              className={`rounded-2xl border p-3 flex flex-col justify-between transition-all cursor-pointer ${
                isAbnormal
                  ? "border-rose-800/80 bg-rose-950/20 hover:border-rose-600 hover:bg-rose-950/30"
                  : "border-hospital-800 bg-hospital-950/60 hover:border-hospital-700 hover:bg-hospital-850"
              }`}
            >
              {/* Step Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-hospital-800 text-[11px] font-black text-slate-200">
                    {step.stepNumber}
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                      step.isNormal
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-rose-950 text-rose-300 border border-rose-800 animate-pulse"
                    }`}
                  >
                    {step.isNormal ? "Bình thường" : "Bất thường"}
                  </span>
                </div>

                <div className="font-bold text-xs text-white line-clamp-1">
                  {step.stepName}
                </div>

                <div className="text-[11px] font-mono text-slate-400 line-clamp-1">
                  {step.title}
                </div>
              </div>

              {/* Collapsed/Expanded Findings */}
              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-hospital-800/80 space-y-1 text-[11px] text-slate-300">
                  <p className="line-clamp-3 text-slate-200">{step.findings}</p>
                  <p className="text-[10px] text-slate-400 italic line-clamp-2">
                    💡 {step.clinicalNote}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
