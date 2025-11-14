import Link from 'next/link';

type ServiceSubnavTab = {
  slug: string;
  label: string;
  href?: string;
};

type Orientation = 'horizontal' | 'vertical';

type ServiceSubnavProps = {
  base: string;
  tabs: ServiceSubnavTab[];
  active?: string;
  orientation?: Orientation;
};

export default function ServiceSubnav({ base, tabs = [], active, orientation = 'horizontal' }: ServiceSubnavProps) {
  if (orientation === 'vertical') {
    return (
      <nav className="rounded-2xl border border-sustain-cardBorder bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Explore</p>
        <ul className="mt-4 flex gap-2 overflow-x-auto text-sm font-medium text-slate-500 lg:flex-col lg:gap-1">
          {tabs.map((tab) => {
            const href = tab.href ?? (tab.slug === 'overview' ? base : `${base}/${tab.slug}`);
            const isActive = active === tab.slug;
            const className = `flex w-full items-center justify-between rounded-full px-4 py-2 transition ${
              isActive ? 'bg-sustain-green/10 text-sustain-green' : 'hover:text-sustain-green'
            }`;
            const commonProps = {
              'data-active': isActive ? 'true' : undefined,
              className,
            };
            return (
              <li key={tab.slug} className="flex-1 lg:flex-initial">
                {href ? (
                  <Link href={href} {...commonProps}>
                    {tab.label}
                  </Link>
                ) : (
                  <span {...commonProps}>{tab.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="border-b border-sustain-cardBorder bg-white/95">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-start gap-4 overflow-x-auto px-4 py-3 text-sm font-medium leading-6 text-sustain-text sm:px-6 sm:text-[15px]">
        {tabs.map((tab) => {
          const href = tab.href ?? (tab.slug === 'overview' ? base : `${base}/${tab.slug}`);
          const isActive = active === tab.slug;
          const className = `inline-flex border-b-2 pb-2 transition-colors ${
            isActive
              ? 'border-sustain-green text-sustain-green'
              : 'border-transparent text-slate-500 hover:text-sustain-green'
          } whitespace-nowrap`;
          const commonProps = {
            'data-active': isActive ? 'true' : undefined,
            className,
          };
          return (
            <li key={tab.slug}>
              {href ? (
                <Link href={href} {...commonProps}>
                  {tab.label}
                </Link>
              ) : (
                <span {...commonProps}>{tab.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
