import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ClientPayload } from 'services/payloads/ClientPayload';
import { Factory } from 'utils/Factory';

export class Client {
  id: string;
  name: string;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Client, {
  active: { label: 'Active', type: 'switch' },
})
.setRules({
  name: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Client, ClientPayload>((payload) => {
  const model = Factory.create(Client, payload);
  return model;
});

const buildPayload = (values: Client): ClientPayload => ({
  ...values,
});

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
