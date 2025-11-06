import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

function NotFound() {
  return (
    <>
      <Hero image="/hero/default.svg" title="That page isn't here" subtitle="Let's take you back to somewhere useful." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/" className="rounded border px-4 py-2">Go home</Link>
      </div>
    </>
  );
}

NotFound.getLayout = (page) => <MainLayout title="Page not found | SustainSage">{page}</MainLayout>;
export default NotFound;
