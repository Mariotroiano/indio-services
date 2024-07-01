import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { PaymentMethod } from '../guest/PaymentMethod';
const PaymentMethodModel = PaymentMethod.Model;

export class PosPaymentMethod extends PaymentMethod {
  reservationNumber: string;
  guestName: string;
  cash: number;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(PosPaymentMethod, {
  reservationNumber: { label: 'Reservation', type: 'searchable' },
  guestName: { label: 'Guest Name', type: 'searchable' },
  cash: { label: 'Cash Amount' },
  ...PaymentMethodModel.fields
})
.build();

class Model extends PaymentMethodModel {
  static fields = fields;
}
