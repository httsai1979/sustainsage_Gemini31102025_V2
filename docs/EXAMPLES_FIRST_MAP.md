# Examples & Explain Content Map

## A. JSON / MD / MDX sources
- `content/legal/service-agreements.json` — contains nested `sections[]` arrays for the default agreement and each service variant, with `paragraphs[]` describing boundaries and logistics.
- `content/legal/coaching-boundaries/en.json` — includes top-level `sections[]` each with `paragraphs[]` and optional `items[]`, plus `scope.whatYouGet.items[]` and `scope.whatWeDontDo.items[]` bullet lists.
- `content/home/index.{en-GB|zh-CN|zh-TW}.json` — single structured file per locale containing `hero` metadata plus ordered `sections[]` blocks (personas, comparison cards, steps, topics, services, split-grid resources/blog, accordion boundaries, CTA rows, etc.).
- `content/faq/{en-GB|zh-CN|zh-TW}.json` — no `sections`; organised into `categories[]` where every category carries an `items[]` question list and an overall `cta` block.
- `content/about/{en-GB|zh-CN|zh-TW}.json` — no `sections`; key arrays include `approach.pillars[]`, `approach.cases[]`, `process.steps[]`, `whatIsCoaching.scenarios[]`, `ethics.dataPractices.items[]`, and `boundaries.items[]`.
- `content/team/{james|partner}/{en-GB|zh-CN|zh-TW}.json` — no `sections`; profile data is stored in arrays such as `bio[]`, `focus[]`, `credentials[]`, and optional CTA metadata.
- `content/services/immigrant-job.json` — no `sections`; service copy relies on structures like `key_points.items[]`, `process.steps[]`, `boundaries.items[]`, `faq.items[]`, `cases.items[]`, and CTA metadata.
- `content/services/graduate-start.json` — no `sections`; mirrors the immigrant-job structure with `key_points.items[]`, `process.steps[]`, `boundaries.items[]`, `faq.items[]`, `cases.items[]`, and CTA data.
- `content/services/career-return.json` — no `sections`; same aggregation pattern through `key_points.items[]`, `process.steps[]`, `boundaries.items[]`, `faq.items[]`, `cases.items[]`, and CTA metadata.
- `content/services/{career-return|graduate-start|immigrant-job}.{en-GB|zh-CN|zh-TW}.json` — localisation overlays that add `pricing.packages[]`, `pricing.policies[]`, `readiness.checklist[]`, `readiness.what_to_prepare[]`, `process.steps[]`, and `agreement.sections[]` alongside `faq.items[]` and `cases.items[]`.
- `content/services/subpages/pricing.json` — no top-level `sections`; stores `default.plans[]` with `highlights[]`, plus per-service `intro` text and optional `plans[]`/`notes[]` overrides.
- `content/services/subpages/readiness.json` — includes `default.sections[]` blocks containing checklist arrays and `signals[]`; per-service overrides add extra `sections[]`, `signals[]`, or `intro` text.
- `content/services/subpages/faq.json` — no `sections`; provides shared `items[]` annotated with `slugs` plus per-service `titles`/`descriptions` mappings.
- `content/services/{career-return|graduate-start|immigrant-job}/cases/*.json` — no `sections`; each case file supplies `session_flow[]`, `tools_used[]`, optional `boundary_and_consent` (string or array), `shift`, `outcome`, and `disclaimer` fields.

