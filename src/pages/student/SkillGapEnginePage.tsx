import React, { useState } from 'react';
import { Split, ArrowRight, BookOpen, Code2, FolderGit2, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillGapItem } from '../../types';

export const SkillGapEnginePage: React.FC = () => {
  const { skillGaps, setActiveTab, activeStudent } = useApp();
  const [selectedGap, setSelectedGap] = useState<SkillGapItem>(skillGaps[0] || skillGaps[0]);

  const pipelineSteps = [
    { title: 'Industry Requirement', key: 'req' },
    { title: 'Student Capability', key: 'cap' },
    { title: 'Gap Percentage', key: 'gap' },
    { title: 'Academic Subject', key: 'sub' },
    { title: 'Resource', key: 'res' },
    { title: 'Practice Task', key: 'prac' },
    { title: 'Portfolio Project', key: 'proj' },
    { title: 'Readiness Boost', key: 'read' },
  ];

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Skill Gap Engine</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Industry Alignment
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Translating complex industry requirements into precise academic gaps, targeted practice tasks, and portfolio projects.
        </p>
      </div>

      {/* Visual Pipeline Header Banner */}
      <div className="p-4 bg-mono-950 text-white rounded-lg shadow-xs overflow-x-auto">
        <div className="text-[10px] font-mono uppercase text-mono-400 font-bold mb-2">
          Skill Gap Resolution Pipeline
        </div>
        <div className="flex items-center justify-between min-w-[800px] gap-2 text-xs font-mono">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-mono-900 px-2.5 py-1.5 rounded border border-mono-800 text-center flex-1">
                <span className="text-mono-400 block text-[9px]">STEP 0{idx + 1}</span>
                <span className="font-bold text-mono-200 truncate block">{step.title}</span>
              </div>
              {idx < pipelineSteps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-mono-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Column (Gap Selector List) + Right Column (Selected Gap Execution Pipeline Detail) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Detected Skill Gaps List */}
        <div className="space-y-4">
          <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
            Detected Capability Gaps ({skillGaps.length})
          </h3>

          <div className="space-y-3">
            {skillGaps.map((gap) => {
              const isSelected = selectedGap.id === gap.id;
              return (
                <div
                  key={gap.id}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-mono-950 text-white border-mono-950 shadow-md'
                      : 'bg-white text-mono-950 border-mono-300 hover:border-mono-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase opacity-75">
                      Target Role: {activeStudent.targetRole}
                    </span>
                    <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white text-mono-950' : 'bg-mono-950 text-white'
                    }`}>
                      {gap.gapPercentage}% Gap
                    </span>
                  </div>

                  <h4 className="font-bold text-sm mt-2 leading-snug">{gap.industryRequirement}</h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-mono-300' : 'text-mono-600'}`}>
                    Current Student Level: {gap.studentCapability}
                  </p>

                  <div className="mt-3 pt-2 border-t border-mono-800/20 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] opacity-80">{gap.academicSubject}</span>
                    <span className="font-bold">+{gap.readinessImpact}% Readiness</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Step-by-Step Pipeline View for Selected Gap */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-mono-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-mono-100 text-mono-800 px-2 py-0.5 rounded font-bold">
                  Pipeline Resolution Engine
                </span>
                <h3 className="font-bold text-mono-950 text-lg mt-1">{selectedGap.industryRequirement}</h3>
              </div>
              <span className="text-sm font-mono font-bold bg-mono-950 text-white px-3 py-1 rounded">
                +{selectedGap.readinessImpact}% Readiness Boost
              </span>
            </div>

            {/* Pipeline Steps Cards */}
            <div className="space-y-4 text-xs">
              {/* Step 1 & 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 border border-mono-200 rounded-md bg-mono-50 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    1. Industry Requirement
                  </span>
                  <p className="font-bold text-mono-950">{selectedGap.industryRequirement}</p>
                </div>

                <div className="p-3.5 border border-mono-200 rounded-md bg-mono-50 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    2. Student Current Capability
                  </span>
                  <p className="font-semibold text-mono-800">{selectedGap.studentCapability}</p>
                </div>
              </div>

              {/* Step 3 & 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 border border-mono-200 rounded-md bg-mono-50 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    3. Detected Capability Gap
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold font-mono text-mono-950">
                      {selectedGap.gapPercentage}% Deficit
                    </span>
                    <span className="text-[11px] text-mono-500">Benchmark: Industry Standard</span>
                  </div>
                </div>

                <div className="p-3.5 border border-mono-200 rounded-md bg-mono-50 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    4. Mapped Academic Subject
                  </span>
                  <p className="font-bold text-mono-950 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-mono-700" />
                    <span>{selectedGap.academicSubject}</span>
                  </p>
                </div>
              </div>

              {/* Step 5: Recommended Learning Resource */}
              <div className="p-4 border border-mono-300 rounded-md bg-white space-y-2">
                <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                  5. Curated Learning Resource
                </span>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-mono-950 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-mono-800" />
                    <span>{selectedGap.recommendedResource.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-mono-100 text-mono-800 px-2 py-0.5 rounded font-bold border border-mono-200">
                    {selectedGap.recommendedResource.type}
                  </span>
                </div>
              </div>

              {/* Step 6 & 7 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-mono-300 rounded-md bg-white space-y-2">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    6. Hands-On Practice Task
                  </span>
                  <p className="font-semibold text-mono-900 leading-snug">{selectedGap.practiceTask}</p>
                </div>

                <div className="p-4 border border-mono-300 rounded-md bg-white space-y-2">
                  <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                    7. Verified Portfolio Project
                  </span>
                  <p className="font-semibold text-mono-900 leading-snug flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4 text-mono-800 shrink-0" />
                    <span>{selectedGap.portfolioProject}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="pt-4 border-t border-mono-200 flex flex-wrap justify-between items-center gap-3">
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors flex items-center gap-1.5"
              >
                <span>Add Task to Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('shadow-problem')}
                className="px-4 py-2 border border-mono-300 bg-white hover:bg-mono-100 text-mono-900 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Launch Shadow Problem Readiness</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
