import Link from 'next/link';
import PropTypes from 'prop-types';

import PageSection from '@/components/ui/PageSection';

export default function AboutCTA({ cta }) {
  if (!cta?.title) return null;
  const actions = [cta?.primary, cta?.secondary].filter((action) => action?.href && action?.label);
  return (
    <PageSection title={cta.title} lead={cta?.body}>
      {actions.length ? (
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={index === 0 ? 'ss-btn-primary' : 'ss-btn-secondary'}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}

AboutCTA.propTypes = {
  cta: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    primary: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    secondary: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  }),
};
