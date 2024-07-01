import { OrderItemPayload } from 'services/payloads/OrderItemPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class OrderItemService extends ServiceBase<OrderItemPayload> {
  constructor(ax: AxiosInstance) {
    super(OrderItemPayload, ax, 'order_items');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });
  getByOrderId = (orderId: string) => super.getAllBy({ orderId });

}
