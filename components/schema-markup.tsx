export function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://1satordinals.com/#website",
        url: "https://1satordinals.com",
        name: "1Sat Ordinals",
        description:
          "Official website for the 1Sat Ordinals protocol on Bitcoin SV",
        publisher: { "@id": "https://1satordinals.com/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://1satordinals.com/#webpage",
        url: "https://1satordinals.com",
        name: "1Sat Ordinals - Bitcoin SV Token Protocol | 50MB+ NFTs & Inscriptions",
        isPartOf: { "@id": "https://1satordinals.com/#website" },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://1satordinals.com/#organization",
        name: "1Sat Ordinals",
        alternateName: ["1Sat", "OneSat Ordinals", "1Sat Ordinals Protocol"],
        url: "https://1satordinals.com",
        logo: "https://1satordinals.com/images/logo-light.png",
        parentOrganization: { "@id": "https://bopen.io/#organization" },
        founder: { "@id": "https://kurtwuckertjr.com/#person" },
        sameAs: [
          "https://discord.gg/1satordinals",
          "https://github.com/b-open-io/1satordinals.com",
          "https://twitter.com/1satordinals",
        ],
        description:
          "Open protocol for token creation on Bitcoin SV with ordinals technology supporting 50MB+ inscriptions",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://1satordinals.com/#softwareapplication",
        name: "1Sat Ordinals",
        url: "https://1satordinals.com",
        description:
          "Open protocol for Bitcoin SV enabling 50MB+ inscriptions, single-transaction minting at sub-cent costs. Create NFTs, fungible tokens, and store data on-chain with full Bitcoin Script compatibility and no dust requirement.",
        applicationCategory: "Blockchain Protocol",
        operatingSystem: "Bitcoin SV",
        provider: { "@id": "https://bopen.io/#organization" },
        creator: { "@id": "https://bopen.io/#organization" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description:
            "Open protocol - free to use, sub-cent transaction costs on BSV",
        },
        featureList: [
          "50MB+ file support",
          "Single transaction minting",
          "Sub-cent transaction costs",
          "Full Bitcoin Script compatibility",
          "Fungible and non-fungible token creation",
          "No dust requirement",
          "BSV-20 fungible token standard",
          "BSV-21 token standard",
          "On-chain data storage",
          "Collection support with rarities and traits",
          "Marketplace integration",
        ],
        isRelatedTo: [
          {
            "@type": "Thing",
            name: "Non-fungible token",
            url: "https://en.wikipedia.org/wiki/Non-fungible_token",
          },
          {
            "@type": "Thing",
            name: "Bitcoin SV",
            url: "https://en.wikipedia.org/wiki/Bitcoin_SV",
          },
          { "@id": "https://1sat.market/#softwareapplication" },
          { "@id": "https://themetoken.dev/#softwareapplication" },
          { "@id": "https://mintflow.me/#softwareapplication" },
        ],
        knowsAbout: [
          "1Sat Ordinals",
          "BSV Ordinals",
          "NFT Protocol",
          "Token Standards",
          "BSV-20",
          "BSV-21",
          "Inscriptions",
          "On-chain Data",
          "Bitcoin Script",
          "Fungible Tokens",
          "Non-fungible Tokens",
        ],
        sameAs: [
          "https://discord.gg/1satordinals",
          "https://github.com/b-open-io/1satordinals.com",
          "https://twitter.com/1satordinals",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://kurtwuckertjr.com/#person",
        name: "Kurt Wuckert Jr.",
        url: "https://kurtwuckertjr.com",
        description:
          "Bitcoin Historian and founder of bOpen, GorillaPool, and Open Protocol Labs",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://1satordinals.com",
          },
        ],
      },
    ],
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  );
}
