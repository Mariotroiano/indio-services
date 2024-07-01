export interface PeriodRate {
  ratePeriod: string;
  billingPeriod: string;
  scale: number;
  unitInterval: number;
  rateTotal: RateTotal;
  proration: RateTotal;
}

export type RateSummary = {
  label: string;
  amount: number;
  count: number;
}

export interface RateTotal {
  rate: number;
  fee: number;
  adjustment: number;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
}

// simplified payload
export type DiscountDetail = {
  label: string;
  amount: number;
}
