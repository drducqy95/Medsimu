"use client";

import React from "react";
import {
  HeartPulse,
  Flame,
  GitFork,
  Waves,
  AlertOctagon,
  Layers,
  Dna,
  Wind,
  FlaskConical,
  Sparkles,
} from "lucide-react";

export interface ClinicalSystemItem {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
  badgeBg: string;
  count: number;
}

export const CLINICAL_SYSTEMS: ClinicalSystemItem[] = [
  {
    id: "all",
    name: "Tất Cả 9 Phân Hệ Lâm Sàng",
    shortName: "Tất Cả (31)",
    icon: Sparkles,
    color: "text-slate-300",
    activeColor: "bg-slate-800 text-white border-slate-600 shadow-md",
    badgeBg: "bg-slate-700 text-slate-200",
    count: 31,
  },
  {
    id: "sinus_node",
    name: "Phân Hệ 1: Bệnh Lý Nút Xoang",
    shortName: "1. Nút Xoang",
    icon: HeartPulse,
    color: "text-emerald-400",
    activeColor: "bg-emerald-950 text-emerald-200 border-emerald-600 shadow-emerald-950/60 shadow-md",
    badgeBg: "bg-emerald-900/80 text-emerald-300",
    count: 3,
  },
  {
    id: "acute_coronary",
    name: "Phân Hệ 2: Hội Chứng Mạch Vành Cấp (ACS / STEMI / NSTEMI)",
    shortName: "2. Mạch Vành Cấp",
    icon: Flame,
    color: "text-rose-400",
    activeColor: "bg-rose-950 text-rose-200 border-rose-600 shadow-rose-950/60 shadow-md",
    badgeBg: "bg-rose-900/80 text-rose-300",
    count: 5,
  },
  {
    id: "conduction_blocks",
    name: "Phân Hệ 3: Rối Loạn Dẫn Truyền & Block Nhánh (AV Block / RBBB / LBBB)",
    shortName: "3. Block Dẫn Truyền",
    icon: GitFork,
    color: "text-amber-400",
    activeColor: "bg-amber-950 text-amber-200 border-amber-600 shadow-amber-950/60 shadow-md",
    badgeBg: "bg-amber-900/80 text-amber-300",
    count: 7,
  },
  {
    id: "supraventricular",
    name: "Phân Hệ 4: Loạn Nhịp Trên Thất & Kích Thích Sớm (AFib / Flutter / SVT / WPW)",
    shortName: "4. Trên Thất & WPW",
    icon: Waves,
    color: "text-cyan-400",
    activeColor: "bg-cyan-950 text-cyan-200 border-cyan-600 shadow-cyan-950/60 shadow-md",
    badgeBg: "bg-cyan-900/80 text-cyan-300",
    count: 4,
  },
  {
    id: "ventricular_arrest",
    name: "Phân Hệ 5: Loạn Nhịp Thất & Ngừng Tim (PVC / VT / VF / Asystole / TdP)",
    shortName: "5. Thất & Ngừng Tim",
    icon: AlertOctagon,
    color: "text-red-500",
    activeColor: "bg-red-950 text-red-200 border-red-600 shadow-red-950/60 shadow-md",
    badgeBg: "bg-red-900/80 text-red-300",
    count: 5,
  },
  {
    id: "chamber_hypertrophy",
    name: "Phân Hệ 6: Phì Đại & Tăng Gánh Buồng Tim (LVH Strain)",
    shortName: "6. Phì Đại Buồng Tim",
    icon: Layers,
    color: "text-violet-400",
    activeColor: "bg-violet-950 text-violet-200 border-violet-600 shadow-violet-950/60 shadow-md",
    badgeBg: "bg-violet-900/80 text-violet-300",
    count: 1,
  },
  {
    id: "channelopathies",
    name: "Phân Hệ 7: Bệnh Lý Kênh Ion Tim Mạch (Brugada Type 1)",
    shortName: "7. Kênh Ion & Brugada",
    icon: Dna,
    color: "text-fuchsia-400",
    activeColor: "bg-fuchsia-950 text-fuchsia-200 border-fuchsia-600 shadow-fuchsia-950/60 shadow-md",
    badgeBg: "bg-fuchsia-900/80 text-fuchsia-300",
    count: 1,
  },
  {
    id: "cardiopulmonary_pericardial",
    name: "Phân Hệ 8: Bệnh Lý Tim Phổi & Màng Ngoài Tim (PE / Pericarditis)",
    shortName: "8. Tim Phổi & Màng Ngoài Tim",
    icon: Wind,
    color: "text-sky-400",
    activeColor: "bg-sky-950 text-sky-200 border-sky-600 shadow-sky-950/60 shadow-md",
    badgeBg: "bg-sky-900/80 text-sky-300",
    count: 2,
  },
  {
    id: "metabolic_toxicology",
    name: "Phân Hệ 9: Rối Loạn Điện Giải & Nhiễm Độc Cơ Tim (K+ / Digoxin)",
    shortName: "9. Điện Giải & Độc Chất",
    icon: FlaskConical,
    color: "text-teal-400",
    activeColor: "bg-teal-950 text-teal-200 border-teal-600 shadow-teal-950/60 shadow-md",
    badgeBg: "bg-teal-900/80 text-teal-300",
    count: 3,
  },
];

interface EcgSystemCategoryTabsProps {
  selectedSystem: string;
  onSelectSystem: (systemId: string) => void;
  systemCounts?: Record<string, number>;
}

export function EcgSystemCategoryTabs({
  selectedSystem,
  onSelectSystem,
  systemCounts,
}: EcgSystemCategoryTabsProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="font-bold uppercase tracking-wider text-[11px] text-slate-300 flex items-center gap-1.5">
          <span>Phân Loại Theo 9 Hệ Thống Bệnh Học Tim Mạch (Braunwald & Harrison):</span>
        </span>
        <span className="text-[11px] text-slate-400">
          Chọn phân hệ để thu hẹp 31 bệnh lý lâm sàng
        </span>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-hospital-700">
        {CLINICAL_SYSTEMS.map((sys) => {
          const Icon = sys.icon;
          const isSelected = selectedSystem === sys.id;
          const count = systemCounts?.[sys.id] ?? sys.count;

          return (
            <button
              key={sys.id}
              type="button"
              onClick={() => onSelectSystem(sys.id)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                isSelected
                  ? sys.activeColor
                  : "bg-hospital-900/90 border-hospital-800 text-slate-400 hover:text-white hover:bg-hospital-800 hover:border-hospital-700"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-current" : sys.color}`} />
              <span>{sys.shortName}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isSelected ? "bg-white/20 text-white" : sys.badgeBg
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
