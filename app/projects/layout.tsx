import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { JsonLd } from "@/components/json-ld";
import { metadata } from "./metadata";

export { metadata };

const projectsSchemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://1satordinals.com/projects/#collectionpage",
  "name": "Ecosystem Projects | 1Sat Ordinals",
  "description":
    "Directory of applications, tools, and platforms built on the 1Sat Ordinals protocol — including marketplaces, gaming, developer tools, and infrastructure projects.",
  "url": "https://1satordinals.com/projects",
  "isPartOf": { "@id": "https://1satordinals.com/#website" },
  "about": { "@id": "https://1satordinals.com/#softwareapplication" },
  "publisher": {
    "@type": "Organization",
    "name": "bOpen",
    "url": "https://bopen.io",
  },
  "inLanguage": "en-US",
  "keywords": [
    "1Sat Ordinals Ecosystem",
    "BSV dApps",
    "NFT Marketplace",
    "MintFlow",
    "1Sat Market",
    "sCrypt Smart Contracts",
    "BSV Gaming",
    "Blockchain Infrastructure",
  ],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={projectsSchemaData} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://1satordinals.com" },
          { name: "Projects" },
        ]}
      />
      {children}
    </>
  );
}
