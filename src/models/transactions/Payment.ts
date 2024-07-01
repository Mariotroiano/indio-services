import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { PaymentSummary } from 'services/payloads/ReservationPayload.extra';
import { PaymentMethod,   } from '../guest/PaymentMethod';
import { PaymentPayload, Action } from 'services/payloads/PaymentPayload';
import { Factory } from 'utils/Factory';
import { Refund } from './Refund';
import dayjs from 'dayjs';

export class Payment {
  id: string
  parkId?: string
  reservationId?: string
  paymentMethod?: PaymentMethod
  type: string
  subType: string
  date: dayjs.Dayjs
  method?: string
  description: string
  memo: string
  checkNumber?: string
  amount: number
  debit?: number
  credit?: number
  actions: Action[]
  status: string
  refunds?: Refund[]
  refundableAmount?: number
  number?: string
  cardholderName?: string
  orderId?: string
  expiry?: string
  cardNumber?: number
  cvc?: string

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Payment, {
  amount: { label: 'Amount', type: 'currency' },
  refundableAmount: { label: 'Amount', type: 'number' },
  debit: { label: 'DR', type: 'number' },
  credit: { label: 'CR', type: 'number' },
  number: { label: 'Txn#' },
  orderId: { label: 'Order #' },
  expiry: { label: 'Expiry Date', placeholder: 'MM/YY' },
  cvc: { label: 'CVC' },
})
.setRules({
  paymentMethod: [{ required: true }],
  cardholderName: [{ required: true }],
  amount: [{ required: true, message: 'Required' }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Payment, PaymentPayload>(payload => {
  const refunds = Refund.Model.mapModel(payload.refunds);
  const model = Factory.create(Payment, {
    ...payload,
    paymentMethod: null,
    date: dayjs(payload.date),
    refunds: refunds,
  });
  return model;
});

const mapPaymentSummaryModel = ModelBuilder.buildMapModel<Payment, PaymentSummary>(payload => {
  const { subType, cardType, cardLast4 } = payload || {};
  const methodName = PaymentMethod.Model.getPaymentMethodName(`${subType}PaymentMethod`, cardType, cardLast4);

  const model = Factory.create(Payment, {
    ...payload,
    date: dayjs(payload.date),
    paymentMethod: null,
    method: methodName,
    refunds: payload.refunds
  })
  return model;
});

const buildPayload = (values: Payment, reservationId: string, parkId: string): PaymentPayload => {
  const payload = PaymentPayload.new({
    ...values,
    date: undefined,
    parkId: parkId,
    reservationId: reservationId,
    paymentMethodId: values.paymentMethod.id,
    memo: values.memo || 'Payment',
    refunds: undefined,
  });
  return payload;
};

export type { Action };

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static mapPaymentSummaryModel = mapPaymentSummaryModel;
  static buildPayload = buildPayload;
};
