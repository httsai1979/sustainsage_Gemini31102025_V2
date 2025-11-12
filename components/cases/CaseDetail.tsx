import type { ReactNode } from 'react';

export type CaseDetailContent = {
  title?: string;
  context?: string;
  session_flow?: string | string[];
  tools_used?: string[];
  boundary_and_consent?: string | string[];
  timeframe?: string;
  shift?: string;
  outcome?: string;
  disclaimer?: string;
};

type CaseDetailProps = CaseDetailContent & {
  header?: ReactNode;
};

function renderLines(value?: string | string[]) {
  if (!value) {
    return null;
  }

  const lines = Array.isArray(value) ? value : [value];

  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

export function CaseDetail({
  title,
  context,
  session_flow,
  tools_used,
  boundary_and_consent,
  timeframe,
  shift,
  outcome,
  disclaimer,
  header,
}: CaseDetailProps) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        {header}
        {title ? <h1 className="text-3xl font-semibold text-slate-900">{title}</h1> : null}
        {disclaimer ? <p className="text-xs text-slate-500">{disclaimer}</p> : null}
      </header>

      {context ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Context</h2>
          <p className="text-sm leading-6 text-slate-700">{context}</p>
        </section>
      ) : null}

      {session_flow ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Session flow</h2>
          {renderLines(session_flow)}
        </section>
      ) : null}

      {tools_used && tools_used.length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Tools used</h2>
          <ul className="flex flex-wrap gap-2">
            {tools_used.map((tool) => (
              <li key={tool} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
                {tool}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {boundary_and_consent ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Boundary &amp; consent</h2>
          {renderLines(boundary_and_consent)}
        </section>
      ) : null}

      {timeframe ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Timeframe</h2>
          <p className="text-sm leading-6 text-slate-700">{timeframe}</p>
        </section>
      ) : null}

      {shift || outcome ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Shift &amp; outcome</h2>
          {shift ? <p className="text-sm leading-6 text-slate-700">{shift}</p> : null}
          {outcome && outcome !== shift ? (
            <p className="text-sm leading-6 text-slate-700">{outcome}</p>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}
