import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <SiteHeader />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
