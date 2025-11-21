type ParagraphsProps = {
  paragraphs?: string | string[] | null;
  idPrefix?: string;
  className?: string;
  paragraphClassName?: string;
};

export const DEFAULT_PARAGRAPH_CLASS = 'text-base leading-relaxed text-ink/70';

export function toParagraphs(value?: string | string[] | null): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

export default function Paragraphs({
  paragraphs,
  idPrefix = 'paragraph',
  className,
  paragraphClassName = DEFAULT_PARAGRAPH_CLASS,
}: ParagraphsProps) {
  const items = toParagraphs(paragraphs);

  if (!items.length) return null;

  const wrapperClassName = className ?? '';

  return (
    <div className={wrapperClassName}>
      {items.map((paragraph, index) => (
        <p key={`${idPrefix}-${index}`} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
