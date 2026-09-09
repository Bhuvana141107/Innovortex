import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, Clock, DollarSign, CheckCircle2, AlertCircle, ArrowRight, Star, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Opportunity {
  id: string;
  company: string;
  role: string;
  type: 'internship' | 'job';
  match: number;
  stipend: string;
  location: string;
  duration: string;
  matchedSkills: string[];
  missingSkills: string[];
  description: string;
}

export const OpportunityMatchingPage: React.FC = () => {
  const { showToast, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'internship' | 'job'>('all');
  const [appliedIds, setAppliedIds] = useState<string[]>(['o3']);

  const opportunities: Opportunity[] = [
    {
      id: 'o3',
      company: 'DataSphere',
      role: 'Data Analyst Intern',
      type: 'internship',
      match: 91,
      stipend: '₹25,000/month',
      location: 'Hyderabad / Remote',
      duration: '6 months',
      matchedSkills: ['Python (85%)', 'SQL (60%)', 'Communication (88%)'],
      missingSkills: ['Power BI (30%)'],
      description: 'Hands-on internship working on real client data projects with mentorship from senior data analysts.'
    },
    {
      id: 'o1',
      company: 'TechNova',
      role: 'Junior Data Analyst',
      type: 'job',
      match: 84,
      stipend: '₹8–12 LPA',
      location: 'Bangalore (Hybrid)',
      duration: 'Full-time',
      matchedSkills: ['Python', 'SQL', 'Communication', 'Statistics'],
      missingSkills: ['Excel Masterclass', 'Power BI'],
      description: 'Work with our high-throughput data engineering team to build automated analytical models and business pipelines.'
    },
    {
      id: 'o6',
      company: 'FutureWorks',
      role: 'Frontend Developer',
      type: 'job',
      match: 82,
      stipend: '₹10–15 LPA',
      location: 'Mumbai',
      duration: 'Full-time',
      matchedSkills: ['React', 'JavaScript', 'HTML/CSS'],
      missingSkills: ['Docker / CI-CD'],
      description: 'Build enterprise fintech web applications with exceptional sub-second user experience.'
    },
    {
      id: 'o5',
      company: 'InnovateX',
      role: 'ML Engineer Intern',
      type: 'internship',
      match: 76,
      stipend: '₹30,000/month',
      location: 'Chennai / Remote',
      duration: '6 months',
      matchedSkills: ['Python', 'Data Structures', 'Basic ML'],
      missingSkills: ['PyTorch / TensorFlow', 'Model Deployment'],
      description: 'Train and deploy deep learning models for our core AI product suite.'
    },
    {
      id: 'o4',
      company: 'CloudForge',
      role: 'Cloud Engineer Intern',
      type: 'internship',
      match: 68,
      stipend: '₹20,000/month',
      location: 'Pune',
      duration: '3 months',
      matchedSkills: ['Linux', 'Basic Python'],
      missingSkills: ['AWS Cloud', 'Kubernetes'],
      description: 'Assist in cloud infrastructure migration, Docker containerization, and monitoring.'
    }
  ];

  const handleApply = (id: string, roleName: string) => {
    setAppliedIds([...appliedIds, id]);
    showToast(`Application submitted for ${roleName}! Recruiter notified.`, 'success');
  };

  const filtered = opportunities.filter(o => 
    filterType === 'all' ? true : o.type === filterType
  );

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Smart Opportunity Matching</h1>
            <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-semibold">
              Skill-First Placement
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Matched directly using your verified capability footprints and Socratic defense audits — not just static resumes.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 p-1 glass rounded-xl border border-blue-500/30">
          {(['all', 'internship', 'job'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === t ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Roles' : t === 'internship' ? 'Internships' : 'Full-Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Cards List */}
      <div className="space-y-4">
        {filtered.map((opp) => {
          const isApplied = appliedIds.includes(opp.id);
          return (
            <div
              key={opp.id}
              className="glass-strong rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 shadow-xl transition-all hover-lift space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-display font-bold text-lg flex items-center justify-center shrink-0 shadow-glow-blue">
                    {opp.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{opp.role}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${
                        opp.type === 'internship'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {opp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>{opp.company}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{opp.location}</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{opp.stipend}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-1">
                  <div className="text-right">
                    <span className="text-xs font-mono uppercase text-slate-400 block">Match Score</span>
                    <span className="text-2xl font-display font-bold gradient-text">{opp.match}%</span>
                  </div>
                  {isApplied ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied (Shortlisted)</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(opp.id, opp.role)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {opp.description}
              </p>

              {/* Skills breakdown: matched vs missing */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1.5">
                    ✓ Why You Match:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.matchedSkills.map((s) => (
                      <span key={s} className="skill-tag bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1.5">
                    ⚡ Missing Skills to Close:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.missingSkills.map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveTab('skillgap')}
                        className="skill-tag bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
                        title="Click to view gap remediation"
                      >
                        {s} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
