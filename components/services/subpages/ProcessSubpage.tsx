import { MicroCTA } from '@/components/common/MicroCTA';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'process',
  heading: (service) => service.process?.title ?? 'Process & pacing',
  intro: (service) =>
    service.process?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.process.description}</p>
    ) : null,
  renderContent: (service) => {
    const steps = Array.isArray(service.process?.steps)
      ? service.process?.steps.filter((step) => step && (step.title || step.description))
      : [];
    const note = service.process?.note;

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/cases`, label: 'Browse service cases' },
      { href: `${basePath}/agreement`, label: 'Review the agreement' },
    ];

    if (steps.length === 0 && !note) {
      return (
        <div className="space-y-6">
          <p className="text-sm leading-6 text-slate-700">
            We will publish a detailed process shortly. Contact us to explore what the container can look like for you.
          </p>
          <MicroCTA
            title="See how the process translates into practice"
            description="Review anonymised cases or revisit the coaching agreement to understand how we steward each stage."
            links={microLinks}
          />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {steps.length > 0 ? (
          <section className="mx-auto max-w-4xl px-6 py-8 border-t first:border-t-0 border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-900">Process</h2>
            <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-800">
              {steps.map((step, index) => (
                <li key={step.title ?? index}>
                  <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                    {step.title ? <h3 className="text-base font-semibold text-slate-900">{step.title}</h3> : null}
                    {step.description ? (
                      <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {note ? (
          <p className="mx-auto max-w-4xl px-6 text-xs font-medium text-slate-500">{note}</p>
        ) : null}

        <MicroCTA
          title="See how the process translates into practice"
          description="Review anonymised cases or revisit the coaching agreement to understand how we steward each stage."
          links={microLinks}
        />
      </div>
    );
  },
});

export default Page;
