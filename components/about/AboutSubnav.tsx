import Link from 'next/link';

type AboutSubnavProps = {
  active: string;
};

const LINKS = [
  { href: '/about/team', id: 'team', label: 'Team' },
  { href: '/about/approach', id: 'approach', label: 'Approach' },
  { href: '/about/ethics', id: 'ethics', label: 'Ethics' },
  { href: '/about/approach/cases', id: 'cases', label: 'Case library' },
];

export function AboutSubnav({ active }: AboutSubnavProps) {
  return (
    <nav className="border-t border-emerald-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 text-sm font-medium text-emerald-900">
        {LINKS.map((link) => {
          const isActive = link.id === active;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={
                'rounded-full px-4 py-2 transition ' +
                (isActive
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100')
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function getAboutSubnav(active: string) {
  return <AboutSubnav active={active} />;
}
