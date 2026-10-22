"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Brain,
  Check,
  RotateCcw,
} from "lucide-react";
import { MedicalFlashcard } from "@/domain/academy/types";
import { useUserCareerStore } from "@/store/userCareerStore";

interface FlashcardDeckProps {
  cards: MedicalFlashcard[];
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const { addXp } = useUserCareerStore();

  if (!cards || cards.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400 border border-hospital-800 rounded-3xl bg-hospital-900/40">
        Không có thẻ flashcard nào trong cơ sở dữ liệu.
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const isMastered = masteredIds.includes(currentCard.id);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const toggleMastered = () => {
    if (isMastered) {
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    } else {
      setMasteredIds((prev) => [...prev, currentCard.id]);
      addXp(20); // +20 XP for mastering a flashcard
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-3">
      {/* Header and Progress */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-bold text-cyan-400">
          Thẻ {currentIndex + 1} / {cards.length}
        </span>
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Brain className="h-3.5 w-3.5" /> Đã nhớ: {masteredIds.length}/{cards.length}
        </span>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="group relative h-56 sm:h-60 w-full cursor-pointer perspective-1000 select-none"
      >
        <div
          className={`relative h-full w-full rounded-2xl border transition-all duration-500 shadow-xl p-4 sm:p-5 flex flex-col justify-between ${
            isFlipped
              ? "border-teal-500 bg-gradient-to-br from-hospital-900 via-hospital-950 to-teal-950/40"
              : "border-hospital-800 bg-gradient-to-br from-hospital-900 to-hospital-950 hover:border-cyan-500/50"
          }`}
        >
          {/* Card Top Indicator */}
          <div className="flex items-center justify-between text-xs">
            <span className="rounded-full bg-hospital-800 px-2.5 py-0.5 font-bold text-cyan-400 border border-hospital-700 text-[11px]">
              {currentCard.category}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <RotateCw className="h-3 w-3" /> Chạm để lật
            </span>
          </div>

          {/* Card Center Content */}
          <div className="my-auto text-center">
            {!isFlipped ? (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  CÂU HỎI NHANH
                </span>
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {currentCard.front}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                  CÂU TRẢ LỜI & CƠ CHẾ
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">
                  {currentCard.back}
                </p>
                {currentCard.mnemonic && (
                  <div className="inline-block mt-1 rounded-lg bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 text-[11px] font-semibold text-teal-300">
                    💡 Mẹo nhớ: {currentCard.mnemonic}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Bottom Specialty */}
          <div className="text-right text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            {currentCard.specialty}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-hospital-800 bg-hospital-900 text-slate-300 hover:text-white hover:bg-hospital-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={toggleMastered}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            isMastered
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "border border-hospital-700 bg-hospital-850 text-slate-300 hover:text-white"
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          <span>{isMastered ? "Đã Nắm Vững (+20 XP)" : "Đánh Dấu Đã Nhớ"}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-hospital-800 bg-hospital-900 text-slate-300 hover:text-white hover:bg-hospital-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
