import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import Card from '@/components/ui/Card';
import { H1 } from '@/components/ui/H';
import Callout from '@/components/ui/Callout';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../next-i18next.config.js';

function NotFoundPage() {
  const { t } = useTranslation('common');
  const errorCopy = t('errorPages', { returnObjects: true });

  return (
    <MainLayout>
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <H1>{errorCopy.notFoundTitle}</H1>
            <p className="text-base leading-7 text-slate-600">{errorCopy.notFoundSubtitle}</p>
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white"
            >
              {errorCopy.cta}
            </Link>
            <Callout
              title={t('errorPages.supportTitle')}
              body={t('errorPages.supportBody')}
              actions={[{ href: '/contact', label: t('errorPages.supportLink') }]}
            />
          </div>
          <Card className="flex items-center justify-center">
            <Image
              src="/images/404-illustration.svg"
              alt="Illustration for missing page"
              width={480}
              height={360}
              className="h-auto w-full max-w-md"
            />
          </Card>
        </div>
      </PageSection>
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

export default NotFoundPage;
