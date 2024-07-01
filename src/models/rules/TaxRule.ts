import ModelBuilder, { setModel, toSnakeCase } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { Fee } from 'interfaces/Types';
import { TaxRulePayload } from 'services/payloads/TaxRulePayload';
import { StayLength } from 'view-components/rules/models/StayLength';
import { DefaultAppliesTo } from './data';
import { FeeHelper } from 'helpers/FeeHelper';

export class TaxRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  taxRate: Fee;
  appliesTo: DefaultAppliesTo[];
  stayLength: StayLength;
  taxLabel: string;
  calculatorPeriod: string;
  glAccountId: string;
  siteTypeIds: string[];
  dateRangeIds: string[];

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(TaxRule, {
  active: { label: 'Active', type: 'switch' },
  taxRate: { label: 'Fixed amount or %  of total', type: 'fee', info: 'Tooltip info...' },
  appliesTo: { label: 'Applies to', type: 'checkboxes', info: 'Tooltip info...' },
  stayLength: { label: 'If stay is' },
  taxLabel: { label: 'Tax label' },
  calculatorPeriod: { label: 'Calculate by', placeholder: '30' },
  glAccountId: { label: 'Account' },
  siteTypeIds: { label: 'Site types', type: 'multiple' },
  dateRangeIds: { label: 'Date ranges', type: 'multiple' },
})
.setRules({
  name: [{ required: true }],
  appliesTo: [{ required: true }],
  taxRate: [{ required: true }],
  stayLength: [{ required: true }],
  taxLabel: [{ required: true }],
  calculatorPeriod: [{ required: true }],
  glAccountId: [{ required: true }],
})
.build();

const buildPayload = (entity: TaxRule, parkId: string): TaxRulePayload => {

  const { glAccountId, ...props } = entity;

  const taxObj = {
    rate: {
      ...FeeHelper.spread(entity.taxRate),
    },
    label: entity.taxLabel,
    calculator: {
      value: 1,
      selected: entity.calculatorPeriod
    },
    includeTax: false,
    glAccountId: glAccountId,
  }

  const taxPayload = toSnakeCase(taxObj);

  const payload = {
    ...props,
    type: 'TaxRule',
    parkId,
    stayLength: StayLength.toPayload(entity.stayLength),
    tax: taxPayload,
  }
  return payload;

};

const mapModel = ModelBuilder.buildMapModel<TaxRule, TaxRulePayload>((payload) => {
  const { tax, stayLength, ...props } = payload;
  const {rate} = tax;
  const fee = { value: rate.amount || rate.percent, using: rate.using };

  const model = Factory.create(TaxRule, {
    ...props,
    stayLength: {
      operator: stayLength.selected as any,
      amount: stayLength.value,
    },
    taxLabel: tax.label,
    calculatorPeriod: tax.calculator.selected,
    glAccountId: tax.glAccountId,
    taxRate: FeeHelper.toModel(fee),
  })
  return model;
})

const initial: Partial<TaxRule> = {
  active: true,
  appliesTo: ['front_desk', 'online'],
  calculatorPeriod: 'period',
  stayLength: { operator: 'any', amount: null }
}

class Model {
  static fields = fields;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
  static initial = initial;
  static relation = [TaxRule, TaxRulePayload] as const;
};
