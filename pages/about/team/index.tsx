import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TeamGrid from '@/components/about/TeamGrid';
import WhatIsCoaching from '@/components/about/WhatIsCoaching';
import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { getAboutSubnav } from '@/components/about/AboutSubnav';
import { StickyCTA } from '@/components/common/StickyCTA';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

type TeamPageProps = {
  team: any;
  teamLocale: string | null;
  whatIsCoaching: any;
  aboutLocale: string | null;
  locale: string;
  teamFallbackNotice?: string | null;
  aboutFallbackNotice?: string | null;
};

function Header({
  team,
  showTeamFallback,
  fallbackNotice,
}: {
  team: any;
  showTeamFallback: boolean;
  fallbackNotice?: string | null;
}) {
  const notice = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  return (
    <div className="space-y-4">
      {team?.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{team.eyebrow}</p>
      ) : null}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {team?.title ?? 'Meet the coaches'}
        </h1>
        {team?.description ? (
          <p className="max-w-2xl text-base leading-7 text-slate-700">{team.description}</p>
        ) : null}
        {showTeamFallback ? <p className="text-xs font-medium text-slate-500">{notice}</p> : null}
      </div>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Link
          href="/about/team/james"
          className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          Meet James
        </Link>
        <Link
          href="/about/team/partner"
          className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          Meet our Partner-in-Residence
        </Link>
      </div>
    </div>
  );
}

export default function AboutTeamPage({
  team,
  teamLocale,
  whatIsCoaching,
  aboutLocale,
  locale,
  teamFallbackNotice,
  aboutFallbackNotice,
}: TeamPageProps) {
  const trimmedTeam = team
    ? {
        ...team,
        members: Array.isArray(team.members) ? team.members.slice(0, 2) : [],
      }
    : null;
  const showTeamFallback = Boolean(teamLocale && teamLocale !== locale);
  const showAboutFallback = Boolean(aboutLocale && aboutLocale !== locale);
  const aboutNotice = aboutFallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <PageLayoutV2
        header={<Header team={team} showTeamFallback={showTeamFallback} fallbackNotice={teamFallbackNotice} />}
        subnav={getAboutSubnav('team')}
      >
        {trimmedTeam ? <TeamGrid data={trimmedTeam} /> : null}
        {whatIsCoaching ? (
          <div className="mt-12">
            {showAboutFallback ? (
              <p className="mb-3 text-xs font-medium text-slate-500">{aboutNotice}</p>
            ) : null}
            <WhatIsCoaching data={whatIsCoaching} />
          </div>
        ) : null}
      </PageLayoutV2>
      <StickyCTA />
    </>
  );
}

export async function getStaticProps({ locale = 'en-GB' }) {
  const teamContent = loadContent<any>('content/team/{locale}.json', locale);
  const aboutContent = loadContent<any>('content/about/{locale}.json', locale);

  const props = {
    team: teamContent.data,
    teamLocale: teamContent.locale,
    whatIsCoaching: aboutContent.data?.whatIsCoaching ?? null,
    aboutLocale: aboutContent.locale,
    locale,
    teamFallbackNotice: teamContent.data?.fallbackNotice ?? null,
    aboutFallbackNotice: aboutContent.data?.fallbackNotice ?? null,
    ...(await serverSideTranslations(locale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
