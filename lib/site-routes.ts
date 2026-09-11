/**
 * Canonical public indexable routes for 1satordinals.com.
 *
 * This is the single source of truth consumed by app/sitemap.ts
 * and app/llms.txt/route.ts.
 *
 * Do NOT include shop, cart, checkout, or orders routes (hidden per D09).
 * Do NOT include the /updates article routes yet (content rewrite pending).
 *
 * Phase 0: omit sitemap lastModified. Vercel builds lack full `.git`, and
 * explicit dates wait until content cadence is real (Parker SEO decision).
 */
export interface SiteRoute {
  /** URL path segment, e.g. "/" or "/protocol". */
  path: string;
  /** Human-readable label used in llms.txt and similar. */
  label: string;
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
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/protocol",
    label: "Protocol overview",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/developers",
    label: "Developer resources",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/projects",
    label: "Ecosystem projects",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/updates",
    label: "Release notes",
    priority: 0.8,
    changeFrequency: "daily",
  },
  {
    path: "/privacy-policy",
    label: "Privacy policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-of-service",
    label: "Terms of service",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];
