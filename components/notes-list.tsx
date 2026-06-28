"use client";

import { Archive, Clock3, Pin, Plus, Search, Star } from "lucide-react";
import { TagChip } from "./tag-chip";
import { useAppPreferences } from "@/contexts/app-preferences";
import { truncateText } from "@/lib/format";
import { formatRelativeDate, noteCountLabel } from "@/lib/i18n";
import { Note, NoteFilter } from "@/lib/types";

type Props = {
  notes: Note[];
  activeId: string;
  setActiveId: (id: string) => void;
  query: string;
  setQuery: (value: string) => void;
  filter: NoteFilter;
  setFilter: (filter: NoteFilter) => void;
  tags: string[];
  onNewNote: () => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export function NotesList({
  notes,
  activeId,
  setActiveId,
  query,
  setQuery,
  filter,
  setFilter,
  tags,
  onNewNote,
  onToggleFavorite,
  onToggleArchive,
  onTogglePin,
}: Props) {
  const { t, locale } = useAppPreferences();

  const filters: { labelKey: "notes.filterAll" | "notes.filterStarred" | "notes.filterArchived"; value: NoteFilter }[] = [
    { labelKey: "notes.filterAll", value: "all" },
    { labelKey: "notes.filterStarred", value: "favorites" },
    { labelKey: "notes.filterArchived", value: "archived" },
  ];

  return (
    <section className="column-panel flex h-full min-h-0 flex-col border-e border-slate-200 bg-white animate-fade-in-up motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-950">
      <div className="column-header shrink-0 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t("notes.title")}</h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{noteCountLabel(notes.length, locale)}</p>
          </div>
          <button
            type="button"
            onClick={onNewNote}
            className="icon-btn h-8 w-8 rounded-lg text-teal-700 hover:border-teal-300 hover:bg-teal-50 dark:text-teal-400 dark:hover:border-teal-700 dark:hover:bg-teal-950/50"
            aria-label={t("nav.newNote")}
          >
            <Plus size={17} />
          </button>
        </div>

        <label className="relative mt-3 block lg:hidden">
          <span className="sr-only">{t("notes.search")}</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("notes.searchPlaceholder")}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 ps-9 pe-3 text-sm text-slate-700 transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-teal-500 dark:focus:bg-slate-900 dark:focus:ring-teal-900/40"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`chip py-1 text-xs ${filter === item.value ? "chip-active" : "chip-inactive"}`}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 6).map((tag) => (
              <TagChip key={tag} tag={tag} onClick={() => setQuery(tag)} />
            ))}
          </div>
        )}
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-2 pb-3 pt-4">
        {notes.length === 0 ? (
          <div className="mx-2 mt-1 flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50/95 p-8 text-center shadow-xl shadow-slate-200/10 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 dark:shadow-black/20">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t("notes.emptyTitle")}</p>
            <p className="max-w-[240px] text-xs leading-6 text-slate-500 dark:text-slate-400">{t("notes.emptyDesc")}</p>
            <button
              type="button"
              onClick={onNewNote}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              {t("notes.createNote")}
            </button>
          </div>
        ) : (
          <div className="space-y-1 px-1">
            {notes.map((note) => {
              const selected = activeId === note.id;
              return (
                <article
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setActiveId(note.id);
                  }}
                  className={`group relative cursor-pointer rounded-xl border px-3.5 py-3 transition duration-150 ${
                    selected
                      ? "border-teal-500/60 bg-teal-50/70 shadow-sm before:absolute before:inset-y-2 before:start-0 before:w-1 before:rounded-full before:bg-teal-500 dark:border-teal-500/40 dark:bg-teal-950/30"
                      : "border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1 ps-1">
                      <div className="flex items-center gap-1.5">
                        {note.pinned && (
                          <Pin size={12} className="shrink-0 rotate-45 fill-teal-600 text-teal-600 dark:fill-teal-400 dark:text-teal-400" />
                        )}
                        <h3 className={`truncate text-sm ${selected ? "font-semibold text-slate-900 dark:text-slate-100" : "font-medium text-slate-800 dark:text-slate-200"}`}>
                          {note.title || t("notes.untitled")}
                        </h3>
                        {note.favorite && (
                          <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {truncateText(note.content, 100) || t("notes.noContent")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-0.5 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onTogglePin(note.id);
                        }}
                        className={`icon-btn h-7 w-7 rounded-md ${note.pinned ? "icon-btn-active" : ""}`}
                        title={note.pinned ? t("notes.unpin") : t("notes.pin")}
                      >
                        <Pin size={13} className={note.pinned ? "rotate-45 fill-teal-600 dark:fill-teal-400" : ""} />
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleFavorite(note.id);
                        }}
                        className={`icon-btn h-7 w-7 rounded-md ${note.favorite ? "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400" : ""}`}
                        title={note.favorite ? t("notes.unstar") : t("notes.star")}
                      >
                        <Star size={13} className={note.favorite ? "fill-amber-500 text-amber-500" : ""} />
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleArchive(note.id);
                        }}
                        className="icon-btn h-7 w-7 rounded-md"
                        title={note.archived ? t("notes.restore") : t("notes.archive")}
                      >
                        <Archive size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 ps-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                      <Clock3 size={11} />
                      {formatRelativeDate(note.updatedAt, locale, t)}
                    </span>
                    {note.notebook && (
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {note.notebook}
                      </span>
                    )}
                  </div>

                  {note.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 ps-1">
                      {note.tags.slice(0, 3).map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
