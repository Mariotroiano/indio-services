import { pick, merge } from 'lodash';

type ClassConstructor<T> = { new (...args: any[]): T };

export class Factory {
  static create<T>(ctor: ClassConstructor<T>, object?: Partial<T>, removeEmptyProps?: boolean) {
    const instance = new ctor();
    const keys = Object.keys(instance);
    if (object) {
      const props = pick(object, keys);
      merge(instance, props);
    };
    if (removeEmptyProps) {
      const props = keys.filter(key => instance[key] === undefined);
      props.forEach(key =>
        delete instance[key]
      );
    }
    return instance;
  }
}
