import Image from 'next/image';
import Link from 'next/link';

export default function ServiceCard({
  title,
  description,
  bullets = [],
  href,
  cta,
  imageSrc,
  imageAlt,
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-sustain-cardBorder bg-sustain-cardBg p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-4">
        {imageSrc && (
          <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-sustain-primary/10">
            <Image src={imageSrc} alt={imageAlt ?? ''} fill sizes="(min-width: 1024px) 260px, 100vw" className="object-contain p-4" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-sustain-textMain">{title}</h3>
          {description && <p className="mt-2 text-sm leading-6 text-sustain-textMuted">{description}</p>}
        </div>
        {bullets.length > 0 && (
          <ul className="space-y-2 text-sm leading-6 text-sustain-textMuted">
            {bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sustain-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {href && (
        <div className="mt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-sustain-primary transition hover:text-sustain-linkHover"
          >
            <span>{cta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
