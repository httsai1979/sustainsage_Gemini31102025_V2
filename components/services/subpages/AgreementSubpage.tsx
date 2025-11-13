import { MicroCTA } from '@/components/common/MicroCTA';
import PageSection from '@/components/ui/PageSection';
import { sectionizeSubpage } from '@/lib/sectionize';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'agreement',
  heading: (service) => service.agreement?.title ?? 'Coaching agreement & boundaries',
  intro: (service) =>
    service.agreement?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.agreement.description}</p>
    ) : null,
  renderContent: (service) => {
    const agreement = service.agreement ?? {};
    const sectionsList = Array.isArray(agreement.sections)
      ? agreement.sections.filter((section) =>
          section &&
          (section.heading ||
            section.title ||
            section.label ||
            section.body ||
            (Array.isArray(section.paragraphs) && section.paragraphs.length > 0))
        )
      : [];
    const sectionsOrdered = sectionizeSubpage('agreement', { sections: sectionsList });

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/faq`, label: 'Visit service FAQs' },
      { href: '/about/ethics', label: 'Review ethics commitments' },
    ];

    if (sectionsOrdered.length === 0) {
      return (
        <div className="space-y-6">
          <PageSection>
            <p className="text-sm leading-6 text-slate-700">
              Our coaching agreement will be published soon. Contact us for the latest terms and we will send a copy.
            </p>
          </PageSection>
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
          {sectionsOrdered.map((section, index) => {
            const title = section.heading ?? section.title ?? section.label;
            const bodyText = section.body ?? section.description ?? null;
            const paragraphs = Array.isArray(section.paragraphs)
              ? section.paragraphs.filter(Boolean)
              : bodyText
              ? [bodyText]
              : [];

            return (
              <PageSection key={title ?? index}>
                {title ? <h2 className="text-xl font-semibold text-emerald-900">{title}</h2> : null}
                {paragraphs.length > 0 ? (
                  <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                    {paragraphs.map((text, paragraphIndex) => (
                      <p key={paragraphIndex}>{text}</p>
                    ))}
                  </div>
                ) : null}
              </PageSection>
            );
          })}
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
