"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { AppPreferencesProvider } from "@/contexts/app-preferences";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AppPreferencesProvider>{children}</AppPreferencesProvider>
    </ClerkProvider>
  );
}
