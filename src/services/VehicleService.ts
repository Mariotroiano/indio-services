import { TableInstance } from 'services/TableInstance';
import { VehiclePayload } from './payloads/VehiclePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';

export default class VehicleService extends ServiceBase<VehiclePayload> {
  constructor(ax: AxiosInstance) {
    super(VehiclePayload, ax, 'vehicles');
  }

  findForTable = async (table: TableInstance, guestId: string,) => {
    const params = { filter: { guestId } };
    const result = await this.client.findForTable(table, params)
    return result;
  }

  getAll = (guestId: string) => super.getAllBy({ guestId });

}
