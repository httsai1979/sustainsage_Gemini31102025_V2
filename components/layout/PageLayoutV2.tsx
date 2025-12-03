export default function PageLayoutV2({ header, subnav, children }) {
  return (
    <div className="min-h-screen bg-sustain-bg text-sustain-text transition-colors duration-300 dark:bg-sustain-bg-dark dark:text-sustain-text-dark">
      <header className="border-b border-sustain-cardBorder bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          {header /* {title, description} */}
        </div>
        {subnav}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">{children}</main>
    </div>
  );
}
