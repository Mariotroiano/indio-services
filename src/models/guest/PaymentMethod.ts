import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Entity } from 'models/Entity';
import { CardPaymentMethodPayload, PaymentMethodPayload } from 'services/payloads/PaymentMethodPayload';
import { startCase } from 'lodash';
import dayjs from 'dayjs';
import { Guest } from './Guest';

export class PaymentMethod extends Entity {
  name: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  primary: boolean;
  cardType: string;
  cardLast4: string;
  isCard?: boolean;
  isRecordedCard?: boolean;
  actions?: string[];
  date?: dayjs.Dayjs;
  tokenized?: boolean;

  static new = this.getNew(PaymentMethod);
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(PaymentMethod, {
  cardholderName: { label: 'Cardholder Name' },
  cardNumber: { label: 'Card Number' },
  expiry: { label: 'Expiry Date', placeholder: 'MM/YY' },
  cvc: { label: 'CVC' },
  primary: { label: 'Make Primary', type: 'switch' },
  cardType: { label: 'Card Type' },
  cardLast4: { label: 'Card Last 4 digits', placeholder: '0000', type: 'numeric' },
  isRecordedCard: { label: 'Save as Recorded Card', type: 'switch' },
})
.build();

const getPaymentMethodName = (type: string, cardType?: string, cardLast4?: string, recordOnly?: boolean) => {
  const cardName = (recordOnly ? 'Recorded ' : '') + startCase(cardType) || 'Card';
  const namesSwitch = {
    'CashPaymentMethod': 'Cash',
    'CheckPaymentMethod': 'Check',
    'CardPaymentMethod': `${cardName} ••••${cardLast4}`,
    'default': 'Unknown',
  }
  const name = namesSwitch[type] || namesSwitch['default'];
  return name;
}

const mapModel = ModelBuilder.buildMapModel<PaymentMethod, PaymentMethodPayload>((payload) => {
  const isCard = (payload.type === 'CardPaymentMethod');
  let name = getPaymentMethodName(payload.type);
  if (isCard) {
    const { type, cardType, cardLast4, recordOnly } = payload as CardPaymentMethodPayload;
    name = getPaymentMethodName(type, cardType, cardLast4, recordOnly);
  };

  const model = PaymentMethod.new({ ...payload, name, isCard });
  return model;
})

const buildPayload = (payment: PaymentMethod, guest: Guest) => {
  const payload = CardPaymentMethodPayload.new(payment);
  if (!guest.useMailingAsBilling) {
    payload.address = guest.billingAddress;
    payload.address2 = guest.billingAddress2;
    payload.city = guest.billingCity;
    payload.postalCode = guest.billingPostalCode;
    payload.state = guest.billingState;
    payload.country = guest.billingCountry;
  }
  payload.guestId = guest.id;
  return payload;
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static getPaymentMethodName = getPaymentMethodName;
};
