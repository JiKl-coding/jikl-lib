# 📦 Používání `@jikl/lib` z GitHubu

Tato knihovna není publikována na npm registry. Používá se přímo přes GitHub.

---

## ✅ Instalace

Do `package.json`:

```
"@jikl/lib": "git+https://github.com/JiKl-coding/jikl-lib.git#v0.2.0"
```

- `v0.2.0` je tag – doporučeno používat verzi, ne `main`.

Instalace:

```bash
npm install
```

---

## 🏷️ Vytvoření nové verze

```bash
# Změň kód
git add .
git commit -m "nová feature / oprava"
npm version patch|minor|major
git push origin main --tags
```

Nebo manuálně:

```bash
git tag v0.3.0
git push origin v0.3.0
```

---

## 🧪 Lokální testování

```bash
cd jikl-lib
npm run build
npm link

# V jiném projektu:
npm link @jikl/lib
```

---

## 💡 Poznámky

- Nepoužívej `#main` v produkci
- Vždy buildni (`npm run build`) před pushnutím
- Nikdy necommituj `dist/` ani `node_modules/`
