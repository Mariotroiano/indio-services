import { PayloadBase } from '../payloads/PayloadBase'
export class UtilityReadingPayload extends PayloadBase {
  id: string;
  utilityMeterId: string;
  creatorId: string;
  readingDate: string;
  readingType: string;
  unit: string;
  creatorName: string;
  source: string;
  reading: number;
  rate: number;
  changeAmount: number;
  total: number;
  dynamicRate: number;
  siteName: string;
  actions: string[];
  
};

export const UtilityReadingPayloadAttributes = Object.keys(UtilityReadingPayload.new());
