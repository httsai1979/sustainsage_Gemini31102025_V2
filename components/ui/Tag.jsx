export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sustain-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sustain-primary">
      {children}
    </span>
  );
}
