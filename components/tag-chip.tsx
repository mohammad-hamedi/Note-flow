"use client";

import { tagColors } from "@/lib/format";
import { useAppPreferences } from "@/contexts/app-preferences";

type Props = {
  tag: string;
  onClick?: () => void;
  onRemove?: () => void;
  size?: "sm" | "md";
};

export function TagChip({ tag, onClick, onRemove, size = "sm" }: Props) {
  const { t } = useAppPreferences();
  const colors = tagColors(tag);
  const label = tag.replace(/^#/, "");
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  const className = `inline-flex max-w-[120px] items-center gap-1 rounded-md font-medium ring-1 ${colors.bg} ${colors.text} ${colors.ring} ${sizeClass} ${
    onClick ? "cursor-pointer transition hover:brightness-95 dark:hover:brightness-110" : ""
  }`;

  if (onRemove) {
    return (
      <button
        type="button"
        onClick={onRemove}
        className={className}
        title={t("notes.removeTag", { tag: label })}
      >
        <span className="truncate">#{label}</span>
        <span className="shrink-0 opacity-60">×</span>
      </button>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        title={t("notes.filterByTag", { tag: label })}
      >
        <span className="truncate">#{label}</span>
      </button>
    );
  }

  return (
    <span className={className}>
      <span className="truncate">#{label}</span>
    </span>
  );
}
