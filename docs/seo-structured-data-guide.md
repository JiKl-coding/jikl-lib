
# 🧠 SEO a Structured Data v Next.js pomocí `@jikl/lib`

Tento návod ti ukáže, jak jednoduše přidat do Next.js projektu správné `<head>` metadata a [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) ve formátu JSON-LD.

---

## ✅ Co použiješ

- `generateMetadata()` – pro `<head>` metadata (SEO + OpenGraph)
- `getPersonStructuredData()` – pro osobní stránku/portfolio
- `getWebsiteStructuredData()` – pro obecné web info
- `getLocalBusinessStructuredData()` – pokud máš fyzické služby / kontakt

---

## 📁 1. Připrav si `constants.ts`

Vytvoř (nebo uprav) soubor `constants.ts`:

```ts
export const APP_NAME = "Valerie Wendlerová";
export const APP_DESCRIPTION = "Komplexní služby výživové poradkyně a fitness trenérky.";
export const SERVER_URL = "https://www.valeriewendlerova.cz";
export const EMAILADDRESS = "wendlerovavalerie@seznam.cz";
export const PHONE_NUMBER = "+420 123 456 789";

export const SOCIAL_MEDIA = {
  instagram: "https://www.instagram.com/laskyplna_bruneta/",
  facebook: "https://www.facebook.com/profile.php?id=100089184162229",
  tiktok: "https://www.tiktok.com/@laskyplna_bruneta",
  youtube: "https://www.youtube.com/channel/UCjzguOuq63BvFo13iOKmGoQ"
};
```

---

## 🧠 2. Využij funkce z `@jikl/lib`

Importuj funkce do `layout.tsx` (nebo `RootLayout`):

```ts
import {
  generateMetadata,
  getPersonStructuredData,
  getWebsiteStructuredData,
  getLocalBusinessStructuredData,
} from "@jikl/lib";
```

---

## ⚙️ 3. Vytvoř si metadata a structured data

```ts
export const metadata = generateMetadata({
  title: APP_NAME,
  description: APP_DESCRIPTION,
  serverUrl: SERVER_URL,
  appName: APP_NAME,
  path: "/",
  ogImage: "/og/og-image.png",
  keywords: [
    "Valerie Wendlerová", "Láskyplná bruneta",
    "výživová poradkyně", "fitness trenérka", "jídelníček"
  ],
  locale: "cs_CZ",
  creator: "Jiří Klatovský",
  publisher: "Valerie Wendlerová",
  authors: [{ name: "Valerie Wendlerová" }],
});
```

```ts
const structuredSameAs = Object.values(SOCIAL_MEDIA);

const structuredData = [
  getPersonStructuredData({
    locale: "cs",
    name: "Valerie Wendlerová",
    imageUrl: `${SERVER_URL}/og/og-image.png`,
    jobTitleCs: "Výživová poradkyně a fitness trenérka",
    jobTitleEn: "Nutritionist and fitness trainer",
    url: SERVER_URL,
    descriptionCs: "Valerie Wendlerová – známá jako Láskyplná bruneta – nabízí individuální výživové poradenství, konzultace a přednášky pro školy a firmy.",
    descriptionEn: "Valerie Wendlerová, also known as Láskyplná bruneta, offers nutritional consulting, personal coaching, and lectures for schools and companies.",
    sameAs: structuredSameAs,
    organizationName: "Valerie Wendlerová",
    addressLocality: "Planá",
    addressCountry: "CZ",
  }),
  getWebsiteStructuredData({
    name: "Valerie Wendlerová",
    url: SERVER_URL,
  }),
  getLocalBusinessStructuredData({
    name: "Valerie Wendlerová",
    url: SERVER_URL,
    imageUrl: `${SERVER_URL}/og/og-image.png`,
    email: EMAILADDRESS,
    telephone: PHONE_NUMBER,
    streetAddress: "Bohušova 774",
    addressLocality: "Planá",
    postalCode: "34815",
    addressCountry: "CZ",
    description: "Výživové poradenství, individuální konzultace a přednášky pro školy a firmy.",
    sameAs: structuredSameAs,
  }),
];
```

---

## 🧱 4. Vlož structured data do `<head>`

Uvnitř `RootLayout`:

```tsx
<head>
  {structuredData.map((entry, idx) => (
    <script
      key={idx}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
    />
  ))}
</head>
```

---

## 🎯 Výsledek

✔️ SEO metadata i structured data jsou správně zobrazeny na stránce  
✔️ Funguje pro `Google Rich Results`, sociální sítě a validaci přes [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)  
✔️ Lze snadno rozšířit nebo upravit podle potřeby

---

Vytvořeno s ❤️ v `@jikl/lib`
