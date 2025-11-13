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
    <nav className="border-b border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-5xl items-center gap-4 overflow-x-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-[15px] leading-6 font-medium">
        {tabs.map((tab) => {
          const href = tab.href ?? (tab.slug === 'overview' ? base : `${base}/${tab.slug}`);
          const isActive = active === tab.slug;
          const className = `inline-flex border-b-2 pb-2 ${
            isActive
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-600 transition-colors hover:text-emerald-700'
          }`;
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
