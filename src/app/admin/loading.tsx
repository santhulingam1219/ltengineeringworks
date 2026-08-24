export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-28 bg-slate-200 rounded-xs" />
          <div className="h-6 w-56 bg-slate-300 rounded-xs" />
        </div>
        <div className="h-8 w-24 bg-slate-200 rounded-xs hidden sm:block" />
      </div>

      {/* KPI Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 bg-slate-200 rounded-xs" />
              <div className="h-8 w-8 bg-slate-200 rounded-sm" />
            </div>
            <div className="h-8 w-16 bg-slate-300 rounded-xs" />
            <div className="h-2 w-32 bg-slate-100 rounded-xs" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
        <div className="h-4 w-40 bg-slate-300 rounded-xs" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-slate-100 rounded-xs border border-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
