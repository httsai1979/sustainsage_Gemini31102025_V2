import React from 'react';

export default function CardShell({ as: Tag = 'div', className = '', children, ...rest }) {
  const base =
    'rounded-3xl border border-emerald-100 bg-white/95 shadow-sm backdrop-blur-[1px]';
  return (
    <Tag className={`${base} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
