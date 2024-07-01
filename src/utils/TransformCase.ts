import { camelCase, isArray, isObject, snakeCase, transform } from 'lodash';

export function toCamelCase(obj: Record<string, unknown>) {
  const result = transform(obj, (result: Record<string, unknown>, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    result[camelKey] = isObject(value) ? toCamelCase(value as Record<string, unknown>) : value;
  });
  return result;
};

export function toSnakeCase(obj: any) {
  const result = transform(obj, (result: any, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : snakeCase(key).replace(/_(\d)/, '$1');
    result[camelKey] = isObject(value) ? toSnakeCase(value) : value;
  });
  return result;
};
