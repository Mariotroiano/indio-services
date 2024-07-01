import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { UtilityFeePayload } from 'services/utilities/UtilityFeePayload';
import { FeeHelper } from 'helpers/FeeHelper';
import { Fee } from 'interfaces/Types';

export class UtilityFee {
  id: string;
  description: string;
  glAccountId: string;
  utilityTaxIds: string[];
  amount: Fee;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(UtilityFee, {
  id: null,
  description: { label: 'Description' },
  glAccountId: { label: 'Financial Account', info: 'Tooltip information.' },
  utilityTaxIds: {label: 'Taxes', type: 'multiple'},
  amount: { label: 'Amount', placeholder: '0.00', type: 'fee' },
  active: { label: 'Active', type: 'switch' },
})
.setRules({
  glAccountId: [{ required: true }],
  amount: [{required: true}]
})
.build();

const mapModel = ModelBuilder.buildMapModel<UtilityFee, UtilityFeePayload>(payload => {
  const model = Factory.create(UtilityFee, {
    ...payload,
    amount: FeeHelper.toModel(payload.rate),
  });
  return model;
});

const buildPayload = (entity: UtilityFee, parkId: string): UtilityFeePayload => {
  const payload = UtilityFeePayload.new(entity);
  payload.parkId = parkId;
  payload.rate = FeeHelper.toPayload(entity.amount)

  return payload;
};

export class Model {
  static modelName = 'Fee';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
