export default function ICFNotice({ className = '' }) {
  return (
    <aside className={`mx-auto max-w-6xl px-4 mt-10 text-sm text-neutral-700 ${className}`} role="note" aria-label="Coaching ethics and scope">
      <p>Coaching is a collaborative, client-led partnership grounded in the ICF Code of Ethics. It supports your self-directed learning and change.</p>
      <p className="mt-2">It is not therapy, counselling, medical, legal or financial advice. You remain responsible for your decisions and actions. We maintain confidentiality except where required by law or risk of harm.</p>
    </aside>
  );
}
