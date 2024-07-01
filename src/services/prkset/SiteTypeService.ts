import { AxiosInstance } from 'axios';
import { ServiceBase } from '../client/ServiceBase';
import { SiteTypePayload } from 'services/payloads';
import { TableInstance } from 'services/TableInstance';

export default class SiteTypeService extends ServiceBase<SiteTypePayload> {
  constructor(ax: AxiosInstance) {
    super(SiteTypePayload, ax, 'site_types');
  }

  findForTable = (table: TableInstance<any>, parkId: string) => {
    const params = {
      filter: { parkId },
      include: 'primary_photo',
    }
    return this.client.findForTable(table, params);
  }

  getAll = (parkId: string, search?: string) => super.getAllBy({ parkId }, search);
}
