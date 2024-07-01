import { PayloadBase } from './PayloadBase';

export class LocationPayload extends PayloadBase {
  id: string
  parkId: string
  name: string
  type: string
  active: boolean
  createdAt: string
  updatedAt: string
};

export const LocationPayloadAttributes = Object.keys(LocationPayload.new());
