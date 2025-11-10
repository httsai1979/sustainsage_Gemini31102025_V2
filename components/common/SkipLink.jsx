const baseClasses =
  'absolute left-[-999px] top-auto z-50 m-4 inline-flex -translate-y-full transform rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500';

export default function SkipLink({ href = '#content', children = 'Skip to main content', className = '' }) {
  return (
    <a href={href} className={`${baseClasses} ${className}`.trim()}>
      {children}
    </a>
  );
}
