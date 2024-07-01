import { UtilityReading } from 'models/prkset/UtilityReading';
import { PayloadBase } from '../payloads/PayloadBase';

export class UtilityMeterPayload extends PayloadBase {
  id: string;
  siteId: string;
  utilityTypeId: string;
  siteName: string;
  utilityTypeName: string;
  utilityTypeType: string;
  active: boolean;
  visible: boolean;
  rollover: number;
  rate: number;
  unit: string;
  externalIds: string[];
  total: number;
  lastReadingDate: string;
  lastReadingLabel: string;
  lastReadingUnit: string;
  lastReadingValue: string;
  lastMeterValue: string;
  lastReading?: UtilityReading;
};

export const UtilityMeterPayloadAttributes = Object.keys(UtilityMeterPayload.new());
