// components/blog/BlogCard.jsx
import Link from 'next/link';

export default function BlogCard({ post }) {
  if (!post) return null;
  const cover = post.cover || (post.featuredImage?.fields?.file?.url ? ('https:' + post.featuredImage.fields.file.url) : null);
  return (
    <article className="group rounded-2xl border p-5 shadow-sm transition">
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt={post.title} className="mb-4 h-48 w-full rounded-lg object-cover" />
      )}
      <h3 className="text-lg font-semibold group-hover:underline">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>}
      {post.publishedDate && <p className="mt-3 text-xs text-gray-500">{new Date(post.publishedDate).toLocaleDateString()}</p>}
    </article>
  );
}
