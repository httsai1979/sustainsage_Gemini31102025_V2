import PropTypes from 'prop-types';
import SkipLink from '@/components/common/SkipLink';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const DEFAULT_SEO = {};

export default function MainLayout({ children, seo = DEFAULT_SEO } = {}) {
  const normalizedSeo = typeof seo === 'object' && seo !== null ? seo : DEFAULT_SEO;
  const { title, description, desc, noIndex, noindex, og, ogImage } = normalizedSeo;

  const openGraphImages = [];

  if (og?.images && Array.isArray(og.images)) {
    openGraphImages.push(...og.images.filter(Boolean));
  }

  if (ogImage) {
    openGraphImages.push(ogImage);
  }

  const openGraph = og ? { ...og } : {};

  if (openGraphImages.length > 0) {
    openGraph.images = openGraphImages;
  }

  const resolvedSeo = {
    title,
    desc: description ?? desc,
    noindex: typeof noIndex === 'boolean' ? noIndex : noindex,
    og: openGraph,
  };

  return (
    <>
      <SEO {...resolvedSeo} />
      <div className="flex min-h-screen flex-col bg-sustain-bg text-sustain-text transition-colors duration-300 dark:bg-sustain-bg-dark dark:text-sustain-text-dark">
        <SkipLink />
        <Header />
        <main id="content" className="typography flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    desc: PropTypes.string,
    noIndex: PropTypes.bool,
    noindex: PropTypes.bool,
    og: PropTypes.object,
    ogImage: PropTypes.string,
  }),
};
