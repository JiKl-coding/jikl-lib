export interface WebsiteStructuredDataOptions {
  name: string;
  url: string;
  searchUrlTemplate?: string; // např. "https://example.com/search?q={search_term_string}"
}

export function getWebsiteStructuredData({
  name,
  url,
  searchUrlTemplate,
}: WebsiteStructuredDataOptions) {
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };

  if (searchUrlTemplate) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: searchUrlTemplate,
      "query-input": "required name=search_term_string",
    };
  }

  return data;
}
