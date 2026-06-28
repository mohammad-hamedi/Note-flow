"use client";

import { Menu, Moon, PenLine, Search, Sun } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAppPreferences } from "@/contexts/app-preferences";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onOpenSidebar: () => void;
};

export function Topbar({ searchQuery, setSearchQuery, onOpenSidebar }: Props) {
  const { t, theme, toggleTheme, locale, setLocale } = useAppPreferences();

  return (
    <header className="shrink-0 border-b border-slate-200 bg-white animate-fade-in-up motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-12 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:h-14">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="icon-btn lg:hidden"
          aria-label={t("nav.open")}
        >
          <Menu size={18} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
            <PenLine size={15} />
          </div>
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{t("app.name")}</p>
        </div>

        <div className="hidden min-w-0 flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">{t("topbar.search")}</span>
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t("topbar.searchPlaceholder")}
              className="w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 py-2 ps-9 pe-3 text-sm text-slate-700 transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-teal-500 dark:focus:bg-slate-900 dark:focus:ring-teal-900/40"
            />
          </label>
        </div>

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            className="icon-btn hidden h-8 w-auto min-w-8 px-2 text-xs font-semibold sm:inline-flex"
            aria-label={t("prefs.language")}
            title={t("prefs.language")}
          >
            {locale === "en" ? "FA" : "EN"}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn h-8 w-8"
            aria-label={t("prefs.theme")}
            title={theme === "dark" ? t("prefs.light") : t("prefs.dark")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <SignedIn>
            <div className="h-8 w-8">
              <UserButton appearance={{ elements: { userButtonBox: "h-8 w-8" } }} />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button
                type="button"
                className="icon-btn hidden h-8 px-3 text-xs font-semibold sm:inline-flex"
              >
                {t("prefs.signIn")}
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
