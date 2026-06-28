"use client";

import { Archive, BookOpen, FilePlus, Inbox, PenLine, Star, X } from "lucide-react";
import { useAppPreferences } from "@/contexts/app-preferences";
import { useEffect } from "react";
import { notebookColor } from "@/lib/format";
import { Note, NoteFilter } from "@/lib/types";

type Props = {
  notes: Note[];
  notebooks: { name: string; count: number }[];
  activeNotebook: string;
  setActiveNotebook: (value: string) => void;
  filter: NoteFilter;
  setFilter: (filter: NoteFilter) => void;
  mobileOpen: boolean;
  onDismiss: () => void;
  onNewNote: () => void;
};

export function Sidebar({
  notes,
  notebooks,
  activeNotebook,
  setActiveNotebook,
  filter,
  setFilter,
  mobileOpen,
  onDismiss,
  onNewNote,
}: Props) {
  const { t, isRtl } = useAppPreferences();

  const navItems: { labelKey: "nav.allNotes" | "nav.starred" | "nav.archived"; value: NoteFilter; icon: typeof Inbox }[] = [
    { labelKey: "nav.allNotes", value: "all", icon: Inbox },
    { labelKey: "nav.starred", value: "favorites", icon: Star },
    { labelKey: "nav.archived", value: "archived", icon: Archive },
  ];

  const activeCount = notes.filter((note) => !note.archived).length;
  const starredCount = notes.filter((note) => note.favorite && !note.archived).length;
  const archivedCount = notes.filter((note) => note.archived).length;

  const counts: Record<NoteFilter, number> = {
    all: activeCount,
    favorites: starredCount,
    archived: archivedCount,
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Sidebar mobileOpen:", mobileOpen);
  }, [mobileOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition dark:bg-black/60 lg:hidden ${
          mobileOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={onDismiss}
        onTouchStart={onDismiss}
        aria-hidden="true"
      />

      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: mobileOpen ? "translateX(0)" : isRtl ? "translateX(110%)" : "translateX(-110%)",
          transition: "transform 200ms ease",
        }}
        className={`fixed inset-y-0 start-0 z-50 flex w-[min(88vw,280px)] flex-col border-e border-slate-200 bg-white animate-soft-pop transform transition-transform duration-200 motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-950 lg:static lg:z-0 lg:w-[260px] lg:shrink-0 pointer-events-auto ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0 rtl:lg:translate-x-0"
        }`}
        aria-label="Navigation"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
            <PenLine size={17} strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{t("app.name")}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{t("app.tagline")}</p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            onPointerDown={onDismiss}
            onTouchStart={onDismiss}
            className="icon-btn lg:hidden"
            aria-label={t("nav.close")}
          >
            <X size={17} />
          </button>
        </div>

        <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-800">
          <button
            type="button"
            onClick={onNewNote}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <FilePlus size={16} />
            {t("nav.newNote")}
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-3">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("nav.views")}
          </p>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = filter === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setFilter(item.value);
                    onDismiss();
                  }}
                  className={`nav-item ${active ? "nav-item-active" : "nav-item-inactive"}`}
                >
                  <Icon size={17} className={active ? "text-teal-600 dark:text-teal-400" : "text-slate-400"} />
                  <span className="flex-1">{t(item.labelKey)}</span>
                  <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{counts[item.value]}</span>
                </button>
              );
            })}
          </nav>

          <div className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("nav.notebooks")}
          </p>

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveNotebook("all");
                onDismiss();
              }}
              className={`nav-item ${activeNotebook === "all" ? "nav-item-active" : "nav-item-inactive"}`}
            >
              <BookOpen size={17} className="text-slate-400" />
              <span className="flex-1">{t("nav.allNotebooks")}</span>
              <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{activeCount}</span>
            </button>

            {notebooks.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActiveNotebook(item.name);
                  onDismiss();
                }}
                className={`nav-item ${activeNotebook === item.name ? "nav-item-active" : "nav-item-inactive"}`}
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${notebookColor(item.name)}`} />
                <span className="flex-1 truncate">{item.name}</span>
                <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      
    </>
  );
}
