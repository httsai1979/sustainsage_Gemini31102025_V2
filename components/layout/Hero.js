import Image from 'next/image';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

export default function Hero({
  title,
  subtitle,
  eyebrow,
  children,
  align = 'left',
  image = '/hero/default.svg',
  imageAlt = 'Abstract gradient background',
  overlay = 'dark',
  priority = false,
}) {
  const isLeft = align === 'left';
  const overlayClass =
    overlay === 'light' ? 'bg-white/35' : 'bg-slate-950/55';

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={classNames('absolute inset-0', overlayClass)} />
      </div>
      <div
        className={classNames(
          'mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16 md:py-24 text-white',
          isLeft ? 'items-start text-left' : 'items-center text-center'
        )}
      >
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-white/70">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
        )}
        {subtitle && (
          <p className="max-w-3xl text-base text-white/90">{subtitle}</p>
        )}
        {children && (
          <div
            className={classNames(
              'mt-4 flex flex-wrap gap-3',
              isLeft ? 'justify-start' : 'justify-center'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
