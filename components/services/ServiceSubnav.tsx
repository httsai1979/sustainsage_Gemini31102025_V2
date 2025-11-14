import Link from 'next/link';

type ServiceSubnavTab = {
  slug: string;
  label: string;
  href?: string;
};

type ServiceSubnavProps = {
  base: string;
  tabs: ServiceSubnavTab[];
  active?: string;
};

export default function ServiceSubnav({ base, tabs = [], active }: ServiceSubnavProps) {
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
