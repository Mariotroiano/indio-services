import ModelBuilder from 'utils/ModelBuilder';
import { RefundPayload } from 'services/payloads/RefundPayload';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';

export class Refund {
  id: string;
  paymentId: string;
  date: dayjs.Dayjs;
  description: string;
  memo: string;
  amount: number;
  debit?: number;
  credit?: number;
  quantity?: number
  total?: number;
  status: string;
  actions?: any[];
  
  static Model = buildModel(this);
}

function buildModel(model: typeof Refund) {
  const fields = ModelBuilder.buildFields(model, {
    paymentId: { label: 'Payment' },
    memo: { label: 'Additional Note' },
    amount: { label: 'Amount', type: 'numeric' },
    debit: { label: 'DR', type: 'number' },
    credit: { label: 'CR', type: 'number' }
  })
  .build();

  const mapModel = ModelBuilder.buildMapModel<Refund, RefundPayload>(payload => {
    const model = Factory.create(Refund, {
      ...payload,
      date: dayjs(payload.date),
    });
    return model;
  });

  const buildPayload = (values: Refund): RefundPayload => {
    const payload = RefundPayload.new({
      id: undefined,
      paymentId: values.id,
      amount: values.amount,
      memo: values.memo,
    })
    return payload;
  };

  return { fields, mapModel, buildPayload };
}
