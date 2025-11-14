import Link from 'next/link';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
];

const SUPPORT_LINKS = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/services/how-coaching-works', label: 'Coaching approach' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-slate-100 text-slate-600">
      <div className="ss-container space-y-10 py-12">
        <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-6 shadow-md md:flex md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-lg font-semibold text-sustain-text">Need more personalised support?</p>
            <p className="text-sm text-slate-600">Book a calm conversation to see whether coaching with SustainSage is the right pace for you.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <Link href="/contact" className="ss-btn-primary">
              Book a chat
            </Link>
            <Link href="/services" className="ss-btn-secondary">
              Explore services
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))]">
          <div className="space-y-4">
            <div>
              <p className="text-base font-semibold text-sustain-text">SustainSage Group Ltd.</p>
              <p className="text-sm text-slate-600">Bilingual coaching for transitions, based in Portsmouth / Southsea, UK.</p>
            </div>
            <div className="space-y-2 text-sm">
              <a href="mailto:contact@sustainsage.com" className="font-semibold text-sustain-green transition hover:text-sustain-greenDark">
                contact@sustainsage.com
              </a>
              <p>+44 (0)20 8638 7870</p>
              <p>Portsmouth · Southsea · Online</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Quick links</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sustain-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Support</p>
            <ul className="mt-4 space-y-2 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sustain-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {year} SustainSage Group Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
