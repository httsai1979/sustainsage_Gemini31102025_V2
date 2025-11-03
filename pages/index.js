import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {t('hero.title')}
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        {t('hero.subtitle')}
      </p>

      <nav className="mt-10 flex flex-wrap gap-4">
        <Link href="/service" className="text-blue-600 hover:underline">
          {t('links.service', 'Our Services')}
        </Link>
        <Link href="/resources" className="text-blue-600 hover:underline">
          {t('links.resources', 'Resources')}
        </Link>
        <Link href="/contact" className="text-blue-600 hover:underline">
          {t('links.contact', 'Contact')}
        </Link>
      </nav>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}
