import { DefaultAppliesTo } from 'models/rules/data';
import { PayloadBase } from './PayloadBase'

export class PaymentRulePayload extends PayloadBase {
  id: string;
  active: boolean;
  parkId: string;
  type: string;
  name: string;
  description: string;
  stayLength: StayLength;
  appliesTo: DefaultAppliesTo[];
  payment: Payment;
  daysBeforeArrival: ArrivalDays;
  siteTypeIds: string[];
  dateRangeIds: string[];
  paymentType: string;
}

interface StayLength {
  value: number;
  selected: string;
}

interface Payment {
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

interface ArrivalDays {
    maximum: number,
    minimum: number
}

export const PaymentRulePayloadAttributes = Object.keys(PaymentRulePayload.new());
