import Link from 'next/link';

function formatPublishedDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogCard({ post }) {
  if (!post) return null;

  const cover =
    post.cover ||
    post.image ||
    (post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : null);
  const publishedLabel = post.displayDate || formatPublishedDate(post.publishedDate);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt={post.title} className="mb-4 h-48 w-full rounded-2xl object-cover" />
      )}

      {post.category && (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</p>
      )}

      <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-primary">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>

      {post.excerpt && <p className="mt-3 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>}

      <div className="mt-auto pt-4 text-xs text-gray-500">
        {publishedLabel && <span>{publishedLabel}</span>}
        {post.readingTime && (
          <span className="ml-2 inline-flex items-center before:mx-2 before:block before:h-1 before:w-1 before:rounded-full before:bg-gray-300">
            {post.readingTime}
          </span>
        )}
      </div>
    </article>
  );
}
