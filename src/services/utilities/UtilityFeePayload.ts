import { PayloadBase } from '../payloads/PayloadBase';

export class UtilityFeePayload extends PayloadBase {
  id: string;
  parkId: string;
  glAccountId: string;
  utilityTaxIds: any[];
  description: string;
  rate: { value: number, using: '$' | '%'};
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const UtilityFeePayloadAttributes = Object.keys(UtilityFeePayload.new());

