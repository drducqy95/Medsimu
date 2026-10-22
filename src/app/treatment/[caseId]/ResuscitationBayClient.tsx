"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClinicalCase } from "@/domain/treatment/types";
import {
  createInitialSimulationState,
  tickSimulationSecond,
  executeOrderAction,
  recordAnamnesisQuestion,
  recordPhysicalExam,
  evaluateFinalDisposition,
  SimulationState,
} from "@/domain/simulation/treatmentStateMachine";
import { BedsideMonitor } from "@/components/treatment/BedsideMonitor";
import { PatientBedsideView } from "@/components/treatment/PatientBedsideView";
import { ParaclinicalStation } from "@/components/treatment/ParaclinicalStation";
import { MedicalOrderSheet } from "@/components/treatment/MedicalOrderSheet";
import { ClinicalLogTimeline } from "@/components/treatment/ClinicalLogTimeline";
import { ClinicalDebriefingModal } from "@/components/treatment/ClinicalDebriefingModal";
import { useUserCareerStore } from "@/store/userCareerStore";
import {
  ArrowLeft,
  MessageSquare,
  Stethoscope,
  Activity,
  Pill,
  Send,
  Siren,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface ResuscitationBayClientProps {
  initialCase: ClinicalCase;
}

export const ResuscitationBayClient: React.FC<ResuscitationBayClientProps> = ({
  initialCase,
}) => {
  const [simState, setSimState] = useState<SimulationState>(() =>
    createInitialSimulationState(initialCase)
  );

  const [activeTab, setActiveTab] = useState<
    "anamnesis" | "exam" | "paraclinical" | "orders" | "disposition"
  >("anamnesis");

  // Disposition form selections
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>(
    initialCase.goldStandardDiagnosis
  );
  const [selectedDisposition, setSelectedDisposition] = useState<
    "cath_lab" | "emergency_or" | "icu" | "medical_ward" | "discharge"
  >(initialCase.correctDisposition);

  const addXp = useUserCareerStore((s) => s.addXp);
  const recordCaseOutcome = useUserCareerStore((s) => s.recordCaseOutcome);
  const updateReputation = useUserCareerStore((s) => s.updateReputation);

  // Timer Tick (1 second interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setSimState((prev) => tickSimulationSecond(prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleAskQuestion = (questionId: string) => {
    setSimState((prev) => recordAnamnesisQuestion(prev, questionId));
  };

  const handlePerformExam = (system: string) => {
    setSimState((prev) => recordPhysicalExam(prev, system));
  };

  const handleExecuteOrder = (orderId: string) => {
    setSimState((prev) => executeOrderAction(prev, orderId));
  };

  const handleLogParaclinicalView = (toolName: string) => {
    setSimState((prev) => ({
      ...prev,
      timelineLogs: [
        {
          id: `para-${Date.now()}`,
          timestampSeconds: prev.elapsedSeconds,
          category: "paraclinical",
          message: `Bác sĩ tiến hành khảo sát: [${toolName}].`,
          badgeType: "info",
        },
        ...prev.timelineLogs,
      ],
    }));
  };

  const handleSubmitDisposition = () => {
    setSimState((prev) => {
      const next = evaluateFinalDisposition(
        prev,
        selectedDiagnosis,
        selectedDisposition
      );
      if (next.finalScore) {
        addXp(next.finalScore.totalScore * 5);
        recordCaseOutcome(next.finalScore.passed);
        updateReputation(next.finalScore.passed ? 5 : -10);
      }
      return next;
    });
  };

  const handleRestart = () => {
    setSimState(createInitialSimulationState(initialCase));
  };

  // Emergency CPR / Defib in Code Blue
  const handleEmergencyDefibrillation = () => {
    setSimState((prev) => {
      const isShockable = prev.currentVitals.rhythmId === "ventricular_fibrillation";
      const nextVitals = { ...prev.currentVitals };
      let message = "";

      if (isShockable) {
        nextVitals.rhythmId = "sinus_tachycardia";
        nextVitals.hr = 110;
        nextVitals.bpSys = 95;
        nextVitals.bpDia = 60;
        message = "SỐC ĐIỆN 200J THÀNH CÔNG! Đã cắt cơn Rung thất, tái lập tuần hoàn tự nhiên (ROSC)!";
      } else {
        nextVitals.hr = 65;
        nextVitals.bpSys = 90;
        nextVitals.bpDia = 55;
        message = "Ép tim CPR chất lượng cao + Tiêm Adrenalin 1mg: Tái lập tuần hoàn tự nhiên (ROSC)!";
      }

      return {
        ...prev,
        isCodeBlue: false,
        codeBlueReason: null,
        currentVitals: nextVitals,
        timelineLogs: [
          {
            id: `rosc-${Date.now()}`,
            timestampSeconds: prev.elapsedSeconds,
            category: "alarm",
            message: `🎉 ${message}`,
            badgeType: "success",
          },
          ...prev.timelineLogs,
        ],
      };
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <Link
          href="/treatment"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Rời khỏi Buồng Hồi Sức</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-bold text-purple-400">
            {initialCase.specialty}
          </span>
          <span className="rounded-full border border-hospital-700 bg-hospital-800 px-2.5 py-0.5 font-semibold text-slate-300">
            Độ khó: {initialCase.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Code Blue Emergency Rescue Banner */}
      {simState.isCodeBlue && (
        <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/70 p-3 sm:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-lg animate-bounce">
              <Siren className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-rose-200">
                BÁO ĐỘNG ĐỎ: NGỪNG TUẦN HOÀN HÔ HẤP (CARDIAC ARREST)
              </h3>
              <p className="text-xs text-rose-300">
                {simState.codeBlueReason || "Bệnh nhân trụy mạch, dải nhịp chuyển sang loạn nhịp tử vong!"}
              </p>
            </div>
          </div>

          <button
            onClick={handleEmergencyDefibrillation}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 shrink-0"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>Sốc Điện Phá Rung / CPR Ngay</span>
          </button>
        </div>
      )}

      {/* Bedside Telemetry Monitor */}
      <BedsideMonitor
        vitals={simState.currentVitals}
        isCodeBlue={simState.isCodeBlue}
        codeBlueReason={simState.codeBlueReason}
      />

      {/* Sticky Floating Emergency Code Blue Action Bar on Portrait & Desktop */}
      {simState.isCodeBlue && (
        <div className="fixed bottom-16 sm:bottom-6 left-3 right-3 max-w-xl mx-auto z-50 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-rose-700 via-red-600 to-amber-600 text-white shadow-2xl flex items-center justify-between gap-2.5 animate-pulse border-2 border-amber-300">
          <div className="flex items-center gap-2 truncate">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-rose-600 shadow animate-bounce">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <div className="truncate text-xs">
              <div className="font-black text-amber-200 uppercase tracking-tight">NGỪNG TIM! BÁO ĐỘNG ĐỎ</div>
              <div className="truncate text-[10px] text-rose-100">{simState.codeBlueReason || "Kích hoạt ép tim CPR & Khử rung"}</div>
            </div>
          </div>
          <button
            onClick={handleEmergencyDefibrillation}
            className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Sốc Điện 200J</span>
          </button>
        </div>
      )}

      {/* Patient Profile View */}
      <PatientBedsideView
        profile={initialCase.patientProfile}
        elapsedSeconds={simState.elapsedSeconds}
      />

      {/* 5-Step Clinical Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-hospital-800 pb-1.5 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab("anamnesis")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "anamnesis"
              ? "bg-teal-600 text-white shadow-md shadow-teal-950/50"
              : "bg-hospital-900 text-slate-300 hover:bg-hospital-800"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>1. Hỏi Bệnh ({simState.answeredQuestionIds.length}/{initialCase.anamnesisQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("exam")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "exam"
              ? "bg-teal-600 text-white shadow-md shadow-teal-950/50"
              : "bg-hospital-900 text-slate-300 hover:bg-hospital-800"
          }`}
        >
          <Stethoscope className="h-3.5 w-3.5" />
          <span>2. Khám Thực Thể ({simState.performedExamSystems.length}/{initialCase.physicalExam.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("paraclinical")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "paraclinical"
              ? "bg-teal-600 text-white shadow-md shadow-teal-950/50"
              : "bg-hospital-900 text-slate-300 hover:bg-hospital-800"
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>3. Cận Lâm Sàng</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "orders"
              ? "bg-teal-600 text-white shadow-md shadow-teal-950/50"
              : "bg-hospital-900 text-slate-300 hover:bg-hospital-800"
          }`}
        >
          <Pill className="h-3.5 w-3.5" />
          <span>4. Y Lệnh ({simState.appliedOrderIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("disposition")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "disposition"
              ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
              : "bg-hospital-900 text-slate-300 hover:bg-hospital-800"
          }`}
        >
          <Send className="h-3.5 w-3.5" />
          <span>5. Chẩn Đoán & Tuyến</span>
        </button>
      </div>

      {/* Main Tab Panel Display */}
      <div>
        {/* Step 1: Anamnesis */}
        {activeTab === "anamnesis" && (
          <div className="rounded-2xl border border-hospital-800 bg-hospital-900/90 p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-hospital-800 pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-teal-400" />
                <h3 className="font-bold text-white text-xs sm:text-sm">Hỏi Bệnh Sử & Khai Thác Triệu Chứng</h3>
              </div>
              <span className="text-[11px] text-slate-400">Chọn câu hỏi để khai thác từ người bệnh</span>
            </div>

            <div className="space-y-2">
              {initialCase.anamnesisQuestions.map((q) => {
                const isAsked = simState.answeredQuestionIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                      isAsked
                        ? "border-hospital-700 bg-hospital-950/70"
                        : "border-hospital-800 bg-hospital-950/40 hover:border-teal-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="font-medium text-xs sm:text-sm text-slate-200">
                        ❓ "{q.questionText}"
                      </div>
                      {!isAsked ? (
                        <button
                          onClick={() => handleAskQuestion(q.id)}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          Hỏi
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 shrink-0">
                          <CheckCircle2 className="h-3 w-3" /> Đã hỏi
                        </span>
                      )}
                    </div>

                    {/* Answer Reveal */}
                    {isAsked && (
                      <div className="mt-2 pt-2 border-t border-hospital-800/80 space-y-1 text-xs">
                        <div className="text-amber-200">
                          <span className="font-bold text-white">Bệnh nhân: </span>
                          "{q.answerText}"
                        </div>
                        <div className="text-teal-300 italic text-[11px]">
                          💡 <span className="font-semibold">Định hướng:</span> {q.clinicalClue}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Physical Exam */}
        {activeTab === "exam" && (
          <div className="rounded-2xl border border-hospital-800 bg-hospital-900/90 p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-hospital-800 pb-2">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-teal-400" />
                <h3 className="font-bold text-white text-xs sm:text-sm">Khám Thực Thể Theo Hệ Cơ Quan</h3>
              </div>
              <span className="text-[11px] text-slate-400">Khám phát hiện triệu chứng</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {initialCase.physicalExam.map((exam) => {
                const isExamined = simState.performedExamSystems.includes(exam.system);
                return (
                  <div
                    key={exam.system}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                      isExamined
                        ? "border-hospital-700 bg-hospital-950/70"
                        : "border-hospital-800 bg-hospital-950/40 hover:border-teal-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-teal-400 block">
                          Hệ {exam.system}
                        </span>
                        <div className="font-medium text-xs sm:text-sm text-white">{exam.action}</div>
                      </div>
                      {!isExamined ? (
                        <button
                          onClick={() => handlePerformExam(exam.system)}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          Khám
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 shrink-0">
                          <CheckCircle2 className="h-3 w-3" /> Đã khám
                        </span>
                      )}
                    </div>

                    {/* Result */}
                    {isExamined && (
                      <div
                        className={`mt-2 p-2 rounded-lg border text-xs leading-relaxed ${
                          exam.isAbnormal
                            ? "bg-amber-950/30 border-amber-800/50 text-amber-200"
                            : "bg-hospital-900/60 border-hospital-800 text-slate-300"
                        }`}
                      >
                        <span className="font-bold text-white block mb-0.5 text-[11px]">
                          {exam.isAbnormal ? "⚠️ Bất thường:" : "✅ Bình thường:"}
                        </span>
                        {exam.finding}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Paraclinical Station */}
        {activeTab === "paraclinical" && (
          <ParaclinicalStation
            data={initialCase.paraclinical}
            patientName={initialCase.patientProfile.name}
            patientAge={initialCase.patientProfile.age}
            patientGender={initialCase.patientProfile.gender === "male" ? "Nam" : "Nữ"}
            caseId={initialCase.id}
            onLogParaclinicalView={handleLogParaclinicalView}
          />
        )}

        {/* Step 4: Medical Orders Sheet */}
        {activeTab === "orders" && (
          <MedicalOrderSheet
            orders={initialCase.availableOrders}
            appliedOrderIds={simState.appliedOrderIds}
            onExecuteOrder={handleExecuteOrder}
            isCodeBlue={simState.isCodeBlue}
          />
        )}

        {/* Step 5: Final Diagnosis & Disposition */}
        {activeTab === "disposition" && (
          <div className="rounded-2xl border border-hospital-800 bg-hospital-900/90 p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 border-b border-hospital-800 pb-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Send className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Bước 5: Chẩn Đoán Xác Định & Quyết Định Chuyển Tuyến
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tổng hợp dữ kiện để ra quyết định điều trị cuối cùng
                </p>
              </div>
            </div>

            {/* Diagnosis Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Chẩn đoán xác định của Bác sĩ:
              </label>
              <div className="space-y-1.5">
                {[
                  initialCase.goldStandardDiagnosis,
                  ...initialCase.differentialDiagnoses,
                ].map((diag) => (
                  <label
                    key={diag}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      selectedDiagnosis === diag
                        ? "border-purple-500 bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/50"
                        : "border-hospital-800 bg-hospital-950/50 text-slate-300 hover:border-hospital-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="diagnosis"
                      value={diag}
                      checked={selectedDiagnosis === diag}
                      onChange={() => setSelectedDiagnosis(diag)}
                      className="mt-0.5 accent-purple-500"
                    />
                    <span className="text-xs font-semibold leading-relaxed">{diag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Disposition Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Quyết định xử trí chuyển khoa / can thiệp:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { id: "cath_lab", label: "Phòng Can Thiệp Mạch Vành (Cath Lab)", desc: "Nong mạch đặt Stent cấp cứu" },
                  { id: "emergency_or", label: "Phòng Mổ Cấp Cứu (Emergency OR)", desc: "Mổ mở bụng / mở sọ giải áp" },
                  { id: "icu", label: "Khoa Hồi Sức Tích Cực (ICU)", desc: "Thở máy, huyết động xâm lấn" },
                  { id: "medical_ward", label: "Khoa Nội Điều Trị Theo Dõi", desc: "Bệnh nhân ổn định" },
                  { id: "discharge", label: "Kê Đơn Cho Xuất Viện Về Nhà", desc: "Theo dõi ngoại trú an toàn" },
                ].map((disp) => (
                  <button
                    key={disp.id}
                    onClick={() => setSelectedDisposition(disp.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedDisposition === disp.id
                        ? "border-purple-500 bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/50"
                        : "border-hospital-800 bg-hospital-950/50 text-slate-300 hover:border-hospital-700"
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{disp.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{disp.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-hospital-800 flex justify-end">
              <button
                onClick={handleSubmitDisposition}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/50 transition-all active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Nộp Kết Quả & Xem Đánh Giá</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Timeline Audit Log */}
      <ClinicalLogTimeline logs={simState.timelineLogs} />

      {/* Debriefing Evaluation Modal */}
      {simState.isFinished && (
        <ClinicalDebriefingModal state={simState} onRestart={handleRestart} />
      )}
    </div>
  );
};
