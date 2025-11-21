import Paragraphs, { DEFAULT_PARAGRAPH_CLASS, toParagraphs } from './Paragraphs';

type SectionIntroProps = {
  paragraphs?: string | string[] | null;
  idPrefix?: string;
  className?: string;
  paragraphClassName?: string;
};

export default function SectionIntro({
  paragraphs,
  idPrefix,
  className,
  paragraphClassName = DEFAULT_PARAGRAPH_CLASS,
}: SectionIntroProps) {
  const introParagraphs = toParagraphs(paragraphs);

  if (!introParagraphs.length) return null;

  return (
    <div className={className ?? 'max-w-3xl space-y-3'}>
      <Paragraphs
        paragraphs={introParagraphs}
        idPrefix={idPrefix}
        paragraphClassName={paragraphClassName}
      />
    </div>
  );
}
