"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Radio,
  Stethoscope,
  Activity,
  HeartPulse,
  Eye,
  Scan,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap,
  GraduationCap,
  Award,
} from "lucide-react";
import { useUserCareerStore } from "@/store/userCareerStore";

export default function HomePage() {
  const { doctorName, xp, reputation, casesCompleted, getCurrentRank } = useUserCareerStore();
  const currentRank = getCurrentRank();

  return (
    <div className="relative min-h-[calc(100vh-65px)] overflow-hidden pb-8">
      {/* Background Glows & ECG Grid Accent */}
      <div className="absolute inset-0 ecg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
        {/* Compact Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-800/80 bg-cyan-950/40 px-3 py-0.5 text-[11px] font-semibold text-cyan-300 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Hệ Thống Mô Phỏng Lâm Sàng Chuẩn Y Khoa 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Học Y Khoa Qua{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Mô Phỏng Trải Nghiệm Thực Chiến
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Nắm vững lý thuyết bệnh học, rèn luyện đọc điện tâm đồ thời gian thực,
            cầm đầu dò siêu âm 3D tại giường, đọc X-quang, CT và xử trí ca cấp cứu nghẹt thở.
          </p>

          {/* Quick Doctor Status Banner (Compact) */}
          <div className="inline-flex items-center gap-3 bg-hospital-900/90 border border-hospital-800 px-3.5 py-1.5 rounded-xl shadow-lg mt-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Bác sĩ:</span>
              <span className="font-bold text-white text-xs">{doctorName}</span>
            </div>
            <div className="h-3.5 w-[1px] bg-hospital-700" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Cấp bậc:</span>
              <span className="font-semibold text-cyan-400 text-[11px]">{currentRank.title}</span>
            </div>
            <div className="h-3.5 w-[1px] bg-hospital-700" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Đã cứu chữa:</span>
              <span className="font-bold text-emerald-400 text-xs">{casesCompleted} ca</span>
            </div>
          </div>
        </div>

        {/* 3 Core Modules Grid (Compact Blocks) */}
        <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          {/* Module 1: Học tập kiến thức */}
          <div className="group relative rounded-2xl border border-hospital-800 bg-gradient-to-b from-hospital-900/90 to-hospital-950 p-4 sm:p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-sm">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-cyan-950/60 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-800/80">
                  MODULE 1
                </span>
              </div>

              <h2 className="mt-2.5 text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                Học Tập Kiến Thức
              </h2>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                Giáo trình tương tác, dược thư lâm sàng 30+ thuốc thiết yếu,
                nguyên lý đọc cận lâm sàng và trắc nghiệm nhớ nhanh.
              </p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">Cơ chế bệnh sinh: Tim mạch, Hô hấp, Tiêu hóa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">Dược thư: Liều lượng, chống chỉ định</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">Flashcards & Quiz kiểm tra tức thì</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-hospital-800/80">
              <Link
                href="/academy"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-hospital-800 py-2 text-xs font-bold text-white transition-all hover:bg-cyan-600 hover:shadow-md hover:shadow-cyan-600/30"
              >
                <span>Vào Viện Hàn Lâm</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 2: Trải nghiệm mô phỏng cận lâm sàng (Highlight) */}
          <div className="group relative rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-hospital-900 to-hospital-950 p-4 sm:p-5 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 flex flex-col justify-between">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-sm">
              ⚡ ƯU TIÊN TRẢI NGHIỆM
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-sm">
                  <Radio className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-800/80">
                  MODULE 2
                </span>
              </div>

              <h2 className="mt-2.5 text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Mô Phỏng Cận Lâm Sàng
              </h2>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                4 Thiết bị ảo: Chạy dải nhịp ECG 60 FPS, cầm đầu dò siêu âm 3D tại giường,
                soi phim X-quang và cuộn lát cắt CT sọ/ngực/bụng.
              </p>

              {/* 4 Compact Mini Simulator Chips */}
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
                <Link
                  href="/simulators/ecg"
                  className="flex items-center gap-1.5 rounded-lg bg-hospital-800/80 p-2 border border-hospital-700 hover:border-emerald-500 hover:bg-hospital-750 transition-all text-slate-200 truncate"
                >
                  <HeartPulse className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Điện Tim (ECG)</span>
                </Link>
                <Link
                  href="/simulators/ultrasound"
                  className="flex items-center gap-1.5 rounded-lg bg-hospital-800/80 p-2 border border-hospital-700 hover:border-teal-500 hover:bg-hospital-750 transition-all text-slate-200 truncate"
                >
                  <Activity className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">Siêu Âm 3D</span>
                </Link>
                <Link
                  href="/simulators/xray"
                  className="flex items-center gap-1.5 rounded-lg bg-hospital-800/80 p-2 border border-hospital-700 hover:border-blue-500 hover:bg-hospital-750 transition-all text-slate-200 truncate"
                >
                  <Eye className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">Phim X-Quang</span>
                </Link>
                <Link
                  href="/simulators/ct"
                  className="flex items-center gap-1.5 rounded-lg bg-hospital-800/80 p-2 border border-hospital-700 hover:border-purple-500 hover:bg-hospital-750 transition-all text-slate-200 truncate"
                >
                  <Scan className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">Lát Cắt CT</span>
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-hospital-800/80">
              <Link
                href="/simulators"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2 text-xs font-bold text-white transition-all hover:brightness-110 hover:shadow-md hover:shadow-emerald-600/30"
              >
                <span>Vào Phòng 4 Thiết Bị</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 3: Mô phỏng điều trị */}
          <div className="group relative rounded-2xl border border-hospital-800 bg-gradient-to-b from-hospital-900/90 to-hospital-950 p-4 sm:p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-500/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-950 text-rose-400 border border-rose-800 shadow-sm">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-rose-950/60 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-800/80">
                  MODULE 3
                </span>
              </div>

              <h2 className="mt-2.5 text-lg sm:text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                Mô Phỏng Điều Trị
              </h2>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                Bác sĩ trực Cấp cứu: Khám bệnh, gọi ngay cận lâm sàng
                tại giường, kê đơn thuốc và ứng phó các diễn tiến sinh tử.
              </p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span className="truncate">5 Ca cấp cứu: STEMI, Hen cấp, Viêm ruột thừa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span className="truncate">Sinh hiệu biến thiên thời gian thực theo y lệnh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span className="truncate">Chống chỉ định & Báo động đỏ Code Blue</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-hospital-800/80">
              <Link
                href="/treatment"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-hospital-800 py-2 text-xs font-bold text-white transition-all hover:bg-rose-600 hover:shadow-md hover:shadow-rose-600/30"
              >
                <span>Nhận Ca Cấp Cứu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Clinical Features Spotlight */}
        <div className="mt-8 rounded-2xl border border-hospital-800 bg-hospital-900/40 p-4 sm:p-6 backdrop-blur-sm">
          <div className="text-center max-w-xl mx-auto mb-4">
            <h3 className="text-base sm:text-lg font-bold text-white">Điểm Nhấn Công Nghệ Y Khoa Trong MedSim</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Toán học điện sinh lý, đồ họa 3D mô phỏng mô mềm và phác đồ điều trị chuẩn xác.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-hospital-800/80 bg-hospital-950/60 p-3 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                <HeartPulse className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-200">Sóng ECG Toán Học</h4>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                  Chuỗi hàm Gaussian 60 FPS, Calipers tính QTc tự động.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-hospital-800/80 bg-hospital-950/60 p-3 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center shrink-0">
                <Activity className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-200">Đầu Dò 3D Động</h4>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                  Thao tác 6 DoF điều hướng góc cắt siêu âm theo thời gian thực.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-hospital-800/80 bg-hospital-950/60 p-3 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center shrink-0">
                <Scan className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-200">Cuộn Lát Cắt CT</h4>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                  Chuỗi lát cắt sọ/ngực/bụng, chuyển cửa sổ Nhu mô/Xương/Phổi.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-hospital-800/80 bg-hospital-950/60 p-3 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-200">An Toàn Người Bệnh</h4>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                  Kiểm duyệt chống chỉ định, quá liều và cảnh báo Code Blue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
