"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/app/admin/actions/authActions";
import { CheckCircle, Warning, LockKey, ArrowRight } from "@phosphor-icons/react";

interface ChangePasswordResult {
  success: boolean;
  message?: string;
  error?: string;
}

const initialState: ChangePasswordResult = {
  success: false,
};

export function ChangePasswordForm({ userId }: { userId: string }) {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />

      {state.success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-mono text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
          <span>{state.message || "Password updated successfully."}</span>
        </div>
      )}

      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs font-mono text-red-700 flex items-center gap-2">
          <Warning className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Current Password *
        </label>
        <input
          type="password"
          name="currentPassword"
          required
          placeholder="••••••••"
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-sm text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          New Password (Min 8 Characters) *
        </label>
        <input
          type="password"
          name="newPassword"
          required
          placeholder="••••••••"
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-sm text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Confirm New Password *
        </label>
        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="••••••••"
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-sm text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
        >
          <LockKey className="w-4 h-4" />
          {isPending ? "Updating Password..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
