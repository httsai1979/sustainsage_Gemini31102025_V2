import ContentHero from '@/components/content/ContentHero';

export default function AboutHero(props) {
  return <ContentHero {...props} hero={{ ...props.hero, id: 'about-hero' }} />;
}
