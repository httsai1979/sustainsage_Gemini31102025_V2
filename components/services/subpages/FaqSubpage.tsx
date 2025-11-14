import PageSection from '@/components/ui/PageSection';
import { sectionizeSubpage } from '@/lib/sectionize';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'faq',
  heading: (service) => service.faq?.title ?? 'Frequently asked questions',
  intro: (service) =>
    service.faq?.description ? (
      <p className="text-base leading-7 text-slate-700">{service.faq.description}</p>
    ) : null,
  renderContent: (service) => {
    const faq = service.faq ?? {};
    const items = Array.isArray(faq.items)
      ? faq.items.filter((item) => item && (item.q || item.question) && (item.a || item.answer))
      : [];
    const sections = sectionizeSubpage('faq', faq);

    if (sections.length === 0) {
      return (
        <PageSection>
          <p className="text-sm leading-6 text-slate-700">
            We are gathering the most helpful questions for this service. Reach out anytime and we will respond personally.
          </p>
        </PageSection>
      );
    }

    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (section.items === items && items.length > 0) {
            return (
              <PageSection key={`faq-${index}`}>
                <h2 className="text-xl font-semibold text-sustain-text">{service.faq?.title ?? 'Frequently asked questions'}</h2>
                {service.faq?.description ? (
                  <p className="mt-2 text-base leading-7 text-slate-700">{service.faq.description}</p>
                ) : null}
                <dl className="mt-6 space-y-6">
                  {items.map((item, itemIndex) => {
                    const question = item.q ?? item.question;
                    const answer = item.a ?? item.answer;

                    return (
                      <div
                        key={question ?? itemIndex}
                        className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card"
                      >
                        {question ? <dt className="text-base font-semibold text-sustain-text">{question}</dt> : null}
                        {answer ? <dd className="mt-3 text-sm leading-6 text-slate-700">{answer}</dd> : null}
                      </div>
                    );
                  })}
                </dl>
              </PageSection>
            );
          }

          return null;
        })}
      </div>
    );
  },
});

export default Page;
