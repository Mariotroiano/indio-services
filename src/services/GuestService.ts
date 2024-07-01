import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';
import { GuestPayload } from './payloads';
import { PaymentMethodPayload } from './payloads/PaymentMethodPayload';

export default class GuestService extends ServiceBase<GuestPayload> {
  private paymentMethods: ServiceBase<PaymentMethodPayload>;

  constructor(ax: AxiosInstance) {
    super(GuestPayload, { axios: ax, resourceName: 'guests', defaultSort: '-created_at' });
    this.paymentMethods = new ServiceBase(PaymentMethodPayload, ax, 'payment_methods');
  }

  getPaymentMethods = async (guestId: string) => {
    const params = { filter: { guestId } };
    const result = await this.paymentMethods.find(params);
    return result;
  }

  getByIdExtra = async (id: string) => {
    const extra = 'outstanding_balance,lifetime_spent';
    const params = {
      include: 'most_recent_stay',
      extra_fields: { guests: extra }
    }
    const result = await this.client.getById(id, params);
    return result;
  }

  getAll = (parkId: string, search?: string, size?: number) => super.getAllBy({ parkId }, search, size);
}
