import enContent from '@/content/home/index.en-GB.json';
import { homePageSchema, validateHomeContent } from '@/lib/schema/homeSchema';

describe('homePageSchema', () => {
  it('accepts valid content', () => {
    const parsed = homePageSchema.parse(enContent);
    expect(parsed.hero.title).toBeDefined();
    expect(Array.isArray(parsed.sections)).toBe(true);
  });

  it('throws helpful errors for invalid hero', () => {
    const invalid = {
      ...enContent,
      hero: {
        ...enContent.hero,
        title: '',
      },
    };

    expect(() => validateHomeContent(invalid, 'en-GB')).toThrow(/Hero title is required/);
  });

  it('rejects unexpected section types', () => {
    const invalid = {
      ...enContent,
      sections: [
        {
          ...enContent.sections[0],
          type: 'unknown',
        },
      ],
    };

    expect(() => validateHomeContent(invalid, 'en-GB')).toThrow(/Invalid home content/);
  });
});
