export default function PageLayoutV2({ header, subnav, children }) {
  return (
    <div className="min-h-screen">
      <header className="bg-emerald-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {header /* {title, description} */}
        </div>
        {subnav}
      </header>
      <main className="max-w-7xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
