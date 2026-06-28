"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  Bold,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";
import { useAppPreferences } from "@/contexts/app-preferences";
import type { TranslationKey } from "@/lib/i18n";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type Command = {
  labelKey: TranslationKey;
  icon: typeof Bold;
  action: () => void;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const { t } = useAppPreferences();
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    const node = editorRef.current;
    if (!node || isInternalChange.current) return;
    if (node.innerHTML !== value) {
      node.innerHTML = value || "";
    }
  }, [value]);

  const exec = useCallback((command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    const html = editorRef.current?.innerHTML ?? "";
    isInternalChange.current = true;
    onChange(html);
    window.setTimeout(() => {
      isInternalChange.current = false;
    }, 0);
  }, [onChange]);

  const handleInput = () => {
    const html = editorRef.current?.innerHTML ?? "";
    isInternalChange.current = true;
    onChange(html);
    window.setTimeout(() => {
      isInternalChange.current = false;
    }, 0);
  };

  const addLink = () => {
    const url = window.prompt(t("editor.enterUrl"));
    if (url) exec("createLink", url);
  };

  const commands: Command[] = [
    { labelKey: "editor.bold", icon: Bold, action: () => exec("bold") },
    { labelKey: "editor.italic", icon: Italic, action: () => exec("italic") },
    { labelKey: "editor.underline", icon: Underline, action: () => exec("underline") },
    { labelKey: "editor.heading", icon: Heading2, action: () => exec("formatBlock", "h2") },
    { labelKey: "editor.bulletList", icon: List, action: () => exec("insertUnorderedList") },
    { labelKey: "editor.numberedList", icon: ListOrdered, action: () => exec("insertOrderedList") },
    { labelKey: "editor.quote", icon: Quote, action: () => exec("formatBlock", "blockquote") },
    { labelKey: "editor.link", icon: Link2, action: addLink },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 px-2 py-2 dark:border-slate-700 dark:bg-slate-900/80"
        role="toolbar"
        aria-label={t("editor.formatting")}
      >
        {commands.map((item) => {
          const Icon = item.icon;
          const label = t(item.labelKey);
          return (
            <button
              key={item.labelKey}
              type="button"
              title={label}
              aria-label={label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={item.action}
              className="icon-btn h-8 w-8 rounded-lg"
            >
              <Icon size={15} />
            </button>
          );
        })}
      </div>

      <div className="px-4 py-3">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder ?? t("editor.writePlaceholder")}
          className="rich-editor-content scrollbar-thin max-h-[calc(100vh-22rem)] overflow-y-auto"
          dir="auto"
        />
      </div>
    </div>
  );
}
