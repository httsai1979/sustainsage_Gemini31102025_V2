// lib/orderSections.js
const EXAMPLE_RE =
  /(範例|案例|情境|使用情境|先看例子|適合誰|誰適合|example|examples|use case|scenario|scenarios|who (it'?s )?for|before\/after)/i;

export function orderSections(arr) {
  if (!Array.isArray(arr)) return [];
  const exampleLike = [];
  const rest = [];
  for (const item of arr) {
    const t = (item?.title || item?.heading || item?.label || "").toString();
    const l = (item?.lead || item?.summary || "").toString();
    if (EXAMPLE_RE.test(t) || EXAMPLE_RE.test(l)) exampleLike.push(item);
    else rest.push(item);
  }
  return [...exampleLike, ...rest];
}
export default orderSections;
