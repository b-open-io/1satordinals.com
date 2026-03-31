import { JsonLd } from "@/components/json-ld";

interface BreadcrumbSchemaItem {
  name: string;
  url?: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbSchemaItem[] }) {
  if (items.length < 2) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      ...(i < items.length - 1
        ? { item: { "@id": item.url, name: item.name } }
        : { name: item.name }),
    })),
  };

  return <JsonLd data={data} />;
}
