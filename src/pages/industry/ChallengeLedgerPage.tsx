import React from 'react';
import { FileText, ShieldCheck, Hash, User, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChallengeLedgerPage: React.FC = () => {
  const { challengeLedger } = useApp();

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Auditable Challenge Ledger</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Immutable Timeline
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Complete transparent trail tracking commitment creation, candidate enrollment, capsule unlocks, mentor reviews, and hiring offers.
        </p>
      </div>

      {/* Ledger Stream Card */}
      <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-mono-200 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-mono-950" />
            <h3 className="font-bold text-mono-950 text-base">Cryptographic Ledger Stream</h3>
          </div>
          <span className="text-xs font-mono text-mono-500">
            Total Logged Events: {challengeLedger.length}
          </span>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 space-y-6 border-l-2 border-mono-950">
          {challengeLedger.map((evt, idx) => (
            <div key={evt.id} className="relative space-y-2">
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-mono-950 border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>

              <div className="p-4 border border-mono-200 rounded-md bg-mono-50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase bg-mono-950 text-white px-2 py-0.5 rounded">
                      {evt.stage}
                    </span>
                    <span className="text-xs font-bold text-mono-950">{evt.actor}</span>
                  </div>
                  <span className="text-[11px] font-mono text-mono-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{evt.timestamp}</span>
                  </span>
                </div>

                <p className="text-xs text-mono-800 leading-relaxed font-sans">{evt.description}</p>

                <div className="pt-2 border-t border-mono-200/80 flex items-center justify-between text-[10px] font-mono text-mono-500">
                  <span>Status: VERIFIED & SEALED</span>
                  <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-mono-200">
                    <Hash className="w-3 h-3 text-mono-400" />
                    <span>Hash: {evt.verifiedHash}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
