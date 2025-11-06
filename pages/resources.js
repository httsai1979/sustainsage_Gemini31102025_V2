import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import CardImage from '@/components/ui/CardImage.jsx';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

const ITEMS = [
  {
    name: 'Self-talk Reframe Cards',
    type: 'PDF',
    desc: 'Gentle prompts to shift harsh self-talk into useful language.',
    img: '/hero/default.svg',
  },
  {
    name: 'Behavioural Experiment Ladder',
    type: 'PDF',
    desc: 'Plan small, safe tests that you design and own.',
    img: '/hero/default.svg',
  },
  {
    name: 'Values Map',
    type: 'PDF',
    desc: 'Name what matters; co-design aligned actions.',
    img: '/hero/default.svg',
  },
  {
    name: 'Emotion Triangle',
    type: 'Slides',
    desc: 'Notice links between feelings, thoughts and behaviours.',
    img: '/hero/default.svg',
  },
  {
    name: 'Thought Log',
    type: 'Sheet',
    desc: 'Spot patterns and choose different next steps.',
    img: '/hero/default.svg',
  },
  {
    name: 'Limiting Beliefs Explorer',
    type: 'Doc',
    desc: 'Loosen rigid stories with compassionate curiosity.',
    img: '/hero/default.svg',
  },
];

export default function Resources() {
  return (
    <MainLayout title="Resources | SustainSage" desc="Self-reflection tools you can use at your pace.">
      <Hero
        image="/hero/resources.svg"
        title="Resources"
        subtitle="Light, reflective tools. Use what serves you; ignore what does not."
      />
      <section className="py-4">
        <div className="grid gap-6 md:grid-cols-3">
          {ITEMS.map(({ name, type, desc, img }) => (
            <article key={name} className="rounded-2xl border p-4">
              <CardImage src={img} alt={name} />
              <h3 className="mt-4 font-medium">{name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{desc}</p>
              <p className="mt-2 text-xs text-neutral-500">Format: {type}</p>
              <a className="mt-4 inline-block rounded border px-3 py-1.5" href="#">
                Download
              </a>
            </article>
          ))}
        </div>
      </section>
      <ICFNotice />
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
