import type { MetadataRoute } from "next";
import { siteRoutes } from "@/lib/site-routes";

/**
 * Build the sitemap from the canonical route registry.
 *
 * lastModified comes from explicit dates on each SiteRoute — not git log.
 * Vercel production builds lack a full `.git` history, so commit dating
 * either omits lastmod or returns shallow-boundary dates that drift.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1satordinals.com";

  return siteRoutes.map((route) => ({
    url: route.path === "/" ? baseUrl : `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
