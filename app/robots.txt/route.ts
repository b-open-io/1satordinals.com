/**
 * Programmatic robots.txt served as a Next.js route handler.
 *
 * Structure: one wildcard group (with Content-Signal), then one named
 * group per crawler token with identical rules, then the Sitemap.
 *
 * Disallow /api/ only. Shop/cart/checkout/orders are handled by
 * page-level noindex (D09), not robots Disallow.
 */
export function GET() {
  const crawlerTokens = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ];

  const lines: string[] = [];

  // Wildcard group — Content-Signal belongs here, inside this group
  lines.push("User-agent: *");
  lines.push("Disallow: /api/");
  lines.push("Content-Signal: ai-train=yes, search=yes, ai-input=yes");
  lines.push("");

  // Named groups with identical rules
  for (const token of crawlerTokens) {
    lines.push(`User-agent: ${token}`);
    lines.push("Disallow: /api/");
    lines.push("");
  }

  // Sitemap
  lines.push("Sitemap: https://1satordinals.com/sitemap.xml");
  lines.push(""); // trailing newline

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
