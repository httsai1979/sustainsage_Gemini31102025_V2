export default function ICFNotice({ className = '' }) {
  return (
    <aside
      className={`mx-auto mt-10 max-w-6xl px-4 text-sm text-neutral-700 ${className}`}
      role="note"
      aria-label="Coaching ethics and scope"
    >
      <p>
        We coach in line with the ICF Code of Ethics. Coaching is a collaborative, client-led partnership that supports your
        self-directed learning and change. It is not therapy, counselling, medical, legal or financial advice. You remain
        responsible for your choices and actions.
      </p>
      <p className="mt-2">
        We maintain confidentiality except where required by law or where there is a risk of harm. We will establish clear
        agreements, goals and boundaries together before we begin, and we will obtain your informed consent for how we work and
        how your information is handled.
      </p>
    </aside>
  );
}
