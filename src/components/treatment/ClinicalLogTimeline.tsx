"use client";

import React from "react";
import { TimelineLogEntry } from "@/domain/simulation/treatmentStateMachine";
import {
  ListFilter,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Sparkles,
  Siren,
} from "lucide-react";

interface ClinicalLogTimelineProps {
  logs: TimelineLogEntry[];
}

export const ClinicalLogTimeline: React.FC<ClinicalLogTimelineProps> = ({ logs }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `+${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getBadgeIcon = (type: TimelineLogEntry["badgeType"]) => {
    switch (type) {
      case "danger":
        return <Siren className="h-4 w-4 text-rose-400 shrink-0 mt-0.5 animate-bounce" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />;
      default:
        return <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />;
    }
  };

  const getBorderColor = (type: TimelineLogEntry["badgeType"]) => {
    switch (type) {
      case "danger":
        return "border-rose-500/50 bg-rose-950/20 text-rose-200";
      case "warning":
        return "border-amber-500/40 bg-amber-950/20 text-amber-200";
      case "success":
        return "border-emerald-500/40 bg-emerald-950/20 text-emerald-200";
      default:
        return "border-hospital-800 bg-hospital-950/60 text-slate-300";
    }
  };

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 backdrop-blur shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-hospital-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-teal-400" />
          <h3 className="font-bold text-white text-base">
            Nhật Ký Xử Trí Lâm Sàng (Clinical Chronology Timeline)
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {logs.length} sự kiện ghi nhận
        </span>
      </div>

      {/* Log Feed */}
      <div className="max-h-64 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 transition-all ${getBorderColor(
              log.badgeType
            )}`}
          >
            {getBadgeIcon(log.badgeType)}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-mono text-[10px] text-slate-400 font-bold">
                  {formatTime(log.timestampSeconds)}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {log.category}
                </span>
              </div>
              <p>{log.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
