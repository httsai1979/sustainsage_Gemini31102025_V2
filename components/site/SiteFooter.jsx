import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSiteContent, legalNavigation, primaryNavigation, siteFacts } from '@/content/siteStrategy';

export default function SiteFooter() {
  const router = useRouter();
  const content = getSiteContent(router.locale);
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-emerald-50/10 bg-[#10291f] text-emerald-50/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="text-xl font-semibold text-white">SustainSage</p>
          <p className="mt-4 max-w-md text-sm leading-6">{content.positioning}</p>
          <a className="mt-5 inline-block text-sm font-semibold text-[#e7d5b9] hover:text-white" href={`mailto:${siteFacts.email}`}>{siteFacts.email}</a>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <p className="mb-4 font-semibold tracking-[.12em] text-white">PAGES</p>
          <ul className="grid gap-3">
            {primaryNavigation.map((link) => <li key={link.href}><Link className="hover:text-white" href={link.href}>{content.nav[link.key]}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Legal" className="text-sm">
          <p className="mb-4 font-semibold tracking-[.12em] text-white">LEGAL</p>
          <ul className="grid gap-3">
            {legalNavigation.map((link) => <li key={link.href}><Link className="hover:text-white" href={link.href}>{link.key}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div className="border-t border-emerald-50/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs leading-5 sm:px-8 lg:flex-row lg:justify-between">
          <p>© {year} {siteFacts.legalName} · Company No. {siteFacts.companyNumber} · {siteFacts.jurisdiction}</p>
          <p>Registered office: {siteFacts.registeredOffice}</p>
        </div>
      </div>
    </footer>
  );
}
