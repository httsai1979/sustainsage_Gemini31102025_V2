import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function ServerErrorPage() {
  return (
    <MainLayout title="Something went wrong | SustainSage" desc="Unexpected error.">
      <Hero image="/hero/default.svg" align="left" title="Something went wrong" subtitle="Please try again shortly.">
        <Link href="/" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
          Go home
        </Link>
      </Hero>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default ServerErrorPage;
