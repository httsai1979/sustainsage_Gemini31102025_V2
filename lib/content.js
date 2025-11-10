import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const localeMap = {
  en: 'en',
  'en-GB': 'en-GB',
  'en-US': 'en',
  zh: 'zh-CN',
  'zh-CN': 'zh-CN',
  'zh-SG': 'zh-CN',
  'zh-Hans': 'zh-CN',
  'zh-TW': 'zh-TW',
  'zh-Hant': 'zh-TW',
  tc: 'zh-TW',
  sc: 'zh-CN',
};

const norm = (loc = 'en') => {
  if (!loc) return 'en';
  if (localeMap[loc]) return localeMap[loc];
  const base = loc.split('-')[0];
  return localeMap[base] ?? 'en';
};

export function getPostSlugs(locale = 'en') {
  const dir = path.join(BLOG_DIR, norm(locale));
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPosts(locale = 'en') {
  const set = new Set([...getPostSlugs('en'), ...getPostSlugs(locale)]);
  return [...set]
    .map((slug) => {
      const { frontmatter } = getPostRaw(locale, slug);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPostRaw(locale, slug) {
  const tryPath = (loc) => path.join(BLOG_DIR, norm(loc), `${slug}.md`);
  let p = tryPath(locale);
  if (!fs.existsSync(p)) p = tryPath('en');
  const raw = fs.readFileSync(p, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data, markdown: content };
}

export async function getPostRendered(locale, slug) {
  const { frontmatter, markdown } = getPostRaw(locale, slug);
  const result = await remark().use(gfm).use(html).process(markdown);
  return { frontmatter, html: result.toString() };
}

export function loadJSON(base, locale = 'en') {
  const baseDir = path.join(process.cwd(), 'content', base);
  const normalized = norm(locale);
  const candidates = [normalized, locale, 'en-GB', 'en'].filter(Boolean);

  const tried = new Set();
  for (const candidate of candidates) {
    if (tried.has(candidate)) continue;
    tried.add(candidate);

    const filePath = path.join(baseDir, `${candidate}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  }

  return [];
}
