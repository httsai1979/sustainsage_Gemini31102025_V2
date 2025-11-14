import { MicroCTA } from '@/components/common/MicroCTA';
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

    const renderList = (title: string, items: string[]) => (
      <Card key={title} title={title}>
        <ul className="space-y-3 text-sm leading-6 text-slate-700">
          {items.map((item, index) => (
            <li key={item ?? index} className="flex gap-3">
              <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sustain-green" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    );

    return (
      <div className="space-y-6">
        {checklist.length ? renderList('Checklist before starting', checklist) : null}
        {prepare.length ? renderList('Helpful to prepare', prepare) : null}
        {signals.length ? renderList('Signals', signals) : null}
        <MicroCTA
          title="Take the next step when you are ready"
          description="Compare pricing or start a 20-minute chat to see if this service fits your moment."
          links={microLinks}
        />
      </div>
    );
  },
});

export default Page;
