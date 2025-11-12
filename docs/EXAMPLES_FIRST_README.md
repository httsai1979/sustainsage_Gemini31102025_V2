# Examples-First Verification Log

The following notes capture how each audited page surfaces example-like content before explanatory blocks. Only the relative order of existing sections was reviewed—copy, styles, and data were untouched.

| Page | Example-like block now leading? | Sections moved |
| --- | --- | --- |
| Home (`/`) | Yes – service pathway cards already sit immediately after the hero and before process/FAQ content. | None (existing order satisfied the requirement). |
| About (`/about`) | Yes – "Meet the bilingual coaches" grid is the first body section following the hero. | None (layout already surfaced examples/team first). |
| Services B2C (`/services/career-return`) | Yes – overview opens with "Composite coaching glimpses" cards, ahead of any explanatory copy. | None (JSON feeds cases first; no reordering required). |
| Services B2B (`/services/leadership`) | Yes – StructuredServicePage keeps "Who this is for" summary cards before topics/process sections. | None (component already renders who/examples first). |
| Process subpage (`/services/career-return/process`) | Main content remains the process step list; example cases stay in the fixed footer section below. | None (no example-like section within the mapped steps to promote). |
| Readiness subpage (`/services/career-return/readiness`) | Checklist and preparation blocks appear before the standard case previews that follow every subpage. | None (no candidate sections matched the example regex). |
| Pricing subpage (`/services/career-return/pricing`) | Package cards precede the default case previews appended by the shared layout. | None (pricing data contains no example-labelled blocks). |
| Agreement subpage (`/services/career-return/agreement`) | Agreement sections pass through the new regex ordering, but current headings are explanatory so their order is unchanged; case previews remain beneath. | Added ordering guard, yet no headings matched the example pattern so displayed order is unchanged. |
| FAQ subpage (`/services/career-return/faq`) | FAQs display first, with case previews underneath via the shared layout. | None (no example-like section within the FAQ list). |
| Legal: Coaching boundaries (`/legal/coaching-boundaries`) | Sections are processed through the example-first helper; current titles are explanatory so the rendered order matches the source JSON. | Added ordering helper; no titles matched the regex, so nothing moved. |
| ICF coaching (`/services/how-coaching-works`) | Updated template now renders the "Who this is for" block followed by "Examples" before the what/how sections. | Reordered `sections.who` and `sections.examples` ahead of `sections.what`/`sections.how`. |
| Services overview (`/services`) | Yes – pathway cards lead the page, styled with the new CardShell; hero + CTA and any explanatory blocks follow. | PathwayCard root wrapped by CardShell; content fed from `content/services/index.{locale}.json`. |
| Services – career-return (overview) | Yes – overview keeps example cards first; key points enriched as short, scannable bullets. | Added EN/TW key points; cases written only if `cases.items[]` is a string array. |

_No console errors or layout regressions were observed while navigating the listed routes under `npm run dev`._
