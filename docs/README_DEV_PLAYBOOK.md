# Dev Playbook (for humans & CODEX)

## Branch & PR
1. Create feature branch: `feat/*` or `fix/*`
2. Commit small, PR often. Title with page + purpose.
3. CODEX: paste "file add/patch" blocks; ensure relative links.

## Content Rules
- Services family → `/content/services/**`
- Teaching/legal pages → i18n namespaces but **use shared section components**
- **Examples-first**: scenario/“who this is for”/cases appear before explanations. Achieved via render adapter (no copy move).

## Common Tasks
- Clean cache (Windows/OneDrive safe): `npm run reinstall`
- Check Markdown links (relative): `npm run check:md-links`

## Review Checklist
- Headings H1→H2→H3 consistent
- Cards/Steps/FAQ/CTA use shared components
- No over-promising; ICF-aligned tone
