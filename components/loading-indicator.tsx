"use client";

export function LoadingSpinner() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600 dark:border-teal-900 dark:border-t-teal-400" />
    </div>
  );
}

export function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500" />
      Loading...
    </div>
  );
}
