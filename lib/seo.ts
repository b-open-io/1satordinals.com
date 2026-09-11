import type { Metadata } from "next";

const SITE_URL = "https://1satordinals.com";
const SITE_NAME = "1Sat Ordinals";
const DEFAULT_OG_IMAGE = "/opengraph-image.png";

interface BuildMetadataOptions {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}

/**
 * Build a complete Next.js Metadata object for a page.
 *
 * Every indexable page must call this so it serves a self-referential
 * canonical, correct og:url, and the RSS + llms.txt alternates.
 *
 * The root layout declares `title.template: "%s | 1Sat Ordinals"`, so
 * interior pages pass just their unique title segment. The homepage
 * uses `{ absolute: ... }` to bypass the template.
 */
export function buildMetadata({
  path,
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const isHomepage = path === "/";
  const fullTitle = isHomepage ? title : `${title} | ${SITE_NAME}`;

  return {
    title: isHomepage ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": `${SITE_URL}/feed.xml`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@1satordinals",
      creator: "@1satordinals",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
