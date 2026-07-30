import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const roots = ['pages', 'components', 'content', 'lib', 'public'];
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.xml', '.txt', '.md']);
const ignored = new Set(['node_modules', '.next']);
const checks = [
  ['private or fictional person', /\b(?:James Ng|Maggie Lin|Yi-Ling)\b/i],
  ['fictional role', /Partner-in-Residence/i],
  ['unapproved credential', /\b(?:ACC|PCC)\b|ICF[- ]certified|trauma-informed/],
  ['old domain', /sustainsage\.com/i],
  ['old email', /(?:hello|contact)@sustainsage\./i],
  ['unapproved public price', /(?:£\s?\d|GBP\s?\d)/i],
];

const files = [];
function walk(path) {
  for (const name of readdirSync(path)) {
    if (ignored.has(name)) continue;
    const target = join(path, name);
    const stat = statSync(target);
    if (stat.isDirectory()) walk(target);
    else if (extensions.has(extname(name).toLowerCase())) files.push(target);
  }
}
for (const directory of roots) walk(join(root, directory));

const findings = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const [label, pattern] of checks) {
    if (pattern.test(text)) findings.push(`${relative(root, file)}: ${label}`);
  }
}
if (findings.length) {
  console.error(`Content risk scan failed:\n${findings.join('\n')}`);
  process.exit(1);
}
console.log(`Content risk scan passed (${files.length} public-source files checked).`);
