import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page, getStaticPaths, getStaticProps } = createServiceSubpage({
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

    if (steps.length === 0 && !note) {
      return (
        <p className="text-sm leading-6 text-slate-700">
          We will publish a detailed process shortly. Contact us to explore what the container can look like for you.
        </p>
      );
    }

    return (
      <div className="space-y-10">
        {steps.length > 0 ? (
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={step.title ?? index} className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                  {step.title ? <h3 className="text-base font-semibold text-slate-900">{step.title}</h3> : null}
                  {step.description ? (
                    <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {note ? <p className="text-xs font-medium text-slate-500">{note}</p> : null}
      </div>
    );
  },
});

export { getStaticPaths, getStaticProps };
export default Page;
