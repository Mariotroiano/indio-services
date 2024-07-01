import { SundryPayload } from 'services/payloads/SundryPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class SundryService extends ServiceBase<SundryPayload> {
  constructor(ax: AxiosInstance) {
    super(SundryPayload, ax, 'sundries');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });
  getAll = (parkId: string) => super.getAllBy({ parkId });

  findByParkId = (parkId: string, search: string) => {
    return super.getAllBy({ parkId }, search, undefined, 'created_at');
  };
}
