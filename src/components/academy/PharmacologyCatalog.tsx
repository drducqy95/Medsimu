"use client";

import React, { useState } from "react";
import {
  Pill,
  Search,
  AlertOctagon,
  ShieldAlert,
  Clock,
  Activity,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DrugItem, DrugCategory } from "@/domain/academy/types";

interface PharmacologyCatalogProps {
  drugs: DrugItem[];
}

export const PharmacologyCatalog: React.FC<PharmacologyCatalogProps> = ({ drugs }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(drugs[0]?.id || null);

  const categories: { id: string; label: string }[] = [
    { id: "all", label: "Tất cả nhóm thuốc" },
    { id: "vasopressor_inotropic", label: "Vận mạch & Tăng co bóp" },
    { id: "cardiovascular_antiplatelet", label: "Tim mạch & Kháng đông" },
    { id: "respiratory_bronchodilator", label: "Hô hấp & Giãn phế quản" },
    { id: "corticosteroid", label: "Corticoid" },
    { id: "antibiotic", label: "Kháng sinh cấp cứu" },
    { id: "analgesic_sedative", label: "Giảm đau & An thần" },
    { id: "emergency_metabolic", label: "Hồi sức chuyển hóa" },
  ];

  const filteredDrugs = drugs.filter((d) => {
    const matchCategory = selectedCategory === "all" || d.category === selectedCategory;
    const matchQuery =
      d.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.brandNames.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.receptorMechanism.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-3">
      {/* Search and Category Filter Bar */}
      <div className="rounded-xl border border-hospital-800 bg-hospital-900/80 p-2.5 sm:p-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoạt chất (Adrenalin, Aspirin), biệt dược (Ventolin), cơ chế..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-hospital-700 bg-hospital-950 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
                selectedCategory === c.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                  : "bg-hospital-800 text-slate-300 hover:bg-hospital-750"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drugs List */}
      <div className="space-y-2">
        {filteredDrugs.map((drug) => {
          const isExpanded = expandedDrugId === drug.id;
          return (
            <div
              key={drug.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? "border-cyan-500/70 bg-hospital-900 shadow-lg"
                  : "border-hospital-800 bg-hospital-900/60 hover:border-hospital-700"
              }`}
            >
              {/* Card Header Accordion Toggle */}
              <div
                onClick={() => setExpandedDrugId(isExpanded ? null : drug.id)}
                className="flex cursor-pointer items-center justify-between p-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white">{drug.genericName}</h3>
                      <span className="rounded bg-hospital-800 px-1.5 py-0.2 text-[10px] font-semibold text-cyan-300 border border-hospital-700">
                        {drug.brandNames.join(", ")}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-emerald-400" /> {drug.onsetTime}
                      </span>
                      <span>•</span>
                      <span>{drug.routes.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {/* Expanded Drug Deep-Dive */}
              {isExpanded && (
                <div className="border-t border-hospital-800/80 p-3 pt-2.5 space-y-2.5 text-xs">
                  {/* Fatal Mistakes Alert */}
                  {drug.fatalMistakes.length > 0 && (
                    <div className="rounded-lg border border-rose-600/60 bg-rose-950/40 p-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-400 mb-1 text-xs">
                        <AlertOctagon className="h-4 w-4" />
                        <span>SAI LẦM CHẾT NGƯỜI CẦN TRÁNH:</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-rose-200">
                        {drug.fatalMistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">⚠️</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Receptor Mechanism */}
                  <div className="rounded-lg border border-hospital-800 bg-hospital-950/60 p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-xs">
                      <Activity className="h-3.5 w-3.5" />
                      <span>Cơ chế thụ thể & Dược lực học:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{drug.receptorMechanism}</p>
                  </div>

                  {/* Dose & Routes Grid */}
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-3.5">
                      <span className="font-bold text-emerald-400 block mb-1">Liều Cấp Cứu Chuẩn:</span>
                      <p className="text-slate-200">{drug.standardDose.adultEmergency}</p>
                      {drug.standardDose.maintenance && (
                        <p className="mt-1 text-slate-400 text-[11px]">
                          <span className="font-semibold text-slate-300">Duy trì: </span>
                          {drug.standardDose.maintenance}
                        </p>
                      )}
                    </div>
                    <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-3.5">
                      <span className="font-bold text-purple-400 block mb-1">Theo Dõi & Giám Sát:</span>
                      <ul className="space-y-0.5 text-slate-300 text-[11px]">
                        {drug.monitoringKeys.map((k, idx) => (
                          <li key={idx}>• {k}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Indications & Contraindications */}
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-3.5">
                      <span className="font-bold text-blue-400 block mb-1">Chỉ Định Điều Trị:</span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {drug.indications.map((ind, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-rose-800/40 bg-rose-950/20 p-3.5">
                      <span className="font-bold text-rose-400 block mb-1">Chống Chỉ Định:</span>
                      <div className="space-y-1.5 text-[11px]">
                        {drug.contraindications.absolute.length > 0 && (
                          <div>
                            <span className="font-bold text-rose-300">Tuyệt đối: </span>
                            <span className="text-rose-200">{drug.contraindications.absolute.join("; ")}</span>
                          </div>
                        )}
                        {drug.contraindications.relative.length > 0 && (
                          <div>
                            <span className="font-semibold text-amber-300">Tương đối: </span>
                            <span className="text-amber-200">{drug.contraindications.relative.join("; ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filteredDrugs.length === 0 && (
          <div className="p-12 text-center text-xs text-slate-500 border border-dashed border-hospital-800 rounded-2xl">
            Không tìm thấy thuốc nào khớp với từ khóa tìm kiếm.
          </div>
        )}
      </div>
    </div>
  );
};
