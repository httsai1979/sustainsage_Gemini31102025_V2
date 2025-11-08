function parseFrontmatterSection(section) {
  const data = {};
  const lines = section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  lines.forEach((line) => {
    const [rawKey, ...rawValue] = line.split(':');
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rawValue.join(':').trim();
    const unquoted = value.replace(/^"|"$/g, '');
    data[key] = unquoted;
  });

  return data;
}

export default function matter(input = '') {
  if (typeof input !== 'string') {
    return { data: {}, content: '' };
  }

  const trimmed = input.startsWith('\uFEFF') ? input.slice(1) : input;
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: trimmed };
  }

  const closingIndex = trimmed.indexOf('\n---', 3);
  if (closingIndex === -1) {
    return { data: {}, content: trimmed };
  }

  const frontmatterSection = trimmed.slice(3, closingIndex).trim();
  const content = trimmed.slice(closingIndex + 4).replace(/^\s+/, '');

  return {
    data: parseFrontmatterSection(frontmatterSection),
    content,
  };
}
