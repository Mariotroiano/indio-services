import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { PaymentPayload } from 'services/payloads/PaymentPayload';
import { Order } from 'models/pos/Order';

export class OrderPayment {
  id: string;
  orderId: string;
  reservationId: string;
  payWith: PayWith;
  amount: number;
  tendered: number;
  changeDue: number;
  checkNumber: string;
  cardInfo: CardInfo;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(OrderPayment, {
  orderId: null,
  reservationId: { label: 'Reservation', placeholder: 'Search by Guest Name or Reservation #' },
  payWith: { label: 'Pay With' },
  tendered: { label: 'Tendered', type: 'currency' },
  changeDue: { label: 'Change Due' },
  checkNumber: { label: 'Check Number' },
  cardInfo: { label: 'Card' },
})
.build();

const mapModel = ModelBuilder.buildMapModel<OrderPayment, PaymentPayload>(payload => {
  const model = Factory.create(OrderPayment, {
    ...payload,
    payWith: payload.payWith as PayWith,
  });
  return model;
});

const buildPayload = (values: Partial<OrderPayment>, paymentMethod: PayWith, order?: Order): PaymentPayload => {
  const payload = PaymentPayload.new({
    orderId: values.orderId,
    checkNumber: values?.checkNumber,
    amount:  order && order.total,
    payWith: paymentMethod,
    tendered: paymentMethod === 'check' ? order.total : values.tendered,
    ...values?.cardInfo,
    
  }, true);

  return payload;
};

export type PayWith = 'cash' | 'check' | 'card' | 'reservation';

type CardInfo = {
  cardholderName?: string;
  cardNumber?: number;
  expiry?: string;
  cvc?: string;
};

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
};
