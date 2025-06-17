// @jikl/lib/seo/getPersonStructuredData.ts
export interface PersonStructuredDataOptions {
  locale: "cs" | "en";
  name: string;
  imageUrl: string;
  jobTitleCs: string;
  jobTitleEn: string;
  url: string;
  descriptionCs: string;
  descriptionEn: string;
  sameAs?: string[];
  organizationName?: string;
  addressLocality?: string;
  addressCountry?: string;
}

export function getPersonStructuredData({
  locale,
  name,
  imageUrl,
  jobTitleCs,
  jobTitleEn,
  url,
  descriptionCs,
  descriptionEn,
  sameAs = [],
  organizationName,
  addressLocality = "Prague",
  addressCountry = "CZ",
}: PersonStructuredDataOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: locale === "cs" ? jobTitleCs : jobTitleEn,
    url,
    image: imageUrl,
    description: locale === "cs" ? descriptionCs : descriptionEn,
    ...(organizationName && {
      worksFor: {
        "@type": "Organization",
        name: organizationName,
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
    address: {
      "@type": "PostalAddress",
      addressLocality,
      addressCountry,
    },
  };
}
