import React, { useState } from "react";
import { Mail, Lock, ArrowLeft, ArrowRight } from "lucide-react";

// Reuse the same input styling as other pages
const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

export default function LoginPage({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    // TODO: Integrate real authentication logic here.
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="min-h-full w-full bg-[#0a0f1c] text-slate-100">
      <div className="mx-auto max-w-md px-6 py-10">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300"
        >
          <ArrowLeft size={13} /> Back to Profile
        </button>
        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-center text-xl font-semibold text-slate-100">Student Login</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400">
                <Mail size={12} className="text-slate-500" /> Email
              </label>
              <input
                type="email"
                className={inputCls}
                placeholder="student@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400">
                <Lock size={12} className="text-slate-500" /> Password
              </label>
              <input
                type="password"
                className={inputCls}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="rounded-lg border border-rose-800/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                {error}
              </div>
            )}
            <button
              type="button"
              onClick={handleLogin}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Login <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
