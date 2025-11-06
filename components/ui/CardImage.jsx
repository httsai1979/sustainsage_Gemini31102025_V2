import Image from 'next/image';

const toBase64 = (value) => (typeof window === 'undefined' ? Buffer.from(value).toString('base64') : window.btoa(value));

const shimmer = (width, height) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ddd" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#eee" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
</svg>`;

export default function CardImage({ src, alt, width = 640, height = 400, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
      />
    </div>
  );
}
