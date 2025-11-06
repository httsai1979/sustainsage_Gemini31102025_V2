import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

const items = [
  ['Self-talk Reframe Cards', 'PDF', 'Gentle prompts to shift harsh self-talk into useful, self-honouring language.'],
  ['Behavioural Experiment Ladder', 'PDF', 'Plan small, safe tests that you design and own.'],
  ['Values Map', 'PDF', 'Name what matters; co-design aligned actions.'],
  ['Emotion Triangle', 'Slides', 'Notice links between feelings, thoughts, and behaviours.'],
  ['Thought Log', 'Sheet', 'Spot patterns and choose different next steps.'],
  ['Limiting Beliefs Explorer', 'Doc', 'Loosen rigid stories with compassionate curiosity.']
];

function ResourcesPage() {
  return (
    <>
      <Hero image="/hero/default.svg" title="Resources" subtitle="Light, reflective tools. Use what serves you; ignore what does not." />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(([name, type, desc]) => (
            <div key={name} className="rounded-2xl border bg-white p-6">
              <h3 className="font-medium">{name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{desc}</p>
              <p className="mt-2 text-xs text-neutral-500">Format: {type}</p>
              <a className="mt-4 inline-block rounded border px-3 py-1.5">Download</a>
            </div>
          ))}
        </div>
      </section>
      <ICFNotice />
    </>
  );
}

ResourcesPage.getLayout = (page) => <MainLayout title="Resources | SustainSage">{page}</MainLayout>;
export default ResourcesPage;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
