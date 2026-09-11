/**
 * Canonical public indexable routes for 1satordinals.com.
 *
 * This is the single source of truth consumed by app/sitemap.ts
 * and app/llms.txt/route.ts.
 *
 * Do NOT include shop, cart, checkout, or orders routes (hidden per D09).
 * Do NOT include the /updates article routes yet (content rewrite pending).
 *
 * lastModified is explicit data — Vercel builds have no full `.git`, so
 * git-log dating is unreliable in production.
 */
export interface SiteRoute {
  /** URL path segment, e.g. "/" or "/protocol". */
  path: string;
  /** Human-readable label used in llms.txt and similar. */
  label: string;
  /** ISO 8601 last-modified date for sitemap.xml (explicit, not from git). */
  lastModified: string;
  /** Sitemap priority hint (0.0 to 1.0). */
  priority: number;
  /** Sitemap changeFrequency hint. */
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    label: "Home",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/protocol",
    label: "Protocol overview",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/developers",
    label: "Developer resources",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/projects",
    label: "Ecosystem projects",
    lastModified: "2026-06-04T21:22:50.000Z",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/updates",
    label: "Release notes",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 0.8,
    changeFrequency: "daily",
  },
  {
    path: "/privacy-policy",
    label: "Privacy policy",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-of-service",
    label: "Terms of service",
    lastModified: "2026-09-03T15:20:24.000Z",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];
