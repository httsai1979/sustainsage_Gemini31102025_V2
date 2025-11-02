// pages/blog/[slug].js
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { fetchBlogPostBySlug } from '../../lib/contentful';

export default function BlogPost({ post = null, error = null }) {
  if (error) {
    return (
      <MainLayout>
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">Contentful error: {error}</p>
          <p className="mt-4"><Link href="/blog" className="underline">Back to Blog</Link></p>
        </section>
      </MainLayout>
    );
  }
  if (!post) {
    return (
      <MainLayout>
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-gray-600">Post not found.</p>
          <p className="mt-4"><Link href="/blog" className="underline">Back to Blog</Link></p>
        </section>
      </MainLayout>
    );
  }

  const cover = post.cover || (post.featuredImage?.fields?.file?.url ? ('https:' + post.featuredImage.fields.file.url) : null);

  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-gray">
        <p className="mb-4 text-sm text-gray-500">
          <Link href="/blog" className="underline">← Back to Blog</Link>
        </p>
        <h1>{post.title}</h1>
        {post.publishedDate && <p className="text-sm text-gray-500">{new Date(post.publishedDate).toLocaleDateString()}</p>}
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={post.title} className="my-6 w-full rounded-lg" />
        )}
        {typeof post.content === 'string' ? (
          <p>{post.content}</p>
        ) : (
          <p className="text-gray-600">This post has no plain-text body. Add a "content" (Text) field or extend the renderer.</p>
        )}
      </article>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const post = await fetchBlogPostBySlug(params?.slug);
    if (!post) return { notFound: true };
    return { props: { post }, revalidate: 60 };
  } catch (e) {
    return { props: { post: null, error: String(e) }, revalidate: 30 };
  }
}
