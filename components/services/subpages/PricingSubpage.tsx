import { createServiceSubpage } from '@/lib/serviceSubpagePage';

// 統一：h1/h2 階層 + 卡片網格 + 區塊間距
const { Page } = createServiceSubpage({
  subSlug: 'pricing',
  heading: (service) => service.pricing?.title ?? 'Pricing & packages',
  intro: (service) =>
    service.pricing?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.pricing.description}</p>
    ) : null,
  renderContent: (service) => {
    const packages = Array.isArray(service.pricing?.packages)
      ? service.pricing?.packages.filter((pkg) => pkg && pkg.name)
      : [];
    const policies = Array.isArray(service.pricing?.policies)
      ? service.pricing?.policies.filter((policy) => policy && (policy.title || policy.body))
      : [];
    const note = service.pricing?.note;

    if (packages.length === 0 && policies.length === 0 && !note) {
      return (
        <p className="text-sm leading-6 text-slate-700">
          Pricing information will be published soon. Please get in touch for details.
        </p>
      );
    }

    return (
      <div className="space-y-6">
        {packages.length > 0 ? (
          <section className="mx-auto max-w-4xl px-6 py-8 border-t first:border-t-0 border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-900">Packages</h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <li key={pkg.name} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                  <div className="text-base font-semibold text-slate-900">{pkg.name}</div>
                  {pkg.duration ? <div className="mt-1 text-sm font-medium text-emerald-800">{pkg.duration}</div> : null}
                  {pkg.scope ? <p className="mt-3 text-sm leading-6 text-slate-700">{pkg.scope}</p> : null}
                  {pkg.price_note ? (
                    <p className="mt-3 text-xs leading-5 text-slate-500">{pkg.price_note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {policies.length > 0 ? (
          <section className="mx-auto max-w-4xl px-6 py-8 border-t first:border-t-0 border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-900">Policies</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {policies.map((policy) => (
                <li key={policy.title ?? policy.body}>
                  {policy.title ? <span className="font-semibold text-slate-900">{policy.title}: </span> : null}
                  <span>{policy.body}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {note ? (
          <p className="mx-auto max-w-4xl px-6 text-xs font-medium text-slate-500">{note}</p>
        ) : null}
      </div>
    );
  },
});

export default Page;
