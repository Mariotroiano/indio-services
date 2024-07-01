import { TableInstance } from 'services/TableInstance';
import { Payload } from './Types.nest';
import { RestClient } from './ServiceBase.nest';

export class BaseService<T extends Payload> extends RestClient<T> {
  async find(parkId: string, search: string): Promise<T[]>;
  async find(params: any): Promise<T[]>;
  async find(arg1?: any, arg2?: any) {
    let params = arg1;
    if (typeof arg1 === 'string') {
      const [parkId, search] = [arg1, arg2];
      params = { parkId, q: search, pageSize: 10 };
      if (!search) delete params.q;
    }
    return super.find(params);;
  }

  async findForTable(table: TableInstance<any>, parkId: string): Promise<T[]>;
  async findForTable(table: TableInstance<any>, params: any): Promise<T[]>;
  async findForTable(table: TableInstance<any>, parkId?: string) {
    return super.findForTable(table, { parkId });
  }

  async getAll(parkId: string): Promise<T[]>;
  async getAll(params: any): Promise<T[]>;
  async getAll(parkId: string) {
    const params = {
      parkId,
      pageNumber: 1,
      pageSize: 200,
    };
    return super.getAll(params);
  }
}
