import Link from 'next/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Card from './Card';

export default function Callout({ title, body, actions = [], className }) {
  if (!title && !body && actions.length === 0) return null;
  return (
    <Card
      className={clsx('border-sage/30 bg-sage/5 text-slate-800', className)}
      title={title}
      subtitle={body}
    >
      {actions.length ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {actions.map((action) => (
            <Link
              key={action.href ?? action.label}
              href={action.href}
              className="inline-flex items-center justify-center rounded-full border border-sage/40 px-4 py-2 text-sm font-semibold text-sage hover:bg-sage/10"
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

Callout.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};
