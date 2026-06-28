"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  LOCALE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  translate,
  type Locale,
  type Params,
  type Theme,
  type TranslationKey,
} from "@/lib/i18n";
import { readStorage, writeStorage } from "@/lib/storage";

type AppPreferencesContextValue = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey, params?: Params) => string;
  isRtl: boolean;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

function applyDocumentPreferences(locale: Locale, theme: Theme) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "fa" ? "rtl" : "ltr";
  root.classList.toggle("dark", theme === "dark");
}

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStorage(LOCALE_STORAGE_KEY, "en"));
  const [theme, setThemeState] = useState<Theme>(() => readStorage(THEME_STORAGE_KEY, "light"));
  const [isLocaleTransitioning, setIsLocaleTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    applyDocumentPreferences(locale, theme);
    writeStorage(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    applyDocumentPreferences(locale, theme);
    writeStorage(THEME_STORAGE_KEY, theme);
  }, [theme, locale]);

  const triggerLocaleTransition = useCallback(() => {
    setIsLocaleTransitioning(true);
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setIsLocaleTransitioning(false);
    }, 220);
  }, []);

  const setLocale = useCallback(
    (value: Locale) => {
      setLocaleState(value);
      triggerLocaleTransition();
    },
    [triggerLocaleTransition],
  );
  const setTheme = useCallback((value: Theme) => setThemeState(value), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
    [],
  );

  const t = useCallback((key: TranslationKey, params?: Params) => translate(locale, key, params), [locale]);

  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      setTheme,
      toggleTheme,
      t,
      isRtl: locale === "fa",
    }),
    [locale, theme, setLocale, setTheme, toggleTheme, t],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <AppPreferencesContext.Provider value={value}>
      <div className={`min-h-screen ${isLocaleTransitioning ? "locale-transition-active" : ""}`}>
        {children}
      </div>
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }
  return context;
}
