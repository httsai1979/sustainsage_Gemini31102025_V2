import Image from 'next/image';

export default function Hero({ title, subtitle, children, image = '/hero/default.svg', alt = 'Background', overlay = 'dark', priority = false }) {
  const overlayClass = overlay === 'dark' ? 'bg-black/40' : 'bg-white/20';
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-white">
        <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-4 max-w-3xl text-white/90">{subtitle}</p>}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
