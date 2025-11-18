import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

export default function Accordion({ items = [] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState(null);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash && ids.includes(hash)) {
      setOpenId(hash);
    }
  }, [ids]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ids.includes(hash)) {
        setOpenId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [ids]);

  const toggle = (id) => {
    setOpenId((current) => {
      const next = current === id ? null : id;
      const base = router.asPath.split('#')[0];
      if (typeof window !== 'undefined') {
        const url = next ? `${base}#${id}` : base;
        window.history.replaceState(null, '', url);
      }
      return next;
    });
  };

  if (!items.length) return null;

  return (
    <div className="divide-y divide-sustain-cardBorder rounded-2xl border border-sustain-cardBorder bg-sustain-cardBg">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} id={item.id} className="p-5">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
            >
              <span className="text-base font-semibold text-sustain-textMain">{item.q}</span>
              <span className="ml-4 text-sustain-primary">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div id={`${item.id}-panel`} className="mt-3 text-sm leading-6 text-sustain-textMuted">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
