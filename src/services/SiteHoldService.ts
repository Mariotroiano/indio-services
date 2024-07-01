import { SiteHoldPayload } from './payloads/SiteHoldPayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';

export default class SiteHoldService extends ServiceBase<SiteHoldPayload> {
  constructor(ax: AxiosInstance) {
    super(SiteHoldPayload, ax, 'site_holds');
  }

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction(id, action);
    return result;
  }
}
