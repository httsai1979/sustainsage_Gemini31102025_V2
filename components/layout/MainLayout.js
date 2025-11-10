import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SEO from '@/components/layout/SEO';
import SkipLink from '@/components/common/SkipLink';

const DEFAULT_DESCRIPTION =
  'Calm, practical coaching for people navigating transitions, relocations, and re-entry moments.';

export default function MainLayout({ children, title, desc, seo = {} }) {
  const hasTitle = typeof title === 'string' && title.trim().length > 0;
  const hasDescription = typeof desc === 'string' && desc.trim().length > 0;

  const resolvedTitle = hasTitle ? title : seo.title;
  const resolvedDescription = hasDescription
    ? desc
    : seo.desc ?? seo.description ?? DEFAULT_DESCRIPTION;

  const resolvedSeo = {
    title: resolvedTitle,
    desc: resolvedDescription,
    og: seo.og ?? seo.openGraph,
    noindex: seo.noindex,
  };

  return (
    <>
      <SEO {...resolvedSeo} />
      <div className="min-h-screen flex flex-col bg-sage-50">
        <SkipLink />
        <Header />
        <main id="content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
