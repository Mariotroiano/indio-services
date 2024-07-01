import { PayloadBase } from './PayloadBase';

export class ClientPayload extends PayloadBase {
  id: string;
  name: string;
  active: boolean;
}

export const ClientPayloadAttributes = Object.keys(ClientPayload.new());
