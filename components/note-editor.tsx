"use client";

import { useState } from "react";
import {
  Archive,
  ArrowLeft,
  Check,
  Cloud,
  Loader2,
  Pin,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import { TagChip } from "./tag-chip";
import { useAppPreferences } from "@/contexts/app-preferences";
import { useSaveStatus } from "@/hooks/use-save-status";
import { formatLongDate } from "@/lib/i18n";
import { Note } from "@/lib/types";

type Props = {
  note: Note | null;
  onChange: (patch: Partial<Note>) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onTogglePin: (id: string) => void;
  onShare: (id: string) => Promise<boolean>;
  onDelete: (id: string) => void;
  onBack?: () => void;
};

export function NoteEditor({
  note,
  onChange,
  onToggleFavorite,
  onToggleArchive,
  onTogglePin,
  onShare,
  onDelete,
  onBack,
}: Props) {
  const { t, locale } = useAppPreferences();
  const [tagInput, setTagInput] = useState("");
  const [shareFeedback, setShareFeedback] = useState("");
  const saveStatus = useSaveStatus([
    note?.id ?? "",
    note?.title ?? "",
    note?.content ?? "",
    note?.tags?.join(",") ?? "",
  ]);

  const addTag = () => {
    if (!note) return;
    const tag = tagInput.trim().replace(/^#/, "");
    if (!tag || note.tags.includes(tag)) {
      setTagInput("");
      return;
    }
    onChange({ tags: [...note.tags, tag] });
    setTagInput("");
  };

  const handleShare = async () => {
    if (!note) return;
    const ok = await onShare(note.id);
    setShareFeedback(ok ? t("editor.shareCopied") : t("editor.shareFailed"));
    window.setTimeout(() => setShareFeedback(""), 2000);
  };

  if (!note) {
    return (
      <section className="column-panel flex h-full min-h-[320px] flex-col items-center justify-center bg-white p-10 text-center dark:bg-slate-950">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 dark:bg-teal-950/50 dark:text-teal-400 dark:ring-teal-900/50">
          <Cloud size={22} />
        </div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t("editor.selectTitle")}</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{t("editor.selectDesc")}</p>
      </section>
    );
  }

  return (
    <section className="column-panel flex h-full min-h-0 flex-col bg-white dark:bg-slate-950">
      <div className="column-header shrink-0 border-b border-slate-200 px-4 py-3 sm:px-5 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="icon-btn mt-0.5 h-8 w-8 lg:hidden"
                aria-label={t("editor.back")}
              >
                <ArrowLeft size={17} className="rtl:rotate-180" />
              </button>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={note.notebook}
                  onChange={(event) => onChange({ notebook: event.target.value })}
                  placeholder={t("editor.notebook")}
                  className="max-w-[160px] rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-600 outline-none transition placeholder:normal-case placeholder:tracking-normal focus:border-teal-500 focus:ring-1 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-teal-500 dark:focus:ring-teal-900/40"
                />
                {note.pinned && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 ring-1 ring-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:ring-teal-800/60">
                    <Pin size={10} className="rotate-45 fill-teal-600 dark:fill-teal-400" />
                    {t("editor.pinned")}
                  </span>
                )}
                {note.archived && (
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/60">
                    {t("editor.archived")}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t("editor.edited", { date: formatLongDate(note.updatedAt, locale) })}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
                saveStatus === "saved"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/60"
                  : "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
              }`}
              aria-live="polite"
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 size={11} className="animate-spin" />
                  {t("editor.saving")}
                </>
              ) : (
                <>
                  <Check size={11} />
                  {t("editor.saved")}
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => onTogglePin(note.id)}
              className={`icon-btn h-8 w-8 ${note.pinned ? "icon-btn-active" : ""}`}
              title={note.pinned ? t("editor.unpinNote") : t("editor.pinNote")}
            >
              <Pin size={15} className={note.pinned ? "rotate-45 fill-teal-600 dark:fill-teal-400" : ""} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="icon-btn h-8 w-8"
              title={t("editor.share")}
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {shareFeedback && (
          <p className="mt-2 text-xs font-medium text-teal-700 dark:text-teal-400">{shareFeedback}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onToggleFavorite(note.id)}
            className={`chip py-1 text-xs ${note.favorite ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300" : "chip-inactive"}`}
          >
            <Star size={13} className={note.favorite ? "fill-amber-500 text-amber-500" : ""} />
            {note.favorite ? t("editor.starred") : t("editor.star")}
          </button>
          <button
            type="button"
            onClick={() => onToggleArchive(note.id)}
            className="chip chip-inactive py-1 text-xs"
          >
            <Archive size={13} />
            {note.archived ? t("notes.restore") : t("notes.archive")}
          </button>
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="chip chip-inactive py-1 text-xs text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:hover:border-rose-800 dark:hover:bg-rose-950/40"
          >
            <Trash2 size={13} />
            {t("editor.delete")}
          </button>
        </div>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
        <input
          value={note.title}
          onChange={(event) => onChange({ title: event.target.value })}
          placeholder={t("editor.noteTitle")}
          className="mb-3 w-full border-0 bg-transparent text-xl font-semibold text-slate-900 outline-none placeholder:text-slate-300 dark:text-slate-100 dark:placeholder:text-slate-600 sm:text-2xl"
        />

        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          {note.tags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              size="md"
              onRemove={() => onChange({ tags: note.tags.filter((item) => item !== tag) })}
            />
          ))}
          <div className="flex min-w-[140px] flex-1 items-center rounded-lg border border-dashed border-slate-200 px-2.5 py-1 dark:border-slate-700">
            <input
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag();
                }
              }}
              placeholder={t("editor.addTag")}
              className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500 sm:text-sm"
            />
          </div>
        </div>

        <RichTextEditor
          value={note.content}
          onChange={(content) => onChange({ content })}
          placeholder={t("editor.writePlaceholder")}
        />
      </div>
    </section>
  );
}





