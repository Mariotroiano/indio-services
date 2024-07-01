import { DateRangePayload } from 'services/payloads/DateRangePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class DateRangeService extends ServiceBase<DateRangePayload> {
  constructor(ax: AxiosInstance) {
    super(DateRangePayload, ax, 'date_ranges');
  }
  getAll = (parkId: string) => super.getAllBy({ parkId });
}
