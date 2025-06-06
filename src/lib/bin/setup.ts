// npm install git+https://github.com/JiKl-coding/jikl-lib.git
// npx @jikl/lib setup

import fs from "fs";
import path from "path";
import readline from "readline";

// 💡 Seznam složek, které se mají vytvořit (včetně těch v "lib")
const folders = [
  "components",
  "lib/constants",
  "lib/seo",
  "lib/hooks",
  "lib/utils",
  "lib/functions",
  "public/og",
  "public/logo",
  "utils",
  "docs"
];

// 🛡️ Sanitizace vstupů do .env (např. escapování uvozovek)
const sanitizeEnvValue = (value: string): string =>
  value.replace(/"/g, '\\"').trim();

// ❓ Interaktivní dotaz na uživatele
function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, answer => {
      rl.close();
      resolve(answer.trim());
    })
  );
}

// 🧹 Vyčistí složku /public
function emptyPublicFolder() {
  const publicDir = path.resolve("public");

  if (!fs.existsSync(publicDir)) return;

  const files = fs.readdirSync(publicDir);
  files.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  });

  console.log("🧹 Vyčištěna složka: public/");
}

// 🧰 Vytvoří složky a přidá .gitkeep
function createFolders() {
  folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(path.join(folder, ".gitkeep"), "");
      console.log(`✅ Vytvořena složka: ${folder}`);
    }
  });
}

// 🧾 Hlavní funkce
async function main() {
  console.log("🛠️  Spouštím základní setup...");

  const rawAppName = await askQuestion("Zadej název aplikace (APP_NAME): ");
  const rawAppDescription = await askQuestion("Zadej popis aplikace (APP_DESCRIPTION): ");

  const appName = sanitizeEnvValue(rawAppName || "Moje Aplikace");
  const appDescription = sanitizeEnvValue(rawAppDescription || "Popis aplikace");

  emptyPublicFolder();
  createFolders();

  // 📝 Vytvoření lib/constants/index.ts
  const constantsPath = "lib/constants/index.ts";
  const constantsContent = `export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "${appName}";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "${appDescription}";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const DEFAULT_LOCALE = "cs_CZ";
`;

  if (!fs.existsSync(constantsPath)) {
    fs.writeFileSync(constantsPath, constantsContent);
    console.log(`📝 Vytvořen: ${constantsPath}`);
  }

  // 🌍 Vytvoření .env
  const envPath = ".env";
  if (!fs.existsSync(envPath)) {
    const envContent = `NEXT_PUBLIC_APP_NAME=${appName}
    NEXT_PUBLIC_APP_DESCRIPTION=${appDescription}
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    NODE_ENV=development
    `;
    fs.writeFileSync(envPath, envContent);
    console.log(`🌍 Vytvořen: ${envPath}`);
  }

  console.log("✅ Setup dokončen.");
}

main();
