import Link from 'next/link';

type CaseCardProps = {
  title?: string;
  context?: string;
  coaching_moves?: string;
  shift?: string;
  tools_used?: string[];
  disclaimer?: string;
  href?: string;
};

export function CaseCard({ title, context, coaching_moves, shift, tools_used, disclaimer, href }: CaseCardProps) {
  const card = (
    <article className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-sustain-green/60">
      {title ? <h3 className="text-lg font-semibold text-sustain-text">{title}</h3> : null}
      {context ? (
        <p className="mt-2 text-sm text-slate-700">
          <b>Context:</b> {context}
        </p>
      ) : null}
      {coaching_moves ? (
        <p className="mt-2 text-sm text-slate-700">
          <b>In session:</b> {coaching_moves}
        </p>
      ) : null}
      {shift ? (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Key Shift</p>
          <p className="mt-1 text-sm text-emerald-950/80 leading-relaxed">{shift}</p>
        </div>
      ) : null}
      {Array.isArray(tools_used) && tools_used.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tools_used.slice(0, 3).map(tool => (
            <span key={tool} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {tool}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
        <span className="text-xs font-bold text-emerald-600">View Diagnostic Case</span>
        <svg className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block h-full focus:outline-none focus-visible:ring focus-visible:ring-sustain-green/60"
      >
        {card}
      </Link>
    );
  }

  return card;
}
