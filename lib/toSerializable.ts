export function toSerializable<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, nested) => {
      if (nested === undefined) {
        return null;
      }

      return nested;
    })
  );
}

export default toSerializable;
