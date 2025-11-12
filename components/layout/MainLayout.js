import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Seo from '@/components/seo/Seo';

export default function MainLayout({ seo, children }) {
  return (
    <>
      <Seo {...(seo || {})} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
