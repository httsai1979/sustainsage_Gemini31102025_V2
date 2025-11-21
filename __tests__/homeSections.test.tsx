import { render, screen } from '@testing-library/react';

import {
  PersonasSection,
  SplitSection,
  TopicsSection,
} from '@/pages/index';
import type { PersonasSection as PersonasSectionData, SplitSection as SplitSectionData } from '@/types/home';

describe('home page sections', () => {
  it('renders persona cards and CTAs', () => {
    const section: PersonasSectionData = {
      id: 'personas',
      title: 'People we coach',
      type: 'personas',
      intro: ['Intro line'],
      cards: [
        {
          id: 'one',
          title: 'Card one',
          summary: ['Summary copy'],
          href: '/services/one',
        },
      ],
    };

    render(<PersonasSection section={section} />);

    expect(screen.getByText('People we coach')).toBeInTheDocument();
    expect(screen.getByText('Summary copy')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '/services/one');
  });

  it('handles sections without cards', () => {
    render(
      <TopicsSection
        section={{
          id: 'topics',
          title: 'Topics',
          type: 'topics',
          intro: 'Optional intro',
        }}
      />
    );

    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Optional intro')).toBeInTheDocument();
  });

  it('renders split columns with items even when links are missing', () => {
    const section: SplitSectionData = {
      id: 'split',
      title: 'Split section',
      type: 'split',
      left: {
        title: 'Left',
        description: ['Left description'],
        items: [
          {
            id: 'item-1',
            title: 'Item title',
            summary: 'Item summary',
          },
        ],
      },
      right: {
        title: 'Right',
        description: ['Right description'],
      },
    };

    render(<SplitSection section={section} />);

    expect(screen.getByText('Left description')).toBeInTheDocument();
    expect(screen.getByText('Item title')).toBeInTheDocument();
    expect(screen.queryByText('Open')).not.toBeInTheDocument();
  });
});
