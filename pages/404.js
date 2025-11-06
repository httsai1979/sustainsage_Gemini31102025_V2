import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout title="Page not found | SustainSage" desc="The page could not be found.">
      <Hero image="/hero/default.svg" title="That page is not here" subtitle="Let us take you back to somewhere useful." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/" className="rounded border px-4 py-2">
          Go home
        </Link>
      </div>
    </MainLayout>
  );
}
