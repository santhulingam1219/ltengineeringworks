"use client";

import { useActionState } from "react";
import { loginAdminAction, LoginResult } from "../actions/authActions";
import { LockKey, EnvelopeSimple, ShieldCheck, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

const initialState: LoginResult = {
  success: false,
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 technical-grid-dark opacity-40 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="h-14 w-14 bg-white/95 rounded-sm p-1.5 flex items-center justify-center border border-amber-400/30 shadow-md flex-shrink-0">
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
            <span className="text-[11px] font-mono text-amber-400 block mt-1 tracking-wider">
              Management Portal
            </span>
          </div>
        </Link>
        <h1 className="text-2xl font-heading font-extrabold uppercase tracking-tight text-white pt-2">
          Authorized Staff Login
        </h1>
        <p className="text-xs text-slate-400 font-sans">
          Internal access for projects, recruitment, enquiries & content management.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 rounded-sm shadow-2xl space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-sm text-xs font-mono text-red-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <EnvelopeSimple className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue="admin@ltengineeringworks.com"
                  placeholder="admin@ltengineeringworks.com"
                  className="block w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-white placeholder-slate-500 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <LockKey className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  defaultValue="Admin@LT2026!"
                  placeholder="••••••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-white placeholder-slate-500 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-sm rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isPending ? "Authenticating..." : "Sign In to Admin Panel"}
                <ArrowRight className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protected Session & RBAC Enforcement</span>
            </div>
            <Link
              href="/"
              className="text-xs text-amber-400 hover:underline block font-heading uppercase tracking-wider"
            >
              ← Back to Corporate Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
