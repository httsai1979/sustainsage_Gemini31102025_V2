import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowUpRight, Compass, EnvelopeSimple } from '@phosphor-icons/react';
import { getSiteContent, legalNavigation, primaryNavigation, siteFacts } from '@/content/siteStrategy';

export default function SiteFooter() {
  const router = useRouter();
  const content = getSiteContent(router.locale);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#10251d] text-[#cbd8d1]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.35fr_.65fr_.65fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-[.9rem] bg-[#e7eee9] text-[#173d2f]"><Compass className="h-6 w-6" /></span>
            <p className="text-xl font-bold tracking-[-.025em]">SustainSage</p>
          </div>
          <p className="mt-5 max-w-md text-pretty text-sm leading-7">{content.positioning}</p>
          <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f0aa65] hover:text-white" href={`mailto:${siteFacts.email}`}>
            <EnvelopeSimple className="h-5 w-5" />
            {siteFacts.email}
          </a>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <p className="mb-5 font-bold tracking-[.12em] text-white">PAGES</p>
          <ul className="grid gap-3">
            {primaryNavigation.map((link) => <li key={link.href}><Link className="inline-flex items-center gap-1 hover:text-white" href={link.href}>{content.nav[link.key]}<ArrowUpRight className="h-3.5 w-3.5" /></Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Legal" className="text-sm">
          <p className="mb-5 font-bold tracking-[.12em] text-white">LEGAL</p>
          <ul className="grid gap-3">
            {legalNavigation.map((link) => <li key={link.href}><Link className="hover:text-white" href={link.href}>{link.key}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-2 px-5 py-6 text-xs leading-5 sm:px-8 lg:grid-cols-2 lg:justify-between">
          <p>© {year} {siteFacts.legalName}. Company No. {siteFacts.companyNumber}. {siteFacts.jurisdiction}.</p>
          <p className="lg:text-right">Registered office: {siteFacts.registeredOffice}</p>
        </div>
      </div>
    </footer>
  );
}
