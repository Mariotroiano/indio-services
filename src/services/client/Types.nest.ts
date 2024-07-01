import { TableInstance } from 'services/TableInstance';

export interface Service<T> {
  find(params: Params): Promise<T[]>;
  find(...args: Args): Promise<T[]>;

  findForTable(table: TableInstance, params: Params): Promise<T[]>;
  findForTable(table: TableInstance, ...args: Args): Promise<T[]>;

  findOne(): Promise<T>;
  getById(id: string, params?: Params): Promise<T>;
  // getAll(params?: Params): Promise<T[]>;
  createOrUpdate(payload?: T): Promise<T>;
  updatePartial(id: string, payload: Partial<T>): Promise<T>;
}

export type EntityCtor<T = unknown> = new (...args: any[]) => T;

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

export type Params = {
  q?: string,
  sort?: string,
  pageNumber?: number,
  pageSize?: number,
  [k: string]: any
}

export type Args = [arg1?: any, arg2?: any, arg3?: any];
