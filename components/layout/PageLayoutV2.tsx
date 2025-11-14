export default function PageLayoutV2({ header, subnav, children }) {
  return (
    <div className="min-h-screen bg-sustain-bg text-sustain-text">
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
