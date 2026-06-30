"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";

export function SignInScreen() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8 dark:bg-slate-950">
        <div className="w-full max-w-[min(100%,520px)] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Preparing sign-in...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8 dark:bg-slate-950">
      <div className="w-full max-w-[min(100%,520px)] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Sign in to continue
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          You must log in first to use NoteFlow. Your notes are saved to your account.
        </p>
        <div className="mt-7 w-full">
          <SignIn path="/sign-in" routing="path" redirectUrl={`${origin}/`} />
        </div>
      </div>
    </main>
  );
}
