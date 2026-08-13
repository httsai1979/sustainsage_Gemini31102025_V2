import { getSiteContent, primaryNavigation, siteFacts, siteContent } from '@/content/siteStrategy';

describe('site strategy', () => {
  it('publishes exactly two reviewed locales', () => {
    expect(Object.keys(siteContent)).toEqual(['en-GB', 'zh-TW']);
  });

  it('keeps one programme, four situations and seven non-AI tools', () => {
    for (const locale of ['en-GB', 'zh-TW']) {
      const content = getSiteContent(locale);
      expect(content.situations).toHaveLength(4);
      expect(content.tools).toHaveLength(7);
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
});