## B. React / TSX sources
- `pages/index.js` — pulls `content/home/index.{locale}.json`, rendering the hero plus each section type (personas, comparison, steps, topics, services preview, split resources/blog, accordion boundaries, FAQ CTA, soft CTA) with the shared card + icon primitives.
- `pages/about.js` — loads `/content/about/{locale}.json` plus team/coaching data, rendering `approach`, `whatIsCoaching.scenarios`, `key_points.items`, `process.steps`, `boundaries.items`, and FAQ accordions.
- `pages/about/approach/index.tsx` — consumes `approach.pillars` arrays for cards and surfaces fallback notices from the same JSON.
- `pages/about/approach/cases.tsx` — lists `approach.cases[]` from the about JSON within `CaseCard` components.
- `pages/about/ethics/index.tsx` — maps `ethics.principles[]` and `ethics.dataPractices.items[]` from the about JSON and links to related sections.
- `pages/faq.js` — renders `content/faq` data by iterating through `categories[]` (and their `items[]`) plus a CTA block.
- `pages/services/index.js` — combines translations with `content/services/index.{locale}.json`, showing mapped `pathways` copy and looping through service `cards`.
- `pages/services/{career-return|graduate-start|immigrant-job}/index.tsx` — wrap `ServiceOverviewPage`, which expects `service.key_points.items`, `service.cases.items`, hero CTAs, and fallback notices.
- `pages/services/{career-return|graduate-start|immigrant-job}/{pricing|process|readiness|agreement|faq|cases}.tsx` — thin exports wiring the shared subpage components to service-specific content via `createServiceSubpageStaticProps`.
- `pages/services/[slug]/cases/[caseSlug].tsx` — loads case JSON through `loadContent`, passes structured arrays (`session_flow`, `tools_used`, etc.) into `CaseDetail`, and composes sub-navigation tabs for pricing/process/faq/cases.
- `pages/services/reset-sprint.js` — translation-driven page using `sections.fit.items`, `sections.journey.steps`, `sections.outcomes.items`, `sections.boundaries.items`, and CTA copy.
- `pages/services/for-parents-returning.js` — translation-driven persona page mapping `sections.challenges.items`, `sections.support.items`, `sections.vignette`, and package paragraphs.
- `pages/contact.js` — translation-driven layout presenting `journey.items`, `what_you_get.items`, `what_we_dont_do.items`, consent copy, `miniFaq.items`, and embeds the `ContactForm`.
- `pages/legal/coaching-boundaries.js` — renders the legal JSON `sections[]` plus `scope.whatYouGet.items` / `whatWeDontDo.items` into structured sections.
- `components/Sections/ContactForm.jsx` — uses `contact.form.*` translation arrays for select options, hints, and status messages, enforcing consent toggles before POSTing.
- `components/Sections/FAQSection.jsx` & `components/Sections/HomeFaq.js` — pull `faq.items` (optionally filtered by category) via `next-i18next`, limiting and rendering FAQ cards.
- `components/faq/FAQAccordion.jsx` & `components/ui/FAQ.js` — expect FAQ `items[]`/`groups[]` to build accordions or grouped question cards.
- `components/about/WhatIsCoaching.jsx` — displays `scenarios[]` plus CTA metadata from about JSON or coaching data.
- `components/services/ICFServicePage.jsx` — translation-backed service template reading `sections.who`, `sections.what`, `sections.how`, `sections.examples`, `sections.expect`, `sections.ethics`, and `sections.cta` arrays/objects.
- `components/services/StructuredServicePage.jsx` — translation-backed template mapping `service.who.items`, `service.topics.items`, `service.howWeWork.items`, `service.boundaries.items`, `service.faq.items`, etc.
- `components/services/ServiceDetailPage.jsx` — translation-backed detail page consuming `serviceDetails` namespaces with arrays such as `who`, `topics`, `how`, `approach`, `boundaries`, `not`, `reflection`, `cases`, and modern layout blocks (`suitable`, `process`, `icf`).
- `components/services/ServiceOverviewPage.tsx` — renders hero CTAs, sub-navigation, `service.key_points.items`, and `service.cases.items` case cards for JSON-driven services.
- `components/services/subpages/{Pricing|Process|Readiness|Faq|Agreement|Cases}Subpage` — each factory component reads the relevant nested arrays (`pricing.packages`, `process.steps`, `readiness.checklist`/`sections`, `faq.items`, `agreement.sections`, `cases.items`) and renders fallback CTAs when arrays are empty.
- `components/for/ForAudiencePage.jsx` — translation-backed persona template mapping `challenges`, `topics`, `partnership.items`, `boundaries`, and optional `case` narrative.
- `components/common/{Header,Footer}.jsx` & `components/site/{SiteHeader,SiteFooter}.jsx` — navigation and footer components consuming `common.header.nav*`, `footer.*`, and handling locale toggles or coming-soon messaging.
- `components/site/SiteHeader.jsx` additionally derives locale options from config and builds nav tabs (duplicating FAQ/Services links for mobile/desktop variants).
- `pages/api/contact.js` — API route triggered by the contact form; while not React, it surfaced in the search because it references `process.env`, validating required fields and respecting consent flags before emailing via Resend.
