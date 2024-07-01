import { PayloadBase } from './PayloadBase';

export class DateRangePayload extends PayloadBase {
  id: string;
  parkId: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export const DateRangePayloadAttributes = Object.keys(DateRangePayload.new());
