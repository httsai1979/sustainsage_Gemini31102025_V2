import PropTypes from "prop-types";
export default function Prose({ children }) {
  return <div className="typography">{children}</div>;
}
Prose.propTypes = { children: PropTypes.node };
