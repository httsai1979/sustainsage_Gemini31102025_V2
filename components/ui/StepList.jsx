import PropTypes from 'prop-types';

import cn from '@/lib/cn';
import Icon from '@/components/ui/Icon';
import { getIconComponent } from '@/components/icons/map';

function StepIcon({ icon }) {
  if (!icon) return null;

  if (typeof icon === 'string') {
    return <Icon name={icon} />;
  }

  if (typeof icon === 'function') {
    const IconComponent = icon;
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sustain-primary/10 text-sustain-primary">
        <IconComponent className="h-5 w-5" aria-hidden />
      </span>
    );
  }

  const IconComponent = getIconComponent(icon?.name ?? icon?.icon);

  if (IconComponent) {
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sustain-primary/10 text-sustain-primary">
        <IconComponent className="h-5 w-5" aria-hidden />
      </span>
    );
  }

  if (typeof icon === 'object') {
    return icon;
  }

  return null;
}

export default function StepList({ steps = [], className = '' }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <ol
      className={cn(
        'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
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
        const iconNode = iconValue ? <StepIcon icon={iconValue} /> : null;
        const stepNumber = normalizedStep?.stepNumber ?? index + 1;
        return (
          <li
            key={title ?? description ?? index}
            className="flex h-full w-full flex-col gap-3 rounded-card rounded-2xl border border-sustain-cardBorder bg-sustain-cardBg p-4 shadow-md md:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sustain-primary text-sm font-semibold text-white">
                {String(stepNumber).padStart(2, '0')}
              </span>
              {iconNode ? iconNode : null}
              {title ? <p className="font-medium text-sustain-textMain">{title}</p> : null}
            </div>
            {description ? (
              <p className="text-sm leading-relaxed text-sustain-textMuted">{description}</p>
            ) : null}
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

StepIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.shape({ name: PropTypes.string }),
  ]),
};
