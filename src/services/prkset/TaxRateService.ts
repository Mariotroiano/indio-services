import { ServiceBase } from 'services/client/ServiceBase';
import { TaxRatePayload } from 'services/payloads';
import { AxiosInstance } from 'axios';

export default class TaxRateService extends ServiceBase<TaxRatePayload> {
  constructor(ax: AxiosInstance) {
    super(TaxRatePayload, ax, 'tax_rates');
  }
  
  getAll = (parkId: string) => super.getAllBy({ parkId });

}
