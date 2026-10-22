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
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  const report: EcgFull7StepReport = evaluate7StepApproach(rhythmId, metrics);

  const toggleStep = (stepNum: number) => {
    setExpandedStep(expandedStep === stepNum ? null : stepNum);
  };

  return (
    <div className="rounded-2xl border border-hospital-800 bg-hospital-900/90 p-2.5 sm:p-4 space-y-2 sm:space-y-2.5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-hospital-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-sm shrink-0">
            <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-white text-xs sm:text-sm">
                Trợ Lý 7 Bước Đọc ECG
              </h3>
              <span className="rounded-full bg-cyan-950/80 border border-cyan-700/60 px-1.5 py-0.2 text-[8.5px] font-bold text-cyan-300">
                AHA/ESC
              </span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1 hidden sm:block">
              Quy trình logic 7 bước: Kỹ thuật → Tần số → Nhịp → Trục → P/PR → QRS/ST-T → QT & Chẩn đoán
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="sm:hidden flex items-center gap-1 rounded-lg border border-hospital-700 bg-hospital-800 px-2 py-1 text-[10px] font-bold text-slate-300"
          >
            <span>{mobileExpanded ? "Thu gọn" : "Xem 7 bước"}</span>
            {mobileExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {/* Desktop expand all button */}
          <button
            type="button"
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="hidden sm:inline-flex rounded-lg border border-hospital-700 bg-hospital-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-hospital-750 transition cursor-pointer"
          >
            {showAllSteps ? "Thu Gọn Lại" : "Mở Rộng Chi Tiết"}
          </button>

          {onOpenClinicalDeck && (
            <button
              type="button"
              onClick={onOpenClinicalDeck}
              className="hidden sm:flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 text-[11px] font-bold shadow-sm transition cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Phác Đồ</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Diagnostic Conclusion Banner (Compact) */}
      <div
        className="rounded-xl border border-rose-900/50 bg-gradient-to-r from-hospital-950 via-hospital-900 to-rose-950/30 p-2 sm:p-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 cursor-pointer sm:cursor-default"
        onClick={() => setMobileExpanded(!mobileExpanded)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[9.5px] uppercase font-bold text-rose-400 tracking-wider shrink-0">
            KẾT LUẬN:
          </span>
          <div className="text-xs sm:text-sm font-extrabold text-white truncate">
            {report.primaryDiagnosis}
          </div>
        </div>
        {report.keyDifferentials.length > 0 && (
          <div className="text-[10px] sm:text-[11px] text-slate-400 sm:max-w-xs truncate">
            Phân biệt: <span className="text-slate-300 font-medium">{report.keyDifferentials.join(" • ")}</span>
          </div>
        )}
      </div>

      {/* 7-Step Cards Deck (Hidden on mobile if not expanded) */}
      <div
        className={`grid gap-1.5 sm:grid-cols-2 lg:grid-cols-7 ${
          mobileExpanded ? "grid" : "hidden sm:grid"
        }`}
      >
        {report.steps.map((step) => {
          const isExpanded = showAllSteps || expandedStep === step.stepNumber;
          const isAbnormal = !step.isNormal;

          return (
            <div
              key={step.stepNumber}
              onClick={() => toggleStep(step.stepNumber)}
              className={`rounded-xl border p-2 flex flex-col justify-between transition-all cursor-pointer ${
                isAbnormal
                  ? "border-rose-800/80 bg-rose-950/20 hover:border-rose-600 hover:bg-rose-950/30"
                  : "border-hospital-800 bg-hospital-950/60 hover:border-hospital-700 hover:bg-hospital-850"
              }`}
            >
              {/* Step Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-hospital-800 text-[10px] font-black text-slate-200">
                    {step.stepNumber}
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[8.5px] font-bold ${
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

                <div className="text-[10px] font-mono text-slate-400 line-clamp-1">
                  {step.title}
                </div>
              </div>

              {/* Collapsed/Expanded Findings */}
              {isExpanded && (
                <div className="mt-1.5 pt-1.5 border-t border-hospital-800/80 space-y-1 text-[10px] text-slate-300">
                  <p className="line-clamp-3 text-slate-200">{step.findings}</p>
                  <p className="text-[9.5px] text-slate-400 italic line-clamp-2">
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
