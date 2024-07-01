import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { TransactionPayload } from 'services/payloads/TransactionsPayload';
import { TransactionSummary } from 'services/payloads/ReservationPayload.extra';
import { Factory } from 'utils/Factory';
import { Refund } from './Refund';
import dayjs from 'dayjs';

export class Transaction {
  id: string;
  date: dayjs.Dayjs;
  orderId?: string;
  sundryId?: string;
  reservationId?: string;
  paymentMethodId?: string;
  description: string;
  debit: number;
  credit: number;
  type: string;
  subType: string;
  total: number;
  cardType?: string;
  cardLast4?: string;
  status?: string;
  memo?: string;
  unitPrice?: number
  quantity?: number
  amount: number;
  actions?: string[];
  refunds?: Refund[];

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<Transaction, TransactionPayload | TransactionSummary>((payload) => {
  const refunds = Refund.Model.mapModel(payload['refunds'] as any[]);
  const model = Factory.create(Transaction, {
    ...payload,
    date: dayjs(payload.date),
    refunds: refunds,
  }, true);
  return model;
});

class Model {
  static mapModel = mapModel;
}
