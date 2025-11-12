export const toSerializable = <T,>(obj: T): T =>
  JSON.parse(
    JSON.stringify(obj, (_k, v) => (v === undefined ? null : v))
  );

export const sanitizeProps = <T,>(props: T): T => toSerializable(props);

export default toSerializable;
