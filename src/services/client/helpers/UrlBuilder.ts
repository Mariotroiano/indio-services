import { get, isEmpty } from 'lodash';
import { JsonApiParams } from '../Types';

export function UrlBuilder() {};

UrlBuilder.build = function (resourceName: string, path: string, params?: JsonApiParams, id?: string) {
  const arr = [`${path}/${resourceName}`];
  hasValue(id) && arr.push(`/${id}`);
  hasValue(params) && arr.push(`?${stringifyParams(params)}`);

  const url = arr.join('');
  return url;
};

const hasValue = (value: any) => (
  value !== null && value !== undefined && !isEmpty(value)
);

function stringifyParams(params: any) {
  if (!params) return '';

  const pathKeys = getPathKeys(params);
  const convert = (path: string) => {
    const segments = path.split('.');
    const result = segments[0] + segments.slice(1).map(seg => `[${seg}]`).join('');
    return result;
  };
  const items = pathKeys.map(path => [convert(path), get(params, path)?.toString()]);
  const filtered = items.filter(([_, val]) => val?.length > 0);
  const result = filtered.map(([key, val]) => `${key}=${encodeURIQuery(val)}`).join('&');
  return result;
}

function encodeURIQuery(str: string) {
  const result = encodeURI(str).replace(/[/?&=]/g, getHex);
  return result;
}

const getHex = (char: string) => '%' + char.charCodeAt(0).toString(16).toUpperCase();

function getPathKeys(object: any) {
  const keys = Object.keys(object);
  const paths: string[] = [];
  for (const key of keys) {
    const value = object[key];
    if (typeof value === 'object') {
      const subKeys = getPathKeys(value);
      const subPaths = subKeys.map(sk => `${key}.${sk}`);
      paths.push(...subPaths);
    }
    else {
      paths.push(key);
    } 
  }
  return paths;
}
