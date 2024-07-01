import { PayloadBase } from './PayloadBase';
export class ProductPayload extends PayloadBase {
  id: string;
  parkId: string;
  productCategoryId: string;
  productCategoryName: string;
  productCategoryColor: string;
  locationIds: string[];
  taxRateIds: string[];
  revenueAccountId: string[];
  sku: string;
  barcode: string;
  barcode2: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  msrp: number;
  imageUrl: string;
  imageDataUri: string;
  imageMetadata: string;
  imageOriginalFilename: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ProductPayloadAttributes = Object.keys(ProductPayload.new());
