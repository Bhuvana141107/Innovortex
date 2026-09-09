import React, { useState } from 'react';
import { CheckSquare, User, ShieldCheck, Award, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateEvaluationPage: React.FC = () => {
  const { defenseSubmissions, evaluateCandidateDefense } = useApp();
  const [selectedSubId, setSelectedSubId] = useState(defenseSubmissions[0]?.id || '');

  const activeSub = defenseSubmissions.find(s => s.id === selectedSubId) || defenseSubmissions[0];

  const [solScore, setSolScore] = useState(27);
  const [reaScore, setReaScore] = useState(23);
  const [defScore, setDefScore] = useState(22);
  const [adaScore, setAdaScore] = useState(18);
  const [feedback, setFeedback] = useState('Exemplary reasoning and clear understanding of memory trade-offs under real-time network constraints.');

  const totalScore = solScore + reaScore + defScore + adaScore;

  const handleGradeSubmit = (issueOffer: boolean) => {
    if (!activeSub) return;
    evaluateCandidateDefense(
      activeSub.id,
      {
        solution: solScore,
        reasoning: reaScore,
        defense: defScore,
        adaptation: adaScore,
        total: totalScore
      },
      feedback,
      issueOffer
    );
  };

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Candidate Defense Evaluation Panel</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Industry Evaluator
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Review candidate solution code, boundary reasoning, trade-offs, and live adaptation to issue verified hiring offers.
        </p>
      </div>

      {/* Main Grid: Left Column Candidate Defense Submissions List, Right Column Evaluation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 Col): Submissions List */}
        <div className="space-y-4">
          <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
            Candidate Submissions ({defenseSubmissions.length})
          </h3>

          <div className="space-y-3">
            {defenseSubmissions.map((sub) => {
              const isSelected = sub.id === selectedSubId;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-mono-950 text-white border-mono-950 shadow-sm'
                      : 'bg-white text-mono-950 border-mono-300 hover:border-mono-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{sub.studentName}</span>
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white text-mono-950' : 'bg-mono-200 text-mono-900'
                    }`}>
                      Score: {sub.scores.total}/100
                    </span>
                  </div>

                  <h4 className="text-xs mt-1 font-semibold truncate opacity-90">{sub.challengeTitle}</h4>
                  <div className="mt-2 text-[10px] font-mono opacity-75">{sub.timestamp}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 Cols): Defense Inspection & Grading Form */}
        <div className="lg:col-span-2 space-y-6">
          {activeSub ? (
            <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-mono-200 pb-3">
                <div>
                  <h3 className="font-bold text-mono-950 text-base">{activeSub.studentName}'s Defense Submission</h3>
                  <p className="text-xs text-mono-500">{activeSub.challengeTitle}</p>
                </div>
                <span className="text-xs font-mono font-bold bg-mono-950 text-white px-3 py-1 rounded">
                  Score: {activeSub.scores.total} / 100
                </span>
              </div>

              {/* Submitted Details Inspection */}
              <div className="space-y-4 text-xs">
                {/* Solution Code */}
                <div className="space-y-1">
                  <span className="font-mono uppercase text-mono-500 font-bold block">
                    1. Candidate Code Implementation:
                  </span>
                  <pre className="p-3 bg-mono-950 text-mono-100 font-mono text-xs rounded border border-mono-800 overflow-x-auto">
                    {activeSub.solutionCode}
                  </pre>
                </div>

                {/* Approach & Trade-offs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 border border-mono-200 rounded bg-mono-50 space-y-1">
                    <span className="font-mono uppercase text-mono-500 font-bold block">
                      2. Approach Explanation:
                    </span>
                    <p className="text-mono-900">{activeSub.approach}</p>
                  </div>

                  <div className="p-3.5 border border-mono-200 rounded bg-mono-50 space-y-1">
                    <span className="font-mono uppercase text-mono-500 font-bold block">
                      3. Trade-Offs & Scalability:
                    </span>
                    <p className="text-mono-900">{activeSub.tradeOffs} {activeSub.scalability}</p>
                  </div>
                </div>

                {/* Adaptation Response */}
                <div className="p-3.5 border border-mono-950 rounded bg-mono-100 space-y-1">
                  <span className="font-mono uppercase text-mono-950 font-bold block">
                    4. Live Jitter Adaptation Response:
                  </span>
                  <p className="text-mono-900 font-semibold">{activeSub.adaptation}</p>
                </div>
              </div>

              {/* Evaluator Grading Inputs */}
              <div className="p-5 border border-mono-300 rounded-lg bg-mono-50 space-y-4">
                <h4 className="font-bold text-mono-950 text-xs uppercase font-mono border-b border-mono-200 pb-2">
                  Evaluator Grading & Decision Portal
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-mono text-[10px] text-mono-500 font-bold block">Solution (30 max)</label>
                    <input
                      type="number"
                      max={30}
                      value={solScore}
                      onChange={(e) => setSolScore(Number(e.target.value))}
                      className="w-full p-2 border border-mono-300 rounded font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-mono-500 font-bold block">Reasoning (25 max)</label>
                    <input
                      type="number"
                      max={25}
                      value={reaScore}
                      onChange={(e) => setReaScore(Number(e.target.value))}
                      className="w-full p-2 border border-mono-300 rounded font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-mono-500 font-bold block">Defense (25 max)</label>
                    <input
                      type="number"
                      max={25}
                      value={defScore}
                      onChange={(e) => setDefScore(Number(e.target.value))}
                      className="w-full p-2 border border-mono-300 rounded font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-mono-500 font-bold block">Adaptation (20 max)</label>
                    <input
                      type="number"
                      max={20}
                      value={adaScore}
                      onChange={(e) => setAdaScore(Number(e.target.value))}
                      className="w-full p-2 border border-mono-300 rounded font-bold font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-mono-500 font-bold block mb-1">Evaluator Feedback</label>
                  <textarea
                    rows={2}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full text-xs p-2.5 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                  />
                </div>

                <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
                  <span className="font-mono text-xs font-extrabold text-mono-950">
                    Graded Score: {totalScore} / 100
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGradeSubmit(false)}
                      className="px-4 py-2 border border-mono-300 bg-white hover:bg-mono-200 text-mono-900 text-xs font-bold rounded transition-colors"
                    >
                      Save Evaluation Grade
                    </button>
                    <button
                      onClick={() => handleGradeSubmit(true)}
                      className="px-5 py-2 bg-mono-950 text-white text-xs font-bold rounded hover:bg-mono-800 transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Issue Verified Hiring Offer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-mono-500 border border-mono-200 rounded-lg">
              No candidate defense submissions to review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
