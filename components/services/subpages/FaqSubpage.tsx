import FAQAccordion from '@/components/faq/FAQAccordion';
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

    if (items.length === 0) {
      return (
        <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
          We are gathering the most helpful questions for this service. Reach out anytime and we will respond personally.
        </div>
      );
    }

    return <FAQAccordion items={items} className="mt-2" />;
  },
});

export default Page;
