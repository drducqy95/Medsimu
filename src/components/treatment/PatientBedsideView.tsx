"use client";

import React from "react";
import { PatientProfile, TriageAcuity, PatientAppearance } from "@/domain/treatment/types";
import {
  User,
  AlertCircle,
  Clock,
  ShieldAlert,
  HeartCrack,
  Activity,
  Flame,
  UserCheck,
} from "lucide-react";

interface PatientBedsideViewProps {
  profile: PatientProfile;
  elapsedSeconds: number;
  timeLimitSeconds?: number;
}

export const PatientBedsideView: React.FC<PatientBedsideViewProps> = ({
  profile,
  elapsedSeconds,
  timeLimitSeconds = 600, // 10 minutes Golden Window
}) => {
  const remainingSeconds = Math.max(0, timeLimitSeconds - elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const isTimeCritical = remainingSeconds < 120; // under 2 mins left

  const getAcuityColor = (acuity: TriageAcuity) => {
    switch (acuity) {
      case "ESI-1":
        return "border-rose-500 bg-rose-500/20 text-rose-300";
      case "ESI-2":
        return "border-amber-500 bg-amber-500/20 text-amber-300";
      case "ESI-3":
        return "border-yellow-500 bg-yellow-500/20 text-yellow-300";
    }
  };

  const getAppearanceBadge = (app: PatientAppearance) => {
    switch (app) {
      case "sweating_chest_pain":
        return {
          icon: <HeartCrack className="h-4 w-4 text-rose-400" />,
          label: "Đau ngực dữ dội, vã mồ hôi ôm ngực",
          bg: "bg-rose-950/40 border-rose-800 text-rose-200",
        };
      case "severe_respiratory_distress":
        return {
          icon: <Activity className="h-4 w-4 text-cyan-400" />,
          label: "Suy hô hấp cấp, thở co kéo hõm ức",
          bg: "bg-cyan-950/40 border-cyan-800 text-cyan-200",
        };
      case "cyanotic":
        return {
          icon: <AlertCircle className="h-4 w-4 text-indigo-400" />,
          label: "Tím tái môi và đầu ngón tay",
          bg: "bg-indigo-950/40 border-indigo-800 text-indigo-200",
        };
      case "unresponsive":
        return {
          icon: <ShieldAlert className="h-4 w-4 text-purple-400" />,
          label: "Hôn mê, gọi hỏi không đáp ứng",
          bg: "bg-purple-950/40 border-purple-800 text-purple-200",
        };
      default:
        return {
          icon: <UserCheck className="h-4 w-4 text-emerald-400" />,
          label: "Tỉnh táo, tiếp xúc tốt",
          bg: "bg-emerald-950/40 border-emerald-800 text-emerald-200",
        };
    }
  };

  const appInfo = getAppearanceBadge(profile.appearance);

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 backdrop-blur shadow-xl space-y-4">
      {/* Patient Header & Golden Hour Countdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hospital-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-hospital-800 text-hospital-300 border border-hospital-700">
            <User className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{profile.name}</h3>
              <span className="text-xs text-slate-400">
                ({profile.age} tuổi • {profile.gender === "male" ? "Nam" : "Nữ"} • {profile.weightKg} kg)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getAcuityColor(
                  profile.triageAcuity
                )}`}
              >
                Phân Loại Cấp Cứu: {profile.triageAcuity}
              </span>
            </div>
          </div>
        </div>

        {/* Golden Hour Countdown Timer */}
        <div
          className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${
            isTimeCritical
              ? "border-rose-500 bg-rose-950/60 text-rose-300 animate-pulse"
              : "border-hospital-700 bg-hospital-950/80 text-slate-200"
          }`}
        >
          <Clock className={`h-5 w-5 ${isTimeCritical ? "text-rose-400" : "text-teal-400"}`} />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Thời Gian Vàng Cấp Cứu
            </div>
            <div className="font-mono text-xl font-black">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Chief Complaint Quote Box */}
      <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Lý do vào viện (Chief Complaint):
        </div>
        <p className="text-sm font-medium text-amber-200 italic">
          "{profile.chiefComplaint}"
        </p>
      </div>

      {/* Patient Physical Presentation & Warning Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Appearance Banner */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${appInfo.bg}`}>
          {appInfo.icon}
          <div>
            <span className="font-bold text-white block">Tri giác & Dáng vẻ:</span>
            <span>{appInfo.label}</span>
          </div>
        </div>

        {/* Allergy Alert */}
        <div className="p-3 rounded-xl border border-rose-900/40 bg-rose-950/20 text-rose-300 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <span className="font-bold text-white block">Tiền sử Dị ứng:</span>
            <span className="font-medium text-rose-200">
              {profile.allergies.length > 0 ? profile.allergies.join(", ") : "Chưa ghi nhận dị ứng"}
            </span>
          </div>
        </div>
      </div>

      {/* Past Medical History Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
        <span className="font-semibold text-slate-300">Tiền căn bệnh lý:</span>
        {profile.pastMedicalHistory.map((item, idx) => (
          <span
            key={idx}
            className="rounded-lg border border-hospital-800 bg-hospital-800/60 px-2.5 py-1 text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
