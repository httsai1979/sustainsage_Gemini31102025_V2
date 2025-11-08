import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sustainsage-cookie-consent';

export default function CookieConsent({ consent, onConsent }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(consent === 'unknown');
  }, [consent]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg md:inset-x-auto md:bottom-6 md:right-6 md:max-w-sm">
      <div>
        <p className="text-sm font-semibold text-slate-900">We use cookies for analytics</p>
        <p className="mt-1 text-xs text-slate-600">
          Accepting helps us understand what lands and improve future support. Declining keeps things cookie-free.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onConsent('granted')}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => onConsent('denied')}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Decline
        </button>
      </div>
      <button
        type="button"
        onClick={() => onConsent('denied')}
        className="text-left text-xs text-slate-500 underline"
      >
        Manage later
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
