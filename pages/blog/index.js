import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function BlogIndex() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold text-gray-800">No posts yet</h1>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
