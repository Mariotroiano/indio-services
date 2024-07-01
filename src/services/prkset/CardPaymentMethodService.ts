import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { CardPaymentMethodPayload } from 'services/payloads/PaymentMethodPayload';

export default class CardPaymentMethodService extends ServiceBase<CardPaymentMethodPayload> {
  constructor(ax: AxiosInstance) {
    super(CardPaymentMethodPayload, ax, 'payment_methods');
  }

}
