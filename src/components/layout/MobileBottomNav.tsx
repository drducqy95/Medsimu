"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Radio,
  Stethoscope,
  Award,
  Activity,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { useUserCareerStore } from "@/store/userCareerStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { SkillTreeModal } from "@/components/progression/SkillTreeModal";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState<boolean>(false);
  const { doctorName, xp, getCurrentRank } = useUserCareerStore();
  const { difficulty, setDifficulty } = useGameSettingsStore();
  const currentRank = getCurrentRank();

  const navItems = [
    {
      id: "home",
      label: "Trang Chủ",
      href: "/",
      icon: Home,
      exact: true,
      color: "text-cyan-400",
      activeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    {
      id: "academy",
      label: "Học Tập",
      href: "/academy",
      icon: BookOpen,
      exact: false,
      color: "text-blue-400",
      activeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      badge: "M1",
    },
    {
      id: "simulators",
      label: "Cận Lâm Sàng",
      href: "/simulators",
      icon: Radio,
      exact: false,
      color: "text-emerald-400",
      activeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      badge: "M2",
    },
    {
      id: "treatment",
      label: "Cấp Cứu",
      href: "/treatment",
      icon: Stethoscope,
      exact: false,
      color: "text-rose-400",
      activeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      badge: "M3",
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-hospital-800/90 bg-hospital-950/95 backdrop-blur-xl shadow-2xl px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        <div className="mx-auto flex max-w-lg items-center justify-around gap-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex flex-1 flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] touch-manipulation ${
                  isActive
                    ? `${item.activeBg} font-bold shadow-sm`
                    : "text-slate-400 hover:text-slate-200 active:scale-95"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? `${item.color} scale-110` : "text-slate-400"
                    }`}
                  />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 rounded-full bg-hospital-800 border border-hospital-700 px-1 py-0.2 text-[8px] font-mono text-slate-300">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-current" />
                  )}
                </div>
                <span className="mt-1 text-[10px] tracking-tight leading-none truncate max-w-[70px]">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Quick Doctor Profile Button */}
          <button
            type="button"
            onClick={() => setIsSkillTreeOpen(true)}
            aria-label="Xem hồ sơ bác sĩ"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-400 hover:text-teal-300 active:scale-95 transition-all min-h-[48px] touch-manipulation"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold text-white shadow-sm ${currentRank.badgeColor}`}
            >
              L{currentRank.level}
            </div>
            <span className="mt-1 text-[10px] tracking-tight leading-none text-teal-400 font-semibold truncate max-w-[60px]">
              Bác Sĩ
            </span>
          </button>
        </div>
      </nav>

      {/* Doctor Skill Tree & Progression Modal */}
      <SkillTreeModal
        isOpen={isSkillTreeOpen}
        onClose={() => setIsSkillTreeOpen(false)}
      />
    </>
  );
};
