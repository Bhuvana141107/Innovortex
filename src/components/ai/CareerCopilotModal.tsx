import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: string[];
}

export const CareerCopilotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeStudent, setActiveTab } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${activeStudent.name}! I'm your SkillLoop Career Copilot. I analyze your verified skills, gap deltas, and real-time market signals to guide your roadmap. How can I help you today?`,
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const promptChips = [
    'What should I learn next?',
    'Am I ready for internships?',
    'Which role suits my skills?',
    'How can I improve my readiness?',
    'What is my readiness score based on?'
  ];

  const handleSend = (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now'
    };

    let reply = '';
    let recs: string[] = [];

    const lower = text.toLowerCase();
    if (lower.includes('learn next') || lower.includes('what should i learn')) {
      reply = `Based on your target role (${activeStudent.targetRole}) and your 72% readiness score, your highest return on investment is closing your SQL and Stream Processing gaps. Completing an Advanced SQL & Windowed Aggregation module will boost your readiness score by +8% and qualify you for DataSphere's active internship.`;
      recs = ['Launch SQL Practice in Shadow Sandbox', 'View 6-Week Adaptive Roadmap'];
    } else if (lower.includes('ready for internships') || lower.includes('am i ready')) {
      reply = `You are currently 84% matched to TechNova's Junior Data Analyst role and 91% matched to DataSphere's Data Analyst Intern role! You meet the core Python (85%) and Communication (88%) requirements. We recommend taking the Socratic Defense Checkpoint to prove your code understanding before applying.`;
      recs = ['Browse Matched Opportunities', 'Enter Socratic Defense Room'];
    } else if (lower.includes('which role') || lower.includes('suits my skills')) {
      reply = `With your strong foundations in Python (85%), Data Structures (84%), and Communication (88%), you are well-aligned for Data Analyst and Software Developer tracks. Addressing your Cloud/Docker gaps would open up Full-Stack Engineering roles.`;
      recs = ['Inspect 4-Tier Capability Map', 'Take Skill Assessment'];
    } else if (lower.includes('readiness score based on')) {
      reply = `Your ${activeStudent.readinessScore}% Career Readiness Score is calculated from verified diagnostic benchmarks (35%), Socratic defense rigor (25%), code complexity in shadow problems (25%), and real-time alignment with active employer commitments (15%).`;
      recs = ['View Cryptographic Passport', 'Review Evaluation Breakdown'];
    } else {
      reply = `I have analyzed your request against the latest industry demand data from TechNova and Zepto. Focus on hands-on project artifacts and defending edge-cases to accelerate your placement eligibility.`;
      recs = ['Go to Dashboard', 'Open Shadow Sandbox'];
    }

    const botMsg: Message = {
      id: `b_${Date.now() + 1}`,
      sender: 'assistant',
      text: reply,
      timestamp: 'Just now',
      recommendations: recs
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-[600px] glass-strong rounded-2xl border border-blue-500/30 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-blue-500/20 bg-navy-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-white text-base">SkillLoop Career Copilot</h3>
                <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">
                  AI Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Personalized advisory tailored for {activeStudent.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'glass text-slate-200 border border-blue-500/20'
                }`}
              >
                <p>{m.text}</p>
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                      Recommended Next Actions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.recommendations.map((rec) => (
                        <button
                          key={rec}
                          onClick={() => {
                            if (rec.includes('Opportunity')) setActiveTab('opportunities');
                            else if (rec.includes('Defense')) setActiveTab('defense');
                            else if (rec.includes('Roadmap')) setActiveTab('roadmap');
                            else if (rec.includes('Passport')) setActiveTab('passport');
                            else if (rec.includes('Shadow')) setActiveTab('shadow-problem');
                            else setActiveTab('dashboard');
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[11px] font-medium flex items-center gap-1 transition-all"
                        >
                          <span>{rec}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <span className="block text-[10px] text-slate-500 font-mono mt-1 text-right">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Chips */}
        <div className="p-3 border-t border-blue-500/20 bg-navy-900/60 overflow-x-auto no-scrollbar flex items-center gap-2">
          {promptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="shrink-0 px-2.5 py-1 rounded-full text-[11px] glass hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 border border-blue-500/30 transition-all font-medium"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-blue-500/20 bg-navy-800/90 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Career Copilot anything about your skills, readiness, or jobs..."
            className="flex-1 bg-navy-900/90 border border-blue-500/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
