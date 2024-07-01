import { AxiosInstance, Method } from 'axios';
import { Serializer } from 'jsonapi-serializer';
import { Deserializer } from 'jsonapi-serializer';
import { adaptFilter, buildUrl, logEntity, logTable, plainToInstance } from './helpers';
import { Payload, Response, ClassConstructor, GenericParams, JsonApiParams, Args } from './Types';
import { TableInstance } from 'services/TableInstance';

export class JsonApiClient<T extends Payload> {
  private api: AxiosInstance;
  private entityCtor: ClassConstructor<T>;
  private resourceName: string;
  private path: string;
  private serializer: any;
  private deserializer: any;
  public lastStats: any;

  constructor(ctor: ClassConstructor<T>, api: AxiosInstance, resourceName: string, path?: string) {
    this.api = api;
    this.entityCtor = ctor;
    this.resourceName = resourceName;
    this.path = path ?? '';
    const attributes = Object.keys(new ctor());
    this.serializer = new Serializer(resourceName, { attributes, keyForAttribute: 'snake_case' });
    this.deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
  }

  private getUrl(params?: JsonApiParams, id?: string) {
    const { resourceName, path } = this;
    const url = buildUrl(resourceName, path, params, id);
    return url;
  }

  private async getData(params?: JsonApiParams) {
    const { api, deserializer, entityCtor } = this;
    const url = this.getUrl(params);
    const response = await api.get(url);
    const data = await deserializer.deserialize(response.data);
    // logEntity(data, url);
    const { total, stats } = response.data.meta;
    this.lastStats = stats;
    const array = Array.isArray(data) ? data : [data];
    const entities = plainToInstance(entityCtor, array);
    return { entities, total };
  }

  async find(params?: GenericParams) {
    const filter = params ?? null;
    const jsonParams = adaptFilter(filter);
    const { entities } = await this.getData(jsonParams);
    return entities;
  }

  async find2(params?: JsonApiParams) {
    const filter = params ?? null;
    const jsonParams = adaptFilter(filter);
    return this.getData(jsonParams);
  }

  async findForTable(table: TableInstance, genParams: GenericParams) {
    const params = adaptFilter(genParams);
    const { pagination, sorting, search } = table;
    const { setLoading, setPagination } = table.setters;
    params.page = { size: pagination.pageSize, number: pagination.current };

    if (search) {
      params.filter = {...params.filter, q: { contains: search }};
    }
    if (sorting) {
      const dir = (sorting.order.startsWith('desc') ? '-' : '');
      params.sort = dir + sorting.field;
    }
    setLoading(true);
    const { entities, total } = await this.getData(params);
    setLoading(false);
    setPagination({ ...table.pagination, total: total });
    logTable(table, this.resourceName, entities);
    return entities;
  }

  async findOne(...args: Args) {
    const [filter] = args ?? [];
    const jsonParams = adaptFilter(filter);
    const result = await this.getData(jsonParams);
    const data = result.entities;
    const entity = Array.isArray(data) ? data[0] : data;
    return entity;
  }

  async getById(id: string): Promise<T>;
  async getById(id: string, params: JsonApiParams): Promise<T>;
  async getById(id: string, params?: JsonApiParams) {
    const { api, deserializer, entityCtor } = this;
    const url = this.getUrl(params, id);
    const response = await api.get(url);
    const data = await deserializer.deserialize(response.data);
    logEntity(data, url);
    const entities = plainToInstance(entityCtor, data);
    return entities;
  }

  async getAll(entityId: string, search?: string): Promise<T[]>;
  async getAll(params?: JsonApiParams): Promise<T[]>;
  async getAll(...args: any[]): Promise<T[]> {
    let params: JsonApiParams = args[0];
    params = params && adaptFilter(params);
    const number = params?.page?.number ?? 1;
    const size = 200;
    const newParams: JsonApiParams = {
      page: { number, size },
      filter: { active: true },
      ...params,
    };
    const data = await this.getData(newParams);
    // logEntity(data, this.getUrl(params));
    return data.entities;
  }

  async createOrUpdate(payload?: T, include?: string) {
    const response = !payload.id
      ? await this.create(payload, include)
      : await this.update(payload.id, payload, include);

    return response;
  }

  async create(payload?: T, include?: string) {
    const url = this.getUrl({ include });
    return this.executeRequest(url, 'POST', payload);
  }

  async update(id: string, payload: Partial<T>, include?: string) {
    const url = this.getUrl({ include }, id);
    return this.executeRequest(url, 'PUT', payload);
  }

  async updatePartial(id: string, payload: Partial<T>) {
    const url = `${this.resourceName}/${id}`;
    return this.executeRequest(url, 'PATCH', payload);
  }

  async executeRequest(url: string, method: Method, payload: Partial<T>) {
    const { api, entityCtor, deserializer, serializer } = this;
    const data = serializer.serialize(payload);
    const response = await api.request<Response>({ url, method, data });
    const responseData = await deserializer.deserialize(response.data);
    if (responseData) {
      const entities = plainToInstance(entityCtor, responseData);
      return entities;
    }
  }

  async applyAction(id: string, action: string) {
    const { api, resourceName } = this;
    const serializer = new Serializer(resourceName, { attributes: ['id', 'action'], keyForAttribute: 'snake_case' });
    const rawPayload = serializer.serialize({ id, action });
    await api.patch<Response>(`${resourceName}/${id}`, rawPayload);
  }

  async get<P>(url: string): Promise<P>;
  async get<P>(url: string, ctor: ClassConstructor<P>): Promise<P>;
  async get<P>(url: string, ctor?: ClassConstructor<P>) {
    const { api, deserializer } = this;
    const response = await api.get<Response>(url);
    const data = await deserializer.deserialize(response.data);
    const output = plainToInstance(ctor, data);
    return output;
  }

  async post<P>(url: string, payload: any): Promise<P>;
  async post<P>(url: string, payload: any, responseCtor: ClassConstructor<P>): Promise<P>;
  async post<P>(url: string, payload: any, responseCtor?: ClassConstructor<P>) {
    const { api, deserializer, serializer } = this;
    let rawPayload = serializer.serialize(payload);
    if (url) {
      const attributes = payload && Object.keys(payload);
      const lastSegment = url.match(/([\w.-]+)(?:\?.+)?/).slice(-1)[0];
      const serializer = new Serializer(lastSegment, { attributes, keyForAttribute: 'snake_case' });
      rawPayload = serializer.serialize(payload);
    }
    const reqURL = url ?? this.getUrl();
    const response = await api.post<Response>(reqURL, rawPayload);
    const data = await deserializer.deserialize(response.data);
    const output = plainToInstance(responseCtor, data);
    return output;
  }

  async patch<P>(url: string, payload: any): Promise<P>;
  async patch<P>(url: string, payload: any, responseCtor: ClassConstructor<P>): Promise<P>;
  async patch<P>(url: string, payload: any, responseCtor?: ClassConstructor<P>) {
    const { api, deserializer } = this;
    const rawPayload = this.serializer.serialize(payload);
    const response = await api.patch<Response>(url, rawPayload);
    const data = await deserializer.deserialize(response.data);
    const output = plainToInstance(responseCtor, data);
    return output;
  }

  async delete(id: string) {
    const { api, resourceName } = this;
    await api.delete<Response>(`${resourceName}/${id}`);
  }
}
