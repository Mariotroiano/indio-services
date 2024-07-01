import { ProductCategoryPayload } from './payloads/ProductCategoryPayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from './client/ServiceBase';

export default class ProductCategoryService extends ServiceBase<ProductCategoryPayload> {
  constructor(ax: AxiosInstance) {
    super(ProductCategoryPayload, ax, 'product_categories');
  }

  getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.client.getAll(params);
    return result;
  }

  getAllActive = async (parkId: string) => {
    const params = { filter: { parkId, active: true } };
    const result = await this.client.find(params);
    return result;
  };
}
