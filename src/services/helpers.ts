export type Static<T> = Ctor<T> & KeyOf<T>;

type KeyOf<T> = {
  [K in keyof T]: T[K];
}
type Ctor<T> = {
  new (...args: any[]): T
}

export function bindMethods<T>(service: T) {
  const proto = Object.getPrototypeOf(service)
  const clone = Object.create(proto);

  for (const name of getMethodNames(service)) {
    const method = service[name];
    clone[name] = method.bind(service);
  }
  return clone as Static<T>;
}

export function staticWrapper<T>(instance: T) {
  const proto = Object.getPrototypeOf(instance)
  const instanceClone = Object.create(proto);

  for (const name of getMethodNames(instance)) {
    const method = instance[name];
    instanceClone[name] = buildWrapper(method, (...args: any[]) => method.apply(instance, args));
  }
  return instanceClone as Static<T>;
}

function buildWrapper(method: Function, wrapper: Function) {
  const asyncFunc = async function asyncFunc() {
    return await wrapper(...arguments);
  }
  const func = function func() {
    return wrapper(...arguments);
  }
  const isAsync = (method.constructor.name === AsyncFunction.name);
  const result = (isAsync ? asyncFunc : func);
  return result;
}

const AsyncFunction = (async function () {}).constructor as new (...args: string[]) => Promise<any>;

function getMethodNames(obj: any) {
  const properties = new Set<string>();
  let currentObj = obj;
  do {
    const names = Object.getOwnPropertyNames(currentObj);
    names.forEach(item => properties.add(item));
    currentObj = Object.getPrototypeOf(currentObj);
  } while (currentObj.constructor.name !== Object.name);

  let keys = [...properties.keys()];
  keys = keys.filter(item => typeof obj[item] === 'function');

  return keys;
}

export function createStaticClassWrapper<T extends object>(service: T) {
  type Static<T> = {
    [K in keyof T]: T[K];
  } & {
    new (...args: any[]): any
  };
  const proto = Object.getPrototypeOf(service)
  const clone = Object.create(proto);

  for (const name of getMethodNames(service)) {
    const method = service[name];
    clone[name] = method.bind(service);
  }
  return clone as Static<T>;
}
