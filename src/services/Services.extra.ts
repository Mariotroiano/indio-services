import { Static, bindMethods } from './helpers';

type Constructable = new (...args: any[]) => any;

type AllStaticInstances<T> = {
  [P in keyof T]: T[P] extends Constructable ? Static<InstanceType<T[P]>> : never;
};

export type ServiceProps<T> = AllStaticInstances<T> & {
  new(...args: any[]): any;
};

export function construct(target: any, ax: any) {
  try {
    const instance = new target(ax);
    const wrappedInstance = bindMethods(instance);
    addProp(wrappedInstance, 'lastStats', instance);
    return wrappedInstance;
  }
  catch {
    console.error('Error trying to construct ' + target.name);
  }
}

export function mapProps<T, R>(object: T, fieldFunc: (value: keyof T) => R) {
  const entries = Object.keys(object).map(
    (key) => [key, fieldFunc(object[key])]
  );
  const result = Object.fromEntries(entries);
  return result;
}

function addProp<T>(object: any, name: string, instance: T) {
  Object.defineProperty(object, name, {
    get: () => instance[name],
    enumerable: true,
    configurable: true,
  });
}
