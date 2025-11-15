import cn from '@/lib/cn';
import { useTheme } from './ThemeProvider';

type ThemeToggleProps = {
  className?: string;
  variant?: 'default' | 'compact';
};

export default function ThemeToggle({ className, variant = 'default' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const baseClasses =
    'inline-flex items-center rounded-full border border-sustain-cardBorder bg-sustain-surface/80 text-xs font-semibold text-sustain-text shadow-sm transition-colors hover:bg-sustain-surface dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark/70 dark:text-sustain-text-dark dark:hover:bg-sustain-surface-dark';
  const sizeClasses = variant === 'compact' ? 'px-2.5 py-1 text-[0.75rem]' : 'px-3 py-1.5';

  const label = isDark ? 'Light' : 'Dark';
  const icon = isDark ? '☀️' : '🌙';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(baseClasses, sizeClasses, className)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden className="mr-1 text-sm">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
