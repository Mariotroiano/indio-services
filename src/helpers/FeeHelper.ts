import format from 'utils/format';
import { Fee } from '../interfaces/Types';

export class FeeHelper {
  static toModel(payload: FeePayload) {
    const { value, using } = payload;
    const result: Fee = [value, using];
    return result;
  }

  static spread(fee: Fee) {
    const [number, using] = fee ?? [null, '$'];
    const percent = (using === '%' ? number : null);
    const amount = (using === '$' ? number : null);
    return { amount, percent, using };
  }

  static toPayload(fee: Fee) {
    const [value, using] = fee ?? [null, '$'];
    return { value, using };
  }
}

export const renderFee = (fee: Fee) => {
  const [amount, type] = fee;
  const isPercent = (type === '%');
  const fractionDigits = isPercent ? (hasThousandthPart(amount) ? 4 : 2) : 2;
  const result = isPercent ? (amount.toFixed(fractionDigits) + '%') : format.money(amount);
  return result;
};

function hasThousandthPart(fraction: number) {
  const thousandth = fraction * 100 % 1;
  return thousandth
}

export type FeePayload = {
  value: number;
  using: '$' | '%';
};
