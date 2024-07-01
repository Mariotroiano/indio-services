import { PayloadBase } from './PayloadBase';
export class PaymentGatewayPayload extends PayloadBase {
  id: string;
  active: boolean;
  parkId: string;
  name: string;
  type: string;
  merchantId: string;
  username: string;
  password: string;
  mode: 'live'| 'test';
  primary: boolean;
};

export const PaymentGatewayAttributes = Object.keys(PaymentGatewayPayload.new());
