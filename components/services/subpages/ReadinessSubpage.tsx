import { MicroCTA } from '@/components/common/MicroCTA';
import cn from '@/lib/cn';
import Card from '@/components/ui/Card';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';
import { dedupeBy } from '@/lib/dedupe';

const { Page } = createServiceSubpage({
  subSlug: 'readiness',
  heading: (service) => service.readiness?.title ?? 'How to know if you are ready',
  intro: (service) =>
    service.readiness?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.readiness.description}</p>
    ) : null,
  renderContent: (service) => {
    const readiness = service.readiness ?? {};
    const checklist = dedupeBy(
      Array.isArray(readiness.checklist) ? readiness.checklist.filter(Boolean) : [],
      (item, index) => item ?? index
    );
    const prepare = dedupeBy(
      Array.isArray(readiness.what_to_prepare) ? readiness.what_to_prepare.filter(Boolean) : [],
      (item, index) => item ?? index
    );
    const signals = dedupeBy(
      Array.isArray(readiness.signals) ? readiness.signals.filter(Boolean) : [],
      (item, index) => item ?? index
    );
    const basePath = `/services/${service.slug}`;
    const contactSource = encodeURIComponent(`${service.slug}-readiness`);
    const contactHref = `/contact?from=${contactSource}`;
    const microLinks = [
      { href: `${basePath}/pricing`, label: 'Review pricing' },
      { href: contactHref, label: 'Book a 20-minute chat' },
    ];

    if (checklist.length === 0 && prepare.length === 0 && signals.length === 0) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
            We will publish readiness guidance soon. Meanwhile, feel free to reach out for a quick 20-minute chat.
          </div>
          <MicroCTA
            title="Take the next step when you are ready"
            description="Compare pricing or start a 20-minute chat to see if this service fits your moment."
            links={microLinks}
          />
        </div>
      );
    }

    const renderDiagnosticCard = (title: string, items: string[], type: 'checklist' | 'prepare' | 'signals') => {
      const colors = {
        checklist: 'border-emerald-100 bg-emerald-50/30 text-emerald-900',
        prepare: 'border-blue-100 bg-blue-50/30 text-blue-900',
        signals: 'border-amber-100 bg-amber-50/30 text-amber-900'
      };

      const labels = {
        checklist: 'Foundational Alignment',
        prepare: 'Strategic Preparation',
        signals: 'Intervention Indicators'
      };

      return (
        <div key={title} className={cn("rounded-3xl border p-8 shadow-sm transition-all hover:shadow-md", colors[type])}>
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">{labels[type]}</span>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((item, index) => (
                <li key={item ?? index} className="flex gap-4 rounded-2xl bg-white/60 p-4 ring-1 ring-black/[0.03]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-8">
        {checklist.length ? renderDiagnosticCard('Is this the right moment?', checklist, 'checklist') : null}
        {prepare.length ? renderDiagnosticCard('Items for our initial explore', prepare, 'prepare') : null}
        {signals.length ? renderDiagnosticCard('Signals indicating high value', signals, 'signals') : null}

        <div className="pt-4">
          <MicroCTA
            title="Calibrate your readiness"
            description="If you identify with 2 or more points above, a diagnostic consultation may be the most efficient next step."
            links={microLinks}
          />
        </div>
      </div>
    );
  },
});

export default Page;
