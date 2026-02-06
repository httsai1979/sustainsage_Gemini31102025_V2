import type { ReactNode } from 'react';

export type CaseDetailContent = {
  title?: string;
  context?: string;          // 背景
  challenge?: string;        // 挑戰
  action?: string;           // 行動
  coaching_pivot?: string;   // 教練介入點
  results?: string;          // 成果
  tools_used?: string[];
  disclaimer?: string;
  timeframe?: string;
};

type CaseDetailProps = CaseDetailContent & {
  header?: ReactNode;
};

export function CaseDetail({
  title,
  context,
  challenge,
  action,
  coaching_pivot,
  results,
  tools_used,
  disclaimer,
  timeframe,
  header,
}: CaseDetailProps) {
  return (
    <article className="space-y-12">
      <header className="space-y-4">
        {header}
        {title ? (
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
        ) : null}
        {disclaimer ? (
          <p className="text-xs italic text-slate-500">{disclaimer}</p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          {/* Context Section */}
          {context ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Background / Context</h2>
              <div className="text-base leading-7 text-slate-700">{context}</div>
            </section>
          ) : null}

          {/* Challenge Section */}
          {challenge ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">The Challenge</h2>
              <div className="text-base leading-7 text-slate-700">{challenge}</div>
            </section>
          ) : null}

          {/* Action Section */}
          {action ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Action Taken</h2>
              <div className="text-base leading-7 text-slate-700">{action}</div>
            </section>
          ) : null}

          {/* Coaching Pivot Section */}
          {coaching_pivot ? (
            <section className="rounded-2xl bg-emerald-50/50 p-6 shadow-sm ring-1 ring-emerald-100">
              <h2 className="text-xl font-semibold text-emerald-900">Coaching Pivot</h2>
              <div className="mt-3 text-base leading-7 text-emerald-950/80 italic">
                {coaching_pivot}
              </div>
            </section>
          ) : null}

          {/* Results Section */}
          {results ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Results & Shift</h2>
              <div className="text-base leading-7 text-slate-700">{results}</div>
            </section>
          ) : null}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          {timeframe ? (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Duration</h3>
              <p className="text-sm text-slate-700">{timeframe}</p>
            </div>
          ) : null}

          {tools_used && tools_used.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Frameworks used</h3>
              <ul className="flex flex-col gap-2">
                {tools_used.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
