import PageSection from '@/components/ui/PageSection';
import { sectionizeSubpage } from '@/lib/sectionize';
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
    const intro = pricing.description ?? pricing.intro;
    const sections = sectionizeSubpage('pricing', {
      intro,
      plans,
      policies,
      notes,
    });

    if (sections.length === 0) {
      return (
        <PageSection>
          <p className="text-sm leading-6 text-slate-700">
            Pricing information will be published soon. Please get in touch for details.
          </p>
        </PageSection>
      );
    }

    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (section.paragraphs?.length) {
            return (
              <PageSection key={`intro-${index}`}>
                <div className="space-y-4 text-base leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </PageSection>
            );
          }

          if (section.items === plans) {
            return (
              <PageSection key={`plans-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Packages</h2>
                <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {plans.map((pkg, pkgIndex) => (
                    <li key={pkg.name ?? pkg.title ?? pkgIndex} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                      <div className="text-base font-semibold text-slate-900">{pkg.name ?? pkg.title}</div>
                      {pkg.duration ? <div className="mt-1 text-sm font-medium text-emerald-800">{pkg.duration}</div> : null}
                      {pkg.scope || pkg.description ? (
                        <p className="mt-3 text-sm leading-6 text-slate-700">{pkg.scope ?? pkg.description}</p>
                      ) : null}
                      {pkg.price_note || pkg.price ? (
                        <p className="mt-3 text-xs leading-5 text-slate-500">{pkg.price_note ?? pkg.price}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </PageSection>
            );
          }

          if (section.items === policies) {
            return (
              <PageSection key={`policies-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Policies</h2>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {policies.map((policy, policyIndex) => (
                    <li key={policy.title ?? policy.body ?? policyIndex}>
                      {policy.title ? <span className="font-semibold text-slate-900">{policy.title}: </span> : null}
                      <span>{policy.body}</span>
                    </li>
                  ))}
                </ul>
              </PageSection>
            );
          }

          if (section.items === notes) {
            return (
              <PageSection key={`notes-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Notes</h2>
                <div className="mt-3 space-y-2 text-xs font-medium text-slate-500">
                  {notes.map((note, noteIndex) => (
                    <p key={note ?? noteIndex}>{note}</p>
                  ))}
                </div>
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
