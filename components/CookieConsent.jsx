import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const STORAGE_KEY = 'sustainsage-cookie-consent';

export default function CookieConsent({ consent, onConsent }) {
  const router = useRouter();
  const zh = router.locale === 'zh-TW';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(consent === 'unknown');
  }, [consent]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-4 rounded-2xl border border-sustain-cardBorder bg-sustain-cardBg p-5 shadow-lg md:inset-x-auto md:bottom-6 md:right-6 md:max-w-sm">
      <div>
        <p className="text-sm font-semibold text-sustain-textMain">{zh ? '選擇性分析 Cookie' : 'Optional analytics cookies'}</p>
        <p className="mt-1 text-xs text-sustain-textMuted">
          {zh ? '只有在你同意後，網站才會載入已設定的分析工具。拒絕不影響核心功能。' : 'Configured analytics load only after you consent. Refusing does not affect core functions.'}
          {' '}<Link href="/legal/cookie-policy" className="font-semibold underline">{zh ? 'Cookie 政策' : 'Cookie Policy'}</Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onConsent('granted')}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[.99]"
        >
          {zh ? '接受' : 'Accept'}
        </button>
        <button
          type="button"
          onClick={() => onConsent('denied')}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-emerald-950/20 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50 active:scale-[.99]"
        >
          {zh ? '拒絕' : 'Decline'}
        </button>
      </div>
      <button
        type="button"
        onClick={() => onConsent('denied')}
        className="text-left text-xs text-sustain-navTextMuted underline"
      >
        {zh ? '稍後再決定' : 'Decide later'}
      </button>
    </div>
  );
}

export function getStoredConsent() {
  if (typeof window === 'undefined') return 'unknown';
  return localStorage.getItem(STORAGE_KEY) || 'unknown';
}

export function storeConsent(value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, value);
}
