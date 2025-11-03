import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ResourcesPage() {
  const { t } = useTranslation('common');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <Head>
        <title>{t('resources.heroTitle', 'Resources')}</title>
        <meta
          name="description"
          content={t(
            'resources.heroSubtitle',
            'Explore guides, worksheets, and curated links to support your journey.'
          )}
        />
      </Head>
      <h1 className="text-3xl font-semibold text-gray-900">
        {t('resources.heroTitle', 'Resources')}
      </h1>
      <p className="mt-4 text-gray-700">
        {t(
          'resources.placeholderBody',
          'We are preparing helpful materials for you. Please check back soon for worksheets, readings, and audio lessons.'
        )}
      </p>
      <p className="mt-6 text-sm text-gray-500">
        <Link href="/" className="underline">
          {t('resources.backToHome', '← Back to Home')}
        </Link>
      </p>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
}
