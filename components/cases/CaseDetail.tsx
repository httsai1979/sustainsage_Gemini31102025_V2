import type { ReactNode } from 'react';
import Button from '../ui/Button';

export type CaseDetailContent = {
  title?: string;
  context?: string;          // 背景脈絡
  challenge?: string;        // 關鍵瓶頸
  action?: string;           // 策略行動
  coaching_pivot?: string;   // 教練接入與價值
  results?: string;          // 實質轉變
  outcome?: string;          // 最終產出
  tools_used?: string[];
  disclaimer?: string;
  timeframe?: string;
  micro_cta?: {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
  };
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
  outcome,
  micro_cta,
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
              <h2 className="text-xl font-semibold text-emerald-800">Situational Context (背景脈絡)</h2>
              <div className="text-base leading-7 text-slate-700">{context}</div>
            </section>
          ) : null}

          {/* Challenge Section */}
          {challenge ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Identified Bottleneck (關鍵瓶頸)</h2>
              <div className="text-base leading-7 text-slate-700">{challenge}</div>
            </section>
          ) : null}

          {/* Coaching Pivot Section */}
          {coaching_pivot ? (
            <section className="rounded-2xl bg-emerald-50/50 p-6 shadow-sm ring-1 ring-emerald-100">
              <h2 className="text-xl font-semibold text-emerald-900">Coaching Intervention & Value (教練介入與價值)</h2>
              <div className="mt-3 text-base leading-7 text-emerald-950/80 italic">
                {coaching_pivot}
              </div>
            </section>
          ) : null}

          {/* Action Section */}
          {action ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Strategic Action (策略行動)</h2>
              <div className="text-base leading-7 text-slate-700">{action}</div>
            </section>
          ) : null}

          {/* Results Section */}
          {results ? (
            <section className="space-y-3 border-t border-slate-100 pt-10">
              <h2 className="text-xl font-semibold text-emerald-800">Observed Shift (實質轉變)</h2>
              <div className="text-base leading-7 text-slate-700">{results}</div>
            </section>
          ) : null}

          {/* Outcome Section */}
          {outcome ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-emerald-800">Final Output (最終產出)</h2>
              <div className="text-base leading-7 text-slate-700">{outcome}</div>
            </section>
          ) : null}

          {/* Micro-CTA Section */}
          {micro_cta ? (
            <section className="mt-12 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{micro_cta.title ?? 'Explore your path'}</h3>
                  <p className="text-sm text-slate-300 max-w-md">
                    {micro_cta.description ?? 'Schedule a diagnostic consultation to see how these frameworks apply to your context.'}
                  </p>
                </div>
                <Button
                  href={micro_cta.href ?? '/contact'}
                  variant="primary"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/40"
                >
                  {micro_cta.buttonText ?? 'Schedule consultation'}
                </Button>
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          {timeframe ? (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Service Period</h3>
              <p className="text-sm text-slate-700">{timeframe}</p>
            </div>
          ) : null}

          {tools_used && tools_used.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Frameworks Applied</h3>
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
