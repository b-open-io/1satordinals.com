/**
 * Neon Database Client
 * For Better Auth database initialization
 */

import { type NeonQueryFunction, neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql: NeonQueryFunction<false, false> = neon(
  process.env.DATABASE_URL,
);

/**
 * Execute the Better Auth database schema
 * Safe to run multiple times - uses CREATE TABLE IF NOT EXISTS
 */
export async function initializeDatabase() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const schemaPath = path.join(
    process.cwd(),
    "lib",
    "db",
    "better-auth-schema.sql",
  );
  const schema = await fs.readFile(schemaPath, "utf-8");

  // Split schema into individual statements and execute them
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await sql([statement] as any);
    } catch (error) {
      console.error(`Error executing statement:`, error);
      throw error;
    }
  }

  console.log("✅ Better Auth database initialized successfully");
}

/**
 * Auto-initialize database on first API call
 * Caches initialization status to avoid repeated attempts
 */
let dbInitialized = false;

export async function ensureDatabaseInitialized(): Promise<void> {
  if (dbInitialized) return;

  try {
    // Check if Better Auth tables exist
    await sql`SELECT 1 FROM "user" LIMIT 1`;
    dbInitialized = true;
    console.log("✅ Better Auth database already initialized");
  } catch (error) {
    // Tables don't exist, initialize them
    console.log("📦 Initializing Better Auth database schema...");
    await initializeDatabase();
    dbInitialized = true;
  }
}
