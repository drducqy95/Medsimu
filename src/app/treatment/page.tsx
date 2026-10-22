import React from "react";
import Link from "next/link";
import { getAllCasesFromDb } from "@/infrastructure/db/sqlite";
import { TransferredEcgPatientBanner } from "@/components/treatment/TransferredEcgPatientBanner";
import {
  Siren,
  Activity,
  Heart,
  Clock,
  User,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function TreatmentLobbyPage() {
  const cases = getAllCasesFromDb();

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-3 sm:py-5 space-y-3">
      {/* Header Banner (Compact) */}
      <div className="rounded-2xl border border-hospital-800 bg-gradient-to-r from-hospital-900/90 via-hospital-950/90 to-rose-950/30 p-3.5 sm:p-4 backdrop-blur shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm">
              <Siren className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-extrabold text-white">
                  Khoa Cấp Cứu & Hồi Sức Tích Cực (Resuscitation Bay)
                </h1>
                <span className="rounded-full bg-rose-500/20 px-2 py-0.2 text-[10px] font-bold text-rose-300 border border-rose-500/30">
                  Module 3: Thực Chiến
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-300 max-w-3xl line-clamp-1 hidden sm:block">
                Tiếp nhận bệnh nhân nguy kịch, gọi ngay cận lâm sàng (ECG, Siêu âm 3D, X-quang, CT) và ra y lệnh điều trị trong Thời Gian Vàng.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-hospital-700 bg-hospital-900/80 px-3 py-1.5 shrink-0 self-end md:self-center">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Chờ xử trí</div>
              <div className="text-sm font-bold text-rose-400">
                {cases.length} Bệnh nhân
              </div>
            </div>
            <div className="h-7 w-7 rounded-full border border-rose-500/40 bg-rose-950/60 flex items-center justify-center text-[10px] font-bold text-rose-300">
              STAT
            </div>
          </div>
        </div>
      </div>

      {/* Transferred Emergency Patient Alert from ECG Module */}
      <TransferredEcgPatientBanner />

      {/* Triage Board Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-rose-400" />
          <h2 className="text-xs sm:text-sm font-bold text-white">
            Bảng Phân Loại Bệnh Nhân Cấp Cứu (Emergency Triage Board)
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">
          SQLite Database Sync
        </span>
      </div>

      {/* Clinical Cases Cards Grid (Compact) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {cases.map((c) => {
          const profile = c.patientProfile;
          const vitals = c.initialVitals;

          return (
            <div
              key={c.id}
              className="group flex flex-col justify-between rounded-2xl border border-hospital-800 bg-hospital-900/70 p-3.5 hover:border-hospital-700 hover:bg-hospital-900/90 transition-all shadow-md"
            >
              <div className="space-y-2.5">
                {/* Card Top: Acuity Badge & Specialty */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.2 text-[10px] font-bold text-rose-300">
                    {profile.triageAcuity} • Khẩn Cấp
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {c.specialty}
                  </span>
                </div>

                {/* Patient Profile */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                    {c.title}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <User className="h-3 w-3" />
                    <span>
                      {profile.name} • {profile.age}t • {profile.gender === "male" ? "Nam" : "Nữ"}
                    </span>
                  </div>
                </div>

                {/* Chief Complaint (Compact) */}
                <div className="rounded-xl border border-hospital-800 bg-hospital-950/60 p-2 text-[11px] text-amber-200/90 italic line-clamp-2">
                  "{profile.chiefComplaint}"
                </div>

                {/* Vital Signs Preview (Compact) */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="rounded-lg border border-hospital-800 bg-hospital-950/40 p-1.5">
                    <span className="text-[9px] text-slate-500 block uppercase">Mạch</span>
                    <span className="font-mono font-bold text-emerald-400 text-xs">{vitals.hr} l/p</span>
                  </div>
                  <div className="rounded-lg border border-hospital-800 bg-hospital-950/40 p-1.5">
                    <span className="text-[9px] text-slate-500 block uppercase">Huyết Áp</span>
                    <span className="font-mono font-bold text-rose-400 text-xs">{vitals.bpSys}/{vitals.bpDia}</span>
                  </div>
                  <div className="rounded-lg border border-hospital-800 bg-hospital-950/40 p-1.5">
                    <span className="text-[9px] text-slate-500 block uppercase">SpO2</span>
                    <span className="font-mono font-bold text-cyan-400 text-xs">{vitals.spO2}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2.5 border-t border-hospital-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Bậc: {c.difficulty}
                </span>

                <Link
                  href={`/treatment/${c.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-[11px] transition-all shadow-sm active:scale-95"
                >
                  <span>Tiếp Nhận Cấp Cứu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
