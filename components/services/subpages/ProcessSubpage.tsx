import { MicroCTA } from '@/components/common/MicroCTA';
import PageSection from '@/components/ui/PageSection';
import { sectionizeSubpage } from '@/lib/sectionize';
import { createServiceSubpage } from '@/lib/serviceSubpagePage';

const { Page } = createServiceSubpage({
  subSlug: 'process',
  heading: (service) => service.process?.title ?? 'Process & pacing',
  intro: (service) =>
    service.process?.description ? (
      <p className="text-base leading-7 text-slate-600">{service.process.description}</p>
    ) : null,
  renderContent: (service) => {
    const process = service.process ?? {};
    const steps = Array.isArray(process.steps)
      ? process.steps.filter((step) => Boolean(step))
      : [];
    const note = process.note;
    const sections = sectionizeSubpage('process', process);

    const basePath = `/services/${service.slug}`;
    const microLinks = [
      { href: `${basePath}/cases`, label: 'Browse service cases' },
      { href: `${basePath}/agreement`, label: 'Review the agreement' },
    ];

    if (sections.length === 0 && !note) {
      return (
        <div className="space-y-6">
          <PageSection>
            <p className="text-sm leading-6 text-slate-700">
              We will publish a detailed process shortly. Contact us to explore what the container can look like for you.
            </p>
          </PageSection>
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
        {sections.map((section, index) => {
          if (section.items === steps && steps.length > 0) {
            return (
              <PageSection key={`process-${index}`}>
                <h2 className="text-xl font-semibold text-emerald-900">Process</h2>
                <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-800">
                  {steps.map((step, stepIndex) => {
                    const title = typeof step === 'string' ? null : step?.title;
                    const description = typeof step === 'string' ? step : step?.description;
                    return (
                      <li key={title ?? description ?? stepIndex}>
                        <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                          {title ? <h3 className="text-base font-semibold text-slate-900">{title}</h3> : null}
                          {description ? (
                            <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
                {note ? <p className="mt-4 text-xs font-medium text-slate-500">{note}</p> : null}
              </PageSection>
            );
          }

          return null;
        })}

        {note && steps.length === 0 ? (
              <PageSection>
            <p className="text-xs font-medium text-slate-500">{note}</p>
          </PageSection>
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
