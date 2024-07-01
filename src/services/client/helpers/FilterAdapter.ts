import { isArray, isObject, snakeCase } from 'lodash';
import { Filter, GenericParams, JsonApiParams } from '../Types';

export function FilterAdapter() { }

FilterAdapter.adapt = function (params: GenericParams | JsonApiParams) {
  let result: JsonApiParams;
  if (params) {
    result = Object.keys(params).reduce((acc, key) => {
      acc[key] = convertKeysToSnakeCase(params[key]);
      return acc;
    }, {});
  }
  return result;
};

function convertKeysToSnakeCase(object: string | Filter) {
  let result = object;
  if (isArray(object)) {
    result = object.join(',');
  }
  else if (isObject(object)) {
    result = Object.keys(object).reduce((acc, key) => {
      const snakeCaseKey = snakeCase(key);
      acc[snakeCaseKey] = convertKeysToSnakeCase(object[key]);
      return acc;
    }, {});
  }
  return result;
}
