// pages/blog/index.js
import MainLayout from '../../components/layout/MainLayout';
import BlogCard from '../../components/blog/BlogCard';
import { fetchBlogPosts } from '../../lib/contentful';

export default function BlogIndex({ posts = [], error = null }) {
  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-3 text-gray-600">Articles and notes that are actually useful.</p>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">Contentful error: {error}</p>}
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <BlogCard key={p.id} post={p} />)}
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export async function getStaticProps() {
  try {
    const posts = await fetchBlogPosts();
    return { props: { posts }, revalidate: 60 };
  } catch (e) {
    return { props: { posts: [], error: String(e) }, revalidate: 30 };
  }
}
