export type ClassConstructor<T = any> = {
  new (...args: any[]): T;
};

export type Payload = {
  id: string,
}

type ApiRecord = {
  id: string,
  [k: string]: any
}

export type Data = ApiRecord[] | ApiRecord;

export type Response = {
  data: Data,
  total: number,
}

export type GenericParams = {
  [k: string]: string | Filter,
  filter?: Filter,
}

export type Operator = 'contains' | 'eq';

export type Paging = {
  number?: number,
  size?: number,
}

export type Filter = {
  [k: string]: any;
  q?: {
    [k in Operator]?: string;
  },
}

export type Args = [arg1?: any, arg2?: any, arg3?: any];

export class JsonApiParams {
  sort?: string;
  page?: Paging;
  filter?: Filter;
  include?: string;
  extra_fields?: any;

  static new(params: Partial<JsonApiParams>) {
    const instance = new this();
    Object.assign(instance, params);
    Object.keys(instance).forEach(key => {
      if (instance[key] === undefined) {
        delete instance[key];
      }
    });
    return instance;
  }
}
