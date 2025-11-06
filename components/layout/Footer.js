export default function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-sm text-[#666]">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} SustainSage Group Ltd.</div>
        <div>hc.tsai@sustainsage-group.com • UK & Taiwan bilingual</div>
      </div>
    </footer>
  );
}
