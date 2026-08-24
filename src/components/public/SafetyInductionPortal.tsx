"use client";

import { useState } from "react";
import { ShieldCheck, HardHat, CheckCircle, XCircle, Trophy, ArrowRight, ArrowCounterClockwise } from "@phosphor-icons/react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the mandatory PPE required before entering any active structural or fabrication work front?",
    options: [
      "Casual safety shoes only",
      "ISI Hard Hat, Steel-Toe Boots, Hi-Vis Vest & Safety Goggles",
      "Cotton gloves and earplugs only",
      "Only a high-visibility jacket",
    ],
    correctIndex: 1,
    explanation: "Full 100% PPE compliance (Hard hat, safety footwear, reflective jacket, eye protection) is non-negotiable at LT Engineering Works.",
  },
  {
    id: 2,
    question: "When working at heights above 1.8 meters (6 feet), what safety protocol must be followed?",
    options: [
      "Use scaffold structure without tying off",
      "Wear full-body harness with double shock-absorbing lanyards anchored to a certified lifeline",
      "Only hold onto pipe racks",
      "Work fast to minimize time at height",
    ],
    correctIndex: 1,
    explanation: "100% tie-off with EN-361 certified double-lanyard full body harness is strictly mandatory for all working at height operations.",
  },
  {
    id: 3,
    question: "What document is mandatory before commencing hot work (gas cutting / welding) in plant areas?",
    options: [
      "Verbal permission from coworker",
      "Signed Hot Work Safety Permit (PTW) with fire extinguisher & fire blanket stationed within 5m",
      "No permit needed if work takes under 10 minutes",
      "Only a gate pass",
    ],
    correctIndex: 1,
    explanation: "Hot work permits must be verified by the site HSE officer with active fire suppression measures in place prior to arc striking.",
  },
  {
    id: 4,
    question: "What is the morning site routine conducted every day at 07:30 AM before shift deployment?",
    options: [
      "Direct work start without meeting",
      "Mandatory 15-Minute Tool-Box Talk (TBT) & hazard identification briefing",
      "Equipment maintenance only",
      "Tea break",
    ],
    correctIndex: 1,
    explanation: "Daily morning Tool-Box Talks (TBT) ensure all tradesmen are informed of shift-specific risks, crane movements, and weather alerts.",
  },
];

export function SafetyInductionPortal() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const currentQ = quizQuestions[currentStep];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isCurrentAnswered = selectedAnswers[currentQ?.id] !== undefined;

  // Calculate score
  let correctCount = 0;
  quizQuestions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);
  const isPassed = scorePercent >= 75;

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <HardHat className="w-4 h-4 text-amber-400" />
            Interactive Workforce Induction
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Site Safety Readiness Assessment
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          ISO 45001 & Industrial HSE Standard
        </span>
      </div>

      {!showResults ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-600">
              <span>Question {currentStep + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full text-left p-4 rounded-sm border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-slate-900 font-semibold shadow-xs"
                        : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-mono ${
                        isSelected
                          ? "border-amber-500 bg-amber-500 text-slate-950 font-bold"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowCounterClockwise className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              type="button"
              disabled={!isCurrentAnswered}
              onClick={handleNext}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all ${
                isCurrentAnswered
                  ? "bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white shadow-sm cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>{currentStep === quizQuestions.length - 1 ? "View Results & Badge" : "Next Protocol"}</span>
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-emerald-100 text-emerald-600 shadow-md">
            {isPassed ? (
              <Trophy className="w-8 h-8 text-emerald-600" weight="fill" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-amber-600" weight="fill" />
            )}
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <span className="text-xs font-mono font-bold uppercase text-amber-600">
              Assessment Outcome
            </span>
            <h4 className="text-2xl font-heading font-black uppercase text-slate-900">
              {isPassed ? "Safety Orientation Certified" : "Refresher Required"}
            </h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {isPassed
                ? "You scored 100% on core industrial safety protocols. You demonstrate high awareness of LT Engineering Works site HSE standards."
                : "Please review the safety protocols and retake the assessment to achieve the minimum 75% threshold."}
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-sm font-mono text-sm">
            <span>Score: <strong className="text-slate-950">{correctCount} / {quizQuestions.length} ({scorePercent}%)</strong></span>
            <span>•</span>
            <span className={isPassed ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
              {isPassed ? "✓ Fit-for-Duty Pass" : "Needs Review"}
            </span>
          </div>

          {/* Explanation Summary */}
          <div className="max-w-xl mx-auto text-left bg-[#F8FAFC] border border-slate-200 p-5 rounded-sm space-y-3">
            <span className="text-[11px] font-mono font-bold text-slate-700 uppercase block">
              Core Protocol Takeaways:
            </span>
            <ul className="space-y-2 text-xs text-slate-600 font-sans">
              {quizQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" weight="fill" />
                  <span><strong>{q.question.split("?")[0]}:</strong> {q.explanation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              <ArrowCounterClockwise className="w-3.5 h-3.5" />
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
