import type { Metadata } from "next";

export interface MetadataOptions {
  title: string;
  description: string;
  serverUrl: string;
  appName: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  locale?: string;
}

export function generateMetadata({
  title,
  description,
  serverUrl,
  appName,
  path = "/",
  ogImage,
  keywords = [],
  locale = "cs_CZ",
}: MetadataOptions): Metadata {
  const normalizedServerUrl = serverUrl.replace(/\/$/, "");
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${normalizedServerUrl}${fullPath}`;

  const resolvedOgImage = ogImage?.startsWith("http")
    ? ogImage
    : `${normalizedServerUrl}${ogImage || "/og/default.png"}`;

  const fullTitle = `${title} | ${appName}`;

  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...keywords, appName.toLowerCase()])),
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: appName,
      type: "website",
      locale,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [resolvedOgImage],
    },
    robots: "index, follow",
  };
}
