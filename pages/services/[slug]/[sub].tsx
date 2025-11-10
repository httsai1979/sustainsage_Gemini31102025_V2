import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';

const SLUGS = ['career-return', 'immigrant-job', 'graduate-start'] as const;
const SUBS = ['pricing', 'readiness', 'agreement', 'faq'] as const;

const DEFAULT_LOCALE = 'en-GB';
const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');

type Slug = (typeof SLUGS)[number];
type Sub = (typeof SUBS)[number];

type PricingPolicy = {
  title: string;
  body: string;
};

type PricingPackage = {
  name: string;
  duration?: string;
  scope?: string;
  price_note?: string;
};

type PricingData = {
  packages?: PricingPackage[];
  policies?: PricingPolicy[];
};

type ReadinessData = {
  checklist?: string[];
  what_to_prepare?: string[];
};

type AgreementSection = {
  heading: string;
  body: string;
};

type AgreementData = {
  sections?: AgreementSection[];
};

type FaqItem = {
  q: string;
  a: string;
};

type FaqData = {
  items?: FaqItem[];
};

type ServiceSubPageProps = {
  slug: Slug;
  sub: Sub;
  data: PricingData | ReadinessData | AgreementData | FaqData | null;
};

const toSerializable = <T,>(obj: T): T =>
  JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (value === undefined) {
        return null;
      }
      return value;
    })
  );

function resolveContentFile(slug: Slug, locale: string): string {
  const attempts = [locale, DEFAULT_LOCALE];

  for (const attempt of attempts) {
    const candidate = path.join(SERVICES_DIR, `${slug}.${attempt}.json`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Service content not found for slug: ${slug} and locale: ${locale}`);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SLUGS.flatMap((slug) => SUBS.map((sub) => ({ params: { slug, sub } })));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServiceSubPageProps> = async ({ params, locale }) => {
  const slugParam = params?.slug;
  const subParam = params?.sub;

  if (typeof slugParam !== 'string' || typeof subParam !== 'string') {
    return { notFound: true };
  }

  if (!SLUGS.includes(slugParam as Slug) || !SUBS.includes(subParam as Sub)) {
    return { notFound: true };
  }

  const lang = (locale as string) || DEFAULT_LOCALE;

  try {
    const filePath = resolveContentFile(slugParam as Slug, lang);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const all = JSON.parse(raw) as Record<Sub, PricingData | ReadinessData | AgreementData | FaqData>;
    const data = all[subParam as Sub] ?? null;

    return {
      props: toSerializable({ slug: slugParam as Slug, sub: subParam as Sub, data }),
    };
  } catch (error) {
    return { notFound: true };
  }
};

const TITLE_MAP: Record<Sub, string> = {
  pricing: 'Pricing',
  readiness: 'Readiness',
  agreement: 'Coaching Agreement',
  faq: 'FAQ',
};

export default function ServiceSubPage({ slug, sub, data }: ServiceSubPageProps) {
  return (
    <main className="container mx-auto px-4 py-10">
      <nav className="mb-6">
        <Link href={`/services/${slug}`} className="text-sm underline">
          ← Back to service
        </Link>
      </nav>

      <h1 className="text-2xl font-semibold mb-4">{TITLE_MAP[sub]}</h1>

      {sub === 'pricing' && <Pricing data={data as PricingData} />}
      {sub === 'readiness' && <Readiness data={data as ReadinessData} />}
      {sub === 'agreement' && <Agreement data={data as AgreementData} />}
      {sub === 'faq' && <Faq data={data as FaqData} />}

      <div className="fixed bottom-6 right-6">
        <Link href="/contact" className="rounded-full px-5 py-3 bg-emerald-700 text-white shadow">
          Book a 20-min chat
        </Link>
      </div>
    </main>
  );
}

type PricingProps = {
  data?: PricingData | null;
};

function Pricing({ data }: PricingProps) {
  const packages = Array.isArray(data?.packages) ? data?.packages : [];
  const policies = Array.isArray(data?.policies) ? data?.policies : [];

  if (packages.length === 0 && policies.length === 0) {
    return (
      <p className="text-sm leading-6 text-slate-700">Pricing information will be published soon. Please get in touch for details.</p>
    );
  }

  return (
    <section className="space-y-6">
      {packages.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {packages.map((pkg) => (
            <li key={pkg.name} className="rounded-2xl border p-5">
              <div className="font-semibold">{pkg.name}</div>
              {pkg.duration ? <div className="text-sm opacity-80">{pkg.duration}</div> : null}
              {pkg.scope ? <p className="text-sm mt-2">{pkg.scope}</p> : null}
              {pkg.price_note ? <p className="text-xs mt-2 opacity-70">{pkg.price_note}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {policies.length > 0 ? (
        <div>
          <h2 className="font-semibold mb-2">Policies</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {policies.map((policy) => (
              <li key={policy.title}>
                <b>{policy.title}:</b> {policy.body}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

type ReadinessProps = {
  data?: ReadinessData | null;
};

function Readiness({ data }: ReadinessProps) {
  const checklist = Array.isArray(data?.checklist) ? data?.checklist : [];
  const prepare = Array.isArray(data?.what_to_prepare) ? data?.what_to_prepare : [];

  if (checklist.length === 0 && prepare.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2">
      <div>
        <h2 className="font-semibold mb-2">Checklist</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {checklist.map((item, index) => (
            <li key={item ?? index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mb-2">What to prepare</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {prepare.map((item, index) => (
            <li key={item ?? index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type AgreementProps = {
  data?: AgreementData | null;
};

function Agreement({ data }: AgreementProps) {
  const sections = Array.isArray(data?.sections) ? data?.sections : [];

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      {sections.map((section) => (
        <div key={section.heading}>
          <h2 className="font-semibold mb-1">{section.heading}</h2>
          <p className="text-sm leading-6 whitespace-pre-line">{section.body}</p>
        </div>
      ))}
    </section>
  );
}

type FaqProps = {
  data?: FaqData | null;
};

function Faq({ data }: FaqProps) {
  const items = Array.isArray(data?.items) ? data?.items : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      {items.map((qa, index) => (
        <details key={qa.q ?? index} className="rounded-xl border p-4">
          <summary className="font-medium cursor-pointer">{qa.q}</summary>
          <p className="mt-2 text-sm leading-6">{qa.a}</p>
        </details>
      ))}
    </section>
  );
}

