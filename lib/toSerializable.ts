export const toSerializable = <T,>(obj: T): T =>
  JSON.parse(
    JSON.stringify(obj, (_k, v) => (v === undefined ? null : v))
  );

export default toSerializable;
