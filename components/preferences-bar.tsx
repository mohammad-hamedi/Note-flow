"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { useAppPreferences } from "@/contexts/app-preferences";
import type { Locale } from "@/lib/i18n";

export function PreferencesBar() {
  const { locale, theme, setLocale, setTheme, t } = useAppPreferences();

  return (
    <div className="border-t border-slate-200 p-3 dark:border-slate-800">
      <div className="space-y-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/80">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <Languages size={12} />
            {t("prefs.language")}
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {(["en", "fa"] as Locale[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                  locale === value
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700"
                }`}
              >
                {value === "en" ? t("prefs.english") : t("prefs.persian")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
            {t("prefs.theme")}
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {(["light", "dark"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                  theme === value
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700"
                }`}
              >
                {value === "light" ? <Sun size={12} /> : <Moon size={12} />}
                {value === "light" ? t("prefs.light") : t("prefs.dark")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
