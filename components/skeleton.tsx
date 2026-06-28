"use client";

export function Skeleton({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={`rounded-lg bg-slate-200 dark:bg-slate-800 ${animated ? "animate-pulse" : ""} ${className}`}
    />
  );
}

export function NoteSkeleton() {
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-1.5 pt-1">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
      </div>
    </div>
  );
}

export function NotesListSkeleton() {
  return (
    <div className="column-panel flex h-full min-h-0 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="column-header shrink-0 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-0.5 h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <Skeleton className="mt-3 h-9 w-full rounded-lg" />
        <div className="mt-3 flex gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <NoteSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function NoteEditorSkeleton() {
  return (
    <section className="column-panel flex h-full min-h-0 flex-col bg-white dark:bg-slate-950">
      <div className="column-header shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </section>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <Skeleton className="h-9 w-9 rounded-xl" />
        <div className="min-w-0 flex-1 space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-800">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-xl" />
        ))}
      </div>
    </aside>
  );
}
