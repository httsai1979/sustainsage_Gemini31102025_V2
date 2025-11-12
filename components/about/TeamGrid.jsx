import PropTypes from 'prop-types';
import Image from 'next/image';

function TeamCard({ member }) {
  const { name, title, bio, languages, location, image } = member ?? {};

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-5">
      <div className="flex items-start gap-4">
        {image?.src ? (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-emerald-100">
            <Image
              src={image.src}
              alt={image.alt ?? name ?? ''}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div>
          {name ? (
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{name}</h3>
          ) : null}
          {title ? <p className="text-sm font-medium text-emerald-700">{title}</p> : null}
          {location ? <p className="mt-1 text-xs text-slate-500">{location}</p> : null}
        </div>
      </div>
      {bio ? <p className="text-sm leading-6 text-slate-700">{bio}</p> : null}
      {languages?.length ? (
        <div className="mt-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
          {languages.join(' · ')}
        </div>
      ) : null}
    </article>
  );
}

const memberShape = {
  name: PropTypes.string,
  title: PropTypes.string,
  bio: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

TeamCard.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
};

export default function TeamGrid({ data }) {
  const list = data?.members ?? data?.people ?? [];
  if (!list.length) return null;

  return (
    <section className="bg-emerald-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 text-white">
        {data?.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{data.eyebrow}</p>
        ) : null}
        {data?.title ? (
          <h2 className="mt-2 scroll-mt-24 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {data.title}
          </h2>
        ) : null}
        {data?.description ? (
          <p className="mt-4 text-base leading-7 text-emerald-100">{data.description}</p>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {list.map((member) => (
            <TeamCard key={member.name ?? member.title} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

TeamGrid.propTypes = {
  data: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape(memberShape)),
    people: PropTypes.arrayOf(PropTypes.shape(memberShape)),
  }),
};

TeamGrid.defaultProps = {
  data: undefined,
};
