import Image from 'next/image';

export default function Hero({
  title,
  subtitle,
  eyebrow,
  children,
  image = '/hero/default.svg',
  imageAlt = 'Illustration representing the page topic',
  priority = false,
}) {
  return (
    <section className="bg-emerald-950/5 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-16">
        <div className="w-full max-w-2xl text-left">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-slate-700 sm:text-xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {children}
            </div>
          )}
        </div>

        <div className="relative w-full max-w-md lg:max-w-lg">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 shadow-sm">
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
      </div>
    </section>
  );
}
