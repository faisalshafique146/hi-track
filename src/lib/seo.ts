import type { Metadata } from "next";

const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteConfig = {
  name: "Hi Track",
  shortName: "Hi Track",
  description:
    "Track the International Space Station in real time, explore the live ISS map, check upcoming pass predictions, and see who is currently in space.",
  keywords: [
    "ISS tracker",
    "live ISS tracking",
    "ISS live map",
    "ISS pass predictions",
    "International Space Station tracker",
    "astronauts currently in space",
    "satellite tracking",
    "space station map",
  ],
};

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!envUrl) {
    return FALLBACK_SITE_URL;
  }

  return envUrl.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createWebPageSchema({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}
