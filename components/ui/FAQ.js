export default function FAQ({ title, intro, groups = [] }) {
  return (
    <section className="bg-emerald-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          {title && <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>}
          {intro && <p className="mt-4 text-base leading-7 text-slate-600">{intro}</p>}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
              <dl className="mt-4 space-y-4">
                {group.items.map((item) => (
                  <div key={item.id} className="rounded-xl bg-emerald-50/70 p-4">
                    <dt className="text-sm font-semibold text-emerald-900">{item.question}</dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
