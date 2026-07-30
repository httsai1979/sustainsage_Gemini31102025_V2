import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { redirectMap } = require('../lib/redirectMap.js');
const { i18n } = require('../next-i18next.config.js');

const expectedLocales = ['en-GB', 'zh-TW'];
if (JSON.stringify(i18n.locales) !== JSON.stringify(expectedLocales)) throw new Error(`Locales must be ${expectedLocales.join(', ')}`);
const sources = redirectMap.map((item) => item.source);
if (new Set(sources).size !== sources.length) throw new Error('Redirect sources must be unique.');
if (redirectMap.some((item) => !item.permanent || !item.destination.startsWith('/'))) throw new Error('Every redirect must be permanent and internal.');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
if (/sustainsage\.com|zh-CN|en-US|ja-JP|fr-FR|es-ES/.test(sitemap)) throw new Error('Sitemap contains an old domain or unsupported locale.');
if (!sitemap.includes('https://sustainsage-group.com/coaching')) throw new Error('Sitemap is missing the coaching page.');
console.log(`Site structure passed (${redirectMap.length} redirects, ${i18n.locales.length} locales).`);
