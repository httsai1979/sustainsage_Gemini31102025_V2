// lib/content/normalize.ts
export const EXAMPLE_RE =
  /(範例|案例|情境|使用情境|先看例子|適合誰|誰適合|example|examples?|use[- ]?cases?|scenario|scenarios|who (it'?s )?for|before\/after)/i;

export type AnySection = {
  title?: string;
  heading?: string;
  label?: string;
  lead?: string;
  summary?: string;
  paragraphs?: string[];
  items?: Array<{ title?: string; description?: string } | string>;
  [key: string]: any;
};

export function isExampleLike(section: AnySection | null | undefined): boolean {
  if (!section || typeof section !== 'object') return false;
  const title = String(section.title ?? section.heading ?? section.label ?? '');
  const lead = String(section.lead ?? section.summary ?? '');
  return EXAMPLE_RE.test(title) || EXAMPLE_RE.test(lead);
}

/**
 * 僅在頁面渲染時重新排序 sections：
 *  - 先渲染「例子/情境/誰適合」類，再渲染其他段落
 *  - 不修改原始 JSON，純函式、可安全重複調用
 */
export function orderSections<T extends AnySection = AnySection>(sections: T[] | null | undefined): T[] {
  if (!Array.isArray(sections) || sections.length === 0) return sections ?? [];
  const example = sections.filter((s) => isExampleLike(s));
  const rest = sections.filter((s) => !isExampleLike(s));
  return [...example, ...rest];
}
