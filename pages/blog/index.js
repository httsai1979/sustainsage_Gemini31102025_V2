import MainLayout from '../../components/layout/MainLayout';
import Hero from '../../components/layout/Hero';
import ICFNotice from '../../components/legal/ICFNotice';
import CardImage from '../../components/CardImage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const posts = [
  {
    title: 'Navigating a career change with steadiness',
    description: 'Questions and reflective prompts to help you sense next steps without pressure.',
    href: '#',
  },
  {
    title: 'Finding your footing in the UK workplace',
    description: 'Simple structures to decode culture, expectations, and communication styles.',
    href: '#',
  },
  {
    title: 'Designing small experiments when you feel stuck',
    description: 'A gentle ladder for testing ideas and building confidence one step at a time.',
    href: '#',
  },
  {
    title: 'Restoring momentum after burnout',
    description: 'Compassionate check-ins and pacing practices for sustainable return-to-work plans.',
    href: '#',
  },
];

function BlogIndexPage() {
  return (
    <MainLayout title="Blog | SustainSage" desc="Short, reflective reads—non-directive and practical.">
      <Hero
        image="/hero/blog.svg"
        align="left"
        title="Blog"
        subtitle="Short reads with reflective prompts and simple structures you can adapt."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <CardImage className="mb-4" alt={post.title} />
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
                <a className="mt-4 inline-block rounded border border-emerald-400 px-3 py-1.5 text-sm" href={post.href}>
                  Read article
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default BlogIndexPage;
