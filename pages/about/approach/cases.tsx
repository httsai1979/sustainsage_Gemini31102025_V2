import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CaseCard } from '@/components/cases/CaseCard';
import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { getAboutSubnav } from '@/components/about/AboutSubnav';
import { loadContent } from '@/lib/loadContent';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../../../../next-i18next.config.js';

type CasesProps = {
  cases: any[];
  usedLocale: string | null;
  locale: string;
};

function Header({ showFallback }: { showFallback: boolean }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Case library</p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Composite scenarios from coaching engagements
      </h1>
      <p className="max-w-3xl text-base leading-7 text-slate-700">
        These anonymised cases illustrate how we hold multilingual teams, partner transitions, and ethical decision-making. Details are blended to protect confidentiality.
      </p>
      {showFallback ? <p className="text-xs font-medium text-slate-500">暫用英文內容</p> : null}
    </div>
  );
}

export default function ApproachCasesPage({ cases, usedLocale, locale }: CasesProps) {
  const showFallback = Boolean(usedLocale && usedLocale !== locale);

  return (
    <PageLayoutV2 header={<Header showFallback={showFallback} />} subnav={getAboutSubnav('cases')}>
      <div className="grid gap-6 md:grid-cols-3">
        {cases?.map((item, index) => (
          <CaseCard key={item?.title ?? index} {...item} />
        ))}
      </div>
    </PageLayoutV2>
  );
}

export async function getStaticProps({ locale = 'en-GB' }) {
  const aboutContent = loadContent('content/about/{locale}.json', locale);
  const cases = aboutContent.data?.approach?.cases ?? [];

  return toSerializable({
    props: {
      cases,
      usedLocale: aboutContent.locale,
      locale,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  });
}
