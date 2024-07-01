import { DefaultAppliesTo } from 'models/rules/data';
import { PayloadBase } from './PayloadBase'

export class TaxRulePayload extends PayloadBase {
  id: string;
  active: boolean;
  parkId: string;
  type: string;
  name: string;
  description: string;
  stayLength: StayLength;
  appliesTo: DefaultAppliesTo[];
  tax: Tax;
  siteTypeIds: string[];
  dateRangeIds: string[];
}

interface StayLength {
  value: number;
  selected: string;
}

interface Tax {
  rate: Rate;
  label: string;
  calculator: Calculator;
  includeTax: boolean;
  glAccountId: string;
}

interface Rate {
  using: '$' | '%';
  percent: number;
  amount: number;
}

interface Calculator {
  value: number;
  selected: string;
}

export const TaxRulePayloadAttributes = Object.keys(TaxRulePayload.new());
