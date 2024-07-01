import { MiniClient, MiniPark, MiniUser } from '../interfaces/SessionEntities';
import { Role } from '../interfaces/Role';
const wss = window.sessionStorage;

class SessionKeys {
  static get client() { return getItem('client', MiniClient) }
  static get user() { return getItem('user', MiniUser) }
  static get park() { return getItem('park', MiniPark) }
  static get role() { return getItem<Role>('role') }
  static get token() { return getItem('token') }
  static saveLastPath() { return setItem('lastPathname', window.location.pathname) }
}

class SessionStorage extends SessionKeys {
  static getItem<T = string>(key: string, ctor?: Ctor<T>): T {
    return getItem(key, ctor);
  }

  static setItem<T = string>(key: string, value: T, ctor?: Ctor<T>) {
    return setItem(key, value, ctor);
  }

  static removeItem(key: string) {
    wss.removeItem(key);
  }

  static clear(keepKeys?: string[]) {
    const values = keepKeys?.map(key => wss.getItem(key));
    wss.clear();
    keepKeys.forEach((key, idx) => {
      if (values[idx]) {
        wss.setItem(key, values[idx])
      }
    });
  }
}

function getItem<T = string>(key: string, ctor?: Ctor<T>): T {
  const value = wss.getItem(key);
  let entity = null;
  if (value) {
    if (ctor?.fromJSON) {
      entity = ctor.fromJSON(value);
    }
    else if (ctor?.prototype) {
      entity = Object.create(ctor.prototype);
      Object.assign(entity, JSON.parse(value));
    }
    else {
      entity = castNonValue(value);
    }
  }
  return entity;
}

function setItem<T = string>(key: string, value: T, ctor?: Ctor<T>) {
  let json = '';
  ctor = ctor ?? value ? Object.getPrototypeOf(value).constructor : null;
  if (isString(value)) {
    json = value;
  }
  else if (ctor?.toJSON) {
    json = ctor.toJSON(value);
  }
  else {
    json = JSON.stringify(value);
  }
  wss.setItem(key, json);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function castNonValue(value: any) {
  return value === 'null' ? null : value === 'undefined' ? undefined : value;
}

type Ctor<T> = {
  new (...args: any[]): T;
  fromJSON?: (value: string) => T;
  toJSON?: (value: T) => string;
}

export default SessionStorage;
