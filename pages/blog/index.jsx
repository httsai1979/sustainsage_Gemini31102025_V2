import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import MainLayout from '@/components/layout/MainLayout';
import { getAllPosts } from '@/lib/content';

export default function BlogPage({ posts }) {
  return (
    <MainLayout>
      <section className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Blog</h1>
        <p className="mt-2 text-slate-600">Short, practical notes from our coaching practice.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} title={post.title} desc={post.description} href={`/blog/${post.slug}`} cta="Read">
              <figure className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                <Image src={post.img} alt={post.alt || ''} width={1200} height={675} loading="lazy" />
              </figure>
              {post.comingSoon && (
                <div className="mt-3">
                  <Tag>Coming soon</Tag>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const posts = getAllPosts(locale);
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
