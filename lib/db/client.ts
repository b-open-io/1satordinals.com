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
 * Execute database schema from a SQL file
 * Safe to run multiple times - uses CREATE TABLE IF NOT EXISTS
 */
async function executeSchemaFile(filename: string, description: string) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const schemaPath = path.join(process.cwd(), "lib", "db", filename);
  const schema = await fs.readFile(schemaPath, "utf-8");

  // Split schema into individual statements and execute them
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      // biome-ignore lint/suspicious/noExplicitAny: Neon SQL requires array-like input
      await sql([statement] as any);
    } catch (error) {
      console.error(`Error executing ${description} statement:`, error);
      throw error;
    }
  }

  console.log(`✅ ${description} initialized successfully`);
}

/**
 * Execute the Better Auth database schema
 * Safe to run multiple times - uses CREATE TABLE IF NOT EXISTS
 */
export async function initializeDatabase() {
  await executeSchemaFile("better-auth-schema.sql", "Better Auth database");
}

/**
 * Execute the Orders database schema
 * Safe to run multiple times - uses CREATE TABLE IF NOT EXISTS
 */
export async function initializeOrdersSchema() {
  await executeSchemaFile("orders-schema.sql", "Orders database");
}

/**
 * Auto-initialize database on first API call
 * Caches initialization status to avoid repeated attempts
 */
let dbInitialized = false;
let ordersInitialized = false;

export async function ensureDatabaseInitialized(): Promise<void> {
  if (dbInitialized) return;

  try {
    // Check if Better Auth tables exist
    await sql`SELECT 1 FROM "user" LIMIT 1`;
    dbInitialized = true;
    console.log("✅ Better Auth database already initialized");
  } catch (_error) {
    // Tables don't exist, initialize them
    console.log("📦 Initializing Better Auth database schema...");
    await initializeDatabase();
    dbInitialized = true;
  }
}

export async function ensureOrdersInitialized(): Promise<void> {
  if (ordersInitialized) return;

  try {
    // Check if orders table exists
    await sql`SELECT 1 FROM "orders" LIMIT 1`;
    ordersInitialized = true;
    console.log("✅ Orders database already initialized");
  } catch (_error) {
    // Table doesn't exist, initialize it
    console.log("📦 Initializing Orders database schema...");
    await initializeOrdersSchema();
    ordersInitialized = true;
  }
}
