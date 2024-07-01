import { DiscountType } from './DiscountPayload';
import { PayloadBase } from './PayloadBase';

export type PaymentSummary = {
  id: string
  amount: number
  description: string
  memo: string
  refunds: any[]
  status: string
  type: string
  subType: string
  refundableAmount: number
  credit?: number
  debit?: number
  cardId?: string
  cardLast4?: string
  cardType?: string
  number?: string
  checkNumber?: string
  date?: string
  actions: PaymentActions[]
}
type PaymentActions = 'void' | 'refund_payment';

export type TransactionSummary = {
  id: string
  type: string
  subType: string
  date?: string
  description: string
  memo: string
  rateName: string
  status: string
  total: number
  credit?: number
  debit?: number
  actions: string[]
  unitPrice?: number
  quantity?: number
  amount?: number
}

export type VehicleSummary = {
  id: string;
  type: string;
  lengthRange: string;
  slides: string[];
  towing: string;
  electrical: string[];
  length: null;
}

export type SiteSummary = {
  id: string;
  label: string;
  name: string;
  siteTypeLabel: string;
  typeId: string;
  typeName: string;
  typeType: string;
}

export type RateSummary = {
  id: string;
  label: string;
  dailyAmount: number;
  monthlyAmount: number;
  weeklyAmount: number;
  yearlyAmount: number;
}

export interface DiscountSummary {
  id: string;
  label: string;
  type: DiscountType;
  description: string;
  availableOnline: boolean;
  loyaltyNumberLabel: string;
  amount: number;
  usePercentage: boolean;
  percent: number;
}


export class SettingsPayload extends PayloadBase {
  billing: Billing;
  fee: any;
  rate: any;
}

type Billing = {
  autoPayment: {
    active: boolean,
    paymentMethodId: string,
    displayInfo: { payingWith: string, status: string },
  },
  lateFees: [{
    active: boolean,
    amountOrPercent: { percent: number, using: '$' | '%', amount: number },
    chargeAfterDays: number,
    chargeDescription: string,
    displayInfo: { summary: string },
  }],
  ratePeriodStartDay: number,
};
