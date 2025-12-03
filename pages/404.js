import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import FitChecklistSection from '@/components/common/FitChecklistSection';
import PageSection from '@/components/ui/PageSection';
import Card from '@/components/ui/Card';
import { H1 } from '@/components/ui/H';
import Callout from '@/components/ui/Callout';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../next-i18next.config.js';

function NotFoundPage() {
  const { t } = useTranslation('errorPages');

  const supportLinkHref = t('supportLinkHref', '/services');
  const supportLinkLabel = t('supportLinkLabel', t('actions.exploreServices'));

  return (
    <div className="space-y-10">
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <H1>{t('title')}</H1>
            <p className="text-base leading-7 text-slate-600">{t('body')}</p>
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white"
            >
              {t('returnHome')}
            </Link>
            <Callout
              title={t('supportTitle')}
              body={t('supportBody')}
              actions={[{ href: supportLinkHref, label: supportLinkLabel }]}
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
      <FitChecklistSection />
    </div>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errorPages'], nextI18NextConfig)),
    },
  });
}

export default NotFoundPage;
