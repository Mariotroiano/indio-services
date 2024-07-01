import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { UtilityTaxPayload } from 'services/utilities/UtilityTaxPayload';
import { FeeHelper } from 'helpers/FeeHelper';
import { Fee } from 'interfaces/Types';

export class UtilityTax {
  id: string;
  description: string;
  amount: Fee;
  glAccountId: string;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(UtilityTax, {
  id: null,
  description: { label: 'Description' },
  amount: { label: 'Amount', placeholder: '0.00', type: 'fee' },
  glAccountId: { label: 'Financial Account', info: 'Tooltip information.' },
  active: { label: 'Active', type: 'switch' },
})
.setRules({
  glAccountId: [{ required: true }],
  amount: [{required: true}]
})
.build();

const mapModel = ModelBuilder.buildMapModel<UtilityTax, UtilityTaxPayload>(payload => {
  const model = Factory.create(UtilityTax, {
    ...payload,
    amount: FeeHelper.toModel(payload.rate),
  });
  return model;
});

const buildPayload = (entity: UtilityTax, parkId: string): UtilityTaxPayload => {
  const payload = UtilityTaxPayload.new(entity);
  payload.parkId = parkId;
  payload.rate = FeeHelper.toPayload(entity.amount)

  return payload;
};

export class Model {
  static modelName = 'Tax';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
