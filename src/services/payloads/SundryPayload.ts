import { PayloadBase } from './PayloadBase';

export class SundryPayload extends PayloadBase {
  id: string;
  parkId: string;
  glAccountId: string;
  taxRateIds: string[];
  type: string;
  name: string;
  description: string;
  memo: string;
  quantity: number;
  usePercentage: boolean;
  percent: number;
  amount: number;
  unitPrice: number;
  using: '$' | '%';
  quantityEditable: boolean;
  unitPriceEditable: boolean;
  taxable: boolean;
  refundable: boolean;
  discountable: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const SundryAttributes = Object.keys(SundryPayload.new());
