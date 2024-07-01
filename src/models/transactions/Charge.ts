import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ChargePayload } from 'services/payloads/ChargePayload';
import { Factory } from 'utils/Factory';
import { Sundry } from './Sundry';
import { Transaction } from './Transaction';

export class Charge {
  id: string;
  orderId?: string;
  reservationId?: string;
  paymentMethodId?: string;
  glAccountId?: string;
  sundryId: string;
  description: string;
  memo?: string;
  unitPrice: number;
  quantity: number;
  total: number;
  status: string;

  constructor(sundry?: Sundry, reservationId?: string);
  constructor(charge?: Partial<Charge>);
  constructor(transaction?: Transaction);
  constructor(entity?: Charge | Sundry | Transaction, reservationId?: string) {
    Object.assign(this, entity);
    Object.keys(this).forEach(key => this[key] === null && delete this[key]);
    if (entity instanceof Sundry) {
      this.id = null;
      this.sundryId = entity.id;
      this.reservationId = reservationId;
    }
  }

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Charge, {
  orderId: { label: 'Order #' },
  reservationId: { label: 'Reservation' },
  paymentMethodId: { label: 'Payment Method' },
  glAccountId: { label: 'GL Account Id' },
  sundryId: { label: 'Sundry Id' },
  description: { label: 'Miscellaneous Charge' },
  memo: { label: 'Additional Note' },
  unitPrice: { label: 'Unit Price', type: 'numeric' },
  quantity: { label: 'Quantity', type: 'number' },
})
.build()

const fixTypes = (values: Charge) => {
  const amount = Number(values.unitPrice);
  const quantity = Number(values.quantity);
  const newValues = { ...values, amount, quantity };
  return newValues;
};

const buildPayload = (values: Charge, parkId: string) => {
  const payload = ChargePayload.new(values);
  payload.parkId = parkId;
  return payload;
};

const mapModel = ModelBuilder.buildMapModel<Charge, ChargePayload>((charge) => {
  const model = Factory.create(Charge, charge);
  return model;
});

class Model {
  static fields = fields;
  static fixTypes = fixTypes;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
}
