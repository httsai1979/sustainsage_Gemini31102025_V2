export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-base font-semibold text-slate-900">SustainSage</p>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
            <a href="mailto:hello@sustainsage.com" className="transition hover:text-emerald-700">
              hello@sustainsage.com
            </a>
            <span className="hidden text-slate-300 md:inline" aria-hidden>
              |
            </span>
            <a href="tel:+11234567890" className="transition hover:text-emerald-700">
              +1 (123) 456-7890
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-500 md:text-right">
          © {new Date().getFullYear()} SustainSage. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
