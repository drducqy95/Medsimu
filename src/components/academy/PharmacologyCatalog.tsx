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
    <div className="space-y-6">
      {/* Search and Category Filter Bar */}
      <div className="rounded-2xl border border-hospital-800 bg-hospital-900/80 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoạt chất (Adrenalin, Aspirin), biệt dược (Ventolin, Plavix), hoặc cơ chế..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-hospital-700 bg-hospital-950 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md"
                  : "bg-hospital-800 text-slate-300 hover:bg-hospital-750"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drugs List */}
      <div className="space-y-4">
        {filteredDrugs.map((drug) => {
          const isExpanded = expandedDrugId === drug.id;
          return (
            <div
              key={drug.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? "border-cyan-500/70 bg-hospital-900 shadow-xl"
                  : "border-hospital-800 bg-hospital-900/60 hover:border-hospital-700"
              }`}
            >
              {/* Card Header Accordion Toggle */}
              <div
                onClick={() => setExpandedDrugId(isExpanded ? null : drug.id)}
                className="flex cursor-pointer items-center justify-between p-5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <Pill className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{drug.genericName}</h3>
                      <span className="rounded bg-hospital-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-hospital-700">
                        {drug.brandNames.join(", ")}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-emerald-400" /> Khởi phát: {drug.onsetTime}
                      </span>
                      <span>•</span>
                      <span>Đường dùng: {drug.routes.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>

              {/* Expanded Drug Deep-Dive */}
              {isExpanded && (
                <div className="border-t border-hospital-800/80 p-5 pt-4 space-y-4 text-xs sm:text-sm">
                  {/* Fatal Mistakes Alert */}
                  {drug.fatalMistakes.length > 0 && (
                    <div className="rounded-xl border-2 border-rose-600/60 bg-rose-950/40 p-4">
                      <div className="flex items-center gap-2 font-bold text-rose-400 mb-1.5">
                        <AlertOctagon className="h-5 w-5" />
                        <span>SAI LẦM LÂM SÀNG CHẾT NGƯỜI CẦN TUYỆT ĐỐI TRÁNH:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-rose-200">
                        {drug.fatalMistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">⚠️</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Receptor Mechanism */}
                  <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-cyan-400">
                      <Activity className="h-4 w-4" />
                      <span>Cơ chế thụ thể & Dược lực học:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{drug.receptorMechanism}</p>
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
