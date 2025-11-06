import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

function ServerError() {
  return (
    <>
      <Hero image="/hero/default.svg" title="Something went wrong" subtitle="Please try again shortly." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/" className="rounded border px-4 py-2">Go home</Link>
      </div>
    </>
  );
}

ServerError.getLayout = (page) => <MainLayout title="Something went wrong | SustainSage">{page}</MainLayout>;
export default ServerError;
