import ModelBuilder from 'utils/ModelBuilder';
import { Discount } from 'models/prkset/Discount';
import { startCase } from 'lodash';

export class RateDiscountInfo {
  rateId: string;
  rateName?: string;
  rateType: string;
  rateOverride: number;
  rateAmounts?: {
    dailyAmount: number;
    monthly: number;
    yearly: number;
  }
  discount?: Discount;
  discountId: string;
  discountCode: string;
  loyaltyNumber: string;

  static getDetails(inst: RateDiscountInfo) {
    if (!inst) return null;

    const { rateName, rateType, rateOverride } = inst;
    const fields = { rateType, rateOverride };
    const pairKeyValue = Object.entries(fields)
      .filter(entry => Boolean(entry[1]))
      .map(entry => ({key: entry[0], value: entry[1]}));
    pairKeyValue.forEach(item => {
      item.key = item.key.replace('rate', '');
      item.value = startCase(item.value.toString());
    });
    const data = pairKeyValue.map(item => `${item.key}: ${item.value}`);
    const output = [rateName, ...data].join(' | ');
    return output;
  }

  static fields = hoistFields(this);
}

function hoistFields(model: typeof RateDiscountInfo) {
  const fields = ModelBuilder.buildFields(model, {
    rateId: { label: 'Rate', info: 'Rate type is automatically selected based on the reservation dates' },
    rateType: { label: 'Rate Type', placeholder: 'Type' },
    rateOverride: { label: 'Override', placeholder: '-.--', type: 'currency' },
    discountId: { label: 'Discount' },
    discountCode: { label: 'Discount Code', placeholder: 'Code' },
    loyaltyNumber: { label: 'Discount Loyalty', placeholder: 'Loyalty' },
  })
  .build();

  return fields;
}
