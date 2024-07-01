import { Fee } from 'interfaces/Types';
import { SettingsPayload } from 'services/payloads/ReservationPayload.extra';
import { FeeHelper } from 'helpers/FeeHelper';
import { toSnakeCase } from 'utils/TransformCase';

export class Settings {
  billing: Billing;
  fee: any;
  rate: any;

  static new(payload: SettingsPayload) {
    const setting = new this();
    if (payload) {
      Object.assign(setting, payload);
      const { lateFees } = setting.billing;
      payload.billing.lateFees.forEach((item, idx) => {
        const { amount, percent, using } = item.amountOrPercent;
        const newFee = { value: amount || percent, using: using };
        lateFees[idx].fee = FeeHelper.toModel(newFee);
      });
    }
    else {
      setting.billing = { autoPayment: null, lateFees: [], ratePeriodStartDay: null, billingType: null };
    }
    return setting;
  }

  static toPayload(settings: Settings) {
    let payload = SettingsPayload.new();
    if (settings) {
      const clone = structuredClone(settings);
      delete clone.billing?.autoPayment?.displayInfo;
      clone.billing.lateFees.forEach(item => {
        delete item.id;
        delete item.displayInfo;
        delete item.fee;
      });
      Object.assign(payload, clone);
      const { lateFees } = payload.billing;
      settings.billing.lateFees.forEach((item, idx) => {
        lateFees[idx].amountOrPercent = FeeHelper.spread(item.fee);
      });
      payload = toSnakeCase(payload);
    }
    return payload;
  }
};

type Billing = {
  autoPayment: AutoPayment;
  lateFees: LateFee[];
  ratePeriodStartDay: number;
  billingType: 'short_term' | 'long_term';
};

type AutoPayment = {
  active: boolean;
  paymentMethodId: string;
  displayInfo: { payingWith: string; status: string; };
};

export class LateFee {
  id?: number;
  active: boolean;
  fee: Fee;
  chargeAfterDays: number;
  chargeDescription: string;
  displayInfo: { summary: string; };

  constructor() {
    this.active = true;
    this.chargeDescription = 'Charge Fee';
    this.fee = [0, '$'];
  }
};
