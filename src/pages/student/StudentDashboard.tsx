import React, { useState } from 'react';
import { 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Box, 
  ShieldAlert, 
  Sparkles, 
  Activity,
  Compass,
  Zap,
  TrendingUp,
  Database,
  Layers,
  BarChart3,
  Check,
  ExternalLink,
  ChevronRight,
  Bot,
  Play
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { CareerCopilotModal } from '../../components/ai/CareerCopilotModal';

export const StudentDashboard: React.FC = () => {
  const { 
    activeStudent, 
    skillGaps, 
    roadmap, 
    updateRoadmapItemStatus, 
    setActiveTab, 
    dismissMentorAlert,
    employerCommitments
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'radar' | 'gaps' | 'growth'>('overview');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Simulator State
  const [boosts, setBoosts] = useState<Record<string, boolean>>({
    sql: true,
    powerbi: false,
    project: false
  });

  const baseReadiness = activeStudent.readinessScore || 72;
  const potentialBoost = (boosts.sql ? 8 : 0) + (boosts.powerbi ? 6 : 0) + (boosts.project ? 10 : 0);
  const potentialScore = Math.min(100, baseReadiness + potentialBoost);

  const activeChallenge = employerCommitments.find(c => c.id === activeStudent.activeChallengeId) || employerCommitments[0];

  // 1. Radar Chart Data: 6-Dimension Capability Footprint in Burgundy & Sage Palette
  const radarData = [
    { subject: 'System Architecture', student: 68, benchmark: 85, fullMark: 100 },
    { subject: 'Algorithmic Depth', student: 85, benchmark: 88, fullMark: 100 },
    { subject: 'Socratic Defense', student: 82, benchmark: 85, fullMark: 100 },
    { subject: 'Edge Debugging', student: 74, benchmark: 80, fullMark: 100 },
    { subject: 'Data Structures', student: 84, benchmark: 88, fullMark: 100 },
    { subject: 'Code Craft / Syntax', student: 95, benchmark: 92, fullMark: 100 },
  ];

  // 2. Bar Chart Data: Skill Gap Delta Matrix
  const gapChartData = [
    { skill: 'Python', current: 85, target: 80, gap: 0 },
    { skill: 'SQL', current: 60, target: 80, gap: 20 },
    { skill: 'React', current: 78, target: 75, gap: 0 },
    { skill: 'ML / AI', current: 45, target: 70, gap: 25 },
    { skill: 'Communication', current: 88, target: 70, gap: 0 },
    { skill: 'Power BI', current: 30, target: 65, gap: 35 },
  ];

  // 3. Area Chart Data: 6-Week Learning Velocity
  const growthData = [
    { week: 'W1: Diagnostic', score: 48, benchmark: 50 },
    { week: 'W2: Syntax Refactor', score: 58, benchmark: 58 },
    { week: 'W3: Shadow Sandbox', score: 65, benchmark: 65 },
    { week: 'W4: Capsule Defense', score: 72, benchmark: 72 },
    { week: 'W5: Current State', score: baseReadiness, benchmark: 78 },
    { week: 'W6: Simulated Target', score: potentialScore, benchmark: 85 },
  ];

  return (
    <div className="space-y-6 fade-in pb-16 font-sans">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE2D3] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-[#1C1413] tracking-tight">Student Capability Dashboard</h1>
            <span className="text-[10px] font-mono uppercase bg-[#FBF0F2] text-[#72192D] border border-[#F4D9DF] px-2 py-0.5 rounded-md font-semibold">
              PS26044 Intelligence
            </span>
          </div>
          <p className="text-xs text-[#7A6B62] mt-1">
            Continuous capability verification & graphical intelligence for <strong className="text-[#1C1413] font-semibold">{activeStudent.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('assessment')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] border border-[#EAE2D3] text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-[#72192D]" />
            <span>Take Assessment</span>
          </button>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#72192D] hover:bg-[#8E233B] text-[#FAF7F2] text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Bot className="w-4 h-4 text-[#FAF7F2]" />
            <span>AI Career Copilot</span>
          </button>
        </div>
      </div>

      {/* Mentor Alert Callout (if active) */}
      {activeStudent.mentorAlertActive && activeStudent.mentorAlertDetails && (
        <div className="p-4 rounded-2xl bg-[#FBEDE6] border border-[#F5D7C9] shadow-sm fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F5D7C9] border border-[#E2B7A3] text-[#99411F] rounded-xl shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xs text-[#99411F] uppercase tracking-wider font-mono">
                    Mentor Alert · Capability Bottleneck Detected
                  </h3>
                  <span className="text-[10px] font-mono bg-[#EED6C7] text-[#99411F] px-1.5 py-0.2 rounded border border-[#E2B7A3] font-semibold">
                    Attempts: {activeStudent.mentorAlertDetails.attemptCount}
                  </span>
                </div>
                <p className="text-xs text-[#453831] mt-1">
                  Misconception: <span className="font-mono bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#EAE2D3] text-[#99411F] font-semibold">{activeStudent.mentorAlertDetails.misconception}</span>
                </p>
                <p className="text-xs text-[#7A6B62] mt-0.5">
                  Action: {activeStudent.mentorAlertDetails.suggestedAction}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-3 py-1.5 bg-[#72192D] hover:bg-[#8E233B] text-[#FAF7F2] text-xs font-semibold rounded-lg transition-colors"
              >
                Go to Roadmap
              </button>
              <button
                onClick={() => dismissMentorAlert(activeStudent.id)}
                className="px-2.5 py-1.5 bg-white hover:bg-[#F4EFE6] text-[#7A6B62] text-xs font-semibold rounded-lg transition-colors border border-[#EAE2D3]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness Score */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE2D3] shadow-xs flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
              Career Readiness Score
            </span>
            <Activity className="w-4 h-4 text-[#72192D]" />
          </div>
          <div className="my-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-[#72192D]">
              {baseReadiness}%
            </span>
            <span className="text-[11px] text-[#7A6B62] font-medium">Target: {activeStudent.targetRole}</span>
          </div>
          <div className="w-full bg-[#EAE2D3] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#72192D] h-full transition-all duration-500 rounded-full" 
              style={{ width: `${baseReadiness}%` }} 
            />
          </div>
        </div>

        {/* Metric 2: Top Stage Verified */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE2D3] shadow-xs flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
              Top Stage Verified
            </span>
            <Compass className="w-4 h-4 text-[#2C543D]" />
          </div>
          <div className="my-2.5">
            <div className="text-sm font-semibold text-[#1C1413]">Data Structures & Syntax</div>
            <div className="text-[11px] text-[#2C543D] font-mono font-semibold mt-0.5">95% Syntax · 84% Structures</div>
          </div>
          <button
            onClick={() => setActiveTab('capability-map')}
            className="text-xs font-semibold text-[#2C543D] hover:text-[#1F3D2B] flex items-center gap-1"
          >
            <span>View 4-Tier Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric 3: Critical Deficit */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE2D3] shadow-xs flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
              Critical Skill Gap
            </span>
            <Zap className="w-4 h-4 text-[#C75D35]" />
          </div>
          <div className="my-2.5">
            <div className="text-xs font-semibold text-[#1C1413] truncate">
              {skillGaps[0]?.industryRequirement || 'Power BI & Stream Processing'}
            </div>
            <div className="text-[11px] text-[#C75D35] font-mono font-semibold mt-0.5">
              Gap: 35% from benchmark
            </div>
          </div>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="text-xs font-semibold text-[#C75D35] hover:text-[#99411F] flex items-center gap-1"
          >
            <span>Launch Gap Engine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric 4: Active Challenge */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE2D3] shadow-xs flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
              Active Corporate Capsule
            </span>
            <Box className="w-4 h-4 text-[#72192D]" />
          </div>
          <div className="my-2.5">
            <div className="text-xs font-semibold text-[#1C1413] truncate">{activeChallenge?.title}</div>
            <div className="text-[11px] text-[#72192D] font-mono font-semibold mt-0.5">{activeChallenge?.companyName}</div>
          </div>
          <button
            onClick={() => setActiveTab('shadow-problem')}
            className="w-full py-1.5 bg-[#FBF0F2] hover:bg-[#F4D9DF] text-[#72192D] border border-[#F4D9DF] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs"
          >
            <span>Enter Shadow Sandbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Graphical Intelligence Section */}
      <div className="bg-white border border-[#EAE2D3] shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EAE2D3] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#72192D] block font-bold">
              MULTI-AXIS CAPABILITY RADAR & DELTAS
            </span>
            <h2 className="font-display text-xl font-bold text-[#1C1413] mt-0.5">
              Visual Capability Intelligence
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#F4EFE6] rounded-xl border border-[#EAE2D3] self-start sm:self-auto">
            {(['overview', 'radar', 'gaps', 'growth'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeSubTab === tab 
                    ? 'bg-[#72192D] text-[#FAF7F2] shadow-sm' 
                    : 'text-[#7A6B62] hover:text-[#1C1413]'
                }`}
              >
                {tab === 'overview' ? 'All Visuals' : tab === 'radar' ? 'Radar' : tab === 'gaps' ? 'Gaps' : 'Velocity'}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: 6-Axis Capability Radar */}
          {(activeSubTab === 'overview' || activeSubTab === 'radar') && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE2D3] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-semibold text-[#1C1413]">6-Axis Capability Radar</h3>
                  <p className="text-[11px] text-[#7A6B62]">Candidate Footprint vs Industry Benchmark</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-[#72192D] font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#72192D] inline-block" />
                    <span>Candidate</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#2C543D] font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2C543D] inline-block" />
                    <span>Benchmark</span>
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="#EAE2D3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#453831', fontSize: 10, fontFamily: 'Inter' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#EAE2D3" tick={{ fill: '#7A6B62', fontSize: 9 }} />
                    <Radar name="Candidate" dataKey="student" stroke="#72192D" fill="#72192D" fillOpacity={0.35} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke="#2C543D" strokeDasharray="3 3" fill="#2C543D" fillOpacity={0.12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2B060E', borderColor: '#72192D', borderRadius: 8, fontSize: 11, color: '#FAF7F2' }}
                      formatter={(val: number) => [`${val}%`, 'Proficiency']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 pt-2 border-t border-[#EAE2D3] flex items-center justify-between text-[11px] text-[#7A6B62]">
                <span>Top: <strong className="text-[#2C543D]">Syntax & Code Craft (95%)</strong></span>
                <span>Active Remediation: <strong className="text-[#C75D35]">Power BI & SQL</strong></span>
              </div>
            </div>
          )}

          {/* Chart 2: Skill Gap Bar Chart */}
          {(activeSubTab === 'overview' || activeSubTab === 'gaps') && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE2D3] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-semibold text-[#1C1413]">Skill Gap Delta Matrix</h3>
                  <p className="text-[11px] text-[#7A6B62]">Current Level vs Required Threshold</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-[#72192D] font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#72192D] inline-block" />
                    <span>Current</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#C75D35] font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C75D35] inline-block" />
                    <span>Target</span>
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gapChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE2D3" vertical={false} />
                    <XAxis 
                      dataKey="skill" 
                      tick={{ fill: '#453831', fontSize: 10 }} 
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis domain={[0, 100]} tick={{ fill: '#7A6B62', fontSize: 9 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2B060E', borderColor: '#72192D', borderRadius: 8, fontSize: 11, color: '#FAF7F2' }}
                      formatter={(val: number, name: string) => [`${val}%`, name === 'current' ? 'Current Level' : 'Benchmark Target']}
                    />
                    <Bar dataKey="current" fill="#72192D" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#C75D35" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 pt-2 border-t border-[#EAE2D3] flex items-center justify-between text-[11px] text-[#7A6B62]">
                <span>Threshold Met: <strong className="text-[#2C543D]">Python, React, Comm</strong></span>
                <span>Delta Gap: <strong className="text-[#C75D35]">Power BI (-35%)</strong></span>
              </div>
            </div>
          )}

          {/* Chart 3: Learning Velocity Area Chart */}
          {(activeSubTab === 'overview' || activeSubTab === 'growth') && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE2D3] p-4 flex flex-col justify-between lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-semibold text-[#1C1413]">6-Week Learning Velocity & Readiness Progression</h3>
                  <p className="text-[11px] text-[#7A6B62]">Telemetry progression from baseline diagnostic to simulated target</p>
                </div>
                <span className="text-[11px] font-mono text-[#2C543D] bg-[#E8EFEA] px-2.5 py-0.5 rounded-md border border-[#D2DFD6] font-semibold">
                  +{potentialScore - 48}% Simulated Velocity
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="burgundyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#72192D" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#72192D" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE2D3" vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: '#453831', fontSize: 10 }} />
                    <YAxis domain={[30, 100]} tick={{ fill: '#7A6B62', fontSize: 9 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2B060E', borderColor: '#72192D', borderRadius: 8, fontSize: 11, color: '#FAF7F2' }}
                      formatter={(val: number, name: string) => [`${val}%`, name === 'score' ? 'Readiness Score' : 'Cohort Benchmark']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#72192D" 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#burgundyGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#2C543D" 
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      fill="none" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Career Readiness Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAE2D3] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EAE2D3] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <div>
              <h3 className="text-base font-display font-bold text-[#1C1413]">Career Readiness Simulator</h3>
              <p className="text-xs text-[#7A6B62]">See how completing specific verified courses & challenges boosts your readiness score</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#F4EFE6] px-4 py-2 rounded-xl border border-[#EAE2D3] font-mono">
            <div>
              <span className="text-[10px] text-[#7A6B62] block">CURRENT</span>
              <span className="text-lg font-bold text-[#1C1413]">{baseReadiness}%</span>
            </div>
            <span className="text-[#7A6B62] text-lg">→</span>
            <div>
              <span className="text-[10px] text-[#2C543D] block font-bold">POTENTIAL</span>
              <span className="text-xl font-bold text-[#72192D]">{potentialScore}%</span>
            </div>
          </div>
        </div>

        {/* Boost options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => setBoosts({ ...boosts, sql: !boosts.sql })}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              boosts.sql 
                ? 'bg-[#FBF0F2] border-[#72192D] shadow-xs' 
                : 'bg-[#FAF7F2] border-[#EAE2D3] hover:border-[#D5869B]'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-[#1C1413]">Complete SQL Masterclass</div>
              <span className="text-[11px] text-[#2C543D] font-mono font-bold">+8% Readiness Boost</span>
            </div>
            <input type="checkbox" checked={boosts.sql} readOnly className="w-4 h-4 accent-[#72192D]" />
          </div>

          <div
            onClick={() => setBoosts({ ...boosts, powerbi: !boosts.powerbi })}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              boosts.powerbi 
                ? 'bg-[#FBF0F2] border-[#72192D] shadow-xs' 
                : 'bg-[#FAF7F2] border-[#EAE2D3] hover:border-[#D5869B]'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-[#1C1413]">Learn Power BI Fundamentals</div>
              <span className="text-[11px] text-[#2C543D] font-mono font-bold">+6% Readiness Boost</span>
            </div>
            <input type="checkbox" checked={boosts.powerbi} readOnly className="w-4 h-4 accent-[#72192D]" />
          </div>

          <div
            onClick={() => setBoosts({ ...boosts, project: !boosts.project })}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              boosts.project 
                ? 'bg-[#FBF0F2] border-[#72192D] shadow-xs' 
                : 'bg-[#FAF7F2] border-[#EAE2D3] hover:border-[#D5869B]'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-[#1C1413]">Complete Capstone Project</div>
              <span className="text-[11px] text-[#2C543D] font-mono font-bold">+10% Readiness Boost</span>
            </div>
            <input type="checkbox" checked={boosts.project} readOnly className="w-4 h-4 accent-[#72192D]" />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Capability Matrix + Right Socratic Room */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Capability Matrix Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE2D3] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D3] pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[#1C1413]">Evidence-Based Capability Matrix</h3>
                <p className="text-xs text-[#7A6B62]">
                  Progression stage verified through diagnostics, shadow problems, and Socratic defenses.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('capability-map')}
                className="text-xs font-semibold px-3 py-1.5 bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] rounded-xl transition-colors border border-[#EAE2D3]"
              >
                Detailed Map
              </button>
            </div>

            <div className="space-y-4">
              {activeStudent.capabilities.map((cap, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#1C1413] text-xs w-32">{cap.stage}</span>
                      <span className="text-[#7A6B62] font-mono text-[11px]">({cap.evidenceCount} evidence items)</span>
                    </div>
                    <span className="font-mono font-bold text-[#2C543D]">{cap.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#EAE2D3] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#72192D] to-[#C75D35] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${cap.percentage}%` }}
                    />
                  </div>
                  {cap.weaknesses.length > 0 && (
                    <div className="text-[11px] text-[#7A6B62] pl-2 border-l-2 border-[#72192D] font-mono">
                      Weakness: {cap.weaknesses.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Adaptive Roadmap Execution Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE2D3] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D3] pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[#1C1413]">6-Week Adaptive Execution Roadmap</h3>
                <p className="text-xs text-[#7A6B62]">Target tasks generated from identified gap delta analysis.</p>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-semibold px-3 py-1.5 bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] rounded-xl transition-colors border border-[#EAE2D3]"
              >
                Full Roadmap
              </button>
            </div>

            <div className="space-y-3">
              {roadmap.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-[#FBF0F2] text-[#72192D] px-1.5 py-0.2 rounded border border-[#F4D9DF] font-semibold">
                        Milestone 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-semibold text-[#1C1413]">{item.title}</h4>
                    </div>
                    <p className="text-xs text-[#7A6B62]">{item.description}</p>
                  </div>

                  <select
                    value={item.status}
                    onChange={(e) => updateRoadmapItemStatus(item.id, e.target.value as any)}
                    className="text-xs bg-white border border-[#EAE2D3] rounded-lg px-2 py-1 text-[#1C1413] font-medium"
                  >
                    <option value="not_started">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Socratic Defense & Passport */}
        <div className="space-y-6">
          {/* Socratic Defense Callout: Regal Deep Bordeaux Velvet Card */}
          <div className="p-6 rounded-2xl bg-[#2B060E] text-[#FAF7F2] border border-[#420B17] space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4D9DF] font-bold">
                SOCRATIC DEFENSE ENGINE
              </span>
              <ShieldAlert className="w-4 h-4 text-[#F4D9DF]" />
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[#FAF7F2]">Prove You Built It</h3>
              <p className="text-xs text-[#E8B6C2] mt-1 leading-relaxed">
                AI evaluates your code trade-offs, concurrency scalability, and edge adaptation.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#420B17] border border-[#5A1222] text-[11px] space-y-1">
              <div className="font-semibold text-[#D2DFD6] font-mono">Latest Defense Rigor: 88%</div>
              <p className="text-[#E8B6C2]">Verified: Concurrency locks, zero-copy socket buffers.</p>
            </div>

            <button
              onClick={() => setActiveTab('defense')}
              className="w-full py-2.5 rounded-xl bg-[#72192D] hover:bg-[#8E233B] text-[#FAF7F2] text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Enter Socratic Defense Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cryptographic Passport */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE2D3] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
                Capability Passport
              </span>
              <Award className="w-4 h-4 text-[#B88A34]" />
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#1C1413]">Cryptographic Verification</h4>
              <p className="text-xs text-[#7A6B62] mt-0.5">
                Every verified milestone produces an auditable SHA-256 evidence block for recruiters.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3] font-mono text-[10px] text-[#7A6B62] break-all">
              SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
            </div>

            <button
              onClick={() => setActiveTab('passport')}
              className="w-full py-2 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#72192D] border border-[#EAE2D3] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Cryptographic Passport</span>
              <ExternalLink className="w-3 h-3 text-[#72192D]" />
            </button>
          </div>
        </div>
      </div>

      <CareerCopilotModal isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
};
