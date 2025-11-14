import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../next-i18next.config.js';

function ServerErrorPage() {
  const { t } = useTranslation('errorPages');

  return (
    <Hero image="/hero/default.svg" align="left" title={t('serverErrorTitle')} subtitle={t('serverErrorBody')}>
      <Link
        href="/"
        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 focus-visible:ring-white"
      >
        {t('returnHome')}
      </Link>
    </Hero>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errorPages'], nextI18NextConfig)),
    },
  });
}

export default ServerErrorPage;
