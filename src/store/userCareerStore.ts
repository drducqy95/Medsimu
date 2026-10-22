import { create } from "zustand";

export interface DoctorRank {
  level: number;
  title: string;
  minXp: number;
  badgeColor: string;
}

export const DOCTOR_RANKS: DoctorRank[] = [
  { level: 1, title: "Sinh Viên Y Thực Tập (Y4)", minXp: 0, badgeColor: "bg-slate-600" },
  { level: 2, title: "Bác Sĩ Thực Hành Lâm Sàng (Y6)", minXp: 500, badgeColor: "bg-blue-600" },
  { level: 3, title: "Bác Sĩ Nội Trú (Resident)", minXp: 1500, badgeColor: "bg-teal-600" },
  { level: 4, title: "Bác Sĩ Điều Trị Cấp Cứu (Attending)", minXp: 3500, badgeColor: "bg-emerald-600" },
  { level: 5, title: "Trưởng Khoa Cấp Cứu (Chief of ER)", minXp: 7000, badgeColor: "bg-purple-600" },
  { level: 6, title: "Chuyên Gia Hồi Sức Cấp Cứu", minXp: 12000, badgeColor: "bg-amber-600" },
];

interface UserCareerState {
  doctorName: string;
  xp: number;
  reputation: number; // 0 - 100
  casesCompleted: number;
  successfulTreatments: number;
  unlockedSkills: string[];
  addXp: (amount: number) => void;
  updateReputation: (delta: number) => void;
  recordCaseOutcome: (success: boolean) => void;
  unlockSkill: (skillId: string) => void;
  getCurrentRank: () => DoctorRank;
}

export const useUserCareerStore = create<UserCareerState>((set, get) => ({
  doctorName: "BS. Nguyễn Văn A",
  xp: 150,
  reputation: 85,
  casesCompleted: 1,
  successfulTreatments: 1,
  unlockedSkills: ["basic_ecg_reading"],

  addXp: (amount: number) => set((state) => ({ xp: state.xp + amount })),
  
  updateReputation: (delta: number) => set((state) => ({
    reputation: Math.max(0, Math.min(100, state.reputation + delta)),
  })),

  recordCaseOutcome: (success: boolean) => set((state) => ({
    casesCompleted: state.casesCompleted + 1,
    successfulTreatments: success ? state.successfulTreatments + 1 : state.successfulTreatments,
  })),

  unlockSkill: (skillId: string) => set((state) => ({
    unlockedSkills: state.unlockedSkills.includes(skillId)
      ? state.unlockedSkills
      : [...state.unlockedSkills, skillId],
  })),

  getCurrentRank: () => {
    const currentXp = get().xp;
    let rank = DOCTOR_RANKS[0];
    for (const r of DOCTOR_RANKS) {
      if (currentXp >= r.minXp) {
        rank = r;
      }
    }
    return rank;
  },
}));
