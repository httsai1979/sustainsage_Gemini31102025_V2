import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          SustainSage
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact" className="rounded-md bg-[#4A6C56] px-3 py-1 text-white">
            Book intro
          </Link>
        </nav>
      </div>
    </header>
  );
}
