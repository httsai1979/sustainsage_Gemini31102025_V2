import enContent from '@/content/resources/index.en-GB.json';
import { resourcesPageSchema, validateResourcesContent } from '@/lib/schema/resourcesSchema';

describe('resourcesPageSchema', () => {
  it('accepts valid content', () => {
    const parsed = resourcesPageSchema.parse(enContent);
    expect(parsed.hero.title).toBeDefined();
    expect(parsed.sections[0].type).toBe('tools');
  });

  it('throws helpful errors for invalid hero', () => {
    const invalid = {
      ...enContent,
      hero: {
        ...enContent.hero,
        title: '',
      },
    };

    expect(() => validateResourcesContent(invalid, 'en-GB')).toThrow(/Invalid resources content/);
  });

  it('rejects sections without tools', () => {
    const invalid = {
      ...enContent,
      sections: [
        {
          ...enContent.sections[0],
          tools: [],
        },
      ],
    };

    expect(() => validateResourcesContent(invalid, 'en-GB')).toThrow(/tools/);
  });
});
