import { MicroCTA } from '@/components/common/MicroCTA';
import SectionContainer from '@/components/sections/SectionContainer';
import { orderSections } from '@/lib/content/normalize';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

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
        ? service.agreement.sections.filter((section) =>
            section &&
            (section.heading ||
              section.title ||
              section.label ||
              section.body ||
              (Array.isArray(section.paragraphs) && section.paragraphs.length > 0))
          )
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
          {sections.map((section, index) => {
            const title = section.heading ?? section.title ?? section.label;
            const bodyText = section.body ?? section.description ?? null;
            const paragraphs = Array.isArray(section.paragraphs)
              ? section.paragraphs.filter(Boolean)
              : bodyText
              ? [bodyText]
              : [];

            return (
              <SectionContainer key={title ?? index} variant="surface" title={title}>
                {paragraphs.length > 0 ? (
                  <div className="space-y-3 text-sm leading-6 text-slate-700">
                    {paragraphs.map((text, paragraphIndex) => (
                      <p key={paragraphIndex}>{text}</p>
                    ))}
                  </div>
                ) : null}
              </SectionContainer>
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
