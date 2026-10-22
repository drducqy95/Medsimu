"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  AlertTriangle,
  Siren,
  Activity,
  Heart,
  Pill,
  ShieldAlert,
  ArrowRight,
  ClipboardList,
  Sparkles,
  Stethoscope,
  Clock,
  User,
  Zap,
} from "lucide-react";
import {
  EMERGENCY_DRUGS,
  EMERGENCY_INTERVENTIONS,
  getEmergencyProtocolForRhythm,
  checkEmergencyContraindications,
} from "@/domain/simulators/ecgEmergencyProtocols";

export interface PatientCaseData {
  age: number;
  gender: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    spO2: number;
    temperature: number;
  };
  labResults: Record<string, string>;
}

export interface EcgClinicalDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  rhythmId: string;
  rhythmName: string;
  anatomicalRegion?: string;
  systemName?: string;
  criteria?: string[];
  patientCase?: PatientCaseData;
}

export function EcgClinicalDeckModal({
  isOpen,
  onClose,
  rhythmId,
  rhythmName,
  anatomicalRegion,
  systemName,
  criteria,
  patientCase,
}: EcgClinicalDeckModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"patient" | "protocol" | "drugs" | "contraindications">("patient");

  if (!isOpen) return null;

  const protocol = getEmergencyProtocolForRhythm(rhythmId);

  const handleTransferToErWard = () => {
    // Save current clinical scenario to sessionStorage for ER Ward ingestion
    const erPayload = {
      source: "ecg_simulator",
      rhythmId,
      rhythmName,
      patientName: `Bệnh nhân ${patientCase?.gender || "Nam"} ${patientCase?.age || 60}T`,
      age: patientCase?.age || 60,
      gender: patientCase?.gender || "Nam",
      chiefComplaint: patientCase?.chiefComplaint || "Rối loạn nhịp tim cấp tính",
      historyOfPresentIllness: patientCase?.historyOfPresentIllness || "",
      vitals: patientCase?.vitals || {
        bloodPressure: "120/80 mmHg",
        heartRate: 75,
        respiratoryRate: 18,
        spO2: 97,
        temperature: 36.8,
      },
      labResults: patientCase?.labResults || {},
      protocolPriority: protocol.priorityLevel,
      goldStandardDiagnosis: rhythmName,
      timestamp: Date.now(),
    };

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("medsim_er_direct_patient", JSON.stringify(erPayload));
    }

    // Direct routing to treatment lobby or specific treatment case
    if (rhythmId === "stemi_inferior") {
      router.push("/treatment/case-inferior-stemi-rv");
    } else {
      router.push("/treatment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-hospital-700 bg-hospital-950 text-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-hospital-800 bg-gradient-to-r from-hospital-900 via-hospital-900 to-rose-950/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg">
              <Siren className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  {systemName || "Hệ Thống Tim Mạch"}
                </span>
                {anatomicalRegion && (
                  <span className="rounded-md bg-hospital-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    Vùng: {anatomicalRegion}
                  </span>
                )}
                <span className="rounded-full bg-rose-900/60 border border-rose-500/40 px-2.5 py-0.5 text-[10px] font-black text-rose-300">
                  {protocol.priorityLevel}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {rhythmName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-hospital-800 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-hospital-800 bg-hospital-900/60 px-5 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("patient")}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "patient"
                ? "border-rose-500 text-rose-300 bg-rose-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Hồ Sơ Ca Bệnh Lâm Sàng</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("protocol")}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "protocol"
                ? "border-emerald-500 text-emerald-300 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            <span>Phác Đồ Cấp Cứu Chuẩn (ACLS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("drugs")}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "drugs"
                ? "border-cyan-500 text-cyan-300 bg-cyan-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Pill className="h-4 w-4" />
            <span>Dược Thư & Liều Dùng</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contraindications")}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "contraindications"
                ? "border-amber-500 text-amber-300 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Cạm Bẫy Cấm Kỵ (Red Flags)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {/* TAB 1: PATIENT CASE */}
          {activeTab === "patient" && (
            <div className="space-y-4">
              {patientCase ? (
                <>
                  {/* Demographics & Chief Complaint */}
                  <div className="rounded-2xl border border-hospital-800 bg-hospital-900/70 p-4 space-y-2">
                    <div className="flex items-center justify-between text-slate-300 font-semibold text-xs border-b border-hospital-800 pb-2">
                      <span>Tuổi: <strong className="text-white">{patientCase.age} tuổi</strong></span>
                      <span>Giới tính: <strong className="text-white">{patientCase.gender}</strong></span>
                      <span>Khoa tiếp nhận: <strong className="text-rose-400">Khoa Cấp Cứu (ED)</strong></span>
                    </div>
                    <div>
                      <span className="text-rose-400 font-bold block mb-1">Lý do vào viện (Chief Complaint):</span>
                      <p className="text-slate-200 text-sm font-semibold">{patientCase.chiefComplaint}</p>
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-400 font-bold block mb-1">Bệnh sử hiện tại (HPI):</span>
                      <p className="text-slate-300 leading-relaxed text-xs">{patientCase.historyOfPresentIllness}</p>
                    </div>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">Huyết áp</span>
                      <span className="text-sm font-black text-rose-400 font-mono">{patientCase.vitals.bloodPressure}</span>
                    </div>
                    <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">Nhịp tim</span>
                      <span className="text-sm font-black text-emerald-400 font-mono">{patientCase.vitals.heartRate} bpm</span>
                    </div>
                    <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">Nhịp thở</span>
                      <span className="text-sm font-black text-cyan-400 font-mono">{patientCase.vitals.respiratoryRate} l/p</span>
                    </div>
                    <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">SpO2</span>
                      <span className="text-sm font-black text-amber-400 font-mono">{patientCase.vitals.spO2}%</span>
                    </div>
                    <div className="rounded-xl border border-hospital-800 bg-hospital-900/60 p-2.5 text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 font-bold block">Thân nhiệt</span>
                      <span className="text-sm font-black text-slate-200 font-mono">{patientCase.vitals.temperature}°C</span>
                    </div>
                  </div>

                  {/* Lab Results */}
                  {patientCase.labResults && Object.keys(patientCase.labResults).length > 0 && (
                    <div className="rounded-2xl border border-hospital-800 bg-hospital-900/70 p-4 space-y-2">
                      <h4 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                        <Activity className="h-4 w-4" />
                        <span>Kết quả xét nghiệm cấp cứu tại giường (STAT Labs):</span>
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs">
                        {Object.entries(patientCase.labResults).map(([testName, result]) => (
                          <div key={testName} className="flex justify-between p-2 rounded-lg bg-hospital-950/70 border border-hospital-800">
                            <span className="text-slate-400 font-medium">{testName}:</span>
                            <span className="text-white font-mono font-bold">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Criteria Gold Standard Quick Preview */}
                  {criteria && criteria.length > 0 && (
                    <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 space-y-2">
                      <h4 className="font-bold text-rose-400 text-xs flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Tiêu chuẩn chẩn đoán vàng trên điện tim:</span>
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-xs">
                        {criteria.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  Đang cập nhật hồ sơ ca bệnh chi tiết.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMERGENCY PROTOCOL */}
          {activeTab === "protocol" && (
            <div className="space-y-4">
              {/* Primary Goal Banner */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-emerald-200">
                <span className="font-bold text-emerald-400 text-xs block mb-1">MỤC TIÊU ĐIỀU TRỊ HÀNG ĐẦU:</span>
                <p className="text-sm font-semibold">{protocol.primaryGoal}</p>
                <div className="mt-2 text-xs text-emerald-300/80">
                  Đích điều chuyển: <strong className="text-white">{protocol.targetDisposition}</strong>
                </div>
              </div>

              {/* Step-by-step Action Sequence */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                  Trình Tự Xử Trí Khẩn Cấp Từng Bước:
                </h4>
                {protocol.actionSequence.map((act) => (
                  <div
                    key={act.step}
                    className="flex items-start gap-3 rounded-2xl border border-hospital-800 bg-hospital-900/70 p-3.5 hover:border-hospital-700 transition"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-black text-xs border border-rose-500/30">
                      {act.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-white text-xs sm:text-sm">{act.action}</div>
                      <div className="text-slate-300 text-xs leading-relaxed">{act.details}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Interventions */}
              {protocol.recommendedInterventions.length > 0 && (
                <div className="rounded-2xl border border-hospital-800 bg-hospital-900/70 p-4 space-y-2">
                  <h4 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    <span>Thủ thuật & Can thiệp điện học chỉ định:</span>
                  </h4>
                  <div className="space-y-2">
                    {protocol.recommendedInterventions.map((intId) => {
                      const item = EMERGENCY_INTERVENTIONS[intId];
                      if (!item) return null;
                      return (
                        <div key={intId} className="rounded-xl border border-hospital-800 bg-hospital-950/70 p-3 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{item.name}</span>
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                              {item.energyOrSetting}
                            </span>
                          </div>
                          <p className="text-slate-300 text-xs">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DRUGS & DOSAGES */}
          {activeTab === "drugs" && (
            <div className="space-y-4">
              {/* First Line Drugs */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="h-4 w-4" />
                  <span>Thuốc Ưu Tiên Hàng 1 (First-Line):</span>
                </h4>
                {protocol.firstLineDrugs.length > 0 ? (
                  <div className="space-y-2.5">
                    {protocol.firstLineDrugs.map((drugId) => {
                      const drug = EMERGENCY_DRUGS[drugId];
                      if (!drug) return null;
                      return (
                        <div key={drugId} className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-black text-sm text-emerald-300">
                              {drug.name} {drug.brandName && `(${drug.brandName})`}
                            </div>
                            <span className="text-[10px] text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded-md font-semibold">
                              {drug.category}
                            </span>
                          </div>
                          <div className="text-white font-mono font-bold text-xs bg-hospital-950/80 p-2 rounded-lg border border-hospital-800">
                            Liều lượng: {drug.dosage}
                          </div>
                          <p className="text-slate-300 text-xs">{drug.administrationInstructions}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">Không yêu cầu dùng thuốc chống loạn nhịp hàng 1 đặc hiệu.</p>
                )}
              </div>

              {/* Second Line Drugs */}
              {protocol.secondLineDrugs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-hospital-800">
                  <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                    Thuốc Bổ Trợ / Hàng 2 (Second-Line):
                  </h4>
                  <div className="space-y-2.5">
                    {protocol.secondLineDrugs.map((drugId) => {
                      const drug = EMERGENCY_DRUGS[drugId];
                      if (!drug) return null;
                      return (
                        <div key={drugId} className="rounded-2xl border border-hospital-800 bg-hospital-900/60 p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-sm text-slate-200">
                              {drug.name} {drug.brandName && `(${drug.brandName})`}
                            </div>
                            <span className="text-[10px] text-slate-400 bg-hospital-800 px-2 py-0.5 rounded-md">
                              {drug.category}
                            </span>
                          </div>
                          <div className="text-cyan-200 font-mono text-xs bg-hospital-950/80 p-2 rounded-lg border border-hospital-800">
                            Liều lượng: {drug.dosage}
                          </div>
                          <p className="text-slate-400 text-xs">{drug.administrationInstructions}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RED FLAGS & CONTRAINDICATIONS */}
          {activeTab === "contraindications" && (
            <div className="space-y-4">
              {/* Highlight Banner */}
              <div className="rounded-2xl border border-amber-500/50 bg-amber-950/30 p-4 text-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-300 text-sm">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                  <span>CẢNH BÁO AN TOÀN Y KHOA: CẠM BẪY ĐE DỌA TÍNH MẠNG</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-200">
                  Việc chỉ định sai thuốc hoặc thực hiện sai thủ thuật trong các tình huống cấp cứu này có thể kích phát Rung Thất, Sốc Tim tụt áp không hồi phục hoặc Vô Tâm Thu ngay tức thì.
                </p>
              </div>

              {/* Absolute Contraindications List */}
              <div className="space-y-3">
                {protocol.absoluteContraindications.map((contra, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-rose-900/60 bg-rose-950/30 p-3.5"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xs mt-0.5">
                      ✕
                    </div>
                    <div className="text-rose-200 text-xs font-semibold leading-relaxed">
                      {contra}
                    </div>
                  </div>
                ))}
              </div>

              {/* Specific Rhythms Red Flags Check */}
              {rhythmId === "stemi_inferior" && (
                <div className="rounded-2xl border border-rose-600 bg-rose-950/50 p-4 space-y-2 text-xs">
                  <span className="font-black text-rose-300 text-sm block">⚠️ CẤM TUYỆT ĐỐI NITRAT & MORPHIN</span>
                  <p className="text-slate-200 leading-relaxed">
                    Trong nhồi máu cơ tim thành dưới có kèm thất phải (ST chênh ở V4R), tâm thất phải bị suy sụp mất khả năng bơm máu. Huyết động hoàn toàn phụ thuộc vào áp lực tĩnh mạch đổ về (tiền tải). Dùng Nitroglycerin hoặc Morphin gây giãn hệ tĩnh mạch làm tụt huyết áp thảm họa.
                  </p>
                  <p className="font-bold text-emerald-300">
                    Xử trí đúng: Truyền nhanh dịch muối sinh lý NaCl 0.9% 500-1000ml để bù tiền tải.
                  </p>
                </div>
              )}

              {rhythmId === "wpw_syndrome" && (
                <div className="rounded-2xl border border-rose-600 bg-rose-950/50 p-4 space-y-2 text-xs">
                  <span className="font-black text-rose-300 text-sm block">⚠️ CẤM THUỐC CHẸN NÚT AV (CHẸN BETA, CANXI, DIGOXIN, ADENOSINE)</span>
                  <p className="text-slate-200 leading-relaxed">
                    Nếu bệnh nhân lên cơn rung nhĩ trên nền WPW, ức chế nút AV sẽ hướng toàn bộ hàng trăm xung động nhĩ cực nhanh qua cầu Kent (đường phụ), biến rung nhĩ thành Rung Thất gây đột tử trong tích tắc.
                  </p>
                  <p className="font-bold text-emerald-300">
                    Xử trí đúng: Sốc điện đồng bộ nếu tụt HA, hoặc dùng Procainamide / Ibutilide.
                  </p>
                </div>
              )}

              {rhythmId === "asystole" && (
                <div className="rounded-2xl border border-rose-600 bg-rose-950/50 p-4 space-y-2 text-xs">
                  <span className="font-black text-rose-300 text-sm block">⚠️ TUYỆT ĐỐI CẤM SỐC ĐIỆN PHÁ RUNG TRÊN ĐƯỜNG ĐẲNG ĐIỆN</span>
                  <p className="text-slate-200 leading-relaxed">
                    Vô tâm thu hoàn toàn không có hoạt động điện để khử cực. Phóng điện chỉ gây bỏng cơ tim và lãng phí thời gian ép tim cứu mạng.
                  </p>
                  <p className="font-bold text-emerald-300">
                    Xử trí đúng: Ép tim CPR liên tục + Tiêm Adrenaline 1mg IV mỗi 3-5 phút.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Direct ER Ward Transfer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-hospital-800 bg-hospital-900/90 p-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Đơn vị đích: </span>
            <strong className="text-rose-400">{protocol.targetDisposition}</strong>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial rounded-xl border border-hospital-700 bg-hospital-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-hospital-750 transition cursor-pointer"
            >
              Đóng Lại
            </button>

            <button
              type="button"
              onClick={handleTransferToErWard}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-rose-950/60 hover:from-rose-500 hover:to-red-500 transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <Siren className="h-4 w-4 animate-bounce" />
              <span>Chuyển Vào Buồng Cấp Cứu (Module 3)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
