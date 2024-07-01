import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';

class Filter {
  id: string;
  parkId: string;
  datePeriod: string[];
}

export default class ReservationFiltersService extends ServiceBase<Filter> {
  constructor(ax: AxiosInstance) {
    super(Filter, ax, 'fake_url');
  }

  async getFilters(parkId: string, datePeriod: string[]) {
    const entity = { parkId, datePeriod };
    let entities = await this.client.post('reservation_filters', entity, Filter);
    return entities;
  };
}
