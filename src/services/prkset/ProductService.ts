import { ProductPayload } from 'services/payloads/ProductPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';
import { TableInstance } from 'services/TableInstance';

export default class ProductService extends ServiceBase<ProductPayload> {
  constructor(ax: AxiosInstance) {
    super(ProductPayload, ax, 'products');
  }

  getByIds = (ids: string[]) => super.getAllBy({ id: ids.join(',') });

  getAllByLocationId = (locationId: string) => super.getAllBy({ locationId });

  findByParkId = (parkId: string, search: string) => {
    return super.getAllBy({ parkId }, search, undefined, 'created_at');
  }

  findByLocationId = (productsLocationId: string, search: string) => {
    return super.getAllBy({ productsLocationId }, search, undefined, 'created_at');
  }

  findForTable = async (table: TableInstance, parkId: string) => {
    const params = { filter: { parkId }, sort: 'created_at' };
    const result = await this.client.findForTable(table, params);
    return result;
  };
}
