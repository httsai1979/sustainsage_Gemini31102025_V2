import Link from 'next/link';

type MicroCTALink = {
  href: string;
  label: string;
};

type MicroCTAProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  links: MicroCTALink[];
  className?: string;
};

export function MicroCTA({
  eyebrow = 'Next steps',
  title,
  description,
  links,
  className = '',
}: MicroCTAProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div
      className={`rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm ${className}`.trim()}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
        ) : null}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? <p className="text-sm leading-6 text-slate-700">{description}</p> : null}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-emerald-700 sm:flex-row sm:flex-wrap">
        {links.map(({ href, label }) => (
          <Link
            key={`${label}-${href}`}
            href={href}
            className="inline-flex items-center gap-1 rounded-xl border border-transparent px-3 py-1.5 transition hover:border-emerald-200 hover:bg-white/70 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <span>{label}</span>
            <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

