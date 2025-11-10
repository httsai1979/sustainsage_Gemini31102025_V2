import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Seo from '@/components/common/Seo';

const DEFAULT_DESCRIPTION =
  'Calm, practical coaching for people navigating transitions, relocations, and re-entry moments.';

export default function MainLayout({ children, title, desc, seo }) {
  const hasTitle = typeof title === 'string' && title.trim().length > 0;
  const hasDescription = typeof desc === 'string' && desc.trim().length > 0;

  const description = hasDescription ? desc : DEFAULT_DESCRIPTION;

  return (
    <>
      <Seo title={hasTitle ? title : undefined} description={description} {...seo} />
      <a
        href="#main-content"
        className="absolute left-[-999px] top-auto z-50 m-4 inline-flex -translate-y-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0 focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col bg-sage-50">
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
