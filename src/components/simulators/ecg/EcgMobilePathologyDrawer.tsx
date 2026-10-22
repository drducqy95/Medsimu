"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  Search,
  Check,
  AlertTriangle,
  Siren,
  Sparkles,
  HeartPulse,
  Flame,
  GitFork,
  Waves,
  AlertOctagon,
  Layers,
  Dna,
  Wind,
  FlaskConical,
} from "lucide-react";
import {
  ECG_RHYTHM_DEFINITIONS,
  EcgRhythmType,
  RHYTHM_TO_SYSTEM_MAP,
} from "@/domain/simulators/ecgWaveforms";
import { CLINICAL_SYSTEMS } from "./EcgSystemCategoryTabs";

interface EcgMobilePathologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRhythmId: EcgRhythmType;
  onSelectRhythm: (id: EcgRhythmType) => void;
}

export function EcgMobilePathologyDrawer({
  isOpen,
  onClose,
  selectedRhythmId,
  onSelectRhythm,
}: EcgMobilePathologyDrawerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("all");

  // Reset search when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchTerm("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter rhythms by selected system and search term
  const filteredRhythms = useMemo(() => {
    return ECG_RHYTHM_DEFINITIONS.filter((r) => {
      const sys = RHYTHM_TO_SYSTEM_MAP[r.id];
      const matchesSystem =
        selectedSystem === "all" || sys?.systemId === selectedSystem;

      if (!matchesSystem) return false;

      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      const nameMatch = r.name.toLowerCase().includes(q);
      const descMatch = r.description.toLowerCase().includes(q);
      const idMatch = r.id.toLowerCase().includes(q);
      const systemMatch = sys?.systemName.toLowerCase().includes(q) || false;
      const regionMatch = sys?.anatomicalRegion.toLowerCase().includes(q) || false;

      return nameMatch || descMatch || idMatch || systemMatch || regionMatch;
    });
  }, [selectedSystem, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-Up Bottom Sheet Drawer */}
      <div
        className="relative z-10 flex flex-col max-h-[85vh] w-full rounded-t-3xl border-t border-hospital-700 bg-hospital-950 shadow-2xl animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Chọn bệnh lý điện tim"
      >
        {/* Grab Handle */}
        <div className="flex justify-center pt-2.5 pb-1 cursor-grab" onClick={onClose}>
          <div className="h-1.5 w-12 rounded-full bg-slate-700 hover:bg-slate-600 transition" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-hospital-800">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-950 border border-rose-800 text-rose-400">
              <HeartPulse className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Chọn Bệnh Lý Điện Tim</h2>
              <p className="text-[10px] text-slate-400">
                31 Bệnh Lý • 9 Phân Hệ Lâm Sàng AHA/ESC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-hospital-800 text-slate-400 hover:text-white hover:bg-hospital-700 transition"
            aria-label="Đóng ngăn kéo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-3 pt-2.5 pb-1.5">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm nhanh: STEMI, Rung nhĩ, Block, Phì đại, Hạ Kali..."
              className="w-full rounded-xl border border-hospital-800 bg-hospital-900/90 pl-8 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 9 System Category Chips (Horizontal Scrollable) */}
        <div className="px-3 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 border-b border-hospital-800/80">
          {CLINICAL_SYSTEMS.map((sys) => {
            const isSelected = selectedSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => setSelectedSystem(sys.id)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-all shrink-0 flex items-center gap-1 ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                    : "bg-hospital-900 text-slate-400 border-hospital-800 hover:text-white hover:bg-hospital-850"
                }`}
              >
                <span>{sys.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Count Indicator */}
        <div className="px-4 py-1 flex items-center justify-between text-[10px] text-slate-400 bg-hospital-900/40">
          <span>
            Tìm thấy <strong className="text-emerald-400">{filteredRhythms.length}</strong> bệnh lý
          </span>
          <span className="text-[9.5px] text-slate-500">Chạm để tải sóng & đóng</span>
        </div>

        {/* Rhythms List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 divide-y divide-hospital-800/30">
          {filteredRhythms.map((r) => {
            const isSelected = selectedRhythmId === r.id;
            const sys = RHYTHM_TO_SYSTEM_MAP[r.id];
            const isCritical =
              r.category === "ventricular" ||
              (r.id as string).startsWith("stemi") ||
              r.id === "brugada_type1" ||
              r.id === "torsades_de_pointes" ||
              r.id === "asystole" ||
              r.id === "hyperkalemia";

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  onSelectRhythm(r.id);
                  onClose();
                }}
                className={`w-full rounded-xl p-2.5 text-left border transition-all flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-950/70 shadow-md ring-1 ring-emerald-500 text-white"
                    : "border-hospital-850 bg-hospital-900/60 hover:bg-hospital-850 hover:border-hospital-750 text-slate-200"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                      {sys?.systemName.split(":")[0] || r.category}
                    </span>
                    {isCritical && (
                      <span className="rounded bg-rose-950 border border-rose-800 px-1 py-0.2 text-[8px] font-black text-rose-300 uppercase shrink-0">
                        Cấp cứu
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-xs sm:text-sm text-white truncate flex items-center gap-1.5">
                    {r.name}
                  </div>

                  <div className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-2">
                    {sys?.anatomicalRegion && (
                      <span className="text-cyan-400 truncate">📍 {sys.anatomicalRegion}</span>
                    )}
                    <span className="text-emerald-400 font-mono font-bold shrink-0">
                      {r.defaultBpm} bpm
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {isSelected ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border border-hospital-700 bg-hospital-800/80 flex items-center justify-center text-slate-500 text-xs font-bold">
                      ›
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {filteredRhythms.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Không tìm thấy bệnh lý nào khớp với từ khóa "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
