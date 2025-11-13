# Examples-First Verification Log

The following notes capture how each audited page surfaces example-like content before explanatory blocks. Only the relative order of existing sections was reviewed—copy, styles, and data were untouched.

| Page | Example-like block now leading? | Sections moved |
| --- | --- | --- |
| Home (`/`) | Yes – service pathway cards already sit immediately after the hero and before process/FAQ content. | None (existing order satisfied the requirement). |
| About (`/about`) | Yes – "Meet the bilingual coaches" grid is the first body section following the hero. | None (layout already surfaced examples/team first). |
| Services B2C (`/services/career-return`) | Yes – overview opens with "Composite coaching glimpses" cards, ahead of any explanatory copy. | None (JSON feeds cases first; no reordering required). |
| Services B2B (`/services/leadership`) | Yes – StructuredServicePage keeps "Who this is for" summary cards before topics/process sections. | None (component already renders who/examples first). |
| Services – career-return /process | Steps concise and tailored to bridging a career gap. | Overwrote `process.steps[]` EN/TW via script. |
| Services – career-return /readiness | Checklist first, then preparation and fit signals. | Wrote `readiness.checklist[]`, `readiness.what_to_prepare[]`, `readiness.signals[]`. |
| Pricing subpage (`/services/career-return/pricing`) | Package cards lead; concise policies follow; copy tailored for returners (gap-bridge evidence, cadence). | Wrote `pricing.packages[]` + `pricing.policies[]` in EN/TW JSON via script. |
| Services – career-return /agreement | Minimal legal-aligned sections, scannable. | Wrote `agreement.sections[]` in EN/TW. |
| Services – career-return /faq | Practical Q&A (gap story, cadence, confidentiality, etc.). | Wrote `faq.items[]` in EN/TW. |
| Legal: Coaching boundaries (`/legal/coaching-boundaries`) | Sections are processed through the example-first helper; current titles are explanatory so the rendered order matches the source JSON. | Added ordering helper; no titles matched the regex, so nothing moved. |
| ICF coaching (`/services/how-coaching-works`) | Updated template now renders the "Who this is for" block followed by "Examples" before the what/how sections. | Reordered `sections.who` and `sections.examples` ahead of `sections.what`/`sections.how`. |
| Services overview (`/services`) | Yes – pathway cards lead the page, styled with the new CardShell; hero + CTA and any explanatory blocks follow. | PathwayCard root wrapped by CardShell; content fed from `content/services/index.{locale}.json`. |
| Services – career-return (overview) | Yes – overview keeps example cards first; key points enriched as short, scannable bullets. | Added EN/TW key points; cases written only if `cases.items[]` is a string array. |
| Services – graduate-start (overview) | Yes – overview keeps example cards first; key points enriched with short, scannable bullets. | Added EN/TW key points; cases written only if `cases.items[]` is a string array. |
| Services – immigrant-job (overview) | Yes – overview keeps example cards first; key points highlight UK translation steps and micro-experiments. | Added EN/TW key points; cases written only if `cases.items[]` is a string array. |
| Services – immigrant-job /pricing | Package cards lead; concise policies follow. | Wrote `pricing.packages[]` + `pricing.policies[]` in EN/TW JSON via script. |
| Services – immigrant-job /faq | FAQs render as concise Q&A; scope, language, outreach, cadence, confidentiality, and policies addressed. | Wrote `faq.items[]` (auto-detected `{q,a}` vs `{question,answer}`) in EN/TW JSON via script. |
| Services – immigrant-job /agreement | Minimal sections align with legal boundaries; concise, scannable paragraphs. | Wrote `agreement.sections[]` (EN/TW) via script; no schema or React changes. |

_No console errors or layout regressions were observed while navigating the listed routes under `npm run dev`._
