export type KeyFn<T> = (item: T, index: number) => string | number | null | undefined;

function normalizeKey(value: unknown, index: number): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return `__index_${index}`;
  }
}

export function dedupeBy<T>(items: T[] = [], getKey?: KeyFn<T>): T[] {
  if (!Array.isArray(items)) {
    return [];
  }

  const seen = new Set<string>();

  return items.filter((item, index) => {
    const rawKey = getKey ? getKey(item, index) : item;
    const key = normalizeKey(rawKey, index);

    if (!key) {
      // If we still cannot derive a key, keep the item but namespace by index to avoid dropping data.
      return true;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
