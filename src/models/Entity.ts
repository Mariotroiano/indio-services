import { Factory } from 'utils/Factory';
import { pick } from 'lodash';

export class Entity {
  id: string;

  static new(entity?: Entity): Entity {
    throw new Error('Not implemented');
  }

  static toJSON(entity: Entity): string {
    throw new Error('Not implemented');
  }

  static parse(json: string): Entity {
    throw new Error('Not implemented');
  }

  protected static getNew<E>(ctor: Ctor<E>) {
    function method(order: Partial<E>) {
      const instance = Factory.create(ctor, order, true);
      return instance;
    }
    return method;
  }

  protected static getToJSON<E, K extends keyof E>(ctor: Ctor<E>, keys?: K[]) {
    function method(entity: E) {
      const partial = pick(entity, ['id', ...keys]);
      const result = JSON.stringify(partial);
      return result;
    }
    return method;
  }

  protected static getParse<E>(ctor: Ctor<E>) {
    function method(json: string) {
      const obj = JSON.parse(json);
      const result = Factory.create(ctor, obj, true);
      return result;
    }
    return method;
  }
}

type Ctor<T> = new (...args: any[]) => T;
