export function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "1Sat Ordinals",
        alternateName: ["1Sat", "OneSat Ordinals"],
        url: "https://1satordinals.com",
        logo: "https://1satordinals.com/images/logo-light.png",
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
        name: "1Sat Ordinals Protocol",
        applicationCategory: "Blockchain Protocol",
        operatingSystem: "Bitcoin SV",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "50MB+ file support",
          "Single transaction minting",
          "Sub-cent transaction costs",
          "Full Bitcoin Script compatibility",
          "Fungible and non-fungible token creation",
          "No dust requirement",
        ],
      },
      {
        "@type": "WebSite",
        url: "https://1satordinals.com",
        name: "1Sat Ordinals",
        description:
          "Official website for 1Sat Ordinals protocol on Bitcoin SV",
        publisher: {
          "@id": "#organization",
        },
      },
      {
        "@type": "TechArticle",
        headline: "1Sat Ordinals Protocol Documentation",
        description:
          "Technical specification for the 1Sat Ordinals token protocol on Bitcoin SV",
        keywords:
          "1Sat, Ordinals, BSV, Bitcoin SV, token protocol, NFT, inscriptions",
        datePublished: "2023-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        author: {
          "@type": "Organization",
          "@id": "#organization",
        },
      },
    ],
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  );
}
