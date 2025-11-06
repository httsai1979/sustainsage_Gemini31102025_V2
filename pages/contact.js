import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

export default function Contact() {
  return (
    <MainLayout title="Contact | SustainSage" desc="Get in touch. Consent-led and clear.">
      <Hero
        image="/hero/contact.svg"
        title="Contact"
        subtitle="Say hello. Share what you would like help with and how you would prefer to meet."
      />
      <section className="py-4">
        <form
          className="grid max-w-xl gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const note = document.getElementById('form-note');
            if (note) {
              note.style.display = 'block';
            }
          }}
        >
          <input className="rounded border p-3" placeholder="Name" required aria-label="Name" />
          <input className="rounded border p-3" placeholder="Email" type="email" required aria-label="Email" />
          <textarea
            className="rounded border p-3"
            placeholder="What you would like help with"
            rows={5}
            required
            aria-label="Message"
          />
          <label className="flex items-start gap-2 text-sm text-neutral-700">
            <input type="checkbox" required aria-required="true" />
            <span>
              I consent to be contacted about scheduling an intro chat. I understand this is not medical, legal or financial advice.
            </span>
          </label>
          <button className="rounded bg-[#4A6C56] px-4 py-2 text-white">Send</button>
        </form>
        <p id="form-note" className="mt-3 text-sm text-emerald-700" style={{ display: 'none' }}>
          Thanks, we will email you to schedule an intro chat.
        </p>
      </section>
      <ICFNotice />
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
