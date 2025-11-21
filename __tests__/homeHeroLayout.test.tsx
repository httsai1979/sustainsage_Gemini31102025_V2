import { render } from '@testing-library/react';

import { HomeHero } from '@/pages/index';
import type { HomeHero as HomeHeroData } from '@/types/home';

const hero: HomeHeroData = {
  eyebrow: 'Localized hero',
  title: 'Coaching for your next chapter',
  subtitle: 'Personalized support to reach your goals.',
  chips: ['Career clarity', 'Confidence', 'Momentum'],
  primaryCta: { href: '/contact', label: 'Book a chat' },
  secondaryLink: { href: '/services', label: 'Explore services' },
  secondaryText: 'Trusted by clients worldwide.',
};

const localeNotices: Array<[string, string]> = [
  ['en-US', 'Temporarily showing English content while we complete this translation.'],
  ['zh-HK', '翻譯仍在完成中，暫時顯示英文內容。'],
  ['ja-JP', '翻訳を準備中のため、英語のコンテンツを表示しています。'],
];

describe('HomeHero layout across locales', () => {
  it.each(localeNotices)('maintains layout structure for %s', (_locale, notice) => {
    const { container, getByText } = render(
      <HomeHero hero={hero} showFallbackNotice fallbackNotice={notice} />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-b');
    expect(section).toHaveClass('py-20');
    expect(container.querySelectorAll('.ssg-container .space-y-6').length).toBe(1);
    expect(container.querySelectorAll('a').length).toBeGreaterThanOrEqual(1);
    expect(getByText(notice)).toBeInTheDocument();
  });
});
