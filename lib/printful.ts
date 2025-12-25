/**
 * Printful API Client - Compatibility Layer
 *
 * This file re-exports from the new modular structure in lib/printful/
 * to maintain backward compatibility with existing imports.
 *
 * New code should import from lib/printful/ directly for better tree-shaking.
 */

export * from "./printful/index";
