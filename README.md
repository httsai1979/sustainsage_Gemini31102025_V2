# SustainSage Website (Next.js)

> Coaching for returners, graduates, and mid-career professionals — bilingual (EN + 繁中), ICF-aligned, examples-first content structure.

## Quick Start
```bash
npm install
npm run dev   # http://localhost:3000
```

## What this repo contains

Next.js app (pages/), shared UI (components/), content JSON (content/), i18n namespaces (public/locales/), utilities (lib/), styles (styles/).

## Content sources (single truth)

Services (+ pricing/process/readiness/faq/agreement/cases) → /content/services/**

Brand/ICF teaching pages → i18n namespaces (public/locales), but rendered with the same section components.

See [docs/README_DEV_PLAYBOOK.md](docs/README_DEV_PLAYBOOK.md) for branch/PR flow & CODEX usage.

## Dev scripts

npm run clean → remove .next/.turbo/node_modules

npm run reinstall → clean + npm ci

npm run check:md-links → validate relative links in Markdown

## Folder map

components/, content/, docs/, lib/, pages/, public/, scripts/, styles/

## License & Contact

© SustainSage Group Ltd. • contact: hc.tsai@sustainsage-group.com
