import Link from 'next/link';

function ExternalLink({ href, children, download }) {
  const isExternal = /^https?:/i.test(href);
  if (isExternal || download) {
    return (
      <a
        href={href}
        download={download ? '' : undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
    >
      {children}
    </Link>
  );
}

export default function Card({ title, desc, href, cta, children }) {
  const isDownload = typeof href === 'string' && href.endsWith('.pdf');

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {desc && <p className="mt-2 text-sm text-slate-600">{desc}</p>}
        </div>
        {children}
      </div>
      {href && cta && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <ExternalLink href={href} download={isDownload}>
            {cta}
          </ExternalLink>
        </div>
      )}
    </div>
  );
}
