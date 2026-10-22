"use client";

import React, { useState } from "react";
import { ClinicalOrderAction } from "@/domain/treatment/types";
import {
  FilePlus,
  CheckCircle2,
  AlertOctagon,
  Pill,
  Syringe,
  Wind,
  Droplet,
  Stethoscope,
  Siren,
  Sparkles,
} from "lucide-react";

interface MedicalOrderSheetProps {
  orders: ClinicalOrderAction[];
  appliedOrderIds: string[];
  onExecuteOrder: (orderId: string) => void;
  isCodeBlue: boolean;
}

export const MedicalOrderSheet: React.FC<MedicalOrderSheetProps> = ({
  orders,
  appliedOrderIds,
  onExecuteOrder,
  isCodeBlue,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tất Cả", icon: <FilePlus className="h-4 w-4" /> },
    { id: "medications", label: "Thuốc Cấp Cứu", icon: <Pill className="h-4 w-4" /> },
    { id: "fluids", label: "Bù Dịch Tuần Hoàn", icon: <Droplet className="h-4 w-4" /> },
    { id: "airway_breathing", label: "Hô Hấp & Khí Đạo", icon: <Wind className="h-4 w-4" /> },
    { id: "procedures", label: "Thủ Thuật Xâm Lấn", icon: <Syringe className="h-4 w-4" /> },
    { id: "consultation", label: "Hội Chẩn & Báo Động", icon: <Siren className="h-4 w-4" /> },
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeCategory === "all") return true;
    return o.category === activeCategory;
  });

  return (
    <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-5 backdrop-blur shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hospital-800 pb-3">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-white text-base">
            Bàn Ra Y Lệnh Cấp Cứu & Can Thiệp Điều Trị (Physician Order Sheet)
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Đã thực hiện:{" "}
          <span className="font-bold text-teal-400">
            {appliedOrderIds.length} / {orders.length}
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-purple-600 text-white shadow-md shadow-purple-950/40"
                : "bg-hospital-800 text-slate-300 hover:bg-hospital-700"
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredOrders.map((order) => {
          const isApplied = appliedOrderIds.includes(order.id);

          return (
            <div
              key={order.id}
              className={`p-4 rounded-2xl border transition-all ${
                isApplied
                  ? "border-emerald-800/60 bg-emerald-950/20 text-slate-300"
                  : "border-hospital-800 bg-hospital-950/60 hover:border-hospital-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-white text-sm">{order.label}</div>
                  {(order.dosage || order.route) && (
                    <div className="text-[11px] text-purple-300 font-mono mt-0.5">
                      {order.dosage && <span>Liều: {order.dosage}</span>}
                      {order.dosage && order.route && <span> • </span>}
                      {order.route && <span>Đường dùng: {order.route}</span>}
                    </div>
                  )}
                </div>

                {isApplied ? (
                  <span className="flex items-center gap-1 shrink-0 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Đã Ra Lệnh
                  </span>
                ) : (
                  <button
                    onClick={() => onExecuteOrder(order.id)}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-950/50 transition-transform active:scale-95"
                  >
                    Kê Đơn / Thực Hiện
                  </button>
                )}
              </div>

              {/* Feedback readout if applied */}
              {isApplied && (
                <div
                  className={`mt-2.5 rounded-xl p-2.5 text-xs leading-relaxed border ${
                    order.isContraindicated
                      ? "bg-rose-950/40 border-rose-800/60 text-rose-200"
                      : "bg-hospital-900/80 border-hospital-800 text-emerald-300"
                  }`}
                >
                  {order.isContraindicated ? (
                    <div className="flex items-start gap-1.5">
                      <AlertOctagon className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                      <span>{order.dangerWarning || order.feedbackMessage}</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{order.feedbackMessage}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
