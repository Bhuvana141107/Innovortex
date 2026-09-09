import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CapabilityStage } from '../../types';

export const CapabilityMapPage: React.FC = () => {
  const { activeStudent, passportData, setActiveTab } = useApp();
  const [selectedStage, setSelectedStage] = useState<CapabilityStage>('Syntax');

  const selectedCapData = activeStudent.capabilities.find(c => c.stage === selectedStage) || activeStudent.capabilities[0];

  const stagesPipeline: CapabilityStage[] = [
    'Syntax',
    'Data Structures',
    'Debugging',
    'Algorithms',
    'Code Design',
    'Industry Practice'
  ];

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Page Title */}
      <div className="border-b border-[#EAE2D3] pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-display font-bold text-[#1C1413] tracking-tight">Capability Progression Map</h1>
          <span className="text-xs font-mono bg-[#FBF0F2] text-[#72192D] border border-[#F4D9DF] px-2 py-0.5 rounded font-semibold">
            Evidence-Based
          </span>
        </div>
        <p className="text-xs text-[#7A6B62] mt-1">
          Structured 6-stage capability progression matrix. We measure what the human can understand, build, defend and adapt.
        </p>
      </div>

      {/* Visual Horizontal Pipeline Stage Navigator */}
      <div className="p-4 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {stagesPipeline.map((stageName, idx) => {
            const capObj = activeStudent.capabilities.find(c => c.stage === stageName);
            const isSelected = selectedStage === stageName;
            const pct = capObj?.percentage || 0;

            return (
              <React.Fragment key={stageName}>
                <button
                  onClick={() => setSelectedStage(stageName)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#72192D] text-[#FAF7F2] border-[#72192D] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#1C1413] border-[#EAE2D3] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div className={`text-[10px] font-mono uppercase font-bold ${isSelected ? 'text-[#F4D9DF]' : 'text-[#7A6B62]'}`}>
                    Stage 0{idx + 1}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">{stageName}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-mono font-semibold">{pct}%</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-[#E8B6C2]' : 'text-[#7A6B62]'}`}>{capObj?.evidenceCount || 0} Ev.</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full mt-1.5 overflow-hidden ${isSelected ? 'bg-[#5A1222]' : 'bg-[#EAE2D3]'}`}>
                    <div className={`h-full transition-all duration-300 ${isSelected ? 'bg-[#FAF7F2]' : 'bg-[#72192D]'}`} style={{ width: `${pct}%` }} />
                  </div>
                </button>
                {idx < stagesPipeline.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#B5A599] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Detailed View Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Stage Metrics & Weaknesses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#EAE2D3] pb-3">
              <div>
                <h3 className="font-display font-bold text-[#1C1413] text-base flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#72192D]" />
                  <span>Stage Detail: {selectedCapData.stage}</span>
                </h3>
                <p className="text-xs text-[#7A6B62]">Verified percentage: {selectedCapData.percentage}%</p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#72192D] text-[#FAF7F2] px-3 py-1 rounded-lg shadow-xs">
                Level {Math.ceil(selectedCapData.percentage / 20)} Mastery
              </span>
            </div>

            {/* Capability Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-semibold text-[#1C1413]">
                <span>Verified Mastery Progress</span>
                <span className="text-[#72192D]">{selectedCapData.percentage}%</span>
              </div>
              <div className="w-full bg-[#EAE2D3] h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#72192D] to-[#C75D35] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${selectedCapData.percentage}%` }}
                />
              </div>
            </div>

            {/* Weaknesses List */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#7A6B62] font-bold">
                Detected Bottlenecks & Weakness Targets
              </h4>
              {selectedCapData.weaknesses.length > 0 ? (
                <div className="space-y-2">
                  {selectedCapData.weaknesses.map((w, i) => (
                    <div key={i} className="p-3 border border-[#F5D7C9] rounded-xl bg-[#FBEDE6] text-xs text-[#1C1413] flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-[#99411F] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#99411F]">{w}</span>
                        <span className="text-[11px] text-[#7A6B62]">Requires targeted hands-on practice task in Roadmap</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-[#D2DFD6] rounded-xl bg-[#E8EFEA] text-xs text-[#2C543D] flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#2C543D]" />
                  <span>No critical weaknesses detected for this stage! High evidence consistency.</span>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 border-t border-[#EAE2D3] flex justify-between items-center">
              <span className="text-xs text-[#7A6B62]">Bridge remaining gap in Skill Gap Engine</span>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="px-4 py-2 bg-[#72192D] text-[#FAF7F2] text-xs font-bold rounded-xl hover:bg-[#8E233B] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Skill Gap Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Evidence Logs */}
        <div className="space-y-6">
          <div className="p-6 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-[#1C1413] text-sm uppercase tracking-wide border-b border-[#EAE2D3] pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#72192D]" />
              <span>Logged Evidence ({selectedCapData.evidenceCount})</span>
            </h3>

            <div className="space-y-3">
              {passportData.verifiedEvidence.map((item) => (
                <div key={item.id} className="p-3 border border-[#EAE2D3] rounded-xl bg-[#FAF7F2] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1C1413]">{item.title}</span>
                    <span className="font-mono text-[10px] bg-[#E8EFEA] text-[#2C543D] border border-[#D2DFD6] px-1.5 py-0.5 rounded font-semibold">
                      Score: {item.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#7A6B62]">
                    <span className="uppercase font-mono text-[#72192D] font-semibold">{item.type} VERIFIED</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('passport')}
              className="w-full py-2 border border-[#EAE2D3] bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] text-xs font-semibold rounded-xl transition-colors text-center"
            >
              Open Capability Passport
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
