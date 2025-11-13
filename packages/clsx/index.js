function toValue(value) {
  if (!value) return '';
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(toValue).filter(Boolean).join(' ');
  }
  if (typeof value === 'object') {
    return Object.keys(value)
      .filter((key) => Boolean(value[key]))
      .join(' ');
  }
  return '';
}

function clsx(...inputs) {
  return inputs.map(toValue).filter(Boolean).join(' ');
}

module.exports = clsx;
module.exports.clsx = clsx;
module.exports.default = clsx;
