import type { MetadataRoute } from "next";
import { siteRoutes } from "@/lib/site-routes";

/**
 * Build the sitemap from the canonical route registry.
 *
 * Phase 0 omits lastModified (Parker): wrong lastmod is worse than none,
 * and Vercel builds cannot safely date from git. Revisit with explicit
 * dates when content cadence is real.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1satordinals.com";

  return siteRoutes.map((route) => ({
    url: route.path === "/" ? baseUrl : `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
