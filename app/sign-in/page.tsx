"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

function RedirectWhenSignedIn() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}

export default function SignInPage() {
  return (
    <>
      <SignedIn>
        <RedirectWhenSignedIn />
      </SignedIn>
      <SignedOut>
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Sign in to continue
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              You must log in first to use NoteFlow. Your notes are saved to your account.
            </p>
            <div className="mt-7">
              <SignIn path="/sign-in" routing="path" redirectUrl="/" />
            </div>
          </div>
        </main>
      </SignedOut>
    </>
  );
}
