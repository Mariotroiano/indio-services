import ModelBuilder, { setModel, toSnakeCase  } from 'utils/ModelBuilder';
import { Fee } from 'interfaces/Types';
import { PaymentRulePayload } from 'services/payloads/PaymentRulePayload';
import { Factory } from 'utils/Factory';
import { StayLength } from 'view-components/rules/models/StayLength';
import { DefaultAppliesTo } from './data';
import { FeeHelper } from 'helpers/FeeHelper';

export class PaymentRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  rate: Fee;
  appliesTo: DefaultAppliesTo[];
  stayLength: StayLength;
  label: string;
  calculatorPeriod: string;
  glAccountId: string;
  minimum: number;
  maximum: number;
  siteTypeIds: string[];
  dateRangeIds: string[];
  paymentType: string;
  includeTax: boolean;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(PaymentRule, {
  active: { label: 'Active', type: 'switch' },
  rate: { label: 'Fixed amount or %  of total', type: 'fee', info: 'Tooltip info...' },
  appliesTo: { label: 'Applies to', type: 'checkboxes', info: 'Tooltip info...' },
  stayLength: { label: 'If stay is' },
  label: { label: 'Payment label' },
  calculatorPeriod: { label: 'Calculate by', placeholder: '30' },
  glAccountId: { label: 'Account' },
  minimum: { label: 'If booking is', type: 'numeric', placeholder: ' ' },
  maximum: { label: '', type: 'numeric', placeholder: ' ' },
  siteTypeIds: { label: 'Site types', type: 'multiple' },
  dateRangeIds: { label: 'Date ranges', type: 'multiple' },
  paymentType: { label: 'Payment type'},
  includeTax: { label: 'Include Tax', type:'switch'}

})
.setRules({
  name: [{ required: true }],
  appliesTo: [{ required: true }],
  paymentType: [{ required: true }],
  minimum: [{ required: true }],
  maximum: [{ required: true }],
  glAccountId: [{ required: true }],
  label: [{ required: true }],
  rate: [{ required: true }],
})
.build();

const buildPayload = (entity: PaymentRule, parkId: string): PaymentRulePayload => {
  const { glAccountId, ...props } = entity;

  const paymentObj = {
    rate: {
      ...FeeHelper.spread(entity.rate),
    },
    label: entity.label,
    calculator: {
      value: 0,
      selected: entity.calculatorPeriod
    },
    includeTax: entity.includeTax,
    glAccountId: glAccountId,
  } 
  
  const paymentPayload = toSnakeCase(paymentObj);
  
  const payload = {
    ...props,
    type: 'PaymentRule',
    parkId,
    stayLength: StayLength.toPayload(entity.stayLength),
    payment: paymentPayload,
    daysBeforeArrival: {
      maximum: entity.maximum,
      minimum: entity.minimum,
    }
  }
  return payload;
};

const mapModel = ModelBuilder.buildMapModel<PaymentRule, PaymentRulePayload>((payload) => {
  const { payment, stayLength, daysBeforeArrival, ...props } = payload;
  const { rate } = payment;
  const fee = { value: rate.amount || rate.percent, using: rate.using };

  const model = Factory.create(PaymentRule, {
    ...props,
    stayLength: {
      operator: stayLength.selected as any,
      amount: stayLength.value,
    },
    label: payment.label,
    calculatorPeriod: payment.calculator.selected,
    glAccountId: payment.glAccountId,
    rate: FeeHelper.toModel(fee),
    minimum: daysBeforeArrival.minimum,
    maximum: daysBeforeArrival.maximum,
  })
  return model;
})

const initial: Partial<PaymentRule> = {
  active: true,
  appliesTo: ['front_desk', 'online'],
  calculatorPeriod: 'period',
  paymentType: 'pre_payment',
  stayLength: { operator: 'any', amount: null },
  includeTax: true,
}

export class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static initial = initial;
}
