import React, { useState } from 'react';
import { Building2, Search, UserCheck, Star, Plus, CheckCircle2, TrendingUp, Filter, ArrowRight, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TechNovaIndustryPortal: React.FC = () => {
  const { showToast, setActiveTab } = useApp();
  const [searchSkill, setSearchSkill] = useState('');
  const [shortlisted, setShortlisted] = useState<string[]>(['s1']);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New role form
  const [roleTitle, setRoleTitle] = useState('Data Analytics Intern');
  const [stipend, setStipend] = useState('₹35,000/month');
  const [location, setLocation] = useState('Bangalore (Hybrid)');

  const candidates = [
    {
      id: 's1',
      name: 'Aarav Kumar',
      email: 'aarav@iit.ac.in',
      avatar: 'AK',
      college: 'Innovortex Institute of Technology',
      branch: 'Computer Science',
      year: 3,
      location: 'Bangalore',
      readinessScore: 72,
      careerInterest: 'Data Analyst',
      skills: [
        { name: 'Python', score: 85, verified: true },
        { name: 'SQL', score: 60, verified: true },
        { name: 'Communication', score: 88, verified: true },
        { name: 'React', score: 78, verified: false }
      ]
    },
    {
      id: 's2',
      name: 'Priya Sharma',
      email: 'priya@vit.ac.in',
      avatar: 'PS',
      college: 'VIT University',
      branch: 'Computer Science',
      year: 4,
      location: 'Vellore',
      readinessScore: 88,
      careerInterest: 'Software Developer',
      skills: [
        { name: 'React', score: 92, verified: true },
        { name: 'JavaScript', score: 89, verified: true },
        { name: 'Node.js', score: 78, verified: true },
        { name: 'Docker', score: 60, verified: false }
      ]
    },
    {
      id: 's3',
      name: 'Rohan Mehta',
      email: 'rohan@bits.ac.in',
      avatar: 'RM',
      college: 'BITS Pilani',
      branch: 'Electronics & Communication',
      year: 3,
      location: 'Pilani',
      readinessScore: 61,
      careerInterest: 'AI Engineer',
      skills: [
        { name: 'Python', score: 72, verified: true },
        { name: 'C++', score: 80, verified: true },
        { name: 'Machine Learning', score: 68, verified: false }
      ]
    }
  ];

  const marketTrends = [
    { skill: 'Python', demand: 92, supply: 68, trend: 'hot' },
    { skill: 'Cloud (AWS/GCP)', demand: 88, supply: 38, trend: 'hot' },
    { skill: 'React / Next.js', demand: 85, supply: 72, trend: 'growing' },
    { skill: 'Machine Learning', demand: 82, supply: 42, trend: 'growing' },
    { skill: 'SQL Optimization', demand: 90, supply: 58, trend: 'hot' },
    { skill: 'Docker / K8s', demand: 78, supply: 35, trend: 'growing' }
  ];

  const filterSkills = ['Python', 'React', 'SQL', 'Machine Learning', 'Docker', 'Communication'];

  const toggleShortlist = (id: string, name: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter(x => x !== id));
      showToast(`Removed ${name} from shortlist`, 'info');
    } else {
      setShortlisted([...shortlisted, id]);
      showToast(`Shortlisted ${name} for interview rounds!`, 'success');
    }
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostModalOpen(false);
    showToast(`Opportunity "${roleTitle}" successfully posted to SkillLoop!`, 'success');
  };

  const filteredCandidates = candidates.filter(c => {
    if (!searchSkill) return true;
    return c.skills.some(s => s.name.toLowerCase().includes(searchSkill.toLowerCase()));
  });

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-display font-bold text-xl flex items-center justify-center shadow-glow-blue">
            TN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">TechNova Industry Portal</h1>
              <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-semibold">
                Verified Hiring
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Discover and hire candidates verified through Socratic defenses and real problem capsules.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('challenge-ledger')}
            className="px-3 py-1.5 glass hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold rounded-xl transition-all"
          >
            Audit Challenge Ledger
          </button>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Challenge / Role</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Candidates + Right Skill Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Talent Discovery */}
        <div className="lg:col-span-8 space-y-5">
          {/* Search bar & filter pills */}
          <div className="glass rounded-xl p-4 border border-blue-500/20 space-y-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-400" />
              <input
                type="text"
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                placeholder="Search candidates by skill (e.g. Python, SQL, React)..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              {searchSkill && (
                <button onClick={() => setSearchSkill('')} className="text-xs text-slate-400 hover:text-white">
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
              <span className="text-[10px] font-mono uppercase text-slate-400 mr-1">Filter by Skill:</span>
              {filterSkills.map((sk) => (
                <button
                  key={sk}
                  onClick={() => setSearchSkill(searchSkill === sk ? '' : sk)}
                  className={`skill-tag text-[10px] transition-all ${
                    searchSkill === sk
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'glass text-slate-300 hover:bg-white/10 border-white/10'
                  }`}
                >
                  {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Cards */}
          <div className="space-y-4">
            {filteredCandidates.map((cand) => {
              const isShort = shortlisted.includes(cand.id);
              return (
                <div
                  key={cand.id}
                  className="glass-strong rounded-2xl p-5 border border-blue-500/30 hover:border-blue-400/60 transition-all hover-lift space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0">
                        {cand.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{cand.name}</h3>
                          <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                            {cand.readinessScore}% Ready
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{cand.college} · {cand.careerInterest}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleShortlist(cand.id, cand.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isShort
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                          : 'glass hover:bg-blue-500/20 text-slate-300 border border-white/10'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isShort ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>{isShort ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                    </button>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cand.skills.map((s) => (
                      <span
                        key={s.name}
                        className={`skill-tag ${
                          s.verified
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'glass text-slate-400 border-white/10'
                        }`}
                      >
                        {s.name} ({s.score}%) {s.verified && '✓'}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 Cols): Market Intelligence */}
        <div className="lg:col-span-4 space-y-5">
          <div className="glass rounded-2xl p-5 border border-blue-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Skill Demand vs Supply</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Live Signals</span>
            </div>

            <div className="space-y-3">
              {marketTrends.map((t) => (
                <div key={t.skill} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{t.skill}</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded uppercase ${
                      t.trend === 'hot' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {t.trend}
                    </span>
                  </div>
                  <div className="w-full bg-navy-900 h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full" style={{ width: `${t.demand}%` }} title={`Demand: ${t.demand}%`} />
                    <div className="bg-emerald-500 h-full" style={{ width: `${t.supply}%` }} title={`Supply: ${t.supply}%`} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Demand: {t.demand}%</span>
                    <span>Supply: {t.supply}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 border border-blue-500/20 space-y-3 text-xs">
            <h4 className="font-semibold text-white">Cryptographic Hiring Guarantee</h4>
            <p className="text-slate-400 leading-relaxed">
              When candidates defend your problem capsule, SkillLoop mints a verified evaluation hash backed by telemetry audits.
            </p>
            <button
              onClick={() => setActiveTab('candidate-eval')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Inspect Candidate Defenses</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Role Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md glass-strong rounded-2xl p-6 border border-blue-500/30 shadow-2xl space-y-4">
            <h3 className="text-base font-display font-bold text-white">Post New Industry Role</h3>
            <form onSubmit={handleCreateRole} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full p-2.5 bg-navy-900 border border-blue-500/30 rounded-xl text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">Stipend / Compensation</label>
                <input
                  type="text"
                  required
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  className="w-full p-2.5 bg-navy-900 border border-blue-500/30 rounded-xl text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-navy-900 border border-blue-500/30 rounded-xl text-white focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Publish Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
