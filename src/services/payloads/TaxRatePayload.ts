import { PayloadBase } from './PayloadBase';
import { AmountOrPercent } from 'interfaces/AmountOrPercent';

export class TaxRatePayload extends PayloadBase {
  id: string;
  parkId: string;
  glAccountId: string;
  name: string;
  percent: number;
  usePercentage: boolean;
  amount: number;
  rate: AmountOrPercent;
  active: boolean;
}


export const TaxRatePayloadAttributes = Object.keys(TaxRatePayload.new());
