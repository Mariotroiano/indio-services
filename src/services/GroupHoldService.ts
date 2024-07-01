import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';
import { TableInstance } from 'services/TableInstance';
import { GroupHoldPayload } from './payloads/GroupHoldPayload';

export default class GroupHoldService extends ServiceBase<GroupHoldPayload> {
  constructor(ax: AxiosInstance) {
    super(GroupHoldPayload, {
      axios: ax,
      resourceName: 'group_holds',
      defaultSort: '-created_at',
      includes: 'organizer',
    });
  }

  getByIdExtra = async (id: string) => {
    const result = await this.client.getById(id, { include: 'organizer,reservation' });
    return result;
  }

  findForTable = async (table: TableInstance, parkId: string) => {
    const result = await this.client.findForTable(table, {
      filter: { parkId },
      include: 'organizer',
      fields: {
        organizer: 'full_name',
      }
    });
    return result;
  };
}
