import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { PolicySettingPayload } from 'services/payloads/ParkPayload.extra';

export class PolicySettings {
  id: string;
  systemTerms: string;
  cancellationPolicy: string;
  refundPolicy: string;
  petPolicy: string;
  terms: string;
  notes: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(PolicySettings, {
  systemTerms: { label: 'System Terms and Conditions', type: 'html' },
  cancellationPolicy: { label: 'Cancellation Policy', type: 'html' },
  refundPolicy: { label: 'Refund Policy', type: 'html' },
  petPolicy: { label: 'Pet Policy', type: 'html' },
  notes: { label: 'Notes', type: 'html' },
  terms: { label: 'Terms and Conditions', type: 'html' },
})
.build();

const mapModel = ModelBuilder.buildMapModel<PolicySettings, PolicySettingPayload>((payload) => {
  const model = Factory.create(PolicySettings, payload);
  return model;
});

const buildPayload = (policy: PolicySettings): PolicySettingPayload => {
  const payload = PolicySettingPayload.new(policy);
  return payload;
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
};
