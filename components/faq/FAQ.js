import { Reveal } from '@/components/ui/Motion';

export default function FAQ({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <section id="faq" className="py-10 border-t">
      <Reveal><h2 className="text-xl font-semibold">{title}</h2></Reveal>
      <div className="mt-6 divide-y">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">{item.q}</span>
              <span aria-hidden className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm text-neutral-700 space-y-2">
              {Array.isArray(item.a) ? item.a.map((p, idx) => <p key={idx}>{p}</p>) : item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
