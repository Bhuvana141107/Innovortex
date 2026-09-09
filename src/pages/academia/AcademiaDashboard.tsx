import React from 'react';
import { BarChart3, BookOpen, GraduationCap, ArrowRight, AlertTriangle, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AcademiaDashboard: React.FC = () => {
  const { curriculumMap, students, dismissMentorAlert } = useApp();

  const pipelineSteps = [
    '1. Industry Demand',
    '2. Capability Gaps',
    '3. Curriculum Mapping',
    '4. Practical Training',
    '5. Student Improvement'
  ];

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Academia Capability Intelligence</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Institutional Alignment
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Bridging the gap between real-time industry demands and academic curricula through dynamic syllabus mapping.
        </p>
      </div>

      {/* Visual Pipeline Banner */}
      <div className="p-4 bg-mono-950 text-white rounded-lg shadow-xs overflow-x-auto">
        <div className="text-[10px] font-mono uppercase text-mono-400 font-bold mb-2">
          Academia Realignment Pipeline Flow
        </div>
        <div className="flex items-center justify-between min-w-[700px] gap-2 text-xs font-mono">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-mono-900 px-3 py-2 rounded border border-mono-800 text-center flex-1 font-bold text-mono-200">
                {step}
              </div>
              {idx < pipelineSteps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-mono-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Curriculum Mapping Table Card */}
      <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-mono-200 pb-3">
          <div>
            <h3 className="font-bold text-mono-950 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-mono-800" />
              <span>Curriculum Gap Mapping & Realignment Matrix</span>
            </h3>
            <p className="text-xs text-mono-500">Automated mapping of student cohort weaknesses to academic course codes.</p>
          </div>
          <span className="text-xs font-mono font-bold bg-mono-100 text-mono-900 px-3 py-1 rounded border border-mono-200">
            Fall 2026 Term
          </span>
        </div>

        {/* Table */}
        <div className="border border-mono-200 rounded-md overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-mono-950 text-white font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Course Code & Title</th>
                <th className="p-3">Mapped Capability</th>
                <th className="p-3 text-center">Industry Demand</th>
                <th className="p-3 text-center">Cohort Avg</th>
                <th className="p-3 text-center">Gap Deficit</th>
                <th className="p-3">Recommended Syllabus Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mono-200 font-sans">
              {curriculumMap.map((item, idx) => (
                <tr key={idx} className="hover:bg-mono-50 transition-colors">
                  <td className="p-3">
                    <span className="font-bold font-mono text-mono-950 block">{item.subjectCode}</span>
                    <span className="text-mono-600 text-[11px]">{item.subjectName}</span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-mono-800">{item.mappedCapability}</td>
                  <td className="p-3 text-center font-mono font-bold text-mono-950">{item.industryDemandScore}%</td>
                  <td className="p-3 text-center font-mono text-mono-700">{item.studentCohortAvg}%</td>
                  <td className="p-3 text-center">
                    <span className="font-mono font-extrabold text-xs px-2 py-0.5 bg-mono-950 text-white rounded">
                      -{item.gapScore}%
                    </span>
                  </td>
                  <td className="p-3 text-mono-900 text-xs font-medium leading-relaxed max-w-xs">
                    {item.recommendedUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Oversight & Active Mentor Alerts */}
      <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-mono-200 pb-3">
          <h3 className="font-bold text-mono-950 text-base flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-mono-800" />
            <span>Student Cohort Oversight & Intervention Center</span>
          </h3>
          <span className="text-xs font-mono text-mono-500">Total Enrolled: {students.length} Students</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.map((stu) => (
            <div key={stu.id} className="p-4 border border-mono-200 rounded-md bg-mono-50 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img 
                    src={stu.avatar} 
                    alt={stu.name}
                    className="w-10 h-10 rounded-full border border-mono-300 object-cover" 
                  />
                  <div>
                    <h4 className="font-bold text-mono-950 text-sm">{stu.name}</h4>
                    <span className="text-xs text-mono-500 font-mono">{stu.targetRole}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-mono-600">Readiness Score:</span>
                  <span className="font-bold text-mono-950 text-sm">{stu.readinessScore}%</span>
                </div>

                {stu.mentorAlertActive ? (
                  <div className="p-2.5 bg-mono-950 text-white rounded text-[11px] space-y-1">
                    <div className="flex items-center gap-1 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-mono-200" />
                      <span>Active Bottleneck Alert</span>
                    </div>
                    <p className="line-clamp-2 text-mono-300 font-mono text-[10px]">
                      {stu.mentorAlertDetails?.misconception}
                    </p>
                  </div>
                ) : (
                  <div className="p-2 bg-white border border-mono-200 rounded text-xs text-mono-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mono-950" />
                    <span>Progressing on Track</span>
                  </div>
                )}
              </div>

              {stu.mentorAlertActive && (
                <button
                  onClick={() => dismissMentorAlert(stu.id)}
                  className="w-full py-1.5 bg-white border border-mono-300 text-mono-900 text-xs font-bold rounded hover:bg-mono-100 transition-colors"
                >
                  Schedule Faculty Intervention
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
