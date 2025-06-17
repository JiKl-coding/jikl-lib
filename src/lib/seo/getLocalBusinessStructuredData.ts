export interface LocalBusinessStructuredDataOptions {
  name: string;
  url: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressCountry?: string;
  sameAs?: string[];
}

export function getLocalBusinessStructuredData({
  name,
  url,
  imageUrl,
  description,
  email,
  telephone,
  streetAddress = "",
  addressLocality = "",
  postalCode = "",
  addressCountry = "CZ",
  sameAs = [],
}: LocalBusinessStructuredDataOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(description && { description }),
    ...(email && { email }),
    ...(telephone && { telephone }),
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      postalCode,
      addressCountry,
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}
