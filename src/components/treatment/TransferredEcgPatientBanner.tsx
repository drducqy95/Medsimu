"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Siren, ArrowRight, X, Activity, User, HeartPulse } from "lucide-react";

interface DirectPatientPayload {
  source: string;
  rhythmId: string;
  rhythmName: string;
  patientName: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    spO2: number;
    temperature: number;
  };
  labResults: Record<string, string>;
  protocolPriority: string;
  goldStandardDiagnosis: string;
  timestamp: number;
}

export function TransferredEcgPatientBanner() {
  const [patient, setPatient] = useState<DirectPatientPayload | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("medsim_er_direct_patient");
      if (raw) {
        const parsed = JSON.parse(raw);
        setPatient(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.sessionStorage.removeItem("medsim_er_direct_patient");
    } catch {
      // ignore
    }
    setPatient(null);
  };

  if (!patient) return null;

  return (
    <div className="rounded-3xl border-2 border-rose-500 bg-gradient-to-r from-rose-950/90 via-hospital-950/90 to-red-950/90 p-5 text-white shadow-2xl backdrop-blur animate-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Patient Alert Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-900/60">
            <Siren className="h-6 w-6 animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                Chuyển viện khẩn cấp từ Module ECG
              </span>
              <span className="rounded-md bg-rose-900/80 border border-rose-500/40 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                {patient.protocolPriority}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>{patient.patientName}</span>
              <span className="text-slate-400 font-normal text-xs">
                ({patient.age} tuổi • {patient.gender})
              </span>
            </h3>

            <p className="text-xs text-rose-200 font-semibold line-clamp-1">
              Triệu chứng: "{patient.chiefComplaint}"
            </p>

            {/* Vitals summary */}
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-300 flex-wrap">
              <span>HA: <strong className="text-rose-400">{patient.vitals.bloodPressure}</strong></span>
              <span>•</span>
              <span>HR: <strong className="text-emerald-400">{patient.vitals.heartRate} bpm</strong></span>
              <span>•</span>
              <span>SpO2: <strong className="text-cyan-400">{patient.vitals.spO2}%</strong></span>
              <span>•</span>
              <span className="text-amber-300 font-semibold truncate max-w-xs">
                Chẩn đoán ECG: {patient.goldStandardDiagnosis}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-xl border border-hospital-700 bg-hospital-900/80 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            Bỏ qua
          </button>

          <Link
            href="/treatment/case-inferior-stemi-rv"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-950/60 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <HeartPulse className="h-4 w-4 animate-pulse" />
            <span>Tiếp Nhận Vào Buồng Cấp Cứu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
