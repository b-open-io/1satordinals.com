/**
 * Better Auth Client
 * Client-side authentication hooks and utilities
 * https://www.better-auth.com/docs/integrations/next
 */

"use client";

import { createAuthClient } from "better-auth/react";
import type { Session } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

// Export hooks and methods for use in components
export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

// Re-export types
export type { Session };
