// GtagInitScript.tsx
"use client";

type Props = {
  gtagId: string;
};

export function GtagInitScript({ gtagId }: Props) {
  if (!gtagId) return null;

  const inlineScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied'
    });
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} />
    </>
  );
}
