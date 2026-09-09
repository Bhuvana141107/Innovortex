import React from 'react';
import { Award, ShieldCheck, CheckCircle2, FileText, FolderGit2, UserCheck, ExternalLink, Hash, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CapabilityPassportPage: React.FC = () => {
  const { passportData, activeStudent } = useApp();

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Verified Capability Passport</h1>
              <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
                Proof of Capability
              </span>
            </div>
            <p className="text-xs text-mono-500 mt-1">
              Auditable portfolio powered by evidence verification rather than unverified resume self-claims.
            </p>
          </div>

          <div className="text-right font-mono hidden sm:block">
            <span className="text-xs text-mono-400 block">NATIONAL PASSPORT ID</span>
            <span className="text-xs font-bold text-mono-950">SKL-2026-{activeStudent.id.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="p-6 bg-white border-2 border-mono-950 rounded-lg shadow-md space-y-6">
        {/* Passport Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mono-200 pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={activeStudent.avatar} 
              alt={activeStudent.name}
              className="w-16 h-16 rounded-lg border border-mono-400 object-cover shadow-xs" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-mono-950">{activeStudent.name}</h2>
                <ShieldCheck className="w-5 h-5 text-mono-950" />
              </div>
              <p className="text-xs text-mono-600 font-semibold">{activeStudent.email}</p>
              <p className="text-xs text-mono-500 mt-0.5">Target Industry Role: <strong>{activeStudent.targetRole}</strong></p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <span className="text-xs font-mono uppercase text-mono-500 font-bold">Overall Capability Readiness</span>
            <span className="text-3xl font-extrabold font-mono text-mono-950">{activeStudent.readinessScore}%</span>
            <span className="text-[10px] font-mono text-mono-400">Verified by SkillLoop Engine</span>
          </div>
        </div>

        {/* 4 Verified Badges */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-mono-500 font-bold block">
            Verified Proof Badges
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-md border text-xs flex items-center gap-2.5 ${
              passportData.verifiedBadges.diagnosticVerified
                ? 'bg-mono-950 text-white border-mono-950'
                : 'bg-mono-100 text-mono-400 border-mono-200 opacity-60'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-bold block">Diagnostic</span>
                <span className="text-[10px] font-mono opacity-80">Verified</span>
              </div>
            </div>

            <div className={`p-3 rounded-md border text-xs flex items-center gap-2.5 ${
              passportData.verifiedBadges.projectVerified
                ? 'bg-mono-950 text-white border-mono-950'
                : 'bg-mono-100 text-mono-400 border-mono-200 opacity-60'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-bold block">Project</span>
                <span className="text-[10px] font-mono opacity-80">Verified</span>
              </div>
            </div>

            <div className={`p-3 rounded-md border text-xs flex items-center gap-2.5 ${
              passportData.verifiedBadges.challengeVerified
                ? 'bg-mono-950 text-white border-mono-950'
                : 'bg-mono-100 text-mono-400 border-mono-200 opacity-60'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-bold block">Challenge</span>
                <span className="text-[10px] font-mono opacity-80">Verified</span>
              </div>
            </div>

            <div className={`p-3 rounded-md border text-xs flex items-center gap-2.5 ${
              passportData.verifiedBadges.defenseVerified
                ? 'bg-mono-950 text-white border-mono-950'
                : 'bg-mono-100 text-mono-400 border-mono-200 opacity-60'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-bold block">Defense</span>
                <span className="text-[10px] font-mono opacity-80">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Projects with Defense Scores */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase text-mono-500 font-bold block">
            Verified Projects & Defense Ratings
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passportData.verifiedProjects.map((proj, idx) => (
              <div key={idx} className="p-4 border border-mono-200 rounded-md bg-mono-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-mono-950 text-xs truncate">{proj.title}</span>
                  <span className="font-mono text-xs font-extrabold bg-mono-950 text-white px-2 py-0.5 rounded">
                    Score: {proj.defenseScore}/100
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.skillsDemonstrated.map((sk, i) => (
                    <span key={i} className="text-[10px] font-mono bg-white text-mono-800 px-1.5 py-0.5 rounded border border-mono-200">
                      {sk}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-mono-900 hover:underline pt-1"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>{proj.repoUrl}</span>
                  <ExternalLink className="w-3 h-3 text-mono-500" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Signatures & Reviews */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase text-mono-500 font-bold block">
            Verified Mentor Signatures & Endorsements
          </span>
          <div className="space-y-3">
            {passportData.mentorSignatures.map((sig, idx) => (
              <div key={idx} className="p-4 border border-mono-200 rounded-md bg-white space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-mono-950" />
                    <span className="font-bold text-mono-950 text-xs">{sig.mentorName}</span>
                    <span className="text-mono-400 text-xs">({sig.role}, {sig.organization})</span>
                  </div>
                  <span className="text-[10px] font-mono text-mono-400">{sig.date}</span>
                </div>
                <p className="text-xs text-mono-700 italic leading-relaxed pl-6">
                  "{sig.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Certifications */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase text-mono-500 font-bold block">
            Cryptographically Verified Certifications
          </span>
          <div className="space-y-2">
            {passportData.certifications.map((cert, idx) => (
              <div key={idx} className="p-3 border border-mono-200 rounded-md bg-mono-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-mono-950 shrink-0" />
                  <div>
                    <span className="font-bold text-mono-950 block">{cert.title}</span>
                    <span className="text-[11px] text-mono-500">{cert.issuer} • Issued {cert.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono bg-white text-mono-800 px-2 py-1 rounded border border-mono-200">
                  <Hash className="w-3 h-3 text-mono-400" />
                  <span>{cert.verificationHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
