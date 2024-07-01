import { ServiceBase } from 'services/client/ServiceBase';
import { UtilityTypePayload } from './UtilityTypePayload';
import { AxiosInstance } from 'axios';

export default class UtilityTypeService extends ServiceBase<UtilityTypePayload> {
  constructor(ax: AxiosInstance) {
    super(UtilityTypePayload, ax, 'utility_types');
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
