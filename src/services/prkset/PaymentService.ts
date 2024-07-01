import { PaymentPayload } from 'services/payloads/PaymentPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class PaymentService extends ServiceBase<PaymentPayload> {

  constructor(ax: AxiosInstance) {
    super(PaymentPayload, ax, 'payments');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });
  getByGuestId = async (guestId: string) => super.getAllBy({ guestId });
  getByOrderId = async (orderId: string) => super.getAllBy({ orderId });

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction( id, action );
    return result;
  }

  getByReservationId = async (reservationId: string) => {
    const params = {
      filter: { reservationId },
      include: 'refunds'
    };
    const result = await this.client.find(params);
    return result;
  };

}
