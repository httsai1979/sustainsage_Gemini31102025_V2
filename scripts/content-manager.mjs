import fs from 'node:fs';
import path from 'node:path';

/**
 * SustainSage Content Manager
 * 
 * Usage:
 *   node scripts/content-manager.mjs --service <slug>   # Register a new service slug in next.config.js
 *   node scripts/content-manager.mjs --check            # Scan content/ for missing translations
 */

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, 'next.config.js');
const CONTENT_DIR = path.join(ROOT, 'content');

const args = process.argv.slice(2);
const serviceArg = args.find((a, i) => a === '--service' && args[i + 1]) ? args[args.indexOf('--service') + 1] : null;
const checkArg = args.includes('--check');

async function main() {
    if (serviceArg) {
        registerService(serviceArg);
    }

    if (checkArg) {
        await runCheck();
    }

    if (!serviceArg && !checkArg) {
        console.log(`
SustainSage Content Manager
--------------------------
Usage:
  node scripts/content-manager.mjs --service <slug>    Register a new service
  node scripts/content-manager.mjs --check             Check for missing translations
    `);
    }
}

/**
 * Updates next.config.js with the new service slug if not already present.
 */
function registerService(slug) {
    const enPath = path.join(CONTENT_DIR, 'services', `${slug}.en-GB.json`);
    const twPath = path.join(CONTENT_DIR, 'services', `${slug}.zh-TW.json`);

    if (!fs.existsSync(enPath) && !fs.existsSync(twPath)) {
        console.error(`❌ Content files for service "${slug}" not found in content/services/`);
        return;
    }

    if (!fs.existsSync(CONFIG_PATH)) {
        console.error('❌ next.config.js not found');
        return;
    }

    let content = fs.readFileSync(CONFIG_PATH, 'utf8');

    // Find the serviceSlugs array definition
    const regex = /const serviceSlugs = \[(.*?)\];/s;
    const match = content.match(regex);

    if (match) {
        let slugs = match[1]
            .split(',')
            .map(s => s.trim().replace(/['"]/g, ''))
            .filter(Boolean);

        if (!slugs.includes(slug)) {
            slugs.push(slug);
            slugs.sort(); // Keep it tidy
            const newArrayStr = `const serviceSlugs = [${slugs.map(s => `'${s}'`).join(', ')}];`;
            content = content.replace(regex, newArrayStr);
            fs.writeFileSync(CONFIG_PATH, content, 'utf8');
            console.log(`✅ Registered service "${slug}" in next.config.js`);
        } else {
            console.log(`ℹ️ Service "${slug}" is already registered.`);
        }
    } else {
        console.warn('⚠️ Could not find serviceSlugs array in next.config.js. Please update manually.');
    }
}

/**
 * Scans content directory for missing keys in zh-TW files compared to en-GB.
 */
async function runCheck() {
    console.log('🔍 Scanning /content for translation gaps (en-GB vs zh-TW)...');

    const issues = [];

    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        // Group files by base name
        const grouped = {};

        for (const entry of entries) {
            if (entry.isDirectory()) {
                walk(path.join(dir, entry.name));
                continue;
            }

            if (entry.name.endsWith('.json')) {
                const parts = entry.name.split('.');
                if (parts.length >= 3) {
                    const locale = parts[parts.length - 2];
                    const base = parts.slice(0, -2).join('.');
                    if (!grouped[base]) grouped[base] = {};
                    grouped[base][locale] = path.join(dir, entry.name);
                }
            }
        }

        for (const base in grouped) {
            const locales = grouped[base];
            if (locales['en-GB']) {
                if (!locales['zh-TW']) {
                    issues.push(`[MISSING_FILE] ${base}.zh-TW.json is missing in ${dir}`);
                } else {
                    // Compare keys
                    const en = JSON.parse(fs.readFileSync(locales['en-GB'], 'utf8'));
                    const tw = JSON.parse(fs.readFileSync(locales['zh-TW'], 'utf8'));
                    compareObjects(en, tw, base, issues);
                }
            }
        }
    }

    function compareObjects(en, tw, pathStr, issues) {
        if (typeof en !== 'object' || en === null || typeof tw !== 'object' || tw === null) return;

        for (const key in en) {
            if (!(key in tw)) {
                issues.push(`[MISSING_KEY] "${key}" missing in zh-TW for ${pathStr}`);
            } else if (typeof en[key] === 'object' && en[key] !== null) {
                compareObjects(en[key], tw[key], `${pathStr}.${key}`, issues);
            }
        }
    }

    walk(CONTENT_DIR);

    if (issues.length > 0) {
        console.warn(`\n⚠️ Found ${issues.length} translation issues:\n`);
        issues.forEach(msg => console.log(`  ${msg}`));
        console.log('\nHint: Use scripts/sync-locale-placeholders.js to scaffold missing keys.');
    } else {
        console.log('✨ All content files are synchronized!');
    }
}

main().catch(console.error);
