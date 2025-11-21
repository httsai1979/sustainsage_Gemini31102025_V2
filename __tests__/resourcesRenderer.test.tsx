import { render, screen } from '@testing-library/react';

import enContent from '@/content/resources/index.en-GB.json';
import { ToolsSection } from '@/pages/resources';
import { resourcesPageSchema } from '@/lib/schema/resourcesSchema';
import type { ToolsSection as ToolsSectionType } from '@/types/resources';

describe('Resources renderer', () => {
  it('renders tool summaries and CTA labels consistently', () => {
    const parsed = resourcesPageSchema.parse(enContent);
    const toolsSection = parsed.sections.find(
      (section): section is ToolsSectionType => section.type === 'tools',
    );

    if (!toolsSection) {
      throw new Error('Expected a tools section in resources content');
    }

    const customSection: ToolsSectionType = {
      ...toolsSection,
      ctaLabel: undefined,
      tools: [
        {
          ...toolsSection.tools[0],
          ctaLabel: undefined,
        },
      ],
    };

    render(<ToolsSection section={customSection} />);

    expect(screen.getByText(customSection.tools[0].title)).toBeInTheDocument();
    customSection.tools[0].summary.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Open resource' })).toHaveAttribute(
      'href',
      customSection.tools[0].href,
    );
  });
});
