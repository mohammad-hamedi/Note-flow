import { Note } from "./types";

export type TagColors = {
  bg: string;
  text: string;
  ring: string;
};

const TAG_PALETTE: TagColors[] = [
  { bg: "bg-violet-100 dark:bg-violet-950/50", text: "text-violet-700 dark:text-violet-300", ring: "ring-violet-200/80 dark:ring-violet-800/60" },
  { bg: "bg-sky-100 dark:bg-sky-950/50", text: "text-sky-700 dark:text-sky-300", ring: "ring-sky-200/80 dark:ring-sky-800/60" },
  { bg: "bg-teal-100 dark:bg-teal-950/50", text: "text-teal-700 dark:text-teal-300", ring: "ring-teal-200/80 dark:ring-teal-800/60" },
  { bg: "bg-amber-100 dark:bg-amber-950/50", text: "text-amber-800 dark:text-amber-300", ring: "ring-amber-200/80 dark:ring-amber-800/60" },
  { bg: "bg-rose-100 dark:bg-rose-950/50", text: "text-rose-700 dark:text-rose-300", ring: "ring-rose-200/80 dark:ring-rose-800/60" },
  { bg: "bg-emerald-100 dark:bg-emerald-950/50", text: "text-emerald-700 dark:text-emerald-300", ring: "ring-emerald-200/80 dark:ring-emerald-800/60" },
  { bg: "bg-indigo-100 dark:bg-indigo-950/50", text: "text-indigo-700 dark:text-indigo-300", ring: "ring-indigo-200/80 dark:ring-indigo-800/60" },
  { bg: "bg-orange-100 dark:bg-orange-950/50", text: "text-orange-800 dark:text-orange-300", ring: "ring-orange-200/80 dark:ring-orange-800/60" },
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function tagColors(tag: string): TagColors {
  return TAG_PALETTE[hashString(tag.toLowerCase()) % TAG_PALETTE.length];
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateText(value: string, max = 140) {
  const plain = stripHtml(value);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trim()}…`;
}

export function notebookColor(name: string) {
  const palette = [
    "bg-teal-500",
    "bg-sky-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-emerald-500",
  ];
  return palette[hashString(name) % palette.length];
}

export function sortNotes(notes: Note[]) {
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}
