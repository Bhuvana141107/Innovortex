import React from 'react';
import { Briefcase, Award, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JobsPage: React.FC = () => {
  const { applications, employerCommitments, applyToJob, setActiveTab, activeStudent } = useApp();

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Verified Jobs & Internships</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Capability Passport Linked
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Apply to industry hiring commitments using your evidence-verified Capability Passport. Receive transparent gap feedback on rejection.
        </p>
      </div>

      {/* Main Grid: Left Column Available Job Commitments, Right Column My Submitted Applications & Rejection Feedback Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Available Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
            Available Verified Industry Openings ({employerCommitments.length})
          </h3>

          <div className="space-y-4">
            {employerCommitments.map((comm) => (
              <div key={comm.id} className="p-5 bg-white border border-mono-300 rounded-lg shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={comm.companyLogo} 
                      alt={comm.companyName}
                      className="w-9 h-9 rounded border border-mono-200 object-cover" 
                    />
                    <div>
                      <h4 className="font-bold text-mono-950 text-sm">{comm.companyName}</h4>
                      <span className="text-xs text-mono-500">{comm.roleTarget}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-mono-100 text-mono-900 px-2.5 py-1 rounded border border-mono-200">
                    {comm.stipendOrCompensation}
                  </span>
                </div>

                <h3 className="font-bold text-mono-950 text-sm leading-snug">{comm.title}</h3>
                <p className="text-xs text-mono-600 font-mono bg-mono-50 p-2.5 rounded border border-mono-200">
                  {comm.guaranteeText}
                </p>

                <div className="pt-2 border-t border-mono-200 flex justify-between items-center text-xs">
                  <span className="text-mono-500 font-mono">Openings: <strong>{comm.openPositions}</strong></span>
                  <button
                    onClick={() => applyToJob(comm.id)}
                    className="px-4 py-2 bg-mono-950 text-white font-bold rounded hover:bg-mono-800 transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-mono-200" />
                    <span>Apply with Passport</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): My Applications & Rejection Feedback */}
        <div className="space-y-4">
          <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
            My Passport Applications ({applications.length})
          </h3>

          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="p-4 border border-mono-300 rounded-lg bg-white space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-mono-950">{app.companyName}</span>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                    app.status === 'Hired'
                      ? 'bg-mono-950 text-white'
                      : app.status === 'Rejected'
                      ? 'bg-mono-200 text-mono-950 border border-mono-400'
                      : 'bg-mono-100 text-mono-800 border border-mono-200'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <p className="text-mono-600">{app.roleTarget}</p>
                <div className="text-[10px] font-mono text-mono-400">Applied: {app.appliedDate}</div>

                {/* Rejection Feedback Log */}
                {app.rejectionFeedback && (
                  <div className="mt-2 p-3 bg-mono-100 border border-mono-300 rounded text-[11px] space-y-1.5 fade-in">
                    <div className="flex items-center gap-1.5 text-mono-950 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-mono-950 shrink-0" />
                      <span>Transparent Rejection Feedback</span>
                    </div>
                    <p className="text-mono-800">{app.rejectionFeedback.reason}</p>
                    <div className="p-2 bg-white rounded border border-mono-200 font-mono text-[10px] space-y-0.5">
                      <span className="font-bold text-mono-950 block">Detected Deficit:</span>
                      <span className="text-mono-700">{app.rejectionFeedback.gapDetected}</span>
                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="text-mono-950 font-bold hover:underline block pt-1"
                      >
                        Action: {app.rejectionFeedback.recommendedRoadmapAction} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
