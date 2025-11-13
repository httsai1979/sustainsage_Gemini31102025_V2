import PropTypes from "prop-types";
import clsx from "clsx";

export default function PageSection({ id, className, eyebrow, title, lead, children }) {
  return (
    <section id={id} className={clsx("py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {(eyebrow || title || lead) && (
          <header className="mb-6 sm:mb-8">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">{title}</h2>
            ) : null}
            {lead ? <p className="mt-2 text-base sm:text-lg text-slate-700">{lead}</p> : null}
          </header>
        )}
        <div className="typography">{children}</div>
      </div>
    </section>
  );
}

PageSection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  lead: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};
