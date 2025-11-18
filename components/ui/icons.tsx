import type { ComponentType, SVGProps } from 'react';
import {
  ArrowsPointingInIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HandThumbUpIcon,
  MapIcon,
  PhoneArrowUpRightIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export type IconName =
  | 'book'
  | 'briefcase'
  | 'calendar'
  | 'chat'
  | 'clock'
  | 'compass'
  | 'consent'
  | 'family'
  | 'globe'
  | 'handshake'
  | 'note'
  | 'phone'
  | 'privacy'
  | 'question'
  | 'spark'
  | 'target'
  | 'tool'
  | 'mail'
  | 'headphones'
  | 'video';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<IconName, IconComponent> = {
  book: BookOpenIcon,
  briefcase: BriefcaseIcon,
  calendar: CalendarDaysIcon,
  chat: ChatBubbleLeftRightIcon,
  clock: ClockIcon,
  compass: MapIcon,
  consent: ShieldCheckIcon,
  family: UserGroupIcon,
  globe: GlobeAltIcon,
  handshake: HandThumbUpIcon,
  note: DocumentTextIcon,
  phone: PhoneArrowUpRightIcon,
  privacy: ShieldCheckIcon,
  question: QuestionMarkCircleIcon,
  spark: SparklesIcon,
  target: ArrowsPointingInIcon,
  tool: WrenchScrewdriverIcon,
  mail: EnvelopeIcon,
  headphones: SpeakerWaveIcon,
  video: PlayCircleIcon,
};

export function getLucideIcon(name?: string | null): IconComponent | null {
  if (!name || typeof name !== 'string') {
    return null;
  }

  const normalized = name.trim().toLowerCase() as IconName;
  return iconMap[normalized] ?? null;
}
