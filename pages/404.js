import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function NotFoundPage() {
  const { t } = useTranslation('common');
  const errorCopy = t('errorPages', { returnObjects: true });

  return (
    <Hero
      image="/hero/default.svg"
      align="left"
      title={errorCopy.notFoundTitle}
      subtitle={errorCopy.notFoundSubtitle}
    >
      <Link
        href="/"
        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 focus-visible:ring-white"
      >
        {errorCopy.cta}
      </Link>
    </Hero>
  );
}

NotFoundPage.getLayout = function getLayout(page) {
  const i18n = page.props?._nextI18Next;
  const locale = i18n?.initialLocale;
  const desc =
    (locale && i18n?.initialI18nStore?.[locale]?.common?.errorPages?.notFoundSubtitle) ||
    'The page you were looking for could not be found.';

  return (
    <MainLayout title="Page not found | SustainSage" desc={desc}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default NotFoundPage;
