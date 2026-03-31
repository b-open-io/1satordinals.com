import { JsonLd } from "@/components/json-ld";

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
        parentOrganization: {
          "@type": "Organization",
          name: "bOpen",
          url: "https://bopen.io",
        },
        founder: {
          "@type": "Person",
          name: "Kurt Wuckert Jr.",
          url: "https://kurtwuckertjr.com",
        },
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
        provider: {
          "@type": "Organization",
          name: "bOpen",
          url: "https://bopen.io",
        },
        creator: {
          "@type": "Organization",
          name: "bOpen",
          url: "https://bopen.io",
        },
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
        about: [
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
          {
            "@type": "Thing",
            name: "Bitcoin Script",
            sameAs: "https://en.wikipedia.org/wiki/Bitcoin#Transactions",
            description:
              "Stack-based scripting language used in Bitcoin transactions",
          },
          {
            "@type": "SoftwareApplication",
            name: "1Sat Market",
            url: "https://1sat.market",
          },
          {
            "@type": "SoftwareApplication",
            name: "ThemeToken",
            url: "https://themetoken.dev",
          },
          {
            "@type": "SoftwareApplication",
            name: "MintFlow",
            url: "https://mintflow.me",
          },
        ],
        keywords: [
          "1Sat Ordinals",
          "BSV Ordinals",
          "NFT Protocol",
          "Token Standards",
          "BSV-20",
          "BSV-21",
          "Inscriptions",
          "On-chain Data",
          "Fungible Tokens",
          "Non-fungible Tokens",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://1satordinals.com/#founder",
        name: "Kurt Wuckert Jr.",
        url: "https://kurtwuckertjr.com",
        description:
          "Bitcoin Historian and founder of bOpen, GorillaPool, and Open Protocol Labs",
        sameAs: [
          "https://www.wikidata.org/wiki/Q138774106",
          "https://x.com/kurtwuckertjr",
          "https://www.linkedin.com/in/kurtwuckertjr/",
        ],
      },
    ],
  };

  return <JsonLd data={schemaData} />;
}
