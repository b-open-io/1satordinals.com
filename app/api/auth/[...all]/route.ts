/**
 * Better Auth API Route Handler
 * Handles all authentication routes: /api/auth/*
 * https://www.better-auth.com/docs/integrations/next
 */

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { ensureDatabaseInitialized } from "@/lib/db/client";

// Auto-initialize database on first request
ensureDatabaseInitialized().catch((error) => {
  console.error("Failed to initialize Better Auth database:", error);
});

export const { GET, POST } = toNextJsHandler(auth);
