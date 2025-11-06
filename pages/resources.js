import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const resources = [
  { name: 'Self-talk Reframe Cards', type: 'PDF', description: 'Gentle prompts to shift harsh self-talk into useful, self-honouring language.' },
  { name: 'Behavioural Experiment Ladder', type: 'PDF', description: 'Plan small, safe tests that you design and own.' },
  { name: 'Values Map', type: 'PDF', description: 'Name what matters; co-design aligned actions.' },
  { name: 'Emotion Triangle', type: 'Slides', description: 'Notice links between feelings, thoughts and behaviours—without self-judgement.' },
  { name: 'Thought Log', type: 'Sheet', description: 'Spot patterns and choose different next steps.' },
  { name: 'Limiting Beliefs Explorer', type: 'Doc', description: 'Loosen rigid stories with compassionate curiosity.' },
];

function ResourcesPage() {
  return (
    <MainLayout title="Resources | SustainSage" desc="Self-reflection tools you can use at your pace.">
      <Hero
        image="/hero/resources.svg"
        align="left"
        title="Resources"
        subtitle="Light, reflective tools. Use what serves you; ignore what doesn’t."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((item) => (
              <article key={item.name} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Format: {item.type}</p>
                <a className="mt-4 inline-block rounded border border-emerald-400 px-3 py-1.5 text-sm" href="#">
                  Download
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default ResourcesPage;
