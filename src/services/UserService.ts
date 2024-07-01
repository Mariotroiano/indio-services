import { TableInstance } from 'services/TableInstance';
import { UserPayload } from './payloads/UserPayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';

export default class UserService extends ServiceBase<UserPayload> {
  constructor(ax: AxiosInstance) {
    super(UserPayload, ax, 'users');
  }

  getByEmail = async (email: string) => {
    const params = { filter: { email } };
    const result = await this.client.find(params);
    return result && result[0];
  }

  findForTable = async (table: TableInstance, clientId: string) => {
    const params = {
      // filter: { clientId },
      include: 'user_roles',
      sort: '-created_at'
    };
    const result = await this.client.findForTable(table, params);
    return result;
  }
}
