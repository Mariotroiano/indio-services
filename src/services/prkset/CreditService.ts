import { ChargePayload } from 'services/payloads/ChargePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class CreditService extends ServiceBase<ChargePayload> {

  constructor(ax: AxiosInstance) {
    super(ChargePayload, ax, 'credits');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });

}
