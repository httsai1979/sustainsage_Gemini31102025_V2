import PropTypes from 'prop-types';

import cn from '@/lib/cn';
import CardShell from '@/components/ui/CardShell';
import IconBadge from '@/components/ui/IconBadge';
import { getLucideIcon } from '@/components/ui/icons';

function resolveIcon(icon) {
  if (!icon) {
    return { iconName: null, iconNode: null };
  }

  if (typeof icon === 'string') {
    return { iconName: icon, iconNode: null };
  }

  if (typeof icon === 'function') {
    const IconComponent = icon;
    return {
      iconName: null,
      iconNode: <IconComponent className="h-5 w-5" aria-hidden />,
    };
  }

  const IconComponent = getLucideIcon(icon?.name ?? icon?.icon);

  if (IconComponent) {
    return {
      iconName: null,
      iconNode: <IconComponent className="h-5 w-5" aria-hidden />,
    };
  }

  if (typeof icon === 'object') {
    return { iconName: null, iconNode: icon };
  }

  return { iconName: null, iconNode: null };
}

export default function StepList({ steps = [], className = '' }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <ol
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4',
        className,
      )}
    >
      {steps.map((step, index) => {
        const normalizedStep =
          typeof step === 'string'
            ? { description: step }
            : step && typeof step === 'object'
            ? step
            : {};
        const title = normalizedStep?.title;
        const description = normalizedStep?.description;
        const iconValue = normalizedStep?.icon ?? normalizedStep?.iconName;
        const stepNumber = normalizedStep?.stepNumber ?? index + 1;
        const { iconName, iconNode } = resolveIcon(iconValue);
        return (
          <li
            key={title ?? description ?? index}
            className="min-w-[240px] flex-1 md:min-w-0"
          >
            <CardShell
              icon={
                <IconBadge
                  iconName={iconName ?? 'calendar'}
                  icon={iconNode}
                  className="bg-primary/10"
                />
              }
              eyebrow={`Step ${String(stepNumber).padStart(2, '0')}`}
              title={title ?? `Step ${stepNumber}`}
              className="h-full"
            >
              {description ? <p>{description}</p> : null}
            </CardShell>
          </li>
        );
      })}
    </ol>
  );
}

StepList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
        iconName: PropTypes.string,
        stepNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ]),
  ),
  className: PropTypes.string,
};

