/**
 * Minimal /llms.txt per the llmstxt.org specification.
 *
 * Shipped in Phase 0 (D11) so the serving-tandem alternate never
 * advertises a 404. CCBot already fetched /llms.txt on 2026-08-18.
 */
export function GET() {
  const body = `# 1Sat Ordinals

> Open protocol for creating tokens and NFTs on Bitcoin SV, one satoshi at a time.

1Sat Ordinals is a token protocol that runs on Bitcoin SV (BSV), not Bitcoin (BTC). It is developed and maintained by Open Protocol Labs (https://opl.dev), created by David Case and Luke Rohenaz. The protocol enables single-transaction minting of fungible and non-fungible tokens using ordinal inscription technology with native Bitcoin Script compatibility.

## Site

- [Protocol overview](https://1satordinals.com/protocol)
- [Developer resources](https://1satordinals.com/developers)
- [Full protocol specification](https://docs.1satordinals.com)
- [Release notes](https://1satordinals.com/updates)
- [Protocol source](https://github.com/BitcoinSchema/1sat-ordinals)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
