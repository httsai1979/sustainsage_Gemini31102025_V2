import Image from 'next/image';

export default function Hero({
  title,
  subtitle,
  eyebrow,
  note,
  children,
  image = '/hero/default.svg',
  imageAlt = 'Illustration representing the page topic',
  priority = false,
  stats = [],
}) {
  const statList = Array.isArray(stats) ? stats.filter(Boolean) : [];

  return (
    <section className="bg-paper">
      <div className="ssg-container grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="space-y-6">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">{eyebrow}</p>
          ) : null}
          {title ? (
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{title}</h1>
          ) : null}
          {subtitle ? <p className="text-lg leading-8 text-ink/80">{subtitle}</p> : null}
          {children ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>
          ) : null}
          {note ? <p className="text-sm leading-6 text-ink/60">{note}</p> : null}

          {statList.length ? (
            <dl className="grid gap-6 sm:grid-cols-2">
              {statList.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-soft">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="relative">
          <div className="ssg-card bg-gradient-to-br from-primary/5 via-paper to-paper shadow-floating">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-contain p-6 sm:p-10"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-6 -top-6 hidden h-20 w-20 rounded-full bg-primary/10 blur-3xl md:block" />
        </div>
      </div>
    </section>
  );
}
