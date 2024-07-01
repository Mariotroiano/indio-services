import { AxiosInstance } from 'axios';
import { TableInstance } from 'services/TableInstance';
import { isObject } from 'lodash';
import { logEntity, plainToInstance } from './helpers';
import { Data, Payload, Response, EntityCtor, Params, Args, Service } from './Types.nest';

export class RestClient<T extends Payload> implements Service<T> {
  private api: AxiosInstance;
  private entityCtor: EntityCtor<T>;
  private entityName: string;
  private path: string;

  constructor(ctor: EntityCtor<T>, api: AxiosInstance, name: string, path?: string) {
    this.api = api;
    this.entityCtor = ctor;
    this.entityName = name;
    this.path = path || '';
  }

  private getUrl(params?: Params, id?: string) {
    const { entityName, path } = this;
    const query = new URLSearchParams(params);

    const str = [`${path}/${entityName}`];
    id && str.push(`/${id}`);
    params && str.push(`?${query}`);
    const url = str.join('');
    return url;
  }

  private async getData(params?: Params) {
    const { api, entityCtor } = this;
    const url = this.getUrl(params);
    const response = await api.get<Response>(url);
    const { data, total } = response.data;
    logEntity(data, url);
    const array = Array.isArray(data) ? data : [data];
    const entities = plainToInstance(entityCtor, array);
    return { entities, total };
  }

  async find(params: Params): Promise<T[]>;
  async find(...args: Args): Promise<T[]>;
  async find(params?: Params) {
    const { entities } = await this.getData(params);
    return entities;
  }

  async findForTable(table: TableInstance, params: Params): Promise<T[]>;
  async findForTable(table: TableInstance, ...args: Args): Promise<T[]>;
  async findForTable(table: TableInstance, params?: Params) {
    const { pagination, sorting } = table;
    const { setLoading, setPagination } = table.setters;
    const allParams = { ...params, pageSize: pagination.pageSize, pageNumber: pagination.current };
    if (sorting) {
      allParams.sort = (sorting.order.startsWith('desc') ? '-' : '') + sorting.field;
    }
    setLoading(true);
    const { entities, total } = await this.getData(allParams);
    setLoading(false);
    setPagination({ ...table.pagination, total: total });
    return entities;
  }

  async findOne() {
    const result = await this.getData();
    const data = result.entities;
    const entity = Array.isArray(data) ? data[0] : data;
    return entity;
  }

  async getById(id: string, params?: Params) {
    const { api, entityCtor } = this;
    const url = this.getUrl(params, id);
    const response = await api.get<Response>(url);
    const data = response.data.data;
    const entities = plainToInstance(entityCtor, data);
    return entities;
  }

  async getAll(params?: Params) {
    const query = {
      ...params,
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 200,
    };
    const data = await this.find(query);
    return data;
  }

  async createOrUpdate(payload?: T) {
    const { api, entityCtor, entityName } = this;
    let data: Data;
    if (payload.id) {
      const response = await api.put<Response>(`${entityName}/${payload.id}`, payload);
      data = response.data.data;
    }
    else {
      const response = await api.post<Response>(`${entityName}`, payload);
      data = response.data.data;
    }
    if (isObject(data)) {
      const entities = plainToInstance(entityCtor, data);
      return entities;
    }
  }

  async updatePartial(id: string, payload: Partial<T>) {
    const { api, entityCtor, entityName } = this;
    const response = await api.patch<Response>(`${entityName}/${id}`, payload);
    const data = response.data.data;
    const entities = plainToInstance(entityCtor, data);
    return entities;
  }

  protected async get<P extends T>(url: string, params: any, entityCtor: EntityCtor<P>) {
    const response = await this.api.get<Response>(url);
    const data = response.data.data;
    const output = plainToInstance(entityCtor, data);
    return output;
  }

  protected async post<P extends T>(url: string, payload: any, entityCtor: EntityCtor<P>) {
    const reqURL = url ?? this.getUrl();
    const response = await this.api.post<Response>(reqURL, payload);
    const data = response.data.data;
    const output = plainToInstance(entityCtor, data);
    return output;
  }
}
