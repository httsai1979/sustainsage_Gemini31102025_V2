import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page, getStaticPaths, getStaticProps } = createServiceSubpage({
  subSlug: 'cases',
  heading: (service) => service.cases?.title ?? 'Composite coaching glimpses',
  intro: (service) =>
    service.cases?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.cases.description}</p>
    ) : null,
  renderContent: (service) => {
    const cases = Array.isArray(service.cases?.items)
      ? service.cases?.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
      : [];

    if (cases.length === 0) {
      return (
        <p className="text-sm leading-6 text-slate-700">
          We are writing anonymised cases for this service. Contact us if you would like to hear relevant examples live.
        </p>
      );
    }

    const disclaimers = Array.from(
      new Set(cases.map((item) => item.disclaimer).filter((value): value is string => Boolean(value)))
    );

    return (
      <div className="space-y-6">
        <p className="text-sm leading-6 text-slate-700">
          These composites blend details from multiple clients to keep identities protected while showing the texture of our work.
        </p>

        {disclaimers.length > 0 ? (
          <div className="space-y-3 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 text-sm leading-6 text-slate-700">
            <h3 className="text-base font-semibold text-slate-900">Confidentiality reminders</h3>
            <ul className="space-y-2">
              {disclaimers.map((text) => (
                <li key={text} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  },
});

export { getStaticPaths, getStaticProps };
export default Page;
