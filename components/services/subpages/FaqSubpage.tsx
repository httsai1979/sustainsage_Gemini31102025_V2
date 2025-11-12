import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'faq',
  heading: (service) => service.faq?.title ?? 'Frequently asked questions',
  intro: (service) =>
    service.faq?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.faq.description}</p>
    ) : null,
  renderContent: (service) => {
    const items = Array.isArray(service.faq?.items)
      ? service.faq?.items.filter((item) => item && (item.q || item.question) && (item.a || item.answer))
      : [];

    if (items.length === 0) {
      return (
        <p className="text-sm leading-6 text-slate-700">
          We are gathering the most helpful questions for this service. Reach out anytime and we will respond personally.
        </p>
      );
    }

    return (
      <dl className="space-y-6">
        {items.map((item, index) => {
          const question = item.q ?? item.question;
          const answer = item.a ?? item.answer;

          return (
            <div key={question ?? index} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
              {question ? <dt className="text-base font-semibold text-slate-900">{question}</dt> : null}
              {answer ? <dd className="mt-3 text-sm leading-6 text-slate-700">{answer}</dd> : null}
            </div>
          );
        })}
      </dl>
    );
  },
});

export default Page;
