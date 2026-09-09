import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles, BookOpen, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Question {
  q: string;
  opts: string[];
  ans: number;
  explanation: string;
}

export const SkillAssessmentPage: React.FC = () => {
  const { showToast, setActiveTab, activeStudent } = useApp();

  const assessmentTracks: Record<string, { title: string; skill: string; questions: Question[] }> = {
    python: {
      title: 'Python Core & Algorithms Assessment',
      skill: 'Python',
      questions: [
        {
          q: 'What is the time complexity of looking up a key in a Python dict on average?',
          opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
          ans: 2,
          explanation: 'Python dictionaries are implemented using optimized hash tables with open addressing, yielding O(1) average lookup.'
        },
        {
          q: 'What does the `len()` function return for a generator object in Python?',
          opts: ['The count of items yielded', 'It raises a TypeError', '0', 'None'],
          ans: 1,
          explanation: 'Generators generate items on-demand and do not have a defined length, raising a TypeError if passed to len().'
        },
        {
          q: 'Which keyword is used to ensure clean-up operations execute even if an exception occurs?',
          opts: ['catch', 'finally', 'ensure', 'cleanup'],
          ans: 1,
          explanation: 'The finally block always executes regardless of whether an exception was raised in try block.'
        },
        {
          q: 'In Python list comprehension `[x for x in data if x % 2 == 0]`, what is the output for `data = [1, 2, 3, 4]`?',
          opts: ['[1, 3]', '[2, 4]', '[False, True, False, True]', '[0, 0]'],
          ans: 1,
          explanation: 'The filter `x % 2 == 0` selects only even numbers, producing [2, 4].'
        }
      ]
    },
    web: {
      title: 'Modern Web Architecture & React',
      skill: 'React',
      questions: [
        {
          q: 'What hook should be used to memoize expensive computations between renders?',
          opts: ['useEffect', 'useCallback', 'useMemo', 'useRef'],
          ans: 2,
          explanation: 'useMemo returns a memoized value that recomputes only when one of the dependencies changes.'
        },
        {
          q: 'How does React Virtual DOM optimize DOM manipulation?',
          opts: ['By modifying the real DOM directly', 'By batching and diffing changes in memory before DOM commits', 'By converting JSX into WebAssembly', 'By disabling re-rendering'],
          ans: 1,
          explanation: 'React compares the virtual DOM snapshot against previous state and computes the minimum necessary mutation diff.'
        },
        {
          q: 'What is the default behavior of React components when state updates?',
          opts: ['Only the changed component re-renders', 'The component and all its nested children re-render', 'The entire page reloads', 'Nothing until forceUpdate is called'],
          ans: 1,
          explanation: 'By default, updating state triggers a render of that component and all nested children in its tree.'
        }
      ]
    },
    data: {
      title: 'SQL & Data Pipeline Architecture',
      skill: 'SQL',
      questions: [
        {
          q: 'What is the difference between WHERE and HAVING in SQL queries?',
          opts: ['WHERE filters rows before aggregation; HAVING filters aggregated groups', 'HAVING filters rows; WHERE filters groups', 'They are strictly synonymous', 'HAVING only works with string types'],
          ans: 0,
          explanation: 'WHERE filters individual tuples prior to GROUP BY aggregation; HAVING applies conditions to aggregated metric results.'
        },
        {
          q: 'Which window function assigns sequential numbers to rows within a partition without gaps?',
          opts: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'LEAD()'],
          ans: 2,
          explanation: 'ROW_NUMBER() assigns a unique, sequential integer to each row starting from 1.'
        },
        {
          q: 'To guard against SQL injection, what mechanism should always be used?',
          opts: ['String concatenation', 'Parameterized queries / Prepared statements', 'Encoding strings in Base64', 'Running queries as root'],
          ans: 1,
          explanation: 'Parameterized queries separate SQL query code from user input data parameters.'
        }
      ]
    }
  };

  const [selectedTrack, setSelectedTrack] = useState<'python' | 'web' | 'data'>('python');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const track = assessmentTracks[selectedTrack];
  const q = track.questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentIdx < track.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      showToast('Skill Assessment completed! Profile updated.', 'success');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    track.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) correct++;
    });
    return Math.round((correct / track.questions.length) * 100);
  };

  const resetAssessment = (newTrack?: 'python' | 'web' | 'data') => {
    if (newTrack) setSelectedTrack(newTrack);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Interactive Skill Assessment</h1>
            <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-semibold">
              Live Validation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validate competencies to close skill gaps, update radar footprints, and unlock matched employer challenges.
          </p>
        </div>

        {/* Track selection tabs */}
        <div className="flex items-center gap-1.5 p-1 glass rounded-xl border border-blue-500/30">
          {(['python', 'web', 'data'] as const).map((t) => (
            <button
              key={t}
              onClick={() => resetAssessment(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedTrack === t ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'python' ? 'Python' : t === 'web' ? 'Web / React' : 'SQL & Data'}
            </button>
          ))}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="glass rounded-xl p-4 border border-blue-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center font-mono font-bold text-xs">
                0{currentIdx + 1}
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">{track.title}</h3>
                <p className="text-[11px] text-slate-400 font-mono">Question {currentIdx + 1} of {track.questions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Untimed Demo</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-white leading-relaxed">
              {q.q}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {q.opts.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-glow-blue'
                        : 'glass border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-40"
              >
                <span>{currentIdx === track.questions.length - 1 ? 'Finish Assessment' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-8 border border-emerald-500/40 shadow-2xl space-y-6 text-center animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-glow-green">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              ASSESSMENT COMPLETED
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              {calculateScore()}% Proficiency Score
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your {track.skill} capability footprint has been recalculated and updated in your verified profile.
            </p>
          </div>

          {/* Breakdown list */}
          <div className="space-y-3 text-left">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
              Question Breakdown & Explanations:
            </span>
            {track.questions.map((item, idx) => {
              const isCorrect = selectedAnswers[idx] === item.ans;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-white">Q{idx + 1}: {item.q}</span>
                    <span className={`font-mono text-[11px] ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isCorrect ? '✓ Correct' : '✕ Needs Review'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{item.explanation}</p>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => resetAssessment()}
              className="px-4 py-2 rounded-xl glass hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-md flex items-center gap-2"
            >
              <span>View Updated Radar in Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
