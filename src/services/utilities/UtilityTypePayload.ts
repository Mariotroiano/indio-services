import { PayloadBase } from '../payloads/PayloadBase';

export class UtilityTypePayload extends PayloadBase {
  id: string;
  parkId: string;
  glAccountId: string;
  siteTypeIds: string;
  name: string;
  type: string;
  unit: string;
  rate: number;
  rollover: number;
  active: boolean;
};
export const UtilityTypePayloadAttributes = Object.keys(UtilityTypePayload.new());
