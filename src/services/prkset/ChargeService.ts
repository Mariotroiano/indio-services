import { ChargePayload } from 'services/payloads/ChargePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
 
export default class ChargeService extends ServiceBase<ChargePayload> {

  constructor(ax: AxiosInstance) {
    super(ChargePayload, ax, 'charges');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });

  getByOrderId = async (orderId: string) => {
    const params = { filter: { orderId, subType: 'Sundry' } };
    const result = await this.client.find(params);
    return result
  };

}
