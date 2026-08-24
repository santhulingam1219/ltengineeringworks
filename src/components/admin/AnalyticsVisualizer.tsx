"use client";

import { 
  ChartBar, 
  TrendUp, 
  Users, 
  Briefcase, 
  Buildings, 
  CheckCircle 
} from "@phosphor-icons/react";

interface AnalyticsData {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  totalApplications: number;
  totalVacancies: number;
  totalEnquiries: number;
  totalManpowerReqs: number;
}

export function AnalyticsVisualizer({ data }: { data: AnalyticsData }) {
  const applicationRatio = data.totalVacancies > 0 
    ? Math.round(data.totalApplications / data.totalVacancies)
    : 0;

  const projectCompletionRate = data.totalProjects > 0
    ? Math.round((data.completedProjects / data.totalProjects) * 100)
    : 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Metric Card 1: Project Portfolio Execution Progress */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Portfolio Delivery Rate
          </span>
          <div className="w-7 h-7 rounded-xs bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
            <Buildings className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-slate-900">
              {projectCompletionRate}%
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              ({data.completedProjects} of {data.totalProjects} Packages)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-xs overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-xs transition-all duration-500"
              style={{ width: `${projectCompletionRate}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>Active Sites: <strong>{data.ongoingProjects}</strong></span>
          <span className="text-emerald-700 font-bold">Target SLA Met</span>
        </div>
      </div>

      {/* Metric Card 2: Recruitment Pipeline Density */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Recruitment Demand Index
          </span>
          <div className="w-7 h-7 rounded-xs bg-blue-500/20 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-slate-900">
              {data.totalApplications}
            </span>
            <span className="text-xs font-mono text-blue-600 font-bold">
              Worker Applications
            </span>
          </div>

          {/* Ratio bar */}
          <div className="w-full h-2 bg-slate-100 rounded-xs overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-xs transition-all duration-500"
              style={{ width: `${Math.min(100, (data.totalApplications / 20) * 100)}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>Avg. Applications/Role: <strong>{applicationRatio}</strong></span>
          <span className="text-blue-700 font-bold">Active Funnel</span>
        </div>
      </div>

      {/* Metric Card 3: Commercial Lead Conversion */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            B2B Commercial Inquiries
          </span>
          <div className="w-7 h-7 rounded-xs bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold">
            <TrendUp className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-slate-900">
              {data.totalEnquiries + data.totalManpowerReqs}
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              Total Inbound Leads
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-xs overflow-hidden flex">
            <div
              className="h-full bg-amber-500"
              style={{
                width: `${
                  (data.totalEnquiries / (data.totalEnquiries + data.totalManpowerReqs || 1)) * 100
                }%`,
              }}
            />
            <div
              className="h-full bg-emerald-600"
              style={{
                width: `${
                  (data.totalManpowerReqs / (data.totalEnquiries + data.totalManpowerReqs || 1)) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>Projects: <strong>{data.totalEnquiries}</strong></span>
          <span>Manpower: <strong>{data.totalManpowerReqs}</strong></span>
        </div>
      </div>

    </div>
  );
}
