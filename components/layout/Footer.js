import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-600 flex items-center justify-between">
        <p>© {year} SustainSage Group Ltd.</p>
        <nav className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
