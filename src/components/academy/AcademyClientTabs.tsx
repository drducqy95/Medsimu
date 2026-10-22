"use client";

import React, { useState } from "react";
import { BookOpen, Pill, HelpCircle, Brain } from "lucide-react";
import { MedicalLesson, DrugItem, QuizQuestion, MedicalFlashcard } from "@/domain/academy/types";
import { LessonViewer } from "@/components/academy/LessonViewer";
import { PharmacologyCatalog } from "@/components/academy/PharmacologyCatalog";
import { InteractiveQuiz } from "@/components/academy/InteractiveQuiz";
import { FlashcardDeck } from "@/components/academy/FlashcardDeck";

interface AcademyClientTabsProps {
  lessons: MedicalLesson[];
  drugs: DrugItem[];
  quizzes: QuizQuestion[];
  flashcards: MedicalFlashcard[];
}

export const AcademyClientTabs: React.FC<AcademyClientTabsProps> = ({
  lessons,
  drugs,
  quizzes,
  flashcards,
}) => {
  const [activeTab, setActiveTab] = useState<"lessons" | "drugs" | "quizzes" | "flashcards">("lessons");

  const tabs = [
    {
      id: "lessons",
      label: "Giáo Trình Bệnh Học",
      count: lessons.length,
      icon: BookOpen,
      color: "text-cyan-400",
      activeBg: "bg-cyan-950/60 text-cyan-300 border-cyan-800",
    },
    {
      id: "drugs",
      label: "Dược Thư Lâm Sàng",
      count: drugs.length,
      icon: Pill,
      color: "text-teal-400",
      activeBg: "bg-teal-950/60 text-teal-300 border-teal-800",
    },
    {
      id: "quizzes",
      label: "Trắc Nghiệm Tình Huống",
      count: quizzes.length,
      icon: HelpCircle,
      color: "text-purple-400",
      activeBg: "bg-purple-950/60 text-purple-300 border-purple-800",
    },
    {
      id: "flashcards",
      label: "Thẻ Ghi Nhớ (Flashcards)",
      count: flashcards.length,
      icon: Brain,
      color: "text-amber-400",
      activeBg: "bg-amber-950/60 text-amber-300 border-amber-800",
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Tab Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-hospital-800 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? `${tab.activeBg} shadow-md shadow-cyan-950/20`
                  : "border-hospital-800 bg-hospital-900/40 text-slate-400 hover:text-white hover:bg-hospital-850"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${tab.color}`} />
              <span>{tab.label}</span>
              <span className="rounded-full bg-hospital-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === "lessons" && <LessonViewer lessons={lessons} />}
        {activeTab === "drugs" && <PharmacologyCatalog drugs={drugs} />}
        {activeTab === "quizzes" && <InteractiveQuiz quizzes={quizzes} />}
        {activeTab === "flashcards" && <FlashcardDeck cards={flashcards} />}
      </div>
    </div>
  );
};
