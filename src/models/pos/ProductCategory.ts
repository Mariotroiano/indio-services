import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ProductCategoryPayload } from 'services/payloads/ProductCategoryPayload';
import { Factory } from 'utils/Factory';

export class ProductCategory {
  id: string;
  name: string;
  color: string;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(ProductCategory, {
  id: null,
  name: { label: 'Category Name' },
  color: { label: 'Category Color' },
  active: { label: 'Active', type: 'switch' },
})
.setRules({
  name: [{ required: true }],

})
.build();

const buildPayload = (values: ProductCategory, parkId: string): ProductCategoryPayload => {
  const payload: Partial<ProductCategoryPayload> = {
    ...values,
    parkId: parkId,
  }
  return payload as ProductCategoryPayload;
};

const mapModel = ModelBuilder.buildMapModel<ProductCategory, ProductCategoryPayload>((productCategory) => {
  const model = Factory.create(ProductCategory, {
    ...productCategory,
  })
  return model;
});

class Model {
  static modelName = 'Category';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
