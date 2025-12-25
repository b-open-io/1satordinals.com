/**
 * Better Auth API Route Handler
 * Handles all authentication routes: /api/auth/*
 * https://www.better-auth.com/docs/integrations/next
 */

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
