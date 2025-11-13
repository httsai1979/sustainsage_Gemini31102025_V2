import { MicroCTA } from '@/components/common/MicroCTA';
import PageSection from '@/components/ui/PageSection';
import { sectionizeSubpage } from '@/lib/sectionize';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'readiness',
  heading: (service) => service.readiness?.title ?? 'How to know if you are ready',
  intro: (service) =>
    service.readiness?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.readiness.description}</p>
    ) : null,
  renderContent: (service) => {
    const readiness = service.readiness ?? {};
    const checklist = Array.isArray(readiness.checklist) ? readiness.checklist.filter(Boolean) : [];
    const prepare = Array.isArray(readiness.what_to_prepare)
      ? readiness.what_to_prepare.filter(Boolean)
      : [];
    const signals = Array.isArray(readiness.signals) ? readiness.signals.filter(Boolean) : [];
    const sections = sectionizeSubpage('readiness', readiness);
    const basePath = `/services/${service.slug}`;
    const contactSource = encodeURIComponent(`${service.slug}-readiness`);
    const contactHref = `/contact?from=${contactSource}`;
    const microLinks = [
      { href: `${basePath}/pricing`, label: 'Review pricing' },
      { href: contactHref, label: 'Talk to a coach' },
    ];

    if (sections.length === 0) {
      return (
        <div className="space-y-6">
          <PageSection>
            <p className="text-sm leading-6 text-slate-700">
              We will publish readiness guidance soon. Meanwhile, feel free to reach out for a quick check-in call.
            </p>
          </PageSection>
          <MicroCTA
            title="Take the next step when you are ready"
            description="Compare pricing or start a chemistry chat to see if this service fits your moment."
            links={microLinks}
          />
        </div>
      );
    }

    const renderList = (items: string[]) => (
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={item ?? index} className="flex gap-3">
            <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );

    return (
      <div className="space-y-10">
        {sections.map((section, index) => {
          if (section.items === checklist) {
            return (
              <PageSection key={`checklist-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Checklist before starting</h2>
                {renderList(checklist)}
              </PageSection>
            );
          }

          if (section.items === prepare) {
            return (
              <PageSection key={`prepare-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Helpful to prepare</h2>
                {renderList(prepare)}
              </PageSection>
            );
          }

          if (section.items === signals) {
            return (
              <PageSection key={`signals-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Signals</h2>
                {renderList(signals)}
              </PageSection>
            );
          }

          return null;
        })}

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
