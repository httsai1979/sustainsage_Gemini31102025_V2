import { createContext, useContext } from 'react';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

const LayoutContext = createContext(false);

export default function MainLayout({ children }) {
  const hasLayout = useContext(LayoutContext);

  if (hasLayout) {
    return <>{children}</>;
  }

  return (
    <LayoutContext.Provider value={true}>
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <SiteHeader />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <SiteFooter />
      </div>
    </LayoutContext.Provider>
  );
}
