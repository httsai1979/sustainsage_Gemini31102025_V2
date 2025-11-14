import { MicroCTA } from '@/components/common/MicroCTA';
import StepList from '@/components/ui/StepList';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'process',
  heading: (service) => service.process?.title ?? 'Process & pacing',
  intro: (service) =>
    service.process?.description ? (
      <p className="text-base leading-7 text-slate-700">{service.process.description}</p>
    ) : null,
  renderContent: (service) => {
    const process = service.process ?? {};
    const steps = Array.isArray(process.steps)
      ? process.steps
          .filter(Boolean)
          .map((step, stepIndex) => ({
            title: typeof step === 'string' ? null : step?.title,
            description: typeof step === 'string' ? step : step?.description,
            stepNumber: stepIndex + 1,
          }))
      : [];
    const note = process.note;

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/cases`, label: 'Browse service cases' },
      { href: `${basePath}/agreement`, label: 'Review the agreement' },
    ];

    if (steps.length === 0 && !note) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
            We will publish a detailed process shortly. Contact us to explore what the container can look like for you.
          </div>
          <MicroCTA
            title="See how the process translates into practice"
            description="Review anonymised cases or revisit the coaching agreement to understand how we steward each stage."
            links={microLinks}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {steps.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sustain-text">Our process together</h3>
            <StepList steps={steps} />
          </div>
        ) : null}
        {note ? <p className="text-xs font-medium text-slate-500">{note}</p> : null}
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
