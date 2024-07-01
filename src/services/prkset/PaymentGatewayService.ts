import { PaymentGatewayPayload } from 'services/payloads/PaymentGatewayPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class PaymentGatewayService extends ServiceBase<PaymentGatewayPayload> {
  constructor(ax: AxiosInstance) {
    super(PaymentGatewayPayload, ax, 'payment_gateways');
  }
  
}
