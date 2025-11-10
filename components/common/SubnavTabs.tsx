import Link from 'next/link';

export function SubnavTabs({ base, tabs, active }) {
  return (
    <nav className="border-b bg-white">
      <ul className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto">
        {tabs.map((t) => (
          <li key={t.slug}>
            <Link
              href={
                t.href ?? (t.slug === 'overview' ? base : `${base}/${t.slug}`)
              }
              className={`block py-3 ${
                active === t.slug ? 'border-b-2 border-emerald-600 font-medium' : ''
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
