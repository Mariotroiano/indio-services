import { PaymentRulePayload } from 'services/payloads/PaymentRulePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class PaymentRuleService extends ServiceBase<PaymentRulePayload> {
  constructor(ax: AxiosInstance) {
    super(PaymentRulePayload, ax, 'payment_rules');
  }
  getAll = (guestId: string) => super.getAllBy({ guestId });
}
