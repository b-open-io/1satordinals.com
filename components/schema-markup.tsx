/**
 * Global JSON-LD structured data for 1satordinals.com.
 *
 * Rules enforced here:
 * - Every @id is an absolute https URL (never a bare #fragment).
 * - No JavaScript Date constructor anywhere (no dateModified via new Date()).
 * - The primary node is SoftwareApplication, not Organization.
 * - The only Organization node is the OPL publisher stub.
 * - sameAs sourced from Entity-Profiles/opl-bopen.md and verified links.
 * - No Wikidata sameAs for 1Sat Ordinals itself (confirmed miss).
 * - No TechArticle node (fabricated dates removed).
 * - No aggregateRating anywhere.
 */
export function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://1satordinals.com/#software",
        name: "1Sat Ordinals",
        alternateName: ["1Sat"],
        url: "https://1satordinals.com",
        description:
          "Open protocol on Bitcoin SV for creating fungible and non-fungible tokens using ordinal inscription technology with single-transaction minting.",
        applicationCategory: "DeveloperApplication",
        // Basis: 1Sat Ordinals is a free, open-source protocol with no license fee.
        // The protocol specification and tooling are available at no cost.
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Single transaction minting",
          "Native Bitcoin Script compatibility",
          "Fungible and non-fungible token creation",
          "Origin-based indexing",
        ],
        sameAs: [
          "https://x.com/1satordinals",
          "https://github.com/BitcoinSchema/1sat-ordinals",
          "https://github.com/b-open-io/1satordinals.com",
          "https://docs.1satordinals.com",
          "https://www.npmjs.com/org/1sat",
          "https://discord.gg/3jsTXCzmv5",
        ],
        publisher: {
          "@type": "Organization",
          "@id": "https://opl.dev/#organization",
          name: "Open Protocol Labs",
          url: "https://opl.dev",
          sameAs: [
            "https://x.com/opldotdev",
            "https://github.com/b-open-io",
            "https://www.linkedin.com/company/opldotdev",
          ],
        },
        creator: [
          {
            "@type": "Person",
            name: "Luke Rohenaz",
            sameAs: [
              "https://www.wikidata.org/wiki/Q140697627",
              "https://satchmo.dev",
              "https://x.com/WildSatchmo",
            ],
          },
          {
            "@type": "Person",
            name: "David Case",
            sameAs: ["https://x.com/shruggr", "https://github.com/shruggr"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://1satordinals.com/#website",
        url: "https://1satordinals.com",
        name: "1Sat Ordinals",
        description:
          "Official website for the 1Sat Ordinals protocol on Bitcoin SV",
        publisher: {
          "@id": "https://opl.dev/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: official Next.js pattern for JSON-LD; payload is static and < is escaped below
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
