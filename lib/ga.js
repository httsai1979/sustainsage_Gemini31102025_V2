export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const hasGa = Boolean(GA_MEASUREMENT_ID);

export function pageview(url) {
  if (!hasGa || typeof window === 'undefined') return;
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function event(action, params = {}) {
  if (!hasGa || typeof window === 'undefined') return;
  window.gtag?.('event', action, params);
}
