import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { TaxRatePayload } from 'services/payloads';
import { Factory } from 'utils/Factory';
import { AmountOrPercent } from 'interfaces/AmountOrPercent';
import format from 'utils/format';
import { Fee } from 'interfaces/Types';
import { FeeHelper, FeePayload } from 'helpers/FeeHelper';

export class TaxRate {
  id: string;
  parkId: string;
  glAccountId: string;
  name: string;
  amount: Fee;
  rate: AmountOrPercent;
  active: boolean;
  usePercentage: boolean;
  percent: number;
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(TaxRate, {
  parkId: { label: 'Park' },
  glAccountId: { label: 'GL Account' },
  amount: { label: 'Tax Rate $', type: 'fee' },
  rate: { label: 'Rate $/%'},
  active: { label: 'Active', type: 'switch' },
  usePercentage: { label: 'Use Percentage'},
  percent: { label: 'Percent' }
})
.setRules({
  name: [{ required: true }],
  parkId: [{ required: true }],
  amount: [{ required: true}],
  glAccountId: [{ required: true }],
})
.build();


const mapModel = ModelBuilder.buildMapModel<TaxRate, TaxRatePayload>((payload) => {
  const { amount, percent, usePercentage } = payload;
  const fee: FeePayload = { value: amount || percent, using: usePercentage ? '%' : '$' };
  
  const model = Factory.create(TaxRate, {
    ...payload,
    amount: FeeHelper.toModel(fee),
  });

  return model;
})

const buildPayload = (values: TaxRate, parkId: string): TaxRatePayload => {
  const feePayload = FeeHelper.spread(values.amount);

  const payload = TaxRatePayload.new({
    ...values,
    ...feePayload,
    usePercentage: feePayload.using === '%',
    parkId
  });
  
  return payload;
};

const formatAmount = (taxRate: TaxRate) => (
  taxRate.amount[1] === '%' ? `${taxRate.percent}%` : format.money(taxRate.amount[0])
)

class Model {
  static modelName = 'Tax Rate';
  static fields = fields;
  static formatAmount = formatAmount;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
}
