"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  Stethoscope,
  Radio,
  Volume2,
  VolumeX,
  Award,
  ShieldCheck,
  ChevronRight,
  Flame,
  Sparkles,
} from "lucide-react";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useUserCareerStore } from "@/store/userCareerStore";
import { SkillTreeModal } from "@/components/progression/SkillTreeModal";

export const HospitalNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState<boolean>(false);
  const { audioEnabled, toggleAudio, difficulty, setDifficulty } = useGameSettingsStore();
  const { doctorName, xp, reputation, getCurrentRank } = useUserCareerStore();
  const currentRank = getCurrentRank();

  const navItems = [
    {
      label: "Học Tập Kiến Thức",
      href: "/academy",
      icon: BookOpen,
      badge: "Module 1",
      color: "hover:text-cyan-400",
    },
    {
      label: "Mô Phỏng Cận Lâm Sàng",
      href: "/simulators",
      icon: Radio,
      badge: "Module 2",
      color: "hover:text-emerald-400",
      highlight: true,
    },
    {
      label: "Mô Phỏng Điều Trị",
      href: "/treatment",
      icon: Stethoscope,
      badge: "Module 3",
      color: "hover:text-rose-400",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hospital-800 bg-hospital-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Activity className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                MED<span className="text-cyan-400">SIM</span>
              </span>
              <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-800">
                PRO RPG
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Bác Sĩ Thực Tập Lâm Sàng
            </p>
          </div>
        </Link>

        {/* 3 Core Module Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-hospital-900/60 p-1 rounded-xl border border-hospital-800">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-hospital-800 text-white shadow-sm border border-hospital-700"
                    : "text-slate-400 hover:text-white hover:bg-hospital-850"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : ""}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Doctor Stats & Controls */}
        <div className="flex items-center gap-3">
          {/* Difficulty Toggle */}
          <button
            onClick={() => setDifficulty(difficulty === "guided" ? "hardcore" : "guided")}
            title="Đổi chế độ chơi: Học tập vs Cấp cứu khẩn cấp"
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              difficulty === "hardcore"
                ? "bg-rose-950/60 border-rose-800 text-rose-300"
                : "bg-blue-950/60 border-blue-800 text-blue-300"
            }`}
          >
            {difficulty === "hardcore" ? (
              <>
                <Flame className="h-3.5 w-3.5 text-rose-400" />
                <span>Hardcore ER</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                <span>Chế độ Học tập</span>
              </>
            )}
          </button>

          {/* Audio Mute Button */}
          <button
            onClick={toggleAudio}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              audioEnabled
                ? "bg-hospital-800 border-hospital-700 text-emerald-400 hover:bg-hospital-700"
                : "bg-hospital-900 border-hospital-800 text-slate-500 hover:text-slate-400"
            }`}
            title={audioEnabled ? "Đang bật âm thanh ECG/Monitor (Click để tắt)" : "Đang tắt âm thanh"}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Doctor Career Badge */}
          <button
            onClick={() => setIsSkillTreeOpen(true)}
            className="flex items-center gap-2.5 rounded-xl border border-hospital-800 bg-hospital-900/80 px-3 py-1.5 hover:border-teal-500/50 hover:bg-hospital-850 transition-all text-left group"
            title="Xem Hồ sơ Bác sĩ & Cây kỹ năng y khoa"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm group-hover:scale-105 transition-transform ${currentRank.badgeColor}`}>
              Lv.{currentRank.level}
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 transition-colors">{doctorName}</span>
                <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                  <Award className="h-3 w-3" />
                  {reputation}%
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-medium">
                <span>{currentRank.title}</span>
                <span>• {xp} XP</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Doctor Career & Skill Tree Modal */}
      <SkillTreeModal
        isOpen={isSkillTreeOpen}
        onClose={() => setIsSkillTreeOpen(false)}
      />
    </header>
  );
};
