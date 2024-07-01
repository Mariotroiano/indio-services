import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { DiscountPayload } from '../payloads/DiscountPayload';

export default class DiscountService extends ServiceBase<DiscountPayload> {
  constructor(ax: AxiosInstance) {
    super(DiscountPayload, ax, 'discounts');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });
  getAll = (parkId: string) => super.getAllBy({ parkId });
  
}
