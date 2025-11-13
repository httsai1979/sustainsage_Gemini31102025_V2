import { MicroCTA } from '@/components/common/MicroCTA';
import SectionContainer from '@/components/sections/SectionContainer';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'readiness',
  heading: (service) => service.readiness?.title ?? 'How to know if you are ready',
  intro: (service) =>
    service.readiness?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.readiness.description}</p>
    ) : null,
  renderContent: (service) => {
    const checklist = Array.isArray(service.readiness?.checklist)
      ? service.readiness?.checklist.filter(Boolean)
      : [];
    const prepare = Array.isArray(service.readiness?.what_to_prepare)
      ? service.readiness?.what_to_prepare.filter(Boolean)
      : [];
    const basePath = `/services/${service.slug}`;
    const contactSource = encodeURIComponent(`${service.slug}-readiness`);
    const contactHref = `/contact?from=${contactSource}`;
    const microLinks = [
      { href: `${basePath}/pricing`, label: 'Review pricing' },
      { href: contactHref, label: 'Talk to a coach' },
    ];

    if (checklist.length === 0 && prepare.length === 0) {
      return (
        <div className="space-y-6">
          <p className="text-sm leading-6 text-slate-700">
            We will publish readiness guidance soon. Meanwhile, feel free to reach out for a quick check-in call.
          </p>
          <MicroCTA
            title="Take the next step when you are ready"
            description="Compare pricing or start a chemistry chat to see if this service fits your moment."
            links={microLinks}
          />
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {checklist.length > 0 ? (
            <SectionContainer title="Checklist before starting">
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                {checklist.map((item, index) => (
                  <li key={item ?? index} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionContainer>
          ) : null}

          {prepare.length > 0 ? (
            <SectionContainer title="Helpful to prepare" tone="muted">
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                {prepare.map((item, index) => (
                  <li key={item ?? index} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionContainer>
          ) : null}
        </div>

        <MicroCTA
          title="Take the next step when you are ready"
          description="Compare pricing or start a chemistry chat to see if this service fits your moment."
          links={microLinks}
        />
      </div>
    );
  },
});

export default Page;
