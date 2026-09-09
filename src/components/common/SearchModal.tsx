import React, { useState } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { setActiveTab } = useApp();

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Diagnostic Test', desc: '8-12 functional capability assessment questions', tab: 'diagnostic' },
    { title: 'Capability Map', desc: '4-tier evidence progression matrix', tab: 'capability-map' },
    { title: 'Skill Gap Engine', desc: 'Industry requirement to academic gap visualization', tab: 'skill-gap' },
    { title: 'Data Collector Hub', desc: 'Ingest student CSV, GitHub repos & LMS feeds', tab: 'data-collector' },
    { title: 'Shadow Problem Environment', desc: 'Synthetic industry challenge readiness simulator', tab: 'shadow-problem' },
    { title: 'Problem Capsule', desc: 'Progressive sanitized to full repo spec unlocks', tab: 'problem-capsule' },
    { title: 'Defense & Socratic Reasoning', desc: '4-part solution defense and live adaptation scoring', tab: 'defense' },
    { title: 'Capability Passport', desc: 'Evidence-verified portfolio with cryptographic SHA-256 hashes', tab: 'passport' },
    { title: 'Employer Commitments', desc: 'Hiring, Innovation, and Paid Project guarantees', tab: 'industry-commitments' },
    { title: 'Auditable Challenge Ledger', desc: 'Immutable timeline of candidate progress', tab: 'challenge-ledger' },
    { title: 'Curriculum Gap Mapping', desc: 'Academia industry demand to subject realignment', tab: 'academia' }
  ];

  const filtered = quickLinks.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-[#141412]/40 backdrop-blur-xs fade-in">
      <div className="w-full max-w-2xl bg-[#F2EFE9] border border-[#E0DBD3] rounded-md shadow-lg overflow-hidden mx-4">
        {/* Search input header */}
        <div className="flex items-center px-4 py-3 border-b border-[#E0DBD3] bg-[#F9F7F4]">
          <Search className="w-4 h-4 text-[#8C8880] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search capability maps, shadow problems, defense, commitments..."
            className="w-full text-[#141412] bg-transparent placeholder-[#8C8880] focus:outline-none text-xs font-sans"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 text-[#8C8880] hover:text-[#141412] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E0DBD3] p-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  onClose();
                }}
                className="w-full p-3 flex items-center justify-between rounded hover:bg-[#EAE6DF] transition-colors text-left group"
              >
                <div>
                  <h4 className="text-xs font-semibold text-[#141412] group-hover:underline">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#5C5954] mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#141412] shrink-0" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#8C8880]">
              No capability resources matching "{query}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#EAE6DF] border-t border-[#E0DBD3] flex items-center justify-between text-[10px] font-mono text-[#5C5954]">
          <span>SkillLoop Navigation Finder</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
