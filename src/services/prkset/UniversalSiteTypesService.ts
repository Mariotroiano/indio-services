import { ServiceBase } from 'services/client/ServiceBase';
import { UniversalSiteTypesPayload } from './../payloads/UniversalSiteTypesPayload';
import { AxiosInstance } from 'axios';

export default class UniversalTypesService extends ServiceBase<UniversalSiteTypesPayload> {
  constructor(ax: AxiosInstance) {
    super(UniversalSiteTypesPayload, ax, 'universal_site_types');
  }

  getAll = () => this.client.find();
}
