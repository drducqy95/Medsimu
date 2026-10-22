"use client";

import React, { useMemo } from "react";
import { HeartPulse, ChevronDown, Siren, Sparkles } from "lucide-react";
import {
  ECG_RHYTHM_DEFINITIONS,
  EcgRhythmType,
  RHYTHM_TO_SYSTEM_MAP,
  getRhythmAllowedBpmRange,
} from "@/domain/simulators/ecgWaveforms";
import { CLINICAL_SYSTEMS } from "./EcgSystemCategoryTabs";

interface EcgPathologySelectDropdownProps {
  selectedRhythmId: EcgRhythmType;
  onSelectRhythm: (id: EcgRhythmType) => void;
  className?: string;
}

export function EcgPathologySelectDropdown({
  selectedRhythmId,
  onSelectRhythm,
  className = "",
}: EcgPathologySelectDropdownProps) {
  // Group rhythms by 9 clinical systems
  const groupedRhythms = useMemo(() => {
    // Systems excluding "all"
    const systems = CLINICAL_SYSTEMS.filter((s) => s.id !== "all");

    return systems.map((sys) => {
      const items = ECG_RHYTHM_DEFINITIONS.filter((r) => {
        const mapping = RHYTHM_TO_SYSTEM_MAP[r.id];
        return mapping?.systemId === sys.id;
      });

      return {
        systemId: sys.id,
        systemName: sys.name,
        shortName: sys.shortName,
        items,
      };
    });
  }, []);

  const currentRhythm =
    ECG_RHYTHM_DEFINITIONS.find((r) => r.id === selectedRhythmId) ||
    ECG_RHYTHM_DEFINITIONS[0];

  const currentSys = RHYTHM_TO_SYSTEM_MAP[selectedRhythmId];
  const currentBpmRange = getRhythmAllowedBpmRange(selectedRhythmId);

  const isCritical =
    currentRhythm.category === "ventricular" ||
    (currentRhythm.id as string).startsWith("stemi") ||
    currentRhythm.id === "brugada_type1" ||
    currentRhythm.id === "torsades_de_pointes" ||
    currentRhythm.id === "asystole" ||
    currentRhythm.id === "hyperkalemia";

  return (
    <div className={`relative flex items-center min-w-0 ${className}`}>
      <div
        className={`w-full flex items-center justify-between rounded-xl border transition-all ${
          isCritical
            ? "border-rose-700/80 bg-rose-950/40 shadow-sm"
            : "border-hospital-700 bg-hospital-900/95 hover:border-hospital-600 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2 pl-2.5 pr-1 py-1.5 min-w-0 flex-1">
          {isCritical ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-900 text-rose-300 shrink-0">
              <Siren className="h-3.5 w-3.5 animate-pulse" />
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 shrink-0">
              <HeartPulse className="h-3.5 w-3.5" />
            </div>
          )}

          {/* Grouped Select Element */}
          <div className="flex-1 min-w-0">
            <select
              value={selectedRhythmId}
              onChange={(e) => onSelectRhythm(e.target.value as EcgRhythmType)}
              aria-label="Chọn mặt bệnh lý điện tâm đồ"
              className="w-full bg-transparent text-white font-extrabold text-xs sm:text-sm focus:outline-none cursor-pointer truncate appearance-none pr-6"
            >
              {groupedRhythms.map((group) => (
                <optgroup
                  key={group.systemId}
                  label={group.systemName}
                  className="bg-hospital-950 text-slate-300 font-bold"
                >
                  {group.items.map((r) => {
                    const range = getRhythmAllowedBpmRange(r.id);
                    const rangeStr =
                      range.min === 0 && range.max === 0
                        ? "(0 bpm - Vô mạch)"
                        : `(${range.min}-${range.max} bpm)`;

                    return (
                      <option
                        key={r.id}
                        value={r.id}
                        className="bg-hospital-900 text-white font-semibold py-1"
                      >
                        {r.name} {rangeStr}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Right Indicators & Custom Arrow */}
        <div className="flex items-center gap-1.5 pr-2.5 shrink-0 pointer-events-none">
          {isCritical && (
            <span className="hidden sm:inline-block rounded bg-rose-900 text-rose-200 border border-rose-700 px-1.5 py-0.2 text-[9px] font-black uppercase">
              Cấp Cứu
            </span>
          )}
          <span className="hidden md:inline-block font-mono text-[10px] text-emerald-400 font-bold bg-hospital-950 px-1.5 py-0.5 rounded border border-hospital-800">
            {currentBpmRange.min === 0 && currentBpmRange.max === 0
              ? "0 bpm"
              : `${currentBpmRange.min}-${currentBpmRange.max} bpm`}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
