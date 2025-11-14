declare module '@/components/ui/Card' {
  import type { ComponentType, ReactNode } from 'react';

  export interface CardProps {
    title?: ReactNode;
    subtitle?: ReactNode;
    children?: ReactNode;
    className?: string;
    footer?: ReactNode;
    as?: ComponentType<any> | string;
    icon?: ReactNode;
    prose?: boolean;
    tag?: ReactNode;
  }

  const Card: ComponentType<CardProps>;
  export default Card;
}
