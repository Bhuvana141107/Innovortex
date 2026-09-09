import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, User, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const OnboardingFlow: React.FC = () => {
  const { onboardingRole, setViewMode, login, showToast } = useApp();
  const [role, setRole] = useState<'student' | 'faculty' | 'mentor'>(onboardingRole || 'student');
  const [step, setStep] = useState<number>(0);

  // Form states
  const [name, setName] = useState('Priya Mehta');
  const [institution, setInstitution] = useState('Indian Institute of Information Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [targetRole, setTargetRole] = useState('Machine Learning Engineer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'Data Structures', 'Algorithms']);

  const availableSkills = ['Python', 'Data Structures', 'Machine Learning', 'SQL', 'Deep Learning', 'System Design', 'Docker/MLOps', 'Cloud (AWS)'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleComplete = () => {
    const mappedRole: UserRole = role === 'student' ? 'STUDENT' : role === 'faculty' ? 'FACULTY' : 'INDUSTRY';
    login(mappedRole, 'stu_1');
    setViewMode('app');
    showToast(`Onboarding complete! Welcome to SkillLoop, ${name}.`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#141412] flex flex-col items-center justify-center p-6 selection:bg-[#C8BFB0]">
      {/* Top indicator */}
      <div className="w-full max-w-xl mb-8 flex items-center justify-between">
        <button
          onClick={() => setViewMode('landing')}
          className="flex items-center gap-1.5 text-xs text-[#5C5954] hover:text-[#141412] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>
        <span className="text-xs font-mono text-[#8C8880] uppercase tracking-wider">
          Onboarding · Step {step + 1} of 3
        </span>
      </div>

      {/* Main card */}
      <div className="w-full max-w-xl bg-[#F2EFE9] border border-[#E0DBD3] rounded-md p-8 shadow-sm space-y-6 animate-fade-up">
        {/* Role toggle */}
        <div className="flex items-center gap-2 p-1 bg-[#EAE6DF] rounded border border-[#E0DBD3]">
          {(['student', 'faculty', 'mentor'] as const).map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setStep(0); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded capitalize transition-all ${
                role === r ? 'bg-[#1A1A18] text-[#F9F7F4] shadow-xs' : 'text-[#5C5954] hover:text-[#141412]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Step 0: Profile Basics */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880]">STEP 01</p>
              <h2 className="font-display text-2xl font-light text-[#141412]">
                {role === 'student' ? 'Academic & Personal Details' : role === 'faculty' ? 'Faculty Affiliation' : 'Industry Profile'}
              </h2>
              <p className="text-xs text-[#5C5954]">Tell us where you are learning, teaching, or mentoring.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">
                  {role === 'mentor' ? 'Organization / Company' : 'Institution / University'}
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">
                  {role === 'mentor' ? 'Domain of Expertise' : 'Department'}
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880]">STEP 02</p>
              <h2 className="font-display text-2xl font-light text-[#141412]">Target Competency Track</h2>
              <p className="text-xs text-[#5C5954]">SkillLoop aligns your diagnostic and shadow problems directly to this goal.</p>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Machine Learning & AI Systems', role: 'Machine Learning Engineer', desc: 'PyTorch, Model Deployment, MLOps, Socratic AI Defense' },
                { title: 'Full Stack & Distributed Systems', role: 'Software Developer', desc: 'React, Node, Concurrency, PostgreSQL, Microservices' },
                { title: 'Data Analytics & Pipeline Engineering', role: 'Data Analyst', desc: 'SQL, Kafka, Spark, Telemetry Ingestion' },
                { title: 'Embedded & IoT Systems', role: 'Embedded Systems Engineer', desc: 'C/C++, FreeRTOS, Firmware, Sensor Protocols' }
              ].map((opt) => (
                <div
                  key={opt.role}
                  onClick={() => setTargetRole(opt.role)}
                  className={`p-3.5 rounded border cursor-pointer transition-all ${
                    targetRole === opt.role
                      ? 'bg-[#F9F7F4] border-[#1A1A18] shadow-xs'
                      : 'bg-[#F9F7F4]/60 border-[#E0DBD3] hover:border-[#8C8880]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#141412]">{opt.title}</span>
                    <span className="text-[10px] font-mono uppercase text-[#8C8880]">{opt.role}</span>
                  </div>
                  <p className="text-xs text-[#5C5954] mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Known Skills */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880]">STEP 03</p>
              <h2 className="font-display text-2xl font-light text-[#141412]">Current Competencies</h2>
              <p className="text-xs text-[#5C5954]">Select what you have built with. Unselected skills will seed your initial Gap Analysis.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {availableSkills.map((sk) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    onClick={() => toggleSkill(sk)}
                    className={`p-2.5 text-left rounded text-xs font-mono transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1A1A18] text-[#F9F7F4] border-[#1A1A18]'
                        : 'bg-[#F9F7F4] text-[#5C5954] border-[#E0DBD3] hover:border-[#8C8880]'
                    }`}
                  >
                    <span>{sk}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C8BFB0]" />}
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded bg-[#EAE6DF] border border-[#E0DBD3] text-xs text-[#3C3A36] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1A1A18] shrink-0" />
              <span>
                Your profile will be initialized with a baseline readiness score and queued for the diagnostic engine.
              </span>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E0DBD3]">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="text-xs font-semibold text-[#5C5954] hover:text-[#141412] px-3 py-2"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold px-4 py-2 rounded flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold px-5 py-2 rounded flex items-center gap-2 shadow-sm"
            >
              <span>Complete & Launch Dashboard</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8BFB0]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
