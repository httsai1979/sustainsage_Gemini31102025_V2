import { CaseCard } from '@/components/cases/CaseCard';
import { MicroCTA } from '@/components/common/MicroCTA';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'cases',
  heading: (service) => service.cases?.title ?? 'Composite coaching glimpses',
  intro: (service) =>
    service.cases?.description ? (
      <p className="text-base leading-7 text-slate-700">{service.cases.description}</p>
    ) : null,
  renderContent: (service) => {
    const casesBlock = service.cases ?? {};
    const cases = Array.isArray(casesBlock.items)
      ? casesBlock.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
      : [];

    const basePath = `/services/${service.slug}`;
    const contactSource = encodeURIComponent(`${service.slug}-cases`);
    const contactHref = `/contact?from=${contactSource}`;
    const microLinks = [
      { href: `${basePath}/readiness`, label: 'Check readiness guidance' },
      { href: contactHref, label: 'Request a tailored example' },
    ];

    if (cases.length === 0) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
            We are writing anonymised cases for this service. Contact us if you would like to hear relevant examples live.
          </div>
          <MicroCTA
            title="Continue exploring this service"
            description="Visit the readiness guide or connect with us so we can share the closest-fit examples."
            links={microLinks}
          />
        </div>
      );
    }

    const disclaimers = Array.from(
      new Set(cases.map((item) => item.disclaimer).filter((value): value is string => Boolean(value)))
    );

    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cases.map((item) => (
            <CaseCard
              key={item.title ?? item.context ?? item.shift}
              title={item.title}
              context={item.context}
              coaching_moves={item.coaching_moves}
              shift={item.shift}
              tools_used={item.tools_used}
              disclaimer={item.disclaimer}
            />
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
          <p className="text-sm leading-6 text-slate-700">
            These composites blend details from multiple clients to keep identities protected while showing the texture of our work.
          </p>
          {disclaimers.length > 0 ? (
            <ul className="space-y-2 text-sm leading-6 text-slate-700">
              {disclaimers.map((text) => (
                <li key={text} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sustain-green" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <MicroCTA
          title="Continue exploring this service"
          description="Visit the readiness guide or connect with us so we can share the closest-fit examples."
          links={microLinks}
        />
      </div>
    );
  },
});

export default Page;
