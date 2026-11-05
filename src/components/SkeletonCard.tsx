export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-800 h-48 w-full rounded-xl" />
      <div className="bg-slate-200 dark:bg-slate-800 h-4 w-1/4 rounded" />
      <div className="bg-slate-200 dark:bg-slate-800 h-6 w-3/4 rounded" />
      <div className="bg-slate-200 dark:bg-slate-800 h-4 w-1/2 rounded" />
      <div className="bg-slate-200 dark:bg-slate-800 h-10 w-full rounded-xl mt-4" />
    </div>
  );
}
