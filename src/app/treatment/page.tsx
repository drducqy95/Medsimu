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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-hospital-800 bg-gradient-to-r from-hospital-900/90 via-hospital-950/90 to-rose-950/30 p-6 md:p-8 backdrop-blur shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-950/50">
              <Siren className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  Khoa Cấp Cứu & Hồi Sức Tích Cực (Resuscitation Bay)
                </h1>
                <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/30">
                  Module 3: Thực Chiến
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300 max-w-3xl">
                Đóng vai Bác sĩ Trực cấp cứu tiếp nhận bệnh nhân nguy kịch. Khai thác bệnh sử, thăm khám thực thể,
                chỉ định và thao tác trực tiếp các công cụ cận lâm sàng (ECG, Siêu âm POCUS 3D, X-quang, CT-Scanner)
                và ra y lệnh điều trị cứu sống người bệnh trong Thời Gian Vàng.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-hospital-700 bg-hospital-900/80 px-4 py-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Ca cấp cứu chờ xử trí</div>
              <div className="text-lg font-bold text-rose-400">
                {cases.length} Bệnh nhân
              </div>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-rose-500/40 bg-rose-950/60 flex items-center justify-center text-xs font-bold text-rose-300">
              STAT
            </div>
          </div>
        </div>
      </div>

      {/* Transferred Emergency Patient Alert from ECG Module */}
      <TransferredEcgPatientBanner />

      {/* Triage Board Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-rose-400" />
            <span>Bảng Phân Loại Bệnh Nhân Cấp Cứu (Emergency Triage Board)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dữ liệu bệnh án được đọc và lưu trữ động từ SQLite Database (không hardcore trong mã nguồn)
          </p>
        </div>
      </div>

      {/* Clinical Cases Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => {
          const profile = c.patientProfile;
          const vitals = c.initialVitals;

          return (
            <div
              key={c.id}
              className="group flex flex-col justify-between rounded-3xl border border-hospital-800 bg-hospital-900/70 p-6 hover:border-hospital-700 hover:bg-hospital-900/90 transition-all shadow-xl"
            >
              <div className="space-y-4">
                {/* Card Top: Acuity Badge & Specialty */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold text-rose-300">
                    {profile.triageAcuity} • Khẩn Cấp
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {c.specialty}
                  </span>
                </div>

                {/* Patient Profile */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {c.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <User className="h-3.5 w-3.5" />
                    <span>
                      {profile.name} • {profile.age} tuổi • {profile.gender === "male" ? "Nam" : "Nữ"}
                    </span>
                  </div>
                </div>

                {/* Chief Complaint */}
                <div className="rounded-2xl border border-hospital-800 bg-hospital-950/60 p-3 text-xs text-amber-200/90 italic">
                  "{profile.chiefComplaint}"
                </div>

                {/* Vital Signs Preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl border border-hospital-800 bg-hospital-950/40 p-2">
                    <span className="text-[10px] text-slate-500 block uppercase">Mạch</span>
                    <span className="font-mono font-bold text-emerald-400">{vitals.hr} l/p</span>
                  </div>
                  <div className="rounded-xl border border-hospital-800 bg-hospital-950/40 p-2">
                    <span className="text-[10px] text-slate-500 block uppercase">Huyết Áp</span>
                    <span className="font-mono font-bold text-rose-400">{vitals.bpSys}/{vitals.bpDia}</span>
                  </div>
                  <div className="rounded-xl border border-hospital-800 bg-hospital-950/40 p-2">
                    <span className="text-[10px] text-slate-500 block uppercase">SpO2</span>
                    <span className="font-mono font-bold text-cyan-400">{vitals.spO2}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-hospital-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Bậc: {c.difficulty}
                </span>

                <Link
                  href={`/treatment/${c.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  <span>Tiếp Nhận Cấp Cứu</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
