import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">
        <Link href="/" className="font-semibold">SustainSage</Link>
        <div className="ml-auto flex gap-4 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
