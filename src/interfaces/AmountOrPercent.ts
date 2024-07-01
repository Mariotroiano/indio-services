export type usingType = '$' | '%';

export interface AmountOrPercent {
  amount: number;
  amount_cents?: number;
  percent: number;
  using: usingType;
};
