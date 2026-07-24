import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = path.join(__dirname, '..', 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Auto-increment N
const existing = fs.readdirSync(dir).map(f => {
  const m = f.match(/^screenshot-(\d+)/);
  return m ? parseInt(m[1]) : 0;
});
const n = (existing.length ? Math.max(...existing) : 0) + 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outPath = path.join(dir, filename);

const browser = await chromium.launch();
const page    = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
