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
  creator?: string;
  publisher?: string;
  authors?: { name: string; url?: string }[];
  themeColor?: string;
  languageAlternates?: { href: string; hrefLang: string }[];
  appleWebApp?: {
    title?: string;
    statusBarStyle?: "default" | "black" | "black-translucent";
    capable?: boolean;
  };
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
  creator,
  publisher,
  authors,
  themeColor,
  languageAlternates,
  appleWebApp,
}: MetadataOptions): Metadata {
  const normalizedServerUrl = serverUrl.replace(/\/$/, "");
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${normalizedServerUrl}${fullPath}`;

  const resolvedOgImage = ogImage?.startsWith("http")
    ? ogImage
    : `${normalizedServerUrl}${ogImage || "/og/default.png"}`;

  const fullTitle = `${title} | ${appName}`;

  const metadata: Metadata = {
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
    metadataBase: new URL(normalizedServerUrl),
    alternates: {
      canonical: fullUrl,
      languages: languageAlternates?.reduce<Record<string, string>>((acc, alt) => {
        acc[alt.hrefLang] = alt.href;
        return acc;
      }, {}),
    },
  };

  if (creator) metadata.creator = creator;
  if (publisher) metadata.publisher = publisher;
  if (authors) metadata.authors = authors;
  if (themeColor) metadata.themeColor = themeColor;

  if (appleWebApp) {
    metadata.appleWebApp = {
      capable: appleWebApp.capable ?? true,
      title: appleWebApp.title || appName,
      statusBarStyle: appleWebApp.statusBarStyle || "default",
    };
  }

  return metadata;
}
