import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { PaymentGatewayPayload } from 'services/payloads/PaymentGatewayPayload';

export class PaymentGateway {
  id: string;
  name: string;
  type: string;
  merchantId: string;
  username: string;
  password: string;
  mode: 'live'| 'test';
  primary: boolean;
  active: boolean;
  tokenExpiryDate: string;
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(PaymentGateway, {
  type: { label: 'Type', disabled: true },
  merchantId: { label: 'Merchant ID', type: 'text'},
  username: { label: 'User Name' },
  password: { label: 'Password', type: 'text' },
  mode: { label: 'Mode', type: 'radios'  },
  active: { label: 'Active', type: 'switch' },
  primary: { label: 'Primary', type: 'switch' },
  tokenExpiryDate: { label: 'Token Expiry Date'},
})
.setRules({
  name: [{ required: true }],
})
.build();

const initial: Partial<PaymentGateway> = {
  type: 'PaidYet',
  mode: 'test',
}

const mapModel = ModelBuilder.buildMapModel<PaymentGateway, PaymentGatewayPayload>((payload) => {
  const model = Factory.create(PaymentGateway, {
    ...payload,
  });
  return model;
});

const buildPayload = (entity: PaymentGateway, parkId: string): PaymentGatewayPayload => {
  const payload = PaymentGatewayPayload.new(entity);
  payload.parkId = parkId;
  return payload;
};

class Model {
  static fields = fields;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
  static initial = initial;
  static relation = [PaymentGateway, PaymentGatewayPayload] as const;
};
