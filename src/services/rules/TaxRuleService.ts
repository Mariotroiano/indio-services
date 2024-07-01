import { TaxRulePayload } from 'services/payloads/TaxRulePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';

export default class TaxRuleService extends ServiceBase<TaxRulePayload> {
  constructor(ax: AxiosInstance) {
    super(TaxRulePayload, ax, 'tax_rules');
  }
  getAll = (parkId: string) => super.getAllBy({ parkId });
}

