// Simple offline MD relative-link checker (no deps)
import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const ROOT = process.cwd();
const MD_DIRS = ['.', 'docs']; // scan root and docs

const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', '.turbo']);
const mdFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (name.toLowerCase().endsWith('.md')) mdFiles.push(p);
  }
}
MD_DIRS.forEach((d) => walk(join(ROOT, d)));

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
let bad = 0;

for (const file of mdFiles) {
  const base = dirname(file);
  const text = readFileSync(file, 'utf8');
  const links = [...text.matchAll(LINK_RE)].map((m) => m[2]).filter(Boolean);

  for (const href of links) {
    // skip http(s) / anchors / mailto
    if (/^https?:\/\//i.test(href) || href.startsWith('#') || href.startsWith('mailto:')) continue;

    // normalize local path (strip query/hash)
    const clean = href.split('#')[0].split('?')[0];
    const target = join(base, clean);
    if (!existsSync(target)) {
      console.log(`❌ ${file} → broken relative link: ${href}`);
      bad++;
    }
  }
}

if (bad) {
  console.error(`\nBroken links: ${bad}`);
  process.exit(1);
} else {
  console.log('✅ All relative links OK.');
}
