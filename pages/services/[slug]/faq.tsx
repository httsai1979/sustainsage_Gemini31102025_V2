import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page, getStaticPaths, getStaticProps } = createServiceSubpage({
  subSlug: 'faq',
  heading: (service) => service.faq?.title ?? 'Frequently asked questions',
  intro: (service) =>
    service.faq?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.faq.description}</p>
    ) : null,
  renderContent: (service) => {
    const items = Array.isArray(service.faq?.items)
      ? service.faq?.items
          .map((item) => ({ question: item?.q ?? item?.question, answer: item?.a ?? item?.answer }))
          .filter((item) => item.question && item.answer)
      : [];

    if (items.length === 0) {
      return (
        <p className="text-sm leading-6 text-slate-700">
          We are curating questions for this service. Please reach out directly if you do not see your answer yet.
        </p>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.question} className="space-y-2 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
            <p className="text-sm leading-6 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </div>
    );
  },
});

export { getStaticPaths, getStaticProps };
export default Page;
