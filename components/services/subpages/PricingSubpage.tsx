import Card from '@/components/ui/Card';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'pricing',
  heading: (service) => service.pricing?.title ?? 'Pricing & packages',
  intro: (service) =>
    service.pricing?.description ? (
      <p className="text-base leading-7 text-slate-700">{service.pricing.description}</p>
    ) : null,
  renderContent: (service) => {
    const pricing = service.pricing ?? {};
    const plans = Array.isArray(pricing.packages)
      ? pricing.packages.filter((pkg) => pkg && (pkg.name || pkg.title))
      : Array.isArray(pricing.plans)
      ? pricing.plans.filter((pkg) => pkg && (pkg.name || pkg.title))
      : [];
    const policies = Array.isArray(pricing.policies)
      ? pricing.policies.filter((policy) => policy && (policy.title || policy.body))
      : [];
    const notes = Array.isArray(pricing.notes)
      ? pricing.notes.filter(Boolean)
      : pricing.note
      ? [pricing.note]
      : [];

    if (plans.length === 0 && policies.length === 0 && notes.length === 0) {
      return (
        <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
          Pricing information will be published soon. Please get in touch for details.
        </div>
      );
    }

    return (
      <div className="space-y-10">
        {plans.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-sustain-text">Packages</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {plans.map((pkg, pkgIndex) => (
                <Card
                  key={pkg.name ?? pkg.title ?? pkgIndex}
                  title={pkg.name ?? pkg.title}
                  subtitle={pkg.duration}
                >
                  {pkg.scope || pkg.description ? <p>{pkg.scope ?? pkg.description}</p> : null}
                  {pkg.price_note || pkg.price ? (
                    <p className="mt-4 text-xs font-semibold text-sustain-green">{pkg.price_note ?? pkg.price}</p>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {policies.length > 0 ? (
          <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sustain-text">Policies</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {policies.map((policy, policyIndex) => (
                <li key={policy.title ?? policy.body ?? policyIndex} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sustain-green" />
                  <span>
                    {policy.title ? <strong className="text-sustain-text">{policy.title}: </strong> : null}
                    {policy.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {notes.length > 0 ? (
          <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sustain-text">Notes</h3>
            <ul className="mt-3 space-y-2 text-xs font-medium text-slate-500">
              {notes.map((note, noteIndex) => (
                <li key={note ?? noteIndex}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  },
});

export default Page;
