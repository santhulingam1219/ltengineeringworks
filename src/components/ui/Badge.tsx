import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "blue" | "green" | "red" | "slate" | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "slate", size = "sm", children, ...props }: BadgeProps) {
  const variants = {
    amber: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    blue: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    green: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    red: "bg-red-500/15 text-red-700 border-red-500/30",
    slate: "bg-slate-200 text-slate-700 border-slate-300",
    outline: "bg-transparent text-slate-600 border-slate-300",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 font-mono font-semibold",
    md: "text-xs px-2.5 py-1 font-mono font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
