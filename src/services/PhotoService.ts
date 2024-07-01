import { TableInstance } from 'services/TableInstance';
import { PhotoPayload } from './payloads/PhotoPayload';
import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';
export default class PhotoService extends ServiceBase<PhotoPayload> {
  constructor(ax: AxiosInstance) {
    super(PhotoPayload, ax, 'photos');
  }

  getAll = async (table: TableInstance, tags: string[], parkId: string) => {
    const params = { filter: { parkId } };
    if (tags && tags.length > 0) {
      const values = tags.map(tag => `"${tag}"`).join(',');
      params.filter['tagNames'] = { matchAny: `[${values}]` };
    }
    table.setters.setSorting({ field: 'created_at', order: 'descend' });
    return await this.client.findForTable(table, params);
  }

}
