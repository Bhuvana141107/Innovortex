import React, { useState } from 'react';
import { Database, Upload, Github, Server, TrendingUp, CheckCircle2, FileText, ArrowRight, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DataCollectorPage: React.FC = () => {
  const { ingestionLogs, ingestDataStream, showToast, activeStudent } = useApp();
  const [activeSourceTab, setActiveSourceTab] = useState<'csv' | 'github' | 'erp' | 'demand'>('csv');

  // File Upload State
  const [pastedJson, setPastedJson] = useState(
    `[\n  {\n    "student_id": "stu_1",\n    "syntax_score": 95,\n    "data_structures_score": 84,\n    "debugging_score": 72,\n    "github_repo": "https://github.com/rahulkumar/fraud-ingestion-core",\n    "assessment_date": "2026-09-08"\n  }\n]`
  );

  // GitHub Repository Crawler State
  const [githubUrl, setGithubUrl] = useState('https://github.com/rahulkumar/fraud-ingestion-core');
  const [repoBranch, setRepoBranch] = useState('main');

  // ERP State
  const [collegeId, setCollegeId] = useState('NIT-K-2026');
  const [termSemester, setTermSemester] = useState('Semester VII - B.Tech CS');

  // Industry Demand API State
  const [apiEndpoint, setApiEndpoint] = useState('https://api.skillloop.gov.in/v1/industry-demand-stream');

  const handleSyncCSV = (e: React.FormEvent) => {
    e.preventDefault();
    ingestDataStream({
      source: 'CSV/JSON File',
      recordsCount: 142,
      summary: 'Parsed student diagnostic JSON file with 142 capability performance logs.'
    });
  };

  const handleSyncGitHub = (e: React.FormEvent) => {
    e.preventDefault();
    ingestDataStream({
      source: 'GitHub Repository',
      recordsCount: 18,
      summary: `Crawled ${githubUrl} (${repoBranch} branch). Extracted commit cadence and code complexity bounds.`
    });
  };

  const handleSyncERP = (e: React.FormEvent) => {
    e.preventDefault();
    ingestDataStream({
      source: 'College LMS / ERP',
      recordsCount: 350,
      summary: `Synchronized ${collegeId} ${termSemester} database records.`
    });
  };

  const handleSyncDemand = (e: React.FormEvent) => {
    e.preventDefault();
    ingestDataStream({
      source: 'Industry Demand API',
      recordsCount: 1200,
      summary: `Fetched real-time job market skill frequencies from ${apiEndpoint}.`
    });
  };

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Header */}
      <div className="border-b border-[#E0DBD3] pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-display font-light text-[#141412] tracking-tight">Institutional Data Collector & Ingestion Hub</h1>
          <span className="text-[10px] font-mono uppercase bg-[#1A1A18] text-[#F9F7F4] px-2 py-0.5 rounded font-semibold">
            Data Engine
          </span>
        </div>
        <p className="text-xs text-[#5C5954] mt-1">
          Collect, crawl, and ingest student performance data, GitHub code repos, institutional ERP grade sheets, and real-time industry demand metrics.
        </p>
      </div>

      {/* 4 Multi-Source Ingestion Pipeline Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveSourceTab('csv')}
          className={`p-4 rounded border text-left transition-all ${
            activeSourceTab === 'csv'
              ? 'bg-[#1A1A18] border-[#1A1A18] text-[#F9F7F4] shadow-xs'
              : 'bg-[#F2EFE9] border-[#E0DBD3] text-[#5C5954] hover:text-[#141412]'
          }`}
        >
          <Upload className={`w-5 h-5 mb-2 ${activeSourceTab === 'csv' ? 'text-[#C8BFB0]' : 'text-[#141412]'}`} />
          <span className="font-semibold text-xs block">1. CSV / JSON Ingestion</span>
          <span className={`text-[11px] ${activeSourceTab === 'csv' ? 'text-[#DDD9D1]' : 'text-[#8C8880]'}`}>Diagnostic test logs & submissions</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('github')}
          className={`p-4 rounded border text-left transition-all ${
            activeSourceTab === 'github'
              ? 'bg-[#1A1A18] border-[#1A1A18] text-[#F9F7F4] shadow-xs'
              : 'bg-[#F2EFE9] border-[#E0DBD3] text-[#5C5954] hover:text-[#141412]'
          }`}
        >
          <Github className={`w-5 h-5 mb-2 ${activeSourceTab === 'github' ? 'text-[#C8BFB0]' : 'text-[#141412]'}`} />
          <span className="font-semibold text-xs block">2. GitHub Code Crawler</span>
          <span className={`text-[11px] ${activeSourceTab === 'github' ? 'text-[#DDD9D1]' : 'text-[#8C8880]'}`}>Repo commit & syntax analysis</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('erp')}
          className={`p-4 rounded border text-left transition-all ${
            activeSourceTab === 'erp'
              ? 'bg-[#1A1A18] border-[#1A1A18] text-[#F9F7F4] shadow-xs'
              : 'bg-[#F2EFE9] border-[#E0DBD3] text-[#5C5954] hover:text-[#141412]'
          }`}
        >
          <Server className={`w-5 h-5 mb-2 ${activeSourceTab === 'erp' ? 'text-[#C8BFB0]' : 'text-[#141412]'}`} />
          <span className="font-semibold text-xs block">3. College LMS / ERP</span>
          <span className={`text-[11px] ${activeSourceTab === 'erp' ? 'text-[#DDD9D1]' : 'text-[#8C8880]'}`}>Institutional grade sheet sync</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('demand')}
          className={`p-4 rounded border text-left transition-all ${
            activeSourceTab === 'demand'
              ? 'bg-[#1A1A18] border-[#1A1A18] text-[#F9F7F4] shadow-xs'
              : 'bg-[#F2EFE9] border-[#E0DBD3] text-[#5C5954] hover:text-[#141412]'
          }`}
        >
          <TrendingUp className={`w-5 h-5 mb-2 ${activeSourceTab === 'demand' ? 'text-[#C8BFB0]' : 'text-[#141412]'}`} />
          <span className="font-semibold text-xs block">4. Industry Demand API</span>
          <span className={`text-[11px] ${activeSourceTab === 'demand' ? 'text-[#DDD9D1]' : 'text-[#8C8880]'}`}>Market skill frequency feeds</span>
        </button>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Selected Data Ingestion Configuration Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded bg-[#F2EFE9] border border-[#E0DBD3] space-y-5">
            {/* Stream 1: CSV / JSON */}
            {activeSourceTab === 'csv' && (
              <form onSubmit={handleSyncCSV} className="space-y-4 text-xs fade-in">
                <div className="flex items-center justify-between border-b border-[#E0DBD3] pb-3">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#141412]" />
                    <h3 className="font-semibold text-[#141412] text-sm">Paste or Upload Diagnostic Data (JSON/CSV)</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#5C5954] bg-[#EAE6DF] px-2 py-0.5 rounded border border-[#E0DBD3]">
                    Schema v2.4 Validated
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block">
                    Payload Raw Content
                  </label>
                  <textarea
                    rows={8}
                    value={pastedJson}
                    onChange={(e) => setPastedJson(e.target.value)}
                    className="w-full font-mono text-xs p-3 bg-[#F9F7F4] text-[#141412] border border-[#E0DBD3] rounded focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold rounded transition-all shadow-xs flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Parse & Ingest Payload into Engine</span>
                </button>
              </form>
            )}

            {/* Stream 2: GitHub Repository Crawler */}
            {activeSourceTab === 'github' && (
              <form onSubmit={handleSyncGitHub} className="space-y-4 text-xs fade-in">
                <div className="flex items-center justify-between border-b border-[#E0DBD3] pb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#141412]" />
                    <h3 className="font-semibold text-[#141412] text-sm">GitHub Repository Telemetry Crawler</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#3A5C3A] bg-[#E8F0E8] px-2 py-0.5 rounded border border-[#C4D4C4]">
                    AST Parser Ready
                  </span>
                </div>

                <div>
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block mb-1">
                    Student GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full p-2.5 bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] font-mono focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block mb-1">
                    Target Branch
                  </label>
                  <input
                    type="text"
                    required
                    value={repoBranch}
                    onChange={(e) => setRepoBranch(e.target.value)}
                    className="w-full p-2.5 bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] font-mono focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold rounded transition-all shadow-xs flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Crawl Repository & Sync AST Complexity Score</span>
                </button>
              </form>
            )}

            {/* Stream 3: College LMS / ERP */}
            {activeSourceTab === 'erp' && (
              <form onSubmit={handleSyncERP} className="space-y-4 text-xs fade-in">
                <div className="flex items-center justify-between border-b border-[#E0DBD3] pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#141412]" />
                    <h3 className="font-semibold text-[#141412] text-sm">Institutional LMS / ERP Connector</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#5C5954] bg-[#EAE6DF] px-2 py-0.5 rounded border border-[#E0DBD3]">
                    NEP 2020 Active
                  </span>
                </div>

                <div>
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block mb-1">
                    Institution Identifier (AISHE / Institute Code)
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    className="w-full p-2.5 bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] font-mono focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block mb-1">
                    Academic Term & Program
                  </label>
                  <input
                    type="text"
                    required
                    value={termSemester}
                    onChange={(e) => setTermSemester(e.target.value)}
                    className="w-full p-2.5 bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] font-mono focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold rounded transition-all shadow-xs flex items-center gap-2"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Sync ERP Grade Sheets & Attendance Telemetry</span>
                </button>
              </form>
            )}

            {/* Stream 4: Industry Demand API */}
            {activeSourceTab === 'demand' && (
              <form onSubmit={handleSyncDemand} className="space-y-4 text-xs fade-in">
                <div className="flex items-center justify-between border-b border-[#E0DBD3] pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#141412]" />
                    <h3 className="font-semibold text-[#141412] text-sm">Industry Demand Frequency Ingestion</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#3A5C3A] bg-[#E8F0E8] px-2 py-0.5 rounded border border-[#C4D4C4]">
                    Websocket Live
                  </span>
                </div>

                <div>
                  <label className="font-mono uppercase text-[10px] tracking-wider text-[#8C8880] block mb-1">
                    Industry Hiring Demand API Endpoint
                  </label>
                  <input
                    type="text"
                    required
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="w-full p-2.5 bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] font-mono focus:outline-none focus:border-[#1A1A18]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold rounded transition-all shadow-xs flex items-center gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Poll API & Recalculate National Skill Gap Deltas</span>
                </button>
              </form>
            )}
          </div>

          {/* Ingested Records Audit Log */}
          <div className="p-6 rounded bg-[#F2EFE9] border border-[#E0DBD3] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0DBD3] pb-3">
              <h3 className="font-semibold text-[#141412] text-sm">Real-Time Ingestion Event Log</h3>
              <span className="text-[10px] font-mono text-[#8C8880]">{ingestionLogs.length} Events Synced</span>
            </div>

            <div className="space-y-2.5">
              {ingestionLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded bg-[#F9F7F4] border border-[#E0DBD3] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[#141412]">{log.source}</span>
                      <span className="text-[10px] font-mono bg-[#E8F0E8] text-[#3A5C3A] px-1.5 py-0.2 rounded border border-[#C4D4C4]">
                        {log.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C8880]">{log.timestamp}</span>
                    </div>
                    <p className="text-[#5C5954]">{log.summary}</p>
                  </div>

                  <span className="font-mono text-[11px] text-[#141412] font-semibold shrink-0">
                    +{log.recordsCount} recs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Architecture Summary */}
        <div className="space-y-6">
          <div className="p-5 rounded bg-[#F2EFE9] border border-[#E0DBD3] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">
              Ingestion Architecture
            </span>
            <h4 className="text-xs font-semibold text-[#141412]">Multi-Modal Telemetry Pipeline</h4>
            <p className="text-xs text-[#5C5954] leading-relaxed">
              SkillLoop ingests 4 distinct telemetry vectors into the normalized Capability Knowledge Graph:
            </p>
            <div className="space-y-2 text-xs text-[#3C3A36] pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                <span>Direct Diagnostic Test scores</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                <span>GitHub AST code complexity & tests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                <span>University ERP semester transcripts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                <span>Real-time hiring demand scraping</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded bg-[#F2EFE9] border border-[#E0DBD3] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">
              Active Target Candidate
            </span>
            <div className="font-semibold text-xs text-[#141412]">{activeStudent.name} ({activeStudent.id})</div>
            <p className="text-xs text-[#5C5954]">
              Data synced will recalibrate readiness scores and recompute gap deltas in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
