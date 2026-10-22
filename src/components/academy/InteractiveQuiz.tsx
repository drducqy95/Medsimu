"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
} from "lucide-react";
import { QuizQuestion } from "@/domain/academy/types";
import { useUserCareerStore } from "@/store/userCareerStore";

interface InteractiveQuizProps {
  quizzes: QuizQuestion[];
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quizzes }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});

  const { addXp } = useUserCareerStore();

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400 border border-hospital-800 rounded-3xl bg-hospital-900/40">
        Không có câu hỏi trắc nghiệm nào trong cơ sở dữ liệu.
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuiz.correctOptionIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      addXp(50); // Award 50 XP for correct answer
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentIndex]: isCorrect,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnsweredMap({});
  };

  const isCompleted = isAnswered && currentIndex === quizzes.length - 1;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Progress & Score Header */}
      <div className="flex items-center justify-between rounded-2xl border border-hospital-800 bg-hospital-900/80 px-6 py-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Câu hỏi {currentIndex + 1} / {quizzes.length}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="rounded bg-hospital-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
              {currentQuiz.specialty.toUpperCase()}
            </span>
            <span className="rounded bg-hospital-800 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
              Độ khó: {currentQuiz.difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 px-3.5 py-1.5 text-xs font-bold text-cyan-300">
            <Award className="h-4 w-4 text-cyan-400" />
            <span>Điểm: {score}/{quizzes.length}</span>
          </div>
          <button
            onClick={handleReset}
            title="Làm lại từ đầu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-hospital-800 bg-hospital-850 text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Vignette & Question Card */}
      <div className="rounded-3xl border border-hospital-800 bg-hospital-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Clinical Vignette */}
        <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5 text-sm text-cyan-100 leading-relaxed border-l-4 border-l-cyan-400">
          <div className="flex items-center gap-2 font-bold text-cyan-300 text-xs mb-1 uppercase tracking-wide">
            <HelpCircle className="h-4 w-4" />
            <span>Tình huống ca bệnh lâm sàng:</span>
          </div>
          {currentQuiz.vignette}
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-white">
          {currentQuiz.question}
        </h3>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQuiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQuiz.correctOptionIndex;

            let buttonStyle = "border-hospital-800 bg-hospital-950/60 text-slate-200 hover:border-hospital-700 hover:bg-hospital-850";

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = "border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-md shadow-emerald-950/40";
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = "border-rose-500 bg-rose-950/60 text-rose-200 shadow-md shadow-rose-950/40";
              } else {
                buttonStyle = "border-hospital-800/60 bg-hospital-950/30 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all ${buttonStyle}`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border ${
                    isAnswered && isCorrectOption
                      ? "border-emerald-400 bg-emerald-500 text-slate-950"
                      : isAnswered && isSelected && !isCorrectOption
                      ? "border-rose-400 bg-rose-500 text-white"
                      : "border-hospital-700 bg-hospital-900 text-slate-400"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="flex-1 pt-0.5">{option}</span>
                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation upon Answering */}
        {isAnswered && (
          <div className="space-y-3 pt-3 border-t border-hospital-800/80 animate-in fade-in duration-300">
            {selectedOption === currentQuiz.correctOptionIndex ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <span>CHÍNH XÁC! Bạn được cộng +50 XP Bác sĩ.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="h-5 w-5" />
                <span>CHƯA ĐÚNG! Hãy xem phân tích y khoa chi tiết bên dưới:</span>
              </div>
            )}

            <div className="rounded-2xl border border-hospital-800 bg-hospital-950/80 p-4 space-y-2 text-xs leading-relaxed text-slate-300">
              <p>
                <span className="font-bold text-emerald-400">Tại sao đáp án đúng: </span>
                {currentQuiz.explanation.whyCorrect}
              </p>
              <p>
                <span className="font-bold text-rose-400">Các phương án còn lại: </span>
                {currentQuiz.explanation.whyOthersIncorrect}
              </p>
              <div className="mt-2 rounded-xl bg-amber-950/30 border border-amber-800/40 p-3 text-amber-200">
                <span className="font-bold flex items-center gap-1.5 mb-0.5 text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  Kim chỉ nam lâm sàng (Clinical Pearl):
                </span>
                {currentQuiz.explanation.clinicalPearl}
              </div>
            </div>

            {/* Next / Completion Button */}
            <div className="flex justify-end pt-2">
              {!isCompleted ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-cyan-500 transition-all shadow-md shadow-cyan-600/30"
                >
                  <span>Câu hỏi tiếp theo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400">
                    🎉 Đã hoàn thành bộ câu hỏi!
                  </span>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-xl bg-hospital-800 px-4 py-2 text-xs font-bold text-white hover:bg-hospital-700"
                  >
                    <span>Làm lại</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
