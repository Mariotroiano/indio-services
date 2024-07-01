import { UtilityTaxPayload } from './UtilityTaxPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class UtilityTaxService extends ServiceBase<UtilityTaxPayload> {
  constructor(ax: AxiosInstance) {
    super(UtilityTaxPayload, ax, 'utility_taxes');
  }

  getAll = async (parkId: string) => {
    const params = {
      filter: { parkId, active: true },
      page: { size: 200 },
    }
    const result = await this.client.getAll(params);
    return result;
  }

}
