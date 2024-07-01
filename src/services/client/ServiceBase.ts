import { TableInstance } from 'services/TableInstance';
import { JsonApiClient } from './JsonApiClient';
import { ClassConstructor, JsonApiParams, Payload } from './Types';
import { AxiosInstance } from 'axios';

export class ServiceBase<T extends Payload> {
  protected _client: JsonApiClient<T>;
  protected defaultSort: string;
  protected include: string;

  protected get client() : JsonApiClient<T> {
    return this._client;
  }

  constructor(ctor: ClassConstructor<T>, options: Options);
  constructor(ctor: ClassConstructor<T>, api: AxiosInstance, resourceName: string);
  constructor(ctor: ClassConstructor<T>, arg2?: any, arg3?: any) {
    const options = arg2 as Options;
    let { axios, resourceName } = options.axios ? options : { axios: arg2, resourceName: arg3 };
    this._client = new JsonApiClient(ctor, axios, resourceName);
    this.defaultSort = options.defaultSort;
    this.include = options.includes;
  }

  getById = async (id: string) => {
    const result = await this.client.getById(id);
    return result;
  }

  createOrUpdate = async (entity: T) => {
    const result = await this.client.createOrUpdate(entity, this.include);
    return result;
  }

  updatePartial = async (id: string, entity: Partial<T>) => {
    const result = await this.client.updatePartial(id, entity);
    return result;
  }

  bulkPartialUpdate = async (ids: string[], fields: Partial<T>) => {
    const promises = ids.map(async id => {
      await this.client.updatePartial(id, { id, ...fields });
    });
    await Promise.all(promises);
  }

  find = async (params?: JsonApiParams) => {
    const { entities } = await this.client.find2(params);
    return entities;
  }

  findForTable = async (table: TableInstance, parkId: string) => {
    const params = JsonApiParams.new({ filter: { parkId } });
    const { pagination, sorting, search } = table;
    const { setLoading, setPagination } = table.setters;
    params.page = { size: pagination.pageSize, number: pagination.current };
    params.sort = this.defaultSort;

    if (search) {
      params.filter = { ...params.filter, q: { contains: search } };
    }
    if (sorting) {
      const dir = (sorting.order.startsWith('desc') ? '-' : '');
      params.sort = dir + sorting.field;
    }
    setLoading(true);
    const { entities, total } = await this.client.find2(params);
    setLoading(false);
    setPagination({ ...table.pagination, total: total });
    return entities;
  }

  delete = async (id: string) => {
    await this.client.delete(id);
  }

  protected async getAllBy<K>(entityWithId: WithId<K>, search?: string, size?: number, sort?: string) {
    size = size ?? 200;
    sort = sort ?? '-created_at';
    const params = JsonApiParams.new({
      filter: { ...entityWithId },
      page: { number: 1, size: size },
      sort: sort,
    });
    if (search) {
      params.filter.q = { contains: search };
    }
    const result = await this.client.getAll(params);
    return result;
  }

  protected async get<P>(url: string) {
    return await this.client.get<P>(url);
  }
  protected async post<P>(url: string, payload: any) {
    return await this.client.post<P>(url, payload);
  }
  protected async patch(url: string, payload: any) {
    return await this.client.patch(url, payload);
  }
  protected async delete2(id: string) {
    return await this.client.delete(id);
  }
}

type WithId<T> = {
  [K in keyof T as T[K] extends `${string}Id` ? K : never]: string;
};

type Options = {
  axios: AxiosInstance,
  resourceName: string,
  defaultSort?: string,
  includes?: string,
}
