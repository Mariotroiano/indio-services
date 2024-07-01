import { TableInstance } from 'services/TableInstance';
import { MaintenancePayload } from './payloads/MaintenancePayload';
import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class MaintenanceService extends ServiceBase<MaintenancePayload> {
  constructor(ax: AxiosInstance) {
    super(MaintenancePayload, ax, 'maintenances');
  }

  applyAction = async (id: string, action: string) => {
    const result = await this.client.applyAction(id, action);
    return result;
  }

  getTasks = async (table: TableInstance, parkId: string) => {
    const params = {
      filter: { parkId, hasTasks: true }
    }
    const result = await this.client.findForTable(table, params);
    return result;
  }
}
