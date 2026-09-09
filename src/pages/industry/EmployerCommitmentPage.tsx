import React, { useState } from 'react';
import { Building2, Plus, CheckCircle2, ShieldCheck, Users, Briefcase, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmployerCommitmentType } from '../../types';

export const EmployerCommitmentPage: React.FC = () => {
  const { employerCommitments, createEmployerCommitment, applyToJob, role, setActiveTab } = useApp();
  const [showModal, setShowModal] = useState(false);

  const [companyName, setCompanyName] = useState('TechNova Systems');
  const [commitmentType, setCommitmentType] = useState<EmployerCommitmentType>('hiring');
  const [title, setTitle] = useState('Real-Time High-Throughput Stream Processing Challenge');
  const [roleTarget, setRoleTarget] = useState('Software Developer / Systems Architect');
  const [guaranteeText, setGuaranteeText] = useState('Guaranteed ₹14-18 LPA Offer for Top 10 Defended Solutions');
  const [stipendOrCompensation, setStipendOrCompensation] = useState('₹1,400,000 - ₹1,800,000 PA');
  const [openPositions, setOpenPositions] = useState(10);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmployerCommitment({
      companyName,
      commitmentType,
      title,
      roleTarget,
      guaranteeText,
      stipendOrCompensation,
      openPositions
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-mono-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Employer Commitment Portal</h1>
            <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
              Industry Guarantee
            </span>
          </div>
          <p className="text-xs text-mono-500 mt-1">
            Employers define upfront hiring commitments, innovation grants, or paid industry projects before student participation.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Employer Commitment</span>
        </button>
      </div>

      {/* 3 Core Commitment Types Filter/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-mono-300 rounded-lg bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-mono-950">1. Hiring Challenge</span>
            <Briefcase className="w-4 h-4 text-mono-800" />
          </div>
          <p className="text-xs text-mono-600">Guaranteed full-time job offers with pre-disclosed compensation bands for top defense scores.</p>
        </div>

        <div className="p-4 border border-mono-300 rounded-lg bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-mono-950">2. Innovation Challenge</span>
            <Award className="w-4 h-4 text-mono-800" />
          </div>
          <p className="text-xs text-mono-600">Cash grants, incubation support, and executive board presentations for novel solutions.</p>
        </div>

        <div className="p-4 border border-mono-300 rounded-lg bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-mono-950">3. Paid Industry Project</span>
            <Building2 className="w-4 h-4 text-mono-800" />
          </div>
          <p className="text-xs text-mono-600">6-month paid internships with monthly stipends and pre-placement interview (PPI) paths.</p>
        </div>
      </div>

      {/* Active Commitments List */}
      <div className="space-y-4">
        <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
          Active Employer Commitments ({employerCommitments.length})
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {employerCommitments.map((comm) => (
            <div key={comm.id} className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={comm.companyLogo} 
                      alt={comm.companyName}
                      className="w-10 h-10 rounded border border-mono-300 object-cover" 
                    />
                    <div>
                      <h4 className="font-bold text-mono-950 text-sm">{comm.companyName}</h4>
                      <span className="text-[10px] font-mono uppercase bg-mono-100 text-mono-800 px-2 py-0.5 rounded border border-mono-200 font-bold">
                        {comm.commitmentType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-mono-950">
                    {comm.openPositions} Open Positions
                  </span>
                </div>

                <h3 className="font-bold text-mono-950 text-base leading-snug">{comm.title}</h3>
                <p className="text-xs text-mono-600 font-medium">Target Role: <strong>{comm.roleTarget}</strong></p>

                {/* Guarantee Banner */}
                <div className="p-3 bg-mono-950 text-white rounded border border-mono-800 text-xs font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-mono-200 shrink-0" />
                  <span className="truncate">{comm.guaranteeText}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-mono-500 font-mono pt-1">
                  <span>Participants: <strong>{comm.activeParticipants}</strong></span>
                  <span>Defenses Logged: <strong>{comm.completedDefenses}</strong></span>
                </div>
              </div>

              <div className="pt-4 border-t border-mono-200 flex justify-between items-center gap-2">
                <button
                  onClick={() => setActiveTab('challenge-ledger')}
                  className="px-3.5 py-2 border border-mono-300 text-mono-900 hover:bg-mono-100 text-xs font-bold rounded transition-colors"
                >
                  Auditable Ledger
                </button>

                <button
                  onClick={() => applyToJob(comm.id)}
                  className="px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded hover:bg-mono-800 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>Apply with Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Commitment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mono-950/60 backdrop-blur-xs fade-in">
          <div className="w-full max-w-lg bg-white border border-mono-300 rounded-lg shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="font-bold text-mono-950 text-base border-b border-mono-200 pb-2">
              Publish New Employer Commitment
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-mono uppercase text-mono-500 font-bold block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div>
                <label className="font-mono uppercase text-mono-500 font-bold block mb-1">Commitment Type</label>
                <select
                  value={commitmentType}
                  onChange={(e) => setCommitmentType(e.target.value as EmployerCommitmentType)}
                  className="w-full p-2 border border-mono-300 rounded font-semibold focus:outline-none"
                >
                  <option value="hiring">Hiring Challenge</option>
                  <option value="innovation">Innovation Challenge</option>
                  <option value="paid_project">Paid Industry Project</option>
                </select>
              </div>

              <div>
                <label className="font-mono uppercase text-mono-500 font-bold block mb-1">Challenge Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div>
                <label className="font-mono uppercase text-mono-500 font-bold block mb-1">Target Role</label>
                <input
                  type="text"
                  required
                  value={roleTarget}
                  onChange={(e) => setRoleTarget(e.target.value)}
                  className="w-full p-2 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div>
                <label className="font-mono uppercase text-mono-500 font-bold block mb-1">Upfront Guarantee Guarantee Text</label>
                <input
                  type="text"
                  required
                  value={guaranteeText}
                  onChange={(e) => setGuaranteeText(e.target.value)}
                  className="w-full p-2 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-mono-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-mono-300 text-mono-700 font-semibold rounded hover:bg-mono-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-mono-950 text-white font-bold rounded hover:bg-mono-800 shadow-xs"
                >
                  Publish Commitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
