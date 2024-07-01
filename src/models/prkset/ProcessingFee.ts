import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { ProcessingFeePayload } from 'services/payloads/ProcessingFeePayload';
import { buildOptionItems } from 'utils/buildOptionItems';

export class ProcessingFee {
  id: string
  parkId: string
  active: boolean
  percent: number
  amount: number
  paymentType: string
  cardType: string
  inputMethod: string
  detail: string
  static Model = setModel(this, () => Model);
}

const inputMethodOps  = buildOptionItems(["any", "swipe", "keyed"]);
const paymentTypeOps = buildOptionItems(['card']);
const cardTypeOps = buildOptionItems(['any', 'visa', 'mastercard', 'discover', 'amex']);

const fields = ModelBuilder.buildFields(ProcessingFee, {
  id: null,
  active: { label: 'Active', type: 'switch' },
  percent: { label: 'Fee Percentage (%)', type: 'numeric', placeholder: '%' },
  amount: { label: 'Dollar Fee ($)', type: 'numeric', placeholder: '$' },
  paymentType: {label: 'Payment Type', options: paymentTypeOps },
  cardType: { label: 'Card Type', options: cardTypeOps },
  inputMethod: { label: 'Input Method', options: inputMethodOps },
  detail: {label: 'Detail'}
})
.setRules({
  paymentType: [{required: true}],
  inputMethod: [{required: true}],
})
.build();

const mapModel = ModelBuilder.buildMapModel<ProcessingFee, ProcessingFeePayload>(payload => {
  const model = Factory.create(ProcessingFee, {
    ...payload,
  });
  return model;
});

const buildPayload = (entity: ProcessingFee, parkId: string): ProcessingFeePayload => {
  const payload = ProcessingFeePayload.new(entity);
  payload.parkId = parkId;
  return payload;
};

const initialValues: Partial<ProcessingFee> = {
  paymentType: 'card',
  cardType: 'any',
  inputMethod: 'any',
}
export class Model {
  static modelName = 'Processing Fee';
  static initialValues = initialValues;
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
