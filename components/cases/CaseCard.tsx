import Link from 'next/link';

type CaseCardProps = {
  title?: string;
  context?: string;
  coaching_moves?: string;
  shift?: string;
  tools_used?: string[];
  disclaimer?: string;
  href?: string;
};

export function CaseCard({ title, context, coaching_moves, shift, tools_used, disclaimer, href }: CaseCardProps) {
  const card = (
    <article className="rounded-2xl border bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-700">
        <b>Context:</b> {context}
      </p>
      <p className="mt-2 text-sm text-slate-700">
        <b>In session:</b> {coaching_moves}
      </p>
      <p className="mt-2 text-sm text-slate-700">
        <b>Shift:</b> {shift}
      </p>
      <p className="mt-2 text-xs text-slate-500">
        <b>Tools:</b> {tools_used?.join?.(', ')}
      </p>
      {disclaimer ? <p className="mt-3 text-xs text-slate-500">{disclaimer}</p> : null}
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus:outline-none focus-visible:ring focus-visible:ring-emerald-500">
        {card}
      </Link>
    );
  }

  return card;
}
