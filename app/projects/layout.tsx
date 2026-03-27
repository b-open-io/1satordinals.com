import { metadata } from "./metadata";

export { metadata };

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://1satordinals.com/projects/#collectionpage",
      "name": "Ecosystem Projects | 1Sat Ordinals",
      "description":
        "Directory of applications, tools, and platforms built on the 1Sat Ordinals protocol — including marketplaces, gaming, developer tools, and infrastructure projects.",
      "url": "https://1satordinals.com/projects",
      "isPartOf": { "@id": "https://1satordinals.com/#website" },
      "about": { "@id": "https://1satordinals.com/#softwareapplication" },
      "publisher": { "@id": "https://bopen.io/#organization" },
      "inLanguage": "en-US",
      "knowsAbout": [
        "1Sat Ordinals Ecosystem",
        "BSV dApps",
        "NFT Marketplace",
        "MintFlow",
        "1Sat Market",
        "sCrypt Smart Contracts",
        "BSV Gaming",
        "Blockchain Infrastructure",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://1satordinals.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://1satordinals.com/projects",
        },
      ],
    },
  ],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      {children}
    </>
  );
}
