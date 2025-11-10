export function CaseCard({ title, context, coaching_moves, shift, tools_used, disclaimer }) {
  return (
    <article className="rounded-2xl border p-5 bg-white">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm">
        <b>Context:</b> {context}
      </p>
      <p className="mt-2 text-sm">
        <b>In session:</b> {coaching_moves}
      </p>
      <p className="mt-2 text-sm">
        <b>Shift:</b> {shift}
      </p>
      <p className="mt-2 text-xs opacity-70">
        <b>Tools:</b> {tools_used?.join?.(', ')}
      </p>
      {disclaimer && <p className="mt-3 text-xs opacity-70">{disclaimer}</p>}
    </article>
  );
}
