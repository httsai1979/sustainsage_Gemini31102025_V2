import { getSiteContent, primaryNavigation, siteFacts, siteContent } from '@/content/siteStrategy';

describe('site strategy', () => {
  it('publishes exactly two reviewed locales', () => {
    expect(Object.keys(siteContent)).toEqual(['en-GB', 'zh-TW']);
  });

  it('keeps one programme, four situations, eight change tools and seven reflection tools', () => {
    for (const locale of ['en-GB', 'zh-TW']) {
      const content = getSiteContent(locale);
      expect(content.situations).toHaveLength(4);
      expect(content.changeTools).toHaveLength(8);
      expect(content.tools).toHaveLength(7);
      expect(new Set(content.changeTools.map((tool) => tool.slug)).size).toBe(8);
      expect(content.changeTools.every((tool) => tool.prompts.length >= 5)).toBe(true);
      expect(content.changeTools.every((tool) => content.changeTools.some((candidate) => candidate.slug === tool.nextSlug))).toBe(true);
      expect(content.programme.summary).toContain(locale === 'zh-TW' ? '六次' : 'Six');
    }
  });

  it('keeps the primary navigation focused on the service and company buyer', () => {
    expect(primaryNavigation.map((item) => item.href)).toEqual(['/', '/coaching', '/for-companies', '/about', '/reflection-tools', '/contact']);
  });

  it('uses the approved company facts', () => {
    expect(siteFacts.companyNumber).toBe('15220734');
    expect(siteFacts.email).toBe('hc.tsai@sustainsage-group.com');
  });

  it('presents the founder through human trust rather than numeric proof', () => {
    for (const locale of ['en-GB', 'zh-TW']) {
      const about = getSiteContent(locale).about;
      const founderCopy = [about.title, about.summary, ...about.paragraphs, about.perspective, ...about.relationship.flatMap((item) => [item.title, item.body])].join(' ');
      expect(about.relationship).toHaveLength(4);
      expect(founderCopy).not.toMatch(/\b\d+(?:\.\d+)?%|\b\d+\+? years?\b|\d+\s*年/i);
    }
  });
});
