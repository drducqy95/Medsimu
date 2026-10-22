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
    <div className="relative min-h-[calc(100vh-65px)] overflow-hidden pb-16">
      {/* Background Glows & ECG Grid Accent */}
      <div className="absolute inset-0 ecg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/80 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Hệ Thống Mô Phỏng Lâm Sàng Chuẩn Y Khoa 2026</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Học Y Khoa Qua <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Mô Phỏng Trải Nghiệm Thực Chiến
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Nắm vững lý thuyết bệnh học, rèn luyện kỹ năng đọc điện tâm đồ thời gian thực,
            cầm đầu dò siêu âm 3D tại giường, đọc X-quang, CT và xử trí ca cấp cứu nghẹt thở.
          </p>

          {/* Quick Doctor Status Banner */}
          <div className="inline-flex items-center gap-4 bg-hospital-900/90 border border-hospital-800 px-5 py-2.5 rounded-2xl shadow-xl mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Bác sĩ:</span>
              <span className="text-sm font-bold text-white">{doctorName}</span>
            </div>
            <div className="h-4 w-[1px] bg-hospital-700" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Chức danh:</span>
              <span className="text-xs font-semibold text-cyan-400">{currentRank.title}</span>
            </div>
            <div className="h-4 w-[1px] bg-hospital-700" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Đã điều trị:</span>
              <span className="text-xs font-bold text-emerald-400">{casesCompleted} ca</span>
            </div>
          </div>
        </div>

        {/* 3 Core Modules Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {/* Module 1: Học tập kiến thức */}
          <div className="group relative rounded-3xl border border-hospital-800 bg-gradient-to-b from-hospital-900/90 to-hospital-950 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-cyan-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-800/80">
                  MODULE 1
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                Học Tập Kiến Thức
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Giáo trình bệnh học tương tác, dược lý học lâm sàng 30+ thuốc thiết yếu,
                nguyên lý đọc cận lâm sàng và hệ thống trắc nghiệm nhớ nhanh.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Cơ chế bệnh sinh: Tim mạch, Hô hấp, Tiêu hóa, Cấp cứu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Dược thư: Chỉ định, liều lượng, chống chỉ định</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Flashcards & Quiz kiểm tra hiểu bài tức thì</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-hospital-800/80">
              <Link
                href="/academy"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-hospital-800 py-3 text-sm font-bold text-white transition-all hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-600/30"
              >
                <span>Vào Viện Hàn Lâm</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Module 2: Trải nghiệm mô phỏng cận lâm sàng (Highlight) */}
          <div className="group relative rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-b from-hospital-900 to-hospital-950 p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400 hover:shadow-emerald-500/20 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-md">
              ⚡ ƯU TIÊN TRẢI NGHIỆM
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-md">
                  <Radio className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-800/80">
                  MODULE 2
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Mô Phỏng Cận Lâm Sàng
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Phòng thiết bị ảo độc lập: Chạy dải nhịp ECG 60 FPS, cầm đầu dò siêu âm 3D tại giường,
                soi phim X-quang và cuộn lát cắt CT sọ/ngực/bụng.
              </p>

              {/* 4 Mini Simulator Chips */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-semibold">
                <Link
                  href="/simulators/ecg"
                  className="flex items-center gap-2 rounded-xl bg-hospital-800/80 p-2.5 border border-hospital-700 hover:border-emerald-500 hover:bg-hospital-750 transition-all text-slate-200"
                >
                  <HeartPulse className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Điện Tâm Đồ (ECG)</span>
                </Link>
                <Link
                  href="/simulators/ultrasound"
                  className="flex items-center gap-2 rounded-xl bg-hospital-800/80 p-2.5 border border-hospital-700 hover:border-teal-500 hover:bg-hospital-750 transition-all text-slate-200"
                >
                  <Activity className="h-4 w-4 text-teal-400 shrink-0" />
                  <span>Siêu Âm 3D Động</span>
                </Link>
                <Link
                  href="/simulators/xray"
                  className="flex items-center gap-2 rounded-xl bg-hospital-800/80 p-2.5 border border-hospital-700 hover:border-blue-500 hover:bg-hospital-750 transition-all text-slate-200"
                >
                  <Eye className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Soi Phim X-Quang</span>
                </Link>
                <Link
                  href="/simulators/ct"
                  className="flex items-center gap-2 rounded-xl bg-hospital-800/80 p-2.5 border border-hospital-700 hover:border-purple-500 hover:bg-hospital-750 transition-all text-slate-200"
                >
                  <Scan className="h-4 w-4 text-purple-400 shrink-0" />
                  <span>Lát Cắt CT-Scan</span>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-hospital-800/80">
              <Link
                href="/simulators"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-bold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-emerald-600/30"
              >
                <span>Vào Phòng Mô Phỏng 4 Thiết Bị</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Module 3: Mô phỏng điều trị */}
          <div className="group relative rounded-3xl border border-hospital-800 bg-gradient-to-b from-hospital-900/90 to-hospital-950 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-500/50 hover:shadow-rose-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950 text-rose-400 border border-rose-800 shadow-md">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-800/80">
                  MODULE 3
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">
                Mô Phỏng Điều Trị
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Vào vai Bác sĩ tại phòng Cấp cứu thực chiến: Khám bệnh, gọi ngay các máy cận lâm sàng
                tại giường, kê đơn thuốc và đối mặt với các diễn tiến sinh tử.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span>5 Ca cấp cứu kinh điển: STEMI, Hen cấp, Viêm ruột thừa...</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span>Sinh hiệu biến thiên thời gian thực theo y lệnh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span>Bắt lỗi chống chỉ định & Báo động đỏ Code Blue</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-hospital-800/80">
              <Link
                href="/treatment"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-hospital-800 py-3 text-sm font-bold text-white transition-all hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-600/30"
              >
                <span>Nhận Ca Cấp Cứu</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Clinical Features Spotlight */}
        <div className="mt-16 rounded-3xl border border-hospital-800 bg-hospital-900/40 p-8 backdrop-blur-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Điểm Nhấn Công Nghệ Y Khoa Trong MedSim</h3>
            <p className="mt-2 text-sm text-slate-400">
              Kết hợp toán học điện sinh lý, đồ họa 3D mô phỏng mô mềm và phác đồ điều trị chuẩn xác.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-hospital-800/80 bg-hospital-950/60 p-5">
              <div className="h-10 w-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200">Sóng ECG Toán Học</h4>
              <p className="mt-1 text-xs text-slate-400">
                Tổng hợp bằng chuỗi hàm Gaussian thời gian thực, đo Calipers tính QTc tự động.
              </p>
            </div>

            <div className="rounded-2xl border border-hospital-800/80 bg-hospital-950/60 p-5">
              <div className="h-10 w-10 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center mb-3">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200">Đầu Dò 3D Động</h4>
              <p className="mt-1 text-xs text-slate-400">
                Thao tác tay 6 DoF (xoay trục, nghiêng quạt, đè ấn) làm hình ảnh siêu âm thay đổi góc cắt.
              </p>
            </div>

            <div className="rounded-2xl border border-hospital-800/80 bg-hospital-950/60 p-5">
              <div className="h-10 w-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center mb-3">
                <Scan className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200">Cuộn Lát Cắt CT</h4>
              <p className="mt-1 text-xs text-slate-400">
                Duyệt chuỗi lát cắt sọ/ngực/bụng, chuyển đổi cửa sổ Nhu mô/Xương/Phổi và đo số HU.
              </p>
            </div>

            <div className="rounded-2xl border border-hospital-800/80 bg-hospital-950/60 p-5">
              <div className="h-10 w-10 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center mb-3">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200">An Toàn Người Bệnh</h4>
              <p className="mt-1 text-xs text-slate-400">
                Kiểm duyệt chống chỉ định, quá liều, dị ứng thuốc và cảnh báo nguy kịch Code Blue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
