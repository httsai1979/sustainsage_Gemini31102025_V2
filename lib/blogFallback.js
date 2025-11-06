export const FALLBACK_BLOG_KEYS = ['post1', 'post2'];

export function getFallbackPostsFromTranslations(t) {
  return FALLBACK_BLOG_KEYS.map((key) => {
    const data = t(key, { returnObjects: true });

    if (!data || typeof data !== 'object' || !data.slug) {
      return null;
    }

    return {
      key,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      cover: data.image || null,
      category: data.category || null,
      publishedDate: data.publishedDate || null,
      displayDate: data.meta?.date || null,
      readingTime: data.meta?.readingTime || null,
    };
  }).filter(Boolean);
}
