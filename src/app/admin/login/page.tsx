"use client";

import { useActionState, useState } from "react";
import { loginAdminAction, LoginResult } from "../actions/authActions";
import { LockKey, EnvelopeSimple, ShieldCheck, ArrowRight, Eye, EyeSlash, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

const initialState: LoginResult = {
  success: false,
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#070C18] flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group transition-transform active:scale-95">
            <div className="h-14 w-14 bg-white/95 rounded-sm p-1.5 flex items-center justify-center border border-amber-400/40 shadow-lg shadow-amber-500/10 flex-shrink-0 group-hover:border-amber-400 transition-colors">
              <img
                src="/images/logo.webp"
                alt="LT Engineering Works"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-heading font-black text-xl text-white tracking-tight uppercase block leading-none">
                LT Engineering Works
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold block mt-1 tracking-wider uppercase">
                Management Portal
              </span>
            </div>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-white mt-2">
              Authorized Staff Login
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Internal access for projects, manpower, recruitment & enquiries.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#0D1527]/90 border border-slate-800/90 backdrop-blur-md p-6 sm:p-8 rounded-sm shadow-2xl space-y-5">
          {state?.error && (
            <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xs text-xs font-mono text-red-200 flex items-center gap-2.5 animate-in fade-in duration-200">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <EnvelopeSimple className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="username"
                  placeholder="name@ltengineeringworks.com"
                  className="block w-full pl-10 pr-3.5 py-3 bg-[#060A14] border border-slate-700/80 rounded-sm text-white placeholder-slate-500 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LockKey className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-11 py-3 bg-[#060A14] border border-slate-700/80 rounded-sm text-white placeholder-slate-500 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlash className="w-4 h-4" weight="bold" />
                  ) : (
                    <Eye className="w-4 h-4" weight="bold" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isPending ? "Authenticating..." : "Sign In to Admin App"}
                <ArrowRight className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </form>

          {/* Security & Navigation Footer */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" weight="fill" />
              <span>Protected Session & RBAC Enforcement</span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-heading font-bold uppercase tracking-wider transition-colors pt-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
