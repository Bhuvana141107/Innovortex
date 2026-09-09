import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, AlertCircle, Code, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DiagnosticPage: React.FC = () => {
  const { diagnosticQuestions, submitDiagnosticAnswers, activeStudent, setActiveTab } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = diagnosticQuestions[currentQuestionIndex];
  const isSelected = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    submitDiagnosticAnswers(selectedAnswers);
    setIsSubmitted(true);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round(((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in pb-12 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE2D3] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-[#1C1413] tracking-tight">Functional Capability Diagnostic</h1>
            <span className="text-xs font-mono bg-[#FBF0F2] text-[#72192D] border border-[#F4D9DF] px-2 py-0.5 rounded font-semibold">
              SIH 2026 Core Flow
            </span>
          </div>
          <p className="text-xs text-[#7A6B62] mt-1">
            Evaluating foundational syntax, data structures, debugging boundary cases, dynamic programming, and real-world system design.
          </p>
        </div>

        {activeStudent.diagnosticCompleted && !isSubmitted && (
          <div className="flex items-center gap-2 text-xs text-[#2C543D] bg-[#E8EFEA] px-3 py-1.5 rounded-lg border border-[#D2DFD6] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#2C543D]" />
            <span>Previous Diagnostic Completed</span>
          </div>
        )}
      </div>

      {isSubmitted ? (
        /* Results View */
        <div className="p-8 border border-[#EAE2D3] rounded-2xl bg-white shadow-sm text-center space-y-6 fade-in">
          <div className="w-16 h-16 bg-[#72192D] text-[#FAF7F2] rounded-full flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-[#1C1413]">Diagnostic Evaluation Complete!</h2>
            <p className="text-xs text-[#7A6B62] max-w-md mx-auto mt-1">
              Your responses have been processed against industry benchmarking standard PS26044. Your capability map, detected skill gaps, and readiness score have been updated.
            </p>
          </div>

          {/* Capability Scores Summary Table */}
          <div className="border border-[#EAE2D3] rounded-xl overflow-hidden text-left max-w-lg mx-auto bg-[#FAF7F2] text-xs">
            <div className="bg-[#2B060E] text-[#FAF7F2] font-mono px-4 py-2.5 flex justify-between font-bold">
              <span>Capability Category</span>
              <span>Status</span>
            </div>
            <div className="p-4 space-y-2.5 divide-y divide-[#EAE2D3]">
              {['Syntax', 'Data Structures', 'Debugging', 'Algorithms', 'Code Design', 'Industry Practice'].map((cat, idx) => (
                <div key={idx} className="pt-2 flex justify-between items-center">
                  <span className="font-semibold text-[#1C1413]">{cat}</span>
                  <span className="font-mono text-[#2C543D] bg-[#E8EFEA] px-2 py-0.5 rounded border border-[#D2DFD6] font-semibold">
                    Verified (+15% Level Boost)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('capability-map')}
              className="px-5 py-2.5 bg-[#72192D] text-[#FAF7F2] text-xs font-bold rounded-xl hover:bg-[#8E233B] transition-colors shadow-xs flex items-center gap-2"
            >
              <span>View Capability Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="px-5 py-2.5 border border-[#EAE2D3] bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] text-xs font-bold rounded-xl transition-colors"
            >
              Examine Skill Gap Engine
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Runner */
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="bg-white p-4 border border-[#EAE2D3] rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#7A6B62] font-semibold">
                Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}
              </span>
              <span className="text-[#72192D] font-bold">
                Category: {currentQ.category} ({currentQ.type})
              </span>
            </div>
            <div className="w-full bg-[#EAE2D3] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#72192D] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#72192D] font-semibold">
                <HelpCircle className="w-4 h-4 text-[#72192D]" />
                <span>{currentQ.title}</span>
              </div>
              <h3 className="text-base font-bold text-[#1C1413] leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Code Snippet (if provided) */}
            {currentQ.codeSnippet && (
              <div className="p-4 bg-[#1C1413] text-[#FAF7F2] font-mono text-xs rounded-xl border border-[#2E231E] overflow-x-auto shadow-inner">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((optionText, idx) => {
                const isThisSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl text-xs font-medium border transition-all flex items-start gap-3 ${
                      isThisSelected
                        ? 'bg-[#FBF0F2] text-[#1C1413] border-[#72192D] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#453831] border-[#EAE2D3] hover:bg-[#F4EFE6] hover:border-[#D5869B]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border shrink-0 mt-0.5 ${
                      isThisSelected
                        ? 'bg-[#72192D] text-[#FAF7F2] border-[#72192D]'
                        : 'bg-white text-[#7A6B62] border-[#D8CDC3]'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{optionText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Control Bar */}
          <div className="flex items-center justify-between bg-[#F4EFE6] p-4 border border-[#EAE2D3] rounded-xl">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-[#5C4E46] border border-[#EAE2D3] bg-white rounded-lg hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-[#7A6B62] font-mono hidden sm:inline font-semibold">
              Answered {answeredCount} / {diagnosticQuestions.length} Questions
            </span>

            {currentQuestionIndex === diagnosticQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < diagnosticQuestions.length}
                className="px-5 py-2 bg-[#72192D] text-[#FAF7F2] text-xs font-bold rounded-lg hover:bg-[#8E233B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Submit Diagnostic</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#72192D] text-[#FAF7F2] text-xs font-semibold rounded-lg hover:bg-[#8E233B] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
