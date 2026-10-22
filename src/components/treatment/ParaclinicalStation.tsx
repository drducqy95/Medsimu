"use client";

import React, { useState } from "react";
import { ParaclinicalStationData } from "@/domain/treatment/types";
import {
  Activity,
  Radio,
  FileText,
  Scan,
  FlaskConical,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { TwelveLeadGrid } from "@/components/simulators/ecg/TwelveLeadGrid";
import { RealisticPinkEcgPaper } from "@/components/simulators/ecg/RealisticPinkEcgPaper";
import { DynamicUltrasoundScreen } from "@/components/simulators/ultrasound/DynamicUltrasoundScreen";
import { RealUltrasoundAtlasViewer } from "@/components/simulators/ultrasound/RealUltrasoundAtlasViewer";
import { XrayViewer } from "@/components/simulators/xray/XrayViewer";
import { CtSliceViewer } from "@/components/simulators/ct/CtSliceViewer";
import { XRAY_CASES } from "@/data/simulators/xrayCases";
import { CT_CASES } from "@/data/simulators/ctCases";
import { UltrasoundZone, ProbeType } from "@/data/simulators/ultrasoundCases";

interface ParaclinicalStationProps {
  data: ParaclinicalStationData;
  patientName?: string;
  patientAge?: number;
  patientGender?: "Nam" | "Nữ";
  caseId?: string;
  onLogParaclinicalView: (toolName: string) => void;
}

export const ParaclinicalStation: React.FC<ParaclinicalStationProps> = ({
  data,
  patientName = "BỆNH NHÂN CẤP CỨU",
  patientAge = 60,
  patientGender = "Nam",
  caseId = "STAT-01",
  onLogParaclinicalView,
}) => {
  const [activeModal, setActiveModal] = useState<"ecg" | "ultrasound" | "xray" | "ct" | "labs" | null>(null);
  const [ecgSubMode, setEcgSubMode] = useState<"pink_paper" | "grid">("pink_paper");
  const [usSubMode, setUsSubMode] = useState<"real_atlas" | "probe">("real_atlas");

  // Default parameters for ultrasound
  const [usZone, setUsZone] = useState<UltrasoundZone>(data.ultrasoundZoneId || "subxiphoid");
  const [usProbe, setUsProbe] = useState<ProbeType>("convex");

  const handleOpenTool = (tool: "ecg" | "ultrasound" | "xray" | "ct" | "labs") => {
    setActiveModal(tool);
    const names = {
      ecg: "Điện tâm đồ 12 chuyển đạo",
      ultrasound: "Siêu âm POCUS tại giường",
      xray: "Phim chụp X-quang",
      ct: "Cắt lớp vi tính CT-Scanner",
      labs: "Xét nghiệm máu khẩn",
    };
    onLogParaclinicalView(names[tool]);
  };

  const handleClose = () => setActiveModal(null);

  // Match corresponding X-ray and CT case objects
  const matchingXray = XRAY_CASES.find((x) => x.id === data.xrayCaseId) || XRAY_CASES[0];
  const matchingCt = CT_CASES.find((c) => c.id === data.ctCaseId) || CT_CASES[0];

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 backdrop-blur shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-hospital-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-teal-400" />
          <h3 className="font-bold text-white text-base">
            Trạm Cận Lâm Sàng & Thăm Dò Chẩn Đoán Tại Giường
          </h3>
        </div>
        <span className="text-xs text-slate-400">Tích hợp Module 2</span>
      </div>

      <p className="text-xs text-slate-300">
        Bác sĩ có thể thao tác trực tiếp các công cụ chẩn đoán hình ảnh và xét nghiệm tại chỗ để
        khẳng định chẩn đoán trước khi quyết định can thiệp:
      </p>

      {/* Grid of 5 Quick Launch Paraclinical Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* ECG Button */}
        <button
          onClick={() => handleOpenTool("ecg")}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-hospital-700 bg-hospital-950/60 hover:border-emerald-500 hover:bg-emerald-950/20 text-slate-200 transition-all group shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform mb-2">
            <Radio className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-white text-center">Mắc ECG 12 CĐ</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Dải nhịp & Caliper</span>
        </button>

        {/* Ultrasound POCUS Button */}
        <button
          onClick={() => handleOpenTool("ultrasound")}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-hospital-700 bg-hospital-950/60 hover:border-teal-500 hover:bg-teal-950/20 text-slate-200 transition-all group shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 group-hover:scale-110 transition-transform mb-2">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-white text-center">Siêu Âm POCUS</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Đầu dò ảo 3D FAST</span>
        </button>

        {/* X-Ray Viewer Button */}
        <button
          onClick={() => handleOpenTool("xray")}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-hospital-700 bg-hospital-950/60 hover:border-sky-500 hover:bg-sky-950/20 text-slate-200 transition-all group shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 group-hover:scale-110 transition-transform mb-2">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-white text-center">Soi Phim X-Quang</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Cửa sổ tương phản</span>
        </button>

        {/* CT Scanner Button */}
        <button
          onClick={() => handleOpenTool("ct")}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-hospital-700 bg-hospital-950/60 hover:border-purple-500 hover:bg-purple-950/20 text-slate-200 transition-all group shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform mb-2">
            <Scan className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-white text-center">Cuộn Lát Cắt CT</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Đo tỷ trọng HU</span>
        </button>

        {/* STAT Labs Button */}
        <button
          onClick={() => handleOpenTool("labs")}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-hospital-700 bg-hospital-950/60 hover:border-rose-500 hover:bg-rose-950/20 text-slate-200 transition-all group shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 group-hover:scale-110 transition-transform mb-2">
            <FlaskConical className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-white text-center">Xét Nghiệm Máu</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Troponin, Khí Máu</span>
        </button>
      </div>

      {/* Full-Screen Bedside Interactive Tool Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-hospital-700 bg-hospital-950 p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-hospital-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-white">
                  {activeModal === "ecg" && "Điện Tâm Đồ 12 Chuyển Đạo Cấp Cứu"}
                  {activeModal === "ultrasound" && "Đầu Dò Siêu Âm POCUS / FAST Tại Giường"}
                  {activeModal === "xray" && "Phim Chụp X-Quang Ngực Cấp Cứu"}
                  {activeModal === "ct" && "Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng"}
                  {activeModal === "labs" && "Bảng Kết Quả Xét Nghiệm Máu Khẩn (STAT Labs)"}
                </h4>
              </div>
              <button
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-hospital-800 text-slate-300 hover:bg-hospital-700 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Active Simulator View */}
            <div className="space-y-4">
              {/* 1. ECG 12-Lead Modal */}
              {activeModal === "ecg" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-500/30 bg-teal-950/20 p-3">
                    <div className="text-xs text-teal-200">
                      <span className="font-bold text-white">Dấu hiệu chuyên môn: </span>
                      {data.ecgLeadFindings}
                    </div>

                    <div className="flex rounded-xl bg-hospital-900 p-1 border border-hospital-800">
                      <button
                        onClick={() => setEcgSubMode("pink_paper")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          ecgSubMode === "pink_paper"
                            ? "bg-rose-600 text-white shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Bản In Giấy Hồng 12 Cần
                      </button>
                      <button
                        onClick={() => setEcgSubMode("grid")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          ecgSubMode === "grid"
                            ? "bg-teal-600 text-white shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Lưới Monitor
                      </button>
                    </div>
                  </div>

                  {ecgSubMode === "pink_paper" ? (
                    <RealisticPinkEcgPaper
                      rhythm={data.ecgRhythmId as any}
                      patientName={patientName}
                      patientAge={patientAge}
                      patientGender={patientGender}
                      recordId={caseId}
                    />
                  ) : (
                    <TwelveLeadGrid
                      rhythm={data.ecgRhythmId as any}
                      bpm={80}
                    />
                  )}
                </div>
              )}

              {/* 2. Ultrasound POCUS Modal */}
              {activeModal === "ultrasound" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-500/30 bg-teal-950/20 p-3">
                    <div className="text-xs text-teal-200">
                      <span className="font-bold text-white">Hình ảnh siêu âm ghi nhận: </span>
                      {data.ultrasoundFinding || "Đang quét khảo sát vùng..."}
                    </div>

                    <div className="flex rounded-xl bg-hospital-900 p-1 border border-hospital-800">
                      <button
                        onClick={() => setUsSubMode("real_atlas")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          usSubMode === "real_atlas"
                            ? "bg-teal-600 text-white shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Ảnh Lâm Sàng Thật (Viable CD)
                      </button>
                      <button
                        onClick={() => setUsSubMode("probe")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          usSubMode === "probe"
                            ? "bg-teal-600 text-white shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Đầu Dò FAST Động
                      </button>
                    </div>
                  </div>

                  {usSubMode === "real_atlas" ? (
                    <RealUltrasoundAtlasViewer
                      highlightChapterId={
                        data.ultrasoundZoneId === "ruq"
                          ? "liver"
                          : data.ultrasoundZoneId === "suprapubic"
                          ? "bladder"
                          : data.ultrasoundZoneId === "lung_anterior"
                          ? "thorax"
                          : "liver"
                      }
                    />
                  ) : (
                    <>
                      {/* Zone selector */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(["subxiphoid", "ruq", "luq", "suprapubic", "lung_anterior"] as UltrasoundZone[]).map((z) => (
                          <button
                            key={z}
                            onClick={() => setUsZone(z)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                              usZone === z
                                ? "bg-teal-600 text-white"
                                : "bg-hospital-800 text-slate-300 hover:bg-hospital-700"
                            }`}
                          >
                            {z === "subxiphoid" && "Mũi Ức"}
                            {z === "ruq" && "Morison (RUQ)"}
                            {z === "luq" && "Lách Thận (LUQ)"}
                            {z === "suprapubic" && "Hạ Vị"}
                            {z === "lung_anterior" && "Màng Phổi"}
                          </button>
                        ))}
                      </div>

                      <DynamicUltrasoundScreen
                        zone={usZone}
                        probeType={usProbe}
                        rotationDeg={0}
                        tiltDeg={0}
                        compression={0.4}
                        isPathologyActive={true}
                        onTogglePathology={() => {}}
                      />
                    </>
                  )}
                </div>
              )}

              {/* 3. X-Ray Modal */}
              {activeModal === "xray" && (
                <div className="space-y-4">
                  {data.xrayFinding && (
                    <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3 text-xs text-sky-200">
                      <span className="font-bold text-white">Tổn thương X-quang: </span>
                      {data.xrayFinding}
                    </div>
                  )}
                  <XrayViewer xrayCase={matchingXray} />
                </div>
              )}

              {/* 4. CT Scanner Modal */}
              {activeModal === "ct" && (
                <div className="space-y-4">
                  {data.ctFinding && (
                    <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-3 text-xs text-purple-200">
                      <span className="font-bold text-white">Kết luận CT Cắt Lớp: </span>
                      {data.ctFinding}
                    </div>
                  )}
                  <CtSliceViewer ctCase={matchingCt} />
                </div>
              )}

              {/* 5. STAT Labs Table */}
              {activeModal === "labs" && (
                <div className="rounded-2xl border border-hospital-800 bg-hospital-900/60 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-hospital-800 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3">Chỉ số xét nghiệm</th>
                        <th className="p-3">Kết quả</th>
                        <th className="p-3">Đơn vị</th>
                        <th className="p-3">Khoảng tham chiếu chuẩn</th>
                        <th className="p-3">Đánh giá</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hospital-800/60 text-slate-200">
                      {data.labs.map((lab, idx) => (
                        <tr
                          key={idx}
                          className={lab.isAbnormal ? "bg-rose-950/30 font-semibold" : "hover:bg-hospital-800/30"}
                        >
                          <td className="p-3 text-white">{lab.name}</td>
                          <td className={`p-3 font-mono text-sm ${lab.isAbnormal ? "text-rose-400 font-black" : "text-emerald-400"}`}>
                            {lab.value}
                          </td>
                          <td className="p-3 text-slate-400 font-mono">{lab.unit}</td>
                          <td className="p-3 text-slate-400 font-mono">{lab.referenceRange}</td>
                          <td className="p-3">
                            {lab.isAbnormal ? (
                              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-300 border border-rose-500/30">
                                Bất thường (High Alert)
                              </span>
                            ) : (
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-500/30">
                                Bình thường
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-hospital-800 pt-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-xl bg-hospital-800 text-slate-200 hover:bg-hospital-700 font-semibold text-xs transition-colors"
              >
                Đóng & Quay Lại Giường Bệnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
