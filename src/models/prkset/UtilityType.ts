import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { UtilityTypePayload } from 'services/utilities/UtilityTypePayload';
import { Factory } from 'utils/Factory';
import { buildOptionItems } from 'utils/buildOptionItems';

export class UtilityType {
  id: string;
  parkId: string;
  glAccountId: string;
  siteTypeIds: string;
  name: string;
  type: string;
  unit: string;
  rate: number;
  rollover: number;

  static Model = setModel(this, () => Model);
}

const typeOps = buildOptionItems(['electric', 'water', 'gas']);

const fields = ModelBuilder.buildFields(UtilityType, {
  parkId: null,
  glAccountId: { label: 'Financial account' },
  siteTypeIds: { label: 'Site Types', type: 'multiple' },
  type: { label: 'Type', options: typeOps },
  unit: { label: 'Unit of measurement', placeholder: 'Kw' },
  rate: { label: 'Default rate (per unit)', type: 'numeric' },
  rollover: { label: 'Rollover value', type: 'numeric' },
})
.setRules({
  name: [{ required: true }],
  type: [{ required: true }],
  glAccountId: [{ required: true }],
  unit: [{ required: true }],
  rate: [{ required: true }],
  rollover: [{ required: true }],
})
.build();

const buildPayload = (values: UtilityType, parkId: string): UtilityTypePayload => {
  const payload: Partial<UtilityTypePayload> = {
    ...values,
    parkId: parkId,
  };
  return payload as UtilityTypePayload;
};

const mapModel = ModelBuilder.buildMapModel<UtilityType, UtilityTypePayload>((payload) => {
  const model = Factory.create(UtilityType, {
    ...payload
  });
  return model;
});

export class Model {
  static modelName = 'Utility Type';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
