import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { Payment } from './Payment';
import { Transaction } from './Transaction';
import { Refund } from './Refund';
import dayjs from 'dayjs';

export class TransactionRow {
  id: string
  type?: string
  subType?: string
  date: dayjs.Dayjs
  description: string
  memo?: string
  amount: number
  status: string;
  actions?: Action[]
  refunds?: Refund[]

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(TransactionRow, {
  amount: { label: 'Amount', type: 'numeric' },
  status: null,
})
.build();

const mapModel = ModelBuilder.buildMapModel<TransactionRow, Payment | Transaction | Refund>(entity => {
  const payment = entity['type'] === 'Payment' ? entity as Payment : null;
  const model = Factory.create(TransactionRow, {
    ...entity,
    amount: entity['total'] || entity['amount'],
    actions: entity.actions as any,
    refunds: payment?.refunds ?? null,
  });
  return model;
});

type Action = 'edit' | Payment['actions'][number];

class Model {
  static fields = fields;
  static mapModel = mapModel;
};
