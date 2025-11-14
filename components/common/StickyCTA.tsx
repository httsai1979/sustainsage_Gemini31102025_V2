export function StickyCTA({ href = '/contact', label = 'Book a 20-minute chat' }) {
  return (
    <a
      href={href}
      className="fixed right-6 bottom-6 rounded-full bg-emerald-700 text-white px-5 py-3 shadow-lg"
    >
      {label}
    </a>
  );
}
