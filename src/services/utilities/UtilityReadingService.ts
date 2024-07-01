import { UtilityReadingPayload } from 'services/utilities/UtilityReadingPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';
import { TableInstance } from 'services/TableInstance';

export default class UtilityReadingService extends ServiceBase<UtilityReadingPayload> {
  constructor(ax: AxiosInstance) {
    super(UtilityReadingPayload, ax, 'utility_readings');
  }

  findForTable = async (table: TableInstance, utilityMeterId: string) => {    
    const params = { filter: { utilityMeterId }, sort: '-created_at' };
    const result = await this.client.findForTable(table, params);
    return result;
  }

  getAll = async (parkId: string) => {
    const params = {
      filter: { parkId, active: true },
      page: { size: 200 },
    }
    const result = await this.client.getAll(params);
    return result;
  }

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction( id, action );
    return result;
  }

}
