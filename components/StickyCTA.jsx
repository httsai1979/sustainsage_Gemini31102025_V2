import Link from 'next/link';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center pointer-events-none z-40">
      <div className="pointer-events-auto rounded-full shadow-md px-4 py-2 bg-white border flex items-center gap-3">
        <span className="text-sm">Ready for a calm 20-minute intro chat?</span>
        <Link href="/contact" className="rounded-md bg-[#4A6C56] px-3 py-1.5 text-white text-sm">Book intro</Link>
      </div>
    </div>
  );
}
