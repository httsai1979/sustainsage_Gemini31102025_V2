import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
  const router = useRouter();
  const current = router.locale || 'en';
  const other = current === 'en' ? 'zh-TW' : 'en';
  const label = current === 'en' ? '中文' : 'EN';
  const switchLocale = () => {
    router.push(router.asPath, router.asPath, { locale: other, scroll: false, shallow: true });
  };

  return (
    <button onClick={switchLocale} className="rounded-lg border px-3 py-1 text-sm">
      {label}
    </button>
  );
}
