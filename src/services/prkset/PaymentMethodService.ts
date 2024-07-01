import { PaymentMethodPayload } from '../payloads/PaymentMethodPayload';
import { TableInstance } from 'services/TableInstance';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class PaymentMethodService extends ServiceBase<PaymentMethodPayload> {
  constructor(ax: AxiosInstance) {
    super(PaymentMethodPayload, ax, 'payment_methods');
  }

  getAll = (guestId: string) => super.getAllBy({ guestId });

  getByGuestId = async (guestId: string, table: TableInstance) => {
    const params = { filter: { guestId } };
    const result = await this.client.findForTable(table, params);
    return result
  }

  setPrimary = async (id: string) => {
    const result = await this.client.updatePartial(id, { id, primary: true });
    return result
  }

}
