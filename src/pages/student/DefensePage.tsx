import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Award, Sparkles, ArrowRight, FileText, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DefensePage: React.FC = () => {
  const { submitDefenseResponse, setActiveTab, activeStudent, employerCommitments } = useApp();

  const [challengeTitle, setChallengeTitle] = useState(
    'TechNova Real-Time Financial Fraud Detection Challenge'
  );
  const [solutionCode, setSolutionCode] = useState(
    `class FraudDeduplicator:\n    def __init__(self, ttl_seconds=300):\n        self.ttl = ttl_seconds\n        self.seen_hashes = {}\n    \n    def is_duplicate(self, tx_id, timestamp):\n        self._evict_expired(timestamp)\n        if tx_id in self.seen_hashes:\n            return True\n        self.seen_hashes[tx_id] = timestamp\n        return False\n        \n    def _evict_expired(self, current_time):\n        expired = [k for k, v in self.seen_hashes.items() if current_time - v > self.ttl]\n        for k in expired:\n            del self.seen_hashes[k]`
  );
  const [approach, setApproach] = useState(
    'I utilized an in-memory Hash Map indexed by transaction UUID, accompanied by timestamp-based lazy eviction to keep memory footprint strictly bounded under 64MB.'
  );
  const [tradeOffs, setTradeOffs] = useState(
    'Memory lookup is O(1), but lazy eviction during write calls can cause micro-spikes in latency under high insertion bursts. In a production cluster, a background thread handles evictions.'
  );
  const [scalability, setScalability] = useState(
    'Across multiple pods, this local map would be upgraded to a Redis Cluster using sliding window sorted sets (ZREMRANGEBYSCORE) backed by memory limits.'
  );
  const [debugging, setDebugging] = useState(
    'Initially, I experienced memory leaks because timestamps were compared as floating point seconds without handling out-of-order arrival buffers.'
  );
  const [adaptation, setAdaptation] = useState(
    'When presented with the live constraint of 45-second out-of-order network latency, I added a 60-second grace window to the TTL calculation.'
  );

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDefense = (e: React.FormEvent) => {
    e.preventDefault();
    submitDefenseResponse({
      challengeId: 'chal_1',
      challengeTitle,
      solutionCode,
      approach,
      tradeOffs,
      scalability,
      debugging,
      adaptation
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Reasoning & Defense Checkpoint</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Human Defense Verified
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          "We don’t measure what AI can produce. We measure what the human can understand, build, defend and adapt."
        </p>
      </div>

      {submitted ? (
        /* Defense Submitted Success Card */
        <div className="p-8 border border-mono-300 rounded-lg bg-white shadow-xs text-center space-y-6 fade-in">
          <div className="w-16 h-16 bg-mono-950 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-mono-950">Defense Verified & Recorded to Ledger!</h2>
            <p className="text-xs text-mono-500 max-w-md mx-auto mt-1">
              Your 4-part solution defense and adaptation analysis have been logged to the immutable Challenge Ledger and added to your Capability Passport.
            </p>
          </div>

          {/* Scoring Breakdown Box */}
          <div className="p-5 border border-mono-200 rounded-lg bg-mono-50 max-w-xl mx-auto space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-mono-200 pb-2">
              <span className="font-mono text-xs uppercase font-bold text-mono-950">
                Evaluation Metric Breakdown
              </span>
              <span className="font-mono text-sm font-extrabold text-mono-950">
                Total Score: 90 / 100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded border border-mono-200">
                <span className="text-mono-500 block text-[10px] uppercase font-mono">1. Solution Code</span>
                <span className="font-bold text-mono-950">27 / 30 pts</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-mono-200">
                <span className="text-mono-500 block text-[10px] uppercase font-mono">2. Reasoning & Approach</span>
                <span className="font-bold text-mono-950">23 / 25 pts</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-mono-200">
                <span className="text-mono-500 block text-[10px] uppercase font-mono">3. Defense & Trade-offs</span>
                <span className="font-bold text-mono-950">22 / 25 pts</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-mono-200">
                <span className="text-mono-500 block text-[10px] uppercase font-mono">4. Live Adaptation</span>
                <span className="font-bold text-mono-950">18 / 20 pts</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('passport')}
              className="px-5 py-2.5 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <span>View Capability Passport</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('challenge-ledger')}
              className="px-5 py-2.5 border border-mono-300 bg-white hover:bg-mono-100 text-mono-900 text-xs font-bold rounded-md transition-colors"
            >
              Check Challenge Ledger
            </button>
          </div>
        </div>
      ) : (
        /* Defense Submission Form */
        <form onSubmit={handleSubmitDefense} className="space-y-6">
          {/* Dynamic Live Constraint Banner */}
          <div className="p-4 border-2 border-mono-950 rounded-lg bg-mono-950 text-white shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-mono-200" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wide">
                Live Defense Requirement & Adaptation Challenge
              </h3>
            </div>
            <p className="text-xs text-mono-300 leading-relaxed font-mono">
              Live Edge Case Triggered: "Supposing network jitter causes events to arrive 45 seconds out of chronological order under peak load, how does your eviction policy adapt to prevent false duplicate drops?"
            </p>
          </div>

          {/* Form Fields */}
          <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                Challenge Target Title
              </label>
              <input
                type="text"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                className="w-full text-xs font-bold p-2.5 border border-mono-300 rounded bg-mono-50 text-mono-950"
              />
            </div>

            {/* Solution Code */}
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                1. Final Solution Code Implementation (Max 30 Pts)
              </label>
              <textarea
                rows={6}
                value={solutionCode}
                onChange={(e) => setSolutionCode(e.target.value)}
                className="w-full font-mono text-xs p-3 bg-mono-950 text-mono-100 rounded border border-mono-800 focus:outline-none"
              />
            </div>

            {/* Approach */}
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                2. Approach Explanation & Data Structure Selection (Max 25 Pts)
              </label>
              <textarea
                rows={3}
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                className="w-full text-xs p-3 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
              />
            </div>

            {/* Trade-offs & Scalability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                  3A. System Trade-Offs Analyzed
                </label>
                <textarea
                  rows={3}
                  value={tradeOffs}
                  onChange={(e) => setTradeOffs(e.target.value)}
                  className="w-full text-xs p-3 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                  3B. Scalability & Distributed Production Plan
                </label>
                <textarea
                  rows={3}
                  value={scalability}
                  onChange={(e) => setScalability(e.target.value)}
                  className="w-full text-xs p-3 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>
            </div>

            {/* Debugging & Adaptation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                  3C. Debugging Strategy & Memory Boundary Fixes
                </label>
                <textarea
                  rows={3}
                  value={debugging}
                  onChange={(e) => setDebugging(e.target.value)}
                  className="w-full text-xs p-3 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-mono-500 font-bold block">
                  4. Live Adaptation Response (Max 20 Pts)
                </label>
                <textarea
                  rows={3}
                  value={adaptation}
                  onChange={(e) => setAdaptation(e.target.value)}
                  className="w-full text-xs p-3 border border-mono-300 rounded focus:outline-none focus:border-mono-900"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-mono-200 flex justify-between items-center">
              <div className="text-xs text-mono-500 font-mono">
                Formula: Solution (30) + Reasoning (25) + Defense (25) + Adaptation (20) = 100
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors shadow-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Verified Defense</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
