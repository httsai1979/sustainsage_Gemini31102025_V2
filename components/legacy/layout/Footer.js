const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200/80 bg-paper">
      <div className="ssg-container grid gap-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div>
            <p className="text-base font-semibold text-ink">SustainSage Group Ltd.</p>
            <p className="text-sm text-ink/70">
              A small, independent coaching practice based in the UK.
            </p>
          </div>
          <div className="space-y-2 text-sm text-ink/80">
            <a href="mailto:hc.tsai@sustainsage-group.com" className="transition hover:text-primary">
              hc.tsai@sustainsage-group.com
            </a>
            <p>Based in Portsmouth / Southsea, UK</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-ink/70 md:text-right">
          <nav className="flex flex-wrap justify-start gap-3 md:justify-end">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-primary">
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-xs">© {year} SustainSage Group Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
