import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { AppliesTo, appliesToOps } from './data';

export class DiscountRule {
  id: string;
  name: string;
  amount: number;
  stayLength: object;
  duration: object;
  discountType: string;
  description: string;
  status: boolean;
  hasApplication: boolean;
  promoCode: string;
  appliesTo: AppliesTo[];

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(DiscountRule, {
  amount: { label: 'Amount', type: 'fee' },
  stayLength: { label: 'If Stay is' },
  discountType: { label: 'Discount Type' },
  status: { label: 'Active', type: 'switch' },
  hasApplication: { label: 'Application' },
  promoCode: { label: 'Promo Code', placeholder: 'Code' },
  appliesTo: { label: 'Discount Applies To', options: appliesToOps },
})
.setRules({
  name: [{required: true}],
})
.build();

class Model {
  static fields = fields;
};
