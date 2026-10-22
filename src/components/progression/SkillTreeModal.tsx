"use client";

import React from "react";
import {
  DOCTOR_SKILL_TREE,
  DoctorSkill,
} from "@/domain/progression/careerEngine";
import { useUserCareerStore, DOCTOR_RANKS } from "@/store/userCareerStore";
import {
  Award,
  Lock,
  CheckCircle2,
  Sparkles,
  X,
  Zap,
  Activity,
  Shield,
  Pill,
  Syringe,
} from "lucide-react";

interface SkillTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillTreeModal: React.FC<SkillTreeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    doctorName,
    xp,
    reputation,
    unlockedSkills,
    unlockSkill,
    getCurrentRank,
  } = useUserCareerStore();

  if (!isOpen) return null;

  const currentRank = getCurrentRank();
  const currentRankIndex = DOCTOR_RANKS.findIndex((r) => r.level === currentRank.level);
  const nextRank = DOCTOR_RANKS[currentRankIndex + 1];

  const xpProgress = nextRank
    ? Math.min(100, Math.round(((xp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100))
    : 100;

  const handleUnlock = (skill: DoctorSkill) => {
    if (xp >= skill.xpCost) {
      unlockSkill(skill.id);
    }
  };

  const getCategoryIcon = (cat: DoctorSkill["category"]) => {
    switch (cat) {
      case "diagnostics":
        return <Activity className="h-4 w-4 text-teal-400" />;
      case "pharmacology":
        return <Pill className="h-4 w-4 text-purple-400" />;
      case "procedures":
        return <Syringe className="h-4 w-4 text-sky-400" />;
      case "resuscitation":
        return <Shield className="h-4 w-4 text-rose-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-hospital-700 bg-hospital-950 p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-hospital-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 text-teal-300 border border-teal-500/30 shadow-lg">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{doctorName}</h3>
                <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-xs font-bold text-teal-300 border border-teal-500/30">
                  {currentRank.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Kinh Nghiệm: <span className="font-mono font-bold text-amber-400">{xp} XP</span> • Uy Tín Lâm Sàng:{" "}
                <span className="font-mono font-bold text-emerald-400">{reputation}%</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-hospital-800 text-slate-300 hover:bg-hospital-700 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Career Progression Bar */}
        <div className="rounded-2xl border border-hospital-800 bg-hospital-900/60 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">
              Cấp bậc hiện tại: <span className="text-white">{currentRank.title}</span>
            </span>
            {nextRank ? (
              <span className="text-slate-400">
                Mục tiêu tiếp theo: <span className="text-teal-400 font-bold">{nextRank.title}</span> ({nextRank.minXp} XP)
              </span>
            ) : (
              <span className="text-amber-400 font-bold">Đã Đạt Cấp Bậc Cao Nhất!</span>
            )}
          </div>

          <div className="w-full h-3 rounded-full bg-hospital-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Skill Tree Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h4 className="text-base font-bold text-white">
              Cây Kỹ Năng Y Khoa Lâm Sàng (Medical Mastery Skill Tree)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {DOCTOR_SKILL_TREE.map((skill) => {
              const isUnlocked = unlockedSkills.includes(skill.id);
              const canAfford = xp >= skill.xpCost;
              const hasPrereqs = skill.prerequisites.every((pre) =>
                unlockedSkills.includes(pre)
              );

              return (
                <div
                  key={skill.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? "border-emerald-800/60 bg-emerald-950/20 text-slate-300"
                      : hasPrereqs
                      ? "border-hospital-800 bg-hospital-900/70 hover:border-hospital-700"
                      : "border-hospital-900 bg-hospital-950/40 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-hospital-800 border border-hospital-700">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{skill.name}</div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Bậc {skill.tier} • {skill.category}
                        </span>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Đã Mở
                      </span>
                    ) : hasPrereqs ? (
                      <button
                        onClick={() => handleUnlock(skill)}
                        disabled={!canAfford}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                          canAfford
                            ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/50"
                            : "bg-hospital-800 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        <Zap className="h-3.5 w-3.5" />
                        <span>Mở ({skill.xpCost} XP)</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-hospital-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-500 border border-hospital-800">
                        <Lock className="h-3 w-3" />
                        Khóa
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="mt-2 text-[11px] text-teal-300 bg-hospital-950/60 p-2 rounded-xl border border-hospital-800">
                    <span className="font-bold text-slate-200">Hiệu ứng lâm sàng: </span>
                    {skill.clinicalBenefit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-hospital-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-hospital-800 text-slate-200 hover:bg-hospital-700 font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
