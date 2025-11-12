import { MicroCTA } from '@/components/common/MicroCTA';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const EXAMPLE_RE =
  /(範例|案例|情境|使用情境|先看例子|適合誰|誰適合|example|use case|scenario|scenarios|who (it'?s )?for|before\/after)/i;

const isExampleLike = (section: unknown): boolean => {
  if (!section || typeof section !== 'object') {
    return false;
  }

  const record = section as Record<string, unknown>;
  const title = record.title ?? record.heading ?? record.label ?? '';
  const lead = record.lead ?? record.summary ?? '';

  return EXAMPLE_RE.test(String(title)) || EXAMPLE_RE.test(String(lead));
};

const orderSections = <T,>(items: T[]): T[] => {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  const exampleSections = items.filter((item) => isExampleLike(item));
  const remainingSections = items.filter((item) => !isExampleLike(item));

  return [...exampleSections, ...remainingSections];
};

const { Page } = createServiceSubpage({
  subSlug: 'agreement',
  heading: (service) => service.agreement?.title ?? 'Coaching agreement & boundaries',
  intro: (service) =>
    service.agreement?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.agreement.description}</p>
    ) : null,
  renderContent: (service) => {
    const sections = orderSections(
      Array.isArray(service.agreement?.sections)
        ? service.agreement.sections.filter((section) => section && (section.heading || section.body))
        : []
    );

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/faq`, label: 'Visit service FAQs' },
      { href: '/about/ethics', label: 'Review ethics commitments' },
    ];

    if (sections.length === 0) {
      return (
        <div className="space-y-6">
          <p className="text-sm leading-6 text-slate-700">
            Our coaching agreement will be published soon. Contact us for the latest terms and we will send a copy.
          </p>
          <MicroCTA
            title="Need more detail on scope and boundaries?"
            description="Check related FAQs or revisit our ethics commitments while we finalise this agreement."
            links={microLinks}
          />
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <article
              key={section.heading ?? index}
              className="space-y-3 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm"
            >
              {section.heading ? <h3 className="text-base font-semibold text-slate-900">{section.heading}</h3> : null}
              {section.body ? <p className="text-sm leading-6 text-slate-700">{section.body}</p> : null}
            </article>
          ))}
        </div>

        <MicroCTA
          title="Need more detail on scope and boundaries?"
          description="Check related FAQs or revisit our ethics commitments while we finalise this agreement."
          links={microLinks}
        />
      </div>
    );
  },
});

export default Page;
