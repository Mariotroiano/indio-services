import { RatePayload } from '../payloads/RatePayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class RateService extends ServiceBase<RatePayload> {
  constructor(ax: AxiosInstance) {
    super(RatePayload, ax, 'rates');
  }

  getAll = async (parkId: string) => {
    const params = {
      filter: { parkId, active: true },
      include: 'discounts',
      page: { size: 200 },
    }
    const result = await this.client.getAll(params);
    return result;
  }

  getBySiteTypeId = async (siteTypeId: string, activeOnly: boolean) => {
    const params = {
      filter: { siteTypeId },
      include: 'discounts'
    };
    if (activeOnly) {
      params.filter['active'] = true;
    }
    const result = await this.client.find(params);
    return result;
  };
}
