"use client";

import { useEffect, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved";

export function useSaveStatus(deps: unknown[], delay = 700) {
  const [status, setStatus] = useState<SaveStatus>("saved");

  useEffect(() => {
    setStatus("saving");
    const timer = window.setTimeout(() => setStatus("saved"), delay);
    return () => window.clearTimeout(timer);
  }, deps);

  return status;
}
