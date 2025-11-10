import { createElement } from 'react';
import type { ReactElement, ReactNode, SVGProps } from 'react';

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

type IconDefinitions = Record<string, IconComponent>;

const baseAttributes: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

function createIcon(children: ReactNode, displayName: string): IconComponent {
  const Icon = (props: SVGProps<SVGSVGElement>) =>
    createElement('svg', { ...baseAttributes, ...props }, children);

  Icon.displayName = displayName;

  return Icon;
}

export const ICONS = {
  arrow: createIcon([
    createElement('path', { d: 'M5 12h14', key: 'shaft' }),
    createElement('path', { d: 'm13 6 6 6-6 6', key: 'head' }),
  ], 'ArrowIcon'),
  book: createIcon([
    createElement('path', { d: 'M5 5.5c1.8-.5 3.7-.5 5.5 0v13.5c-1.8-.5-3.7-.5-5.5 0V5.5z', key: 'left' }),
    createElement('path', { d: 'M18.5 5.5c-1.8-.5-3.7-.5-5.5 0v13.5c1.8-.5 3.7-.5 5.5 0V5.5z', key: 'right' }),
  ], 'BookIcon'),
  calendar: createIcon([
    createElement('rect', { x: 4, y: 5, width: 16, height: 15, rx: 2, key: 'frame' }),
    createElement('path', { d: 'M8 3v4', key: 'left-hinge' }),
    createElement('path', { d: 'M16 3v4', key: 'right-hinge' }),
    createElement('path', { d: 'M4 10h16', key: 'separator' }),
    createElement('path', { d: 'm9 14 2 2 4-4', key: 'check' }),
  ], 'CalendarIcon'),
  clock: createIcon([
    createElement('circle', { cx: 12, cy: 12, r: 9, key: 'outline' }),
    createElement('path', { d: 'M12 7.5v5l3 1.5', key: 'hands' }),
  ], 'ClockIcon'),
  compass: createIcon([
    createElement('circle', { cx: 12, cy: 12, r: 9, key: 'outline' }),
    createElement('path', { d: 'M15.5 8.5 13 13l-4.5 2.5L11 11z', key: 'needle' }),
    createElement('circle', { cx: 12, cy: 12, r: 1, fill: 'currentColor', stroke: 'none', key: 'center' }),
  ], 'CompassIcon'),
  consent: createIcon([
    createElement('circle', { cx: 12, cy: 12, r: 9, key: 'outline' }),
    createElement('path', { d: 'm9 12 2 2 4-5', key: 'check' }),
  ], 'ConsentIcon'),
  handshake: createIcon([
    createElement('path', { d: 'M5 10.5 8.5 7H12l3 3h4', key: 'top' }),
    createElement('path', { d: 'm5 10.5 4.5 4.5L12 13l3 2.5 2.5-2', key: 'bottom' }),
    createElement('path', { d: 'M7.5 15.5 6 17', key: 'left-thumb' }),
    createElement('path', { d: 'M15 15.5 16.5 17', key: 'right-thumb' }),
  ], 'HandshakeIcon'),
  mail: createIcon([
    createElement('rect', { x: 4, y: 6, width: 16, height: 12, rx: 1.5, key: 'envelope' }),
    createElement('path', { d: 'm5 7 7 6 7-6', key: 'flap' }),
  ], 'MailIcon'),
  note: createIcon([
    createElement('path', { d: 'M7 4.5h7.5L19 9v10.5a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5z', key: 'page' }),
    createElement('path', { d: 'M14.5 4.5v4a.5.5 0 0 0 .5.5h4', key: 'fold' }),
    createElement('path', { d: 'M9 12h6', key: 'line-1' }),
    createElement('path', { d: 'M9 15h6', key: 'line-2' }),
  ], 'NoteIcon'),
  phone: createIcon([
    createElement('path', {
      d: 'M8 4h2.2a1.5 1.5 0 0 1 1.5 1.3l.3 2a1.5 1.5 0 0 1-.4 1.2L10.5 10a11 11 0 0 0 3.5 3.5l1.5-1.1a1.5 1.5 0 0 1 1.2-.4l2 .3a1.5 1.5 0 0 1 1.3 1.5V18a2 2 0 0 1-2.2 2 15 15 0 0 1-13-13A2 2 0 0 1 8 4z',
      key: 'handset',
    }),
  ], 'PhoneIcon'),
  privacy: createIcon([
    createElement('path', { d: 'M12 3 5.5 6v5c0 4.1 2.8 7.8 6.5 9 3.7-1.2 6.5-4.9 6.5-9V6L12 3z', key: 'shield' }),
    createElement('rect', { x: 9.5, y: 11, width: 5, height: 4.5, rx: 1.5, key: 'lock-body' }),
    createElement('path', { d: 'M12 11V9.5a1.5 1.5 0 0 1 3 0V11', key: 'lock-shackle' }),
  ], 'PrivacyIcon'),
  target: createIcon([
    createElement('circle', { cx: 12, cy: 12, r: 9, key: 'outer' }),
    createElement('circle', { cx: 12, cy: 12, r: 4.5, key: 'inner' }),
    createElement('path', { d: 'M12 7.5v3', key: 'vertical' }),
    createElement('path', { d: 'M9 12h3', key: 'horizontal' }),
  ], 'TargetIcon'),
} as const satisfies IconDefinitions;

export type IconKey = keyof typeof ICONS;

export function getIconComponent(key?: string | null): IconComponent | null {
  if (typeof key !== 'string') {
    return null;
  }

  const normalized = key.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  return ICONS[normalized as IconKey] ?? null;
}

export type { IconComponent };
