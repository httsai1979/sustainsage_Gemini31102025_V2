declare module '@/components/layout/MainLayout' {
  import type { ReactNode } from 'react';

  export interface MainLayoutProps {
    children?: ReactNode;
    seo?: {
      title?: string;
      description?: string;
      desc?: string;
      noIndex?: boolean;
      noindex?: boolean;
      og?: Record<string, any>;
      ogImage?: string;
    };
  }

  export default function MainLayout(props: MainLayoutProps): JSX.Element;
}
