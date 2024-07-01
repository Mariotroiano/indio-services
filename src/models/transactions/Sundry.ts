import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { SundryPayload } from 'services/payloads/SundryPayload';
import { Factory } from 'utils/Factory';
import { Fee } from 'interfaces/Types';
import { startCase } from 'lodash';
import { FeeHelper } from 'helpers/FeeHelper';

export class Sundry {
  id: string;
  type: string;
  name: string;
  glAccountId: string;
  taxRateIds: string[];
  description: string;
  memo: string;
  taxable: boolean;
  unitPrice?: number;
  amount: Fee;
  quantity: number;
  usePercentage?: boolean;
  quantityEditable?: boolean;
  unitPriceEditable?: boolean;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const sundryTypeOptions = [
  { label: 'Charge', value: 'charge' },
  { label: 'Credit', value: 'credit' },
];

const fields = ModelBuilder.buildFields(Sundry, {
  type: { label: 'Type', options: sundryTypeOptions, type: 'radios' },
  name: { label: 'Display Name' },
  glAccountId: { label: 'Financial Account' },
  taxRateIds: { label: 'Tax Rates', type: 'multiple'},
  description: { label: 'Charge/Credit Description' },
  memo: { label: 'Additional Note' },
  unitPrice: { label: 'Amount' },
  amount: { label: 'Amount', type: 'fee' },
  taxable: { label: 'Taxable?', type: 'switch' },
  quantityEditable: { label: 'Quantity Editable?', type: 'switch' },
  unitPriceEditable: { label: 'Price Editable?', type: 'switch' },
  active: { label: 'Active', type: 'switch'}
})
.setRules({
  name: [{ required: true }],
  amount: [{ required: true }],
})
.build();

const fixTypes = (values: Sundry) => {
  const unitPrice = Number(values.unitPrice);
  const quantity = Number(values.quantity);
  const newValues = { ...values, unitPrice, quantity };
  return newValues;
}

const mapModel = ModelBuilder.buildMapModel<Sundry, SundryPayload>(payload => {
  const fee = {value: payload.amount , using: payload.using}
  const model = Factory.create(Sundry, {
    ...payload,
    amount: FeeHelper.toModel(fee),
    name: startCase(payload.name),
  });
  return model;
});

const buildPayload = (values: Sundry, parkId: string): SundryPayload => {
  const payload = SundryPayload.new({
    ...values,
    ...FeeHelper.spread(values.amount),
    parkId,
  });
  return payload;
};

const initial: Partial<Sundry> = {
  type: 'charge',
  quantity: 1,
  unitPriceEditable: true,
  quantityEditable: true,
  active: true,
};

class Model {
  static modelName = 'Charges & Credits';
  static initial = initial;
  static fields = fields;
  static fixTypes = fixTypes;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
};
