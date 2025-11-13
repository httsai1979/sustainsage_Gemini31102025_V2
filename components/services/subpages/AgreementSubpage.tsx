import { MicroCTA } from '@/components/common/MicroCTA';
import SectionContainer from '@/components/sections/SectionContainer';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

// 加入 Examples-first 的保底排序（多為說明性章節，順序不變，但防未來新增）
const EXAMPLE_RE =
  /(範例|案例|情境|使用情境|先看例子|適合誰|誰適合|example|examples|use case|scenario|scenarios|who (it'?s )?for|before\/after)/i;
const isExample = (s: any) =>
  s && (EXAMPLE_RE.test(String(s.title ?? '')) || EXAMPLE_RE.test(String(s.lead ?? '')));
const orderSections = (xs: any[]) =>
  Array.isArray(xs) ? [...xs.filter(isExample), ...xs.filter((x) => !isExample(x))] : [];

const { Page } = createServiceSubpage({
  subSlug: 'agreement',
  heading: (service) => service.agreement?.title ?? 'Coaching agreement & boundaries',
  intro: (service) =>
    service.agreement?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.agreement.description}</p>
    ) : null,
  renderContent: (service) => {
    const sectionsList = Array.isArray(service.agreement?.sections)
      ? service.agreement.sections.filter((section) =>
          section &&
          (section.heading ||
            section.title ||
            section.label ||
            section.body ||
            (Array.isArray(section.paragraphs) && section.paragraphs.length > 0))
        )
      : [];
    const sectionsOrdered = orderSections(sectionsList ?? []);

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/faq`, label: 'Visit service FAQs' },
      { href: '/about/ethics', label: 'Review ethics commitments' },
    ];

    if (sectionsOrdered.length === 0) {
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
          {sectionsOrdered.map((section, index) => {
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
