import PropTypes from 'prop-types';

import cn from '@/lib/cn';

import Icon from './Icon';

export default function IconList({ items = [], icon = 'check', className = '' }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {items.map((item, index) => {
        const normalized =
          typeof item === 'string'
            ? { description: item }
            : {
                title: item?.title ?? item?.name ?? null,
                description: item?.description ?? item?.desc ?? item?.text ?? null,
              };
        const title = normalized.title;
        const description = normalized.description ?? normalized.title;

        return (
          <li key={`${title ?? ''}-${description ?? index}`} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
            <Icon name={item?.icon ?? icon} className="w-5 h-5 mt-1 text-sage" />
            <div className="space-y-1 text-[15px] leading-7">
              {title ? <p className="font-semibold text-ink">{title}</p> : null}
              {description && (!title || description !== title) ? (
                <p className="text-slate-600">{description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

IconList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
      }),
    ])
  ),
  icon: PropTypes.string,
  className: PropTypes.string,
};
