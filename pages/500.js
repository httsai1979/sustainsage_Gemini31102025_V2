import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../next-i18next.config.js';

function ServerErrorPage() {
  const { t } = useTranslation('common');
  const errorCopy = t('errorPages', { returnObjects: true });

  return (
    <MainLayout>
      <Hero image="/hero/default.svg" align="left" title={errorCopy.serverErrorTitle} subtitle={errorCopy.serverErrorSubtitle}>
        <Link
          href="/"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 focus-visible:ring-white"
        >
          {errorCopy.cta}
        </Link>
      </Hero>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  });
}

export default ServerErrorPage;
