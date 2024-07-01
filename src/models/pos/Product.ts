import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ProductPayload } from 'services/payloads/ProductPayload';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';

export class Product {
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
  imageDataUri?: string;
  active: boolean;
  inv?: any[];
  createdAt?: string | dayjs.Dayjs;
  updatedAt?: string | dayjs.Dayjs;

  static new(product: Partial<Product>) {
    return Factory.create(Product, product, true);
  }

  static toJSON(product: Product) {
    const { id, parkId } = product;
    return JSON.stringify({ id, parkId });
  }

  static parse(json: string) {
    const obj = JSON.parse(json);
    return Product.new(obj);
  }

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Product, {
  parkId: { label: 'Park ID' },
  productCategoryId: { label: 'Category'},
  productCategoryName: { label: 'Category Name'},
  productCategoryColor: { label: 'Category Color'},
  locationIds: { label: 'Locations', type: 'multiple'},
  taxRateIds: { label: 'Tax Rates', type: 'multiple'},
  revenueAccountId: { label: 'Revenue Account'},
  sku: { label: 'SKU' },
  description: { label: 'Description', type: 'textarea' },
  barcode: { label: 'Barcode'},
  barcode2: { label: 'Barcode (Additional)'},
  imageDataUri: { label: 'Upload Image', type: 'image' },
  imageUrl: { label: 'Thumbnail', type: 'image' },
  price: { label: 'Price $', type: 'currency' },
  cost: { label: 'Cost $', type: 'currency' },
  msrp: { label: 'MSRP $', type: 'currency' },
  active: { label: 'Active', type: 'switch'},
  inv: null,
  createdAt: { label: 'Created' },
  updatedAt: { label: 'Updated' },
})
.setRules({
  sku: [{ required: true }],
  name: [{ required: true }],
  price: [{ required: true }],
})
.build();

const buildPayload = (values: Product, parkId: string): ProductPayload => {
  const { createdAt, updatedAt, imageUrl, ...payloadValues} = values;
  const payload: Partial<ProductPayload> = {
    ...payloadValues,
    parkId: parkId,
  };
  payload.imageDataUri = /^data:image/g.test(values.imageDataUri) ? values.imageDataUri : null;
  return payload as ProductPayload;
};

const mapModel = ModelBuilder.buildMapModel<Product, ProductPayload>((product) => {
  const model = Factory.create(Product, {
    ...product,
    imageDataUri: product.imageUrl,
    createdAt: dayjs(product.createdAt),
    updatedAt: dayjs(product.updatedAt),
  });
  return model;
});

const initial: Partial<Product> = {
  active: true,
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static initial = initial;
  static buildPayload = buildPayload;
}
