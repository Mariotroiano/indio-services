import { isDev } from 'config';
import { camelCase, upperFirst } from 'lodash';
import { TableInstance } from 'services/TableInstance';

export function logEntity(data: any | any[], url: string) {
  if (!isDev) return;

  const groupName = decodeURIComponent(url);
  console.groupCollapsed(`get: ${groupName}`);
  logType(data, url);
  console.groupEnd();
};

export function logType(data: any | any[], url: string) {
  const item = Array.isArray(data) ? data[0] : data;
  const lastSegment = url.match(/\/(\w+)\??/).slice(-1)[0];
  const resourceName = upperFirst(camelCase(lastSegment));
  const type = `type ${resourceName} = ${getBodyDefinition(item)}`;
  console.log(type)
};

function getBodyDefinition(payload: any | any[]) {
  const entity = Array.isArray(payload) ? payload[0] : payload;
  if (!entity) return;

  const entityKeys = Object.keys(entity);
  const idKeys = entityKeys.filter(x => x.match(/id$/i)).sort((a,b) => a.length - b.length);
  const keys = idKeys.concat(entityKeys.filter(k => !idKeys.includes(k)));
  const types = keys.map(key => getType(entity[key], key));
  const lines = keys.map((k,i) => `  ${k}: ${types[i]};`).join('\n');
  const result = `{\n${lines}\n}`;
  return result;
};

function getType(value: any, key?: string) {
  let type: string;
  const boxedType = Object.prototype.toString.call(value);
  type = boxedType.replace(/\[object (\w+)\]/, '$1');
  if (type === 'Object') {
    type = inferredClassName(key);
  }
  else if (type === 'Array') {
    const inferredName = getType(value[0], key);
    type = `${inferredName}[]`;
  }
  else if (['Null', 'Undefined'].includes(type)) {
    type = 'any';
  }
  else {
    type = type.toLowerCase();
  }
  return type;
}

function inferredClassName(key: string) {
  const singular = key.replace(/ies$/, 'y').replace(/s$/, '');
  const guessedName = upperFirst(singular);
  return guessedName;
}

export function logTable<T>(table: TableInstance, resourceName: string, entities: T[]) {
  if (!isDev) return;
  const resource = '/' + resourceName.padEnd(30);
  const { current, pageSize, total } = table.pagination;
  console.groupCollapsed(`find: ${resource} - [${current}, ${pageSize}, ${total}]`);
  if (entities.length > 0) {
    const cols = Object.keys(entities[0]);
    console.table(entities, cols);
    logType(entities, resource);
  }
  console.groupEnd();
}
