import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';

const sections = [
  {
    title: 'Coaching vs therapy',
    items: [
      {
        question: 'Is coaching right for me or do I need therapy?',
        answer: (
          <>
            Coaching explores goals, systems and experiments. If you are processing trauma, acute mental health needs or require
            diagnosis, a licensed therapist is the right partner. We can pause and refer you to clinical support at any point.
          </>
        ),
        links: [
          { href: '/services/how-coaching-works', label: 'How coaching works' },
          { href: '/contact', label: 'Ask about scope' },
        ],
      },
      {
        question: "What if I don’t have a clear goal yet?",
        answer: (
          <>
            That’s common. We begin with what feels most alive and co-create a working focus in session. ICF ethics require us to
            keep you in charge of the agenda, so we check clarity and consent regularly.
          </>
        ),
        links: [
          { href: '/services/transition', label: 'See the Transition package' },
          { href: '/contact', label: 'Book an intro chat' },
        ],
      },
      {
        question: 'Can we talk about visas, immigration or legal concerns?',
        answer: (
          <>
            We can explore the leadership and emotional impact of those processes, and map questions for your legal advisors. I
            do not provide legal or immigration advice and will flag when a specialist is needed.
          </>
        ),
        links: [
          { href: '/services/for-newcomers-to-uk', label: 'Support for newcomers to the UK' },
          { href: '/contact', label: 'Share your context' },
        ],
      },
    ],
  },
  {
    title: 'Practical & logistics',
    items: [
      {
        question: 'How do payments and cancellations work?',
        answer: (
          <>
            Packages are invoiced upfront or in two parts and payable by bank transfer. You can reschedule with 24 hours’ notice;
            late cancellations count as a session so we protect time for all clients.
          </>
        ),
        links: [
          { href: '/services/reset', label: 'Reset package details' },
          { href: '/contact', label: 'Discuss payment options' },
        ],
      },
      {
        question: 'Where and how do sessions happen?',
        answer: (
          <>
            Sessions run on Zoom unless you request an accessible alternative. I send a shared notes doc so you can track actions
            and agreements without juggling extra tools.
          </>
        ),
        links: [
          { href: '/services/how-coaching-works', label: 'Session flow overview' },
        ],
      },
      {
        question: 'Do you work with employers or sponsors?',
        answer: (
          <>
            Yes. We align expectations in a three-way agreement that keeps coaching goals client-led. Sponsors receive high-level
            progress updates only with your consent and no session detail is shared.
          </>
        ),
        links: [
          { href: '/services/deepening', label: 'Deepening for leaders' },
          { href: '/contact', label: 'Request a sponsor brief' },
        ],
      },
    ],
  },
  {
    title: 'Ethics & privacy',
    items: [
      {
        question: 'How confidential is it?',
        answer: (
          <>
            I follow the ICF Code of Ethics and UK data law. Sessions stay confidential except where there’s risk of harm or legal
            duty to disclose. We review how your information is stored before we begin.
          </>
        ),
        links: [
          { href: '/about/approach', label: 'Read about our approach' },
        ],
      },
      {
        question: 'How do you create safety across cultures and languages?',
        answer: (
          <>
            We set shared agreements on pace, language switching and boundaries. You choose the terms for feedback and challenge,
            and I signal limits when something sits outside coaching scope.
          </>
        ),
        links: [
          { href: '/services/how-coaching-works', label: 'Safety agreements' },
          { href: '/contact', label: 'Talk about access needs' },
        ],
      },
      {
        question: 'Do you keep notes on our sessions?',
        answer: (
          <>
            I keep minimal, encrypted notes focused on goals and actions. You can review or ask me to delete them at any time,
            except where legal record keeping is required.
          </>
        ),
        links: [
          { href: '/contact', label: 'Request a copy of notes' },
        ],
      },
    ],
  },
  {
    title: 'Fit & results',
    items: [
      {
        question: "What if I feel this isn’t working for me?",
        answer: (
          <>
            Please say so. We will debrief what you need, adjust structure or refer you elsewhere. Ending coaching is always your
            choice and we close with clear next steps.
          </>
        ),
        links: [
          { href: '/contact', label: 'Share feedback anytime' },
        ],
      },
      {
        question: 'How soon will I see change?',
        answer: (
          <>
            Most clients notice clarity after two to three sessions as experiments build. Coaching supports your practice between
            sessions, so results rely on the actions you choose to take.
          </>
        ),
        links: [
          { href: '/services/experiments', label: 'Experiments coaching' },
        ],
      },
      {
        question: 'Can I combine coaching with other support?',
        answer: (
          <>
            Absolutely. Many clients pair coaching with therapy, supervision or peer circles. We keep coordination transparent and
            adapt homework so it complements your other care.
          </>
        ),
        links: [
          { href: '/services/check-in', label: 'Light-touch check-ins' },
          { href: '/contact', label: 'Plan your support mix' },
        ],
      },
    ],
  },
];

function Section({ title, items }) {
  return (
    <section className="border-b border-emerald-100 py-12 last:border-b-0">
      <div className="mx-auto max-w-4xl px-5 md:px-0">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-emerald-100 bg-white/95 p-5 text-slate-700 transition hover:border-emerald-200"
            >
              <summary className="cursor-pointer text-lg font-semibold text-slate-900 marker:content-none">
                <span className="inline-flex items-center justify-between gap-4">
                  {item.question}
                </span>
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-6">
                <p>{item.answer}</p>
                {item.links?.length ? (
                  <ul className="flex flex-wrap gap-3 text-sm font-semibold text-emerald-700">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="inline-flex items-center gap-1 hover:underline">
                          {link.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <MainLayout
      title="FAQ | SustainSage"
      desc="Clear answers about coaching scope, logistics, ethics and fit with SustainSage."
    >
      <div className="bg-emerald-950/5 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Frequently asked questions</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Honest answers to help you decide if coaching fits.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Each response follows ICF coaching ethics: clear scope, consent-based work and respect for your pace. If you need more
            context, explore our approach or reach out directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/services/how-coaching-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              How coaching works
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/about/approach"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Our approach
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Contact us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl">
          {sections.map((section) => (
            <Section key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      </div>

      <div className="bg-emerald-950/5 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Still unsure?</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Share your context and we’ll confirm whether coaching, a referral or another resource will serve you best. Your
            clarity matters more than filling a slot.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              Book a call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              Explore coaching packages
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
