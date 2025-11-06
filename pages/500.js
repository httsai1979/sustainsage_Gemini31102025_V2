import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import Link from 'next/link';

export default function ServerError() {
  return (
    <MainLayout title="Something went wrong | SustainSage" desc="Unexpected error.">
      <Hero image="/hero/default.svg" title="Something went wrong" subtitle="Please try again shortly." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/" className="rounded border px-4 py-2">
          Go home
        </Link>
      </div>
    </MainLayout>
  );
}
