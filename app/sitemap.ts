import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteRoutes } from "@/lib/site-routes";

/**
 * Build the sitemap from the canonical route registry.
 *
 * lastModified is sourced from `git log` on each route's primary source
 * file so it reflects the actual last-change date, not the build clock.
 * If the git command fails for any reason, lastModified is omitted for
 * that entry rather than falling back to a computed date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1satordinals.com";

  return siteRoutes.map((route) => {
    let lastModified: string | undefined;

    try {
      // git log --format=%cI returns the committer date in strict ISO 8601
      const raw = execSync(`git log -1 --format=%cI -- "${route.sourceFile}"`, {
        encoding: "utf-8",
        timeout: 5000,
      }).trim();
      if (raw) {
        lastModified = raw;
      }
    } catch {
      // git unavailable or file untracked; omit lastModified
    }

    return {
      url: route.path === "/" ? baseUrl : `${baseUrl}${route.path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
