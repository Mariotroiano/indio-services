import { PayloadBase } from 'services/payloads/PayloadBase';

export class UtilityTaxPayload extends PayloadBase {
  id: string;
  parkId: string;
  glAccountId: string;
  description: string;
  rate: { value: number, using: '$' | '%'};
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const UtilityTaxPayloadAttributes = Object.keys(UtilityTaxPayload.new());
