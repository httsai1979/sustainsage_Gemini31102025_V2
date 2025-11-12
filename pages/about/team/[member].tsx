import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { getAboutSubnav } from '@/components/about/AboutSubnav';
import { StickyCTA } from '@/components/common/StickyCTA';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

type MemberPageProps = {
  member: any;
  usedLocale: string | null;
  locale: string;
  fallbackNotice?: string | null;
};

function Header({
  member,
  showFallback,
  fallbackNotice,
}: {
  member: any;
  showFallback: boolean;
  fallbackNotice?: string | null;
}) {
  const notice = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Team profile</p>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{member?.name}</h1>
        {member?.title ? <p className="text-lg font-medium text-emerald-800">{member.title}</p> : null}
        {member?.location ? <p className="text-sm text-slate-500">{member.location}</p> : null}
        {showFallback ? <p className="text-xs font-medium text-slate-500">{notice}</p> : null}
      </div>
      {member?.cta?.href && member?.cta?.label ? (
        <Link
          href={member.cta.href}
          className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          {member.cta.label}
        </Link>
      ) : null}
    </div>
  );
}

export default function TeamMemberPage({ member, usedLocale, locale, fallbackNotice }: MemberPageProps) {
  const showFallback = Boolean(usedLocale && usedLocale !== locale);
  const bio = Array.isArray(member?.bio) ? member.bio : [];
  const focus = Array.isArray(member?.focus) ? member.focus : [];
  const credentials = Array.isArray(member?.credentials) ? member.credentials : [];

  return (
    <>
      <PageLayoutV2
        header={<Header member={member} showFallback={showFallback} fallbackNotice={fallbackNotice} />}
        subnav={getAboutSubnav('team')}
      >
        {bio.length ? (
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How {member?.name?.split?.(' ')?.[0] ?? 'they'} coaches
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
              {bio.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        {focus.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Focus areas</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {focus.map((item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {credentials.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Credentials & training</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {credentials.map((item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </PageLayoutV2>
      <StickyCTA />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { member: 'james' } },
      { params: { member: 'partner' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale = 'en-GB' }) {
  const { member: memberSlug } = params ?? {};
  const memberContent = loadContent<any>(`content/team/${memberSlug}/{locale}.json`, locale);

  if (!memberContent.data) {
    return { notFound: true };
  }

  const props = {
    member: memberContent.data,
    usedLocale: memberContent.locale,
    locale,
    fallbackNotice: memberContent.data?.fallbackNotice ?? null,
    ...(await serverSideTranslations(locale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
