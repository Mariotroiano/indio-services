import { TableInstance } from 'services/TableInstance';
import { OrderPayload } from 'services/payloads/OrderPayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class OrderService extends ServiceBase<OrderPayload> {

  constructor(ax: AxiosInstance) {
    super(OrderPayload, ax, 'orders');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });

  findForTable = async (table: TableInstance, locationId: string) => {
    const params = { filter: { locationId }, sort: '-number' };
    const result = await this.client.findForTable(table, params);
    return result
  };

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction(id, action);
    return result;
  }

  checkBalance = async (id: string, action: string) => {
   const result = await this.client.applyAction(id, action);
   return result
  };

}
