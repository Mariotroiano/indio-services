import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { DiscountPayload, DiscountType, DiscountTypeValues } from 'services/payloads/DiscountPayload';
import { OptionItem } from 'interfaces/OptionItem';
import { Fee } from 'interfaces/Types';
import { Factory } from 'utils/Factory';
import { startCase } from 'lodash';
import format from 'utils/format';
import { FeeHelper, FeePayload } from 'helpers/FeeHelper';

export class Discount {
  id: string;
  type: DiscountType;
  name: string;
  code: string;
  loyaltyNumberLabel: string;
  description: string;
  amount: Fee;
  canBookOnline: boolean;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const typeOps = DiscountTypeValues.map<OptionItem>(item => ({
  label: `${startCase(item)} Discount`,
  value: item
}));

const fields = ModelBuilder.buildFields(Discount, {
  type: { label: 'Discount Type', options: typeOps },
  code: { label: 'Code', info: 'code info' },
  loyaltyNumberLabel: { label: 'Loyalty Number Label' },
  amount: { label: 'Amount', type: 'fee' },
  canBookOnline: { label: 'Online Booking', type: 'switch' },
  active: { label: 'Active', type: 'switch' },
})
.setRules({
  type: [{required: true}],
  name: [{required: true}],
  description: [{required: true}],
  loyaltyNumberLabel: [{required: true}],
  amount: [{required: true}],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Discount, DiscountPayload>(payload => {
  const { amount, percent, usePercentage } = payload;
  const fee: FeePayload = { value: amount || percent, using: usePercentage ? '%' : '$' };
  const model = Factory.create(Discount, {
    ...payload,
    amount: FeeHelper.toModel(fee),
  });

  return model;
})

const buildPayload = (entity: Discount, parkId: string): DiscountPayload => {
  const feePayload = FeeHelper.spread(entity.amount);
  const payload = DiscountPayload.new({
    ...entity,
    ...feePayload,
    usePercentage: feePayload.using === '%',
    parkId,
  });
  return payload;
};

const formatAmount = (discount: Discount) => (
  discount.amount[1] === '%' ? format.percentage(discount.amount[0] / 100) : format.money(discount.amount[0])
)

const initial: Partial<Discount> = {
  active: true,
  canBookOnline: true,
}

class Model {
  static fields = fields;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
  static formatAmount = formatAmount;
  static initial = initial;
  static relation = [Discount, DiscountPayload] as const;
};
