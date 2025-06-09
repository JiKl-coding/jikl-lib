# simpleCookies – Dokumentace

Komponenty pro správu cookie souhlasu a inicializaci Google Analytics.

## 1. Předání `gtagId` do CookieBar

Komponenta `CookieBar` vyžaduje předání `gtagId` (Google Analytics Tracking ID):

```tsx
<CookieBar
  gtagId={gaTrackingId}
  // další props pro stylování a texty...
/>
```

## 2. Inicializace Google Analytics ve `<head>`

Do layoutu aplikace vložte komponentu `GtagInitScript` do `<head>`, před `<body>`:

```tsx
import { GtagInitScript } from "@jikl/lib";

<head>
  <GtagInitScript gtagId={gaTrackingId} />
</head>
```

## 3. Stylování a přizpůsobení

`CookieBar` umožňuje kompletní stylování a úpravu textů:

- `className` – třída pro wrapper baru
- `messageText` – vlastní text zprávy
- `messageClassName` – třída pro zprávu
- `buttonAcceptLabel` / `buttonDenyLabel` – texty tlačítek
- `buttonWrapperClassName` – wrapper tlačítek
- `buttonAcceptClassName` / `buttonDenyClassName` – třídy pro tlačítka

### Příklad použití

```tsx
<CookieBar
  gtagId={gaTrackingId}
  className="fixed bottom-0 inset-x-0 w-full min-h-[80px] bg-[var(--cookies)] text-[var(--foreground)] z-50 shadow-md border-t border-[var(--link)]"
  messageText="K analýze návštěvnosti využívám službu Google Analytics. Cookies ukládám jen s vaším souhlasem."
  messageClassName="px-2 sm:text-base text-xs"
  buttonAcceptLabel="Souhlasím"
  buttonDenyLabel="Odmítám"
  buttonWrapperClassName="flex justify-end items-center gap-2 px-2 sm:text-sm text-xs flex-wrap"
  buttonAcceptClassName="p-2 min-w-[90px] rounded-md bg-[var(--link)] border border-[var(--link)] text-[var(--background)] hover:bg-[var(--foreground)]"
  buttonDenyClassName="p-2 min-w-[90px] rounded-md bg-[var(--background)] border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)]"
/>
```

## 4. Kompletní příklad v layoutu

```tsx
import { CookieBar, GtagInitScript } from "@jikl/lib";

export default function Layout({ children }) {
  const gaTrackingId = process.env.GA_TRACKING_ID || "";
  return (
    <html>
      <head>
        <GtagInitScript gtagId={gaTrackingId} />
      </head>
      <body>
        {/* ... */}
        <CookieBar
          gtagId={gaTrackingId}
          // další props pro stylování a texty
        />
      </body>
    </html>
  );
}
```

## 5. Poznámky

- Pokud není `gtagId` předán, Google Analytics nebude inicializován.
- Komponenty jsou optimalizované pro Next.js/React.
