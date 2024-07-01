import { RefundPayload } from 'services/payloads/RefundPayload';
import { ServiceBase } from 'services/client/ServiceBase';
import { AxiosInstance } from 'axios';

export default class RefundService extends ServiceBase<RefundPayload> {
  constructor(ax: AxiosInstance) {
    super(RefundPayload, ax, 'refunds');
  }
}
