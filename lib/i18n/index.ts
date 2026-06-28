export type Locale = "en" | "fa";
export type Theme = "light" | "dark";

export const LOCALE_STORAGE_KEY = "noteflow-locale";
export const THEME_STORAGE_KEY = "noteflow-theme";

export const translations = {
  en: {
    app: {
      name: "NoteFlow",
      tagline: "Notes & notebooks",
    },
    nav: {
      open: "Open navigation",
      close: "Close navigation",
      newNote: "New note",
      views: "Views",
      allNotes: "All notes",
      starred: "Starred",
      archived: "Archived",
      notebooks: "Notebooks",
      allNotebooks: "All notebooks",
    },
    topbar: {
      search: "Search",
      searchPlaceholder: "Search notes, tags, notebooks…",
    },
    notes: {
      title: "Notes",
      note: "note",
      notes: "notes",
      search: "Search notes",
      searchPlaceholder: "Search notes…",
      filterAll: "All",
      filterStarred: "Starred",
      filterArchived: "Archived",
      emptyTitle: "No notes yet",
      emptyDesc: "Create your first note to get started.",
      createNote: "Create note",
      untitled: "Untitled note",
      noContent: "No content yet.",
      pin: "Pin",
      unpin: "Unpin",
      star: "Star",
      unstar: "Unstar",
      archive: "Archive",
      restore: "Restore",
      removeTag: "Remove {tag}",
      filterByTag: "Filter by {tag}",
    },
    editor: {
      selectTitle: "Select a note",
      selectDesc: "Choose a note from the list or create a new one. Changes autosave as you type.",
      back: "Back to notes",
      notebook: "Notebook",
      pinned: "Pinned",
      archived: "Archived",
      edited: "Edited {date}",
      saving: "Saving",
      saved: "Saved",
      pinNote: "Pin note",
      unpinNote: "Unpin note",
      share: "Copy note to clipboard",
      shareCopied: "Copied to clipboard",
      shareFailed: "Copy failed",
      starred: "Starred",
      star: "Star",
      delete: "Delete",
      noteTitle: "Note title",
      addTag: "Add tag",
      writePlaceholder: "Write your note — use the toolbar for formatting.",
      enterUrl: "Enter URL",
      formatting: "Formatting",
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      heading: "Heading",
      bulletList: "Bullet list",
      numberedList: "Numbered list",
      quote: "Quote",
      link: "Link",
    },
    dates: {
      yesterday: "Yesterday",
      daysAgo: "{count}d ago",
    },
    prefs: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      english: "English",
      persian: "Persian",
      signIn: "Sign in",
    },
  },
  fa: {
    app: {
      name: "نوت‌فلو",
      tagline: "یادداشت‌ها و دفترچه‌ها",
    },
    nav: {
      open: "باز کردن منو",
      close: "بستن منو",
      newNote: "یادداشت جدید",
      views: "نماها",
      allNotes: "همه یادداشت‌ها",
      starred: "ستاره‌دار",
      archived: "بایگانی",
      notebooks: "دفترچه‌ها",
      allNotebooks: "همه دفترچه‌ها",
    },
    topbar: {
      search: "جستجو",
      searchPlaceholder: "جستجوی یادداشت، برچسب، دفترچه…",
    },
    notes: {
      title: "یادداشت‌ها",
      note: "یادداشت",
      notes: "یادداشت",
      search: "جستجوی یادداشت",
      searchPlaceholder: "جستجوی یادداشت…",
      filterAll: "همه",
      filterStarred: "ستاره‌دار",
      filterArchived: "بایگانی",
      emptyTitle: "هنوز یادداشتی نیست",
      emptyDesc: "اولین یادداشت خود را بسازید.",
      createNote: "ساخت یادداشت",
      untitled: "بدون عنوان",
      noContent: "هنوز محتوایی نیست.",
      pin: "سنجاق",
      unpin: "برداشتن سنجاق",
      star: "ستاره",
      unstar: "حذف ستاره",
      archive: "بایگانی",
      restore: "بازگردانی",
      removeTag: "حذف {tag}",
      filterByTag: "فیلتر با {tag}",
    },
    editor: {
      selectTitle: "یک یادداشت انتخاب کنید",
      selectDesc: "از فهرست انتخاب کنید یا یادداشت جدید بسازید. تغییرات به‌صورت خودکار ذخیره می‌شوند.",
      back: "بازگشت به فهرست",
      notebook: "دفترچه",
      pinned: "سنجاق‌شده",
      archived: "بایگانی‌شده",
      edited: "ویرایش {date}",
      saving: "در حال ذخیره",
      saved: "ذخیره شد",
      pinNote: "سنجاق کردن",
      unpinNote: "برداشتن سنجاق",
      share: "کپی در کلیپ‌بورد",
      shareCopied: "در کلیپ‌بورد کپی شد",
      shareFailed: "کپی ناموفق بود",
      starred: "ستاره‌دار",
      star: "ستاره",
      delete: "حذف",
      noteTitle: "عنوان یادداشت",
      addTag: "افزودن برچسب",
      writePlaceholder: "یادداشت خود را بنویسید — از نوار ابزار برای قالب‌بندی استفاده کنید.",
      enterUrl: "آدرس را وارد کنید",
      formatting: "قالب‌بندی",
      bold: "درشت",
      italic: "کج",
      underline: "خط زیر",
      heading: "سرتیتر",
      bulletList: "فهرست نقطه‌ای",
      numberedList: "فهرست شماره‌دار",
      quote: "نقل‌قول",
      link: "پیوند",
    },
    dates: {
      yesterday: "دیروز",
      daysAgo: "{count} روز پیش",
    },
    prefs: {
      language: "زبان",
      theme: "پوسته",
      light: "روشن",
      dark: "تیره",
      english: "English",
      persian: "فارسی",
      signIn: "ورود",
    },
  },
} as const;

export type TranslationTree = typeof translations.en;

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: T[K] extends object ? Join<K, Paths<T[K], Prev[D]>> : K;
      }[keyof T & string]
    : never;

type Prev = [never, 0, 1, 2, 3, 4, 5];

export type TranslationKey = Paths<TranslationTree>;

export type Params = Record<string, string | number>;

function getPath(tree: Record<string, unknown>, key: string): string | undefined {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree) as string | undefined;
}

export function translate(locale: Locale, key: TranslationKey, params?: Params): string {
  const tree = translations[locale];
  let value = getPath(tree, key) ?? getPath(translations.en, key) ?? key;

  if (params) {
    Object.entries(params).forEach(([name, param]) => {
      value = value.replace(`{${name}}`, String(param));
    });
  }

  return value;
}

export function formatRelativeDate(value: string, locale: Locale, t: (key: TranslationKey, params?: Params) => string) {
  const date = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const localeTag = locale === "fa" ? "fa-IR" : "en-US";

  if (diffDays === 0) {
    return new Intl.DateTimeFormat(localeTag, { hour: "numeric", minute: "2-digit" }).format(date);
  }
  if (diffDays === 1) return t("dates.yesterday");
  if (diffDays < 7) return t("dates.daysAgo", { count: diffDays });
  return new Intl.DateTimeFormat(localeTag, { month: "short", day: "numeric" }).format(date);
}

export function formatLongDate(value: string, locale: Locale) {
  const localeTag = locale === "fa" ? "fa-IR" : "en-US";
  return new Intl.DateTimeFormat(localeTag, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function noteCountLabel(count: number, locale: Locale): string {
  if (locale === "fa") return `${count} ${translations.fa.notes.notes}`;
  return `${count} ${count === 1 ? translations.en.notes.note : translations.en.notes.notes}`;
}
