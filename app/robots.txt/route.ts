/**
 * Programmatic robots.txt served as a Next.js route handler.
 *
 * Single wildcard group only. Named User-agent groups would ignore the
 * `*` rules entirely, so mirroring Disallow across 13 crawlers added risk
 * without benefit while rules stay identical. Add named groups later only
 * when a crawler needs different policy — and mirror Content-Signal there.
 *
 * Disallow /api/ only. Shop/cart/checkout/orders are handled by
 * page-level noindex (D09), not robots Disallow.
 */
export function GET() {
  const lines = [
    "User-agent: *",
    "Disallow: /api/",
    "Content-Signal: ai-train=yes, search=yes, ai-input=yes",
    "",
    "Sitemap: https://1satordinals.com/sitemap.xml",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
