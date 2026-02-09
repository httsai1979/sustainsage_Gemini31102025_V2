import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { BehaviourExperimentLadder } from '@/components/tools/BehaviourExperimentLadder';
import PageSection from '@/components/ui/PageSection';
import SectionContainer from '@/components/ui/SectionContainer';
import { useRouter } from 'next/router';

const TOOL_MAP: Record<string, React.ComponentType> = {
  'behaviour-ladder': BehaviourExperimentLadder,
  'behaviour-experiment-ladder': BehaviourExperimentLadder,
};

export default function ToolPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');

  const ToolComponent = TOOL_MAP[slug as string];

  if (!ToolComponent) {
    return (
      <PageSection>
        <SectionContainer>
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold">Tool Not Found</h1>
            <p className="mt-4 text-slate-500 text-base">We are currently migrating this tool to the new React framework.</p>
          </div>
        </SectionContainer>
      </PageSection>
    );
  }

  return (
    <PageSection className="bg-slate-50 min-h-screen pt-32 pb-20">
      <SectionContainer>
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {slug?.toString().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            A diagnostic tool designed to help you untangle professional narratives and build evidence-based momentum.
          </p>
        </div>

        <ToolComponent />

        <div className="mt-20 rounded-3xl bg-emerald-950 p-10 text-white">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Need a professional perspective?</h2>
              <p className="text-emerald-100/70 max-w-lg">
                Your tool results provide a <strong>data-driven foundation</strong>. Join a 20-minute consultation to turn these observations into a structured action plan.
              </p>
            </div>
            <button className="rounded-full bg-emerald-500 px-8 py-4 font-bold shadow-lg shadow-emerald-900/40 transition-all hover:bg-emerald-400 active:scale-95">
              Discuss Results (20m)
            </button>
          </div>
        </div>
      </SectionContainer>
    </PageSection>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: 'behaviour-ladder' } },
      { params: { slug: 'behaviour-experiment-ladder' } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-GB', ['common', 'nav'])),
    },
  };
};
