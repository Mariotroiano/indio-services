import { ServiceBase } from './client/ServiceBase';
import { LocationPayload } from './payloads/LocationPayload';
import { AxiosInstance } from 'axios';

export default class LocationService extends ServiceBase<LocationPayload> {
  constructor(ax: AxiosInstance) {
    super(LocationPayload, ax, 'locations');
  }

  getAll = (parkId: string) => super.getAllBy({ parkId, type: 'Pos' });
}
