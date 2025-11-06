import Image from 'next/image';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

export default function Hero({
  title,
  subtitle,
  eyebrow,
  children,
  align = 'center',
  image = '/hero/default.svg',
  imageAlt = 'Abstract gradient background',
  overlay = 'dark',
  priority = false,
}) {
  const isLeftAligned = align === 'left';
  const alignmentClasses = isLeftAligned ? 'items-start text-left' : 'items-center text-center';
  const actionsAlignment = isLeftAligned ? 'justify-start' : 'justify-center';
  const overlayClass = overlay === 'light' ? 'bg-white/35' : 'bg-slate-950/55';

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
        <div className={classNames('absolute inset-0', overlayClass)} aria-hidden="true" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <div className={classNames('flex max-w-3xl flex-col gap-5 text-white', alignmentClasses)}>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg leading-8 text-emerald-50/90 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className={classNames('mt-8 flex flex-wrap gap-3', actionsAlignment)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
