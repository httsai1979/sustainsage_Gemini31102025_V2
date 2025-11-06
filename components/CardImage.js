import Image from 'next/image';
import { useState } from 'react';

function shimmer(w = 640, h = 400) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs><linearGradient id="g"><stop stop-color="#f6f7f8" offset="20%"/><stop stop-color="#edeef1" offset="50%"/><stop stop-color="#f6f7f8" offset="70%"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/>
  </svg>`;
}

const toBase64 = (s) => (typeof window === 'undefined' ? Buffer.from(s).toString('base64') : window.btoa(s));

export default function CardImage({ src, alt = 'Image', width = 800, height = 500, className = '' }) {
  const [imgSrc, setImgSrc] = useState(src || '/placeholders/card-1.svg');
  return (
    <div className={`relative overflow-hidden rounded-xl border ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setImgSrc('/placeholders/card-1.svg')}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
      />
    </div>
  );
}
