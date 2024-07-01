import { AxiosInstance } from 'axios';
import { JsonApiClient } from './JsonApiClient';
import { buildUrl } from './helpers';
import { JsonApiParams } from './Types';

export class ReportClient {
  client: JsonApiClient<ReportPayload>;

  constructor(ax: AxiosInstance) {
    this.client = new JsonApiClient(ReportPayload, ax, '');
  }

  async fetchData<T>(name: string, params: JsonApiParams) {
    const url = buildUrl(name, '', params);
    const result = await this.client.get<T>(url);
    return result;
  }

  async fetchDataViaPost<T>(name: string, entity: any) {
    const url = name;
    const result = await this.client.post<T>(url, entity);
    return result;
  }
}

class ReportPayload {
  id: string;
  parkId: string;
}
