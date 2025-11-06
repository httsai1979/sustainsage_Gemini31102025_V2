import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-neutral-700 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SustainSage</p>
        <nav className="flex gap-4">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
