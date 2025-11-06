import Image from 'next/image';

export default function CardImage({ className = '', width = 640, height = 360, alt = 'Illustration' }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border bg-white ${className}`}>
      <Image
        src="/hero/default.svg"
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
        priority={false}
      />
    </div>
  );
}
