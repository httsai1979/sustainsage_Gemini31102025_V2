import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import { toolsConfig, type ToolConfig } from '@/lib/toolsConfig';

interface ToolPageProps {
  tool: ToolConfig;
}

function ToolPage({ tool }: ToolPageProps) {
  return (
    <main className="ss-container py-16">
      <section className="ss-section">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{tool.category}</p>
            <h1 className="text-4xl font-semibold text-sustain-text">{tool.title}</h1>
            <p className="text-base text-slate-700">{tool.description}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
            <p className="text-sm text-slate-600">
              This is a self-reflection tool. Take your time and you can download or save your notes just for yourself.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl">
              <iframe
                src={tool.iframeSrc}
                title={`${tool.title} interactive tool`}
                width="100%"
                height="800"
                loading="lazy"
                style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', width: '100%', height: '800px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

ToolPage.getLayout = function getLayout(page: any) {
  const title = page?.props?.tool?.title ?? 'Interactive tool';
  const description = page?.props?.tool?.description ?? '';
  return (
    <MainLayout
      seo={{
        title: `${title} | SustainSage tools`,
        description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const paths = (locales.length ? locales : ['en-GB']).flatMap((locale) =>
    toolsConfig.map((tool) => ({
      params: { slug: tool.slug },
      locale,
    }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ToolPageProps> = async ({ params, locale }) => {
  const slug = params?.slug;

  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  const tool = toolsConfig.find((item) => item.slug === slug);

  if (!tool) {
    return { notFound: true };
  }

  return {
    props: {
      tool,
      ...(await serverSideTranslations(locale ?? 'en-GB', ['common'])),
    },
  };
};

export default ToolPage;
