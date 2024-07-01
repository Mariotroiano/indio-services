import { PayloadBase } from './PayloadBase';

export class ProductCategoryPayload extends PayloadBase {
  id: string
  parkId: string
  name: string
  color: string
  active: boolean
  createdAt: string
  updatedAt: string
};

export const ProductCategoryPayloadAttributes = Object.keys(ProductCategoryPayload.new());
