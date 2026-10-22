"use client";

import React, { useState } from "react";
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
  ChevronDown,
  ChevronUp,
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

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
    <div className="rounded-2xl border border-hospital-800 bg-hospital-900/90 p-2.5 sm:p-4 backdrop-blur shadow-lg space-y-2 sm:space-y-2.5">
      {/* Patient Header & Golden Hour Countdown */}
      <div className="flex items-center justify-between gap-2 border-b border-hospital-800 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-hospital-800 text-hospital-300 border border-hospital-700">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xs sm:text-base font-bold text-white truncate">{profile.name}</h3>
              <span className="text-[10px] sm:text-xs text-slate-400">
                ({profile.age}t • {profile.gender === "male" ? "Nam" : "Nữ"} • {profile.weightKg}kg)
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] font-bold border ${getAcuityColor(
                  profile.triageAcuity
                )}`}
              >
                {profile.triageAcuity}
              </span>
              {profile.allergies.length > 0 && (
                <span className="text-[9px] text-rose-400 font-bold bg-rose-950/80 border border-rose-800 px-1 rounded truncate max-w-[120px] sm:max-w-none">
                  ⚠️ Dị ứng: {profile.allergies.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Golden Hour Countdown Timer & Mobile Accordion Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border ${
              isTimeCritical
                ? "border-rose-500 bg-rose-950/60 text-rose-300 animate-pulse"
                : "border-hospital-700 bg-hospital-950/80 text-slate-200"
            }`}
          >
            <Clock className={`h-3.5 w-3.5 ${isTimeCritical ? "text-rose-400" : "text-teal-400"}`} />
            <div>
              <div className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold hidden xs:block">
                Thời Gian Vàng
              </div>
              <div className="font-mono text-xs sm:text-base font-black leading-none">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:hidden flex h-7 w-7 items-center justify-center rounded-lg bg-hospital-800 border border-hospital-700 text-slate-300 hover:text-white"
            aria-label={isCollapsed ? "Mở rộng hồ sơ" : "Thu gọn hồ sơ"}
          >
            {isCollapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Accordion Body: Always visible on desktop (md:block), collapsible on mobile */}
      <div className={`space-y-2 ${isCollapsed ? "hidden md:block" : "block"}`}>
        {/* Chief Complaint Quote Box */}
        <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2 text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] mr-1.5">
            Lý do vào viện:
          </span>
          <span className="font-medium text-amber-200 italic text-[11px]">
            "{profile.chiefComplaint}"
          </span>
        </div>

        {/* Patient Physical Presentation & Warning Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs">
          {/* Appearance Banner */}
          <div className={`p-2 rounded-xl border flex items-center gap-2 ${appInfo.bg}`}>
            {appInfo.icon}
            <div className="min-w-0">
              <span className="font-bold text-white text-[10.5px]">Tri giác & Dáng vẻ: </span>
              <span className="text-[10.5px]">{appInfo.label}</span>
            </div>
          </div>

          {/* Allergy Alert */}
          <div className="p-2 rounded-xl border border-rose-900/40 bg-rose-950/20 text-rose-300 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
            <div className="min-w-0">
              <span className="font-bold text-white text-[10.5px]">Dị ứng: </span>
              <span className="font-medium text-rose-200 text-[10.5px]">
                {profile.allergies.length > 0 ? profile.allergies.join(", ") : "Chưa ghi nhận"}
              </span>
            </div>
          </div>
        </div>

        {/* Past Medical History Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-0.5">
          <span className="font-semibold text-slate-300 text-[10.5px]">Tiền căn:</span>
          {profile.pastMedicalHistory.map((item, idx) => (
            <span
              key={idx}
              className="rounded-md border border-hospital-800 bg-hospital-800/60 px-1.5 py-0.5 text-[10px] text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
