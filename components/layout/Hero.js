export default function Hero({ title, subtitle, children, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 sm:px-8">
        <div className={`flex flex-col gap-4 ${alignment}`}>
          {title && (
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg leading-8 text-slate-700 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className={`flex flex-wrap gap-3 ${align === 'left' ? '' : 'justify-center'}`}>{children}</div>}
      </div>
    </section>
  );
}
