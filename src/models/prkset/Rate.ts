import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { RatePayload } from 'services/payloads/RatePayload';
import { getLabels } from 'components/forms/helpers';
import { Factory } from 'utils/Factory';
import { Discount } from './Discount';

export class Rate {
  id: string;
  siteTypeIds: string[];
  discountIds: string[];
  name: string;
  description: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
  yearlyAmount: number;
  mondayAmount: number;
  tuesdayAmount: number;
  wednesdayAmount: number;
  thursdayAmount: number;
  fridayAmount: number;
  saturdayAmount: number;
  sundayAmount: number;
  overwriteDaily: boolean;
  rateChargeDescription: string;
  active: boolean;
  amount: null;   // Used as custom column
  extraGuestFee: number;
  extraPetFee: number;
  includedGuests: number;
  includedPets: number;
  maxGuests: number;
  maxPets: number;
  appliesTo: string[];
  included: {
    discounts: Discount[],
  };

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Rate, {
  siteTypeIds: { label: 'Site Types', type: 'multiple' },
  discountIds: { label: 'Discounts', type: 'multiple' },
  dailyAmount: { label: 'Daily', placeholder: '$0.00', type: 'currency' },
  weeklyAmount: { label: 'Weekly', placeholder: '-.--', type: 'currency' },
  monthlyAmount: { label: 'Monthly', placeholder: '-.--', type: 'currency' },
  yearlyAmount: { label: 'Yearly', placeholder: '-.--', type: 'currency' },
  overwriteDaily: { label: 'Overwrite Daily', type: 'switch' },
  mondayAmount: { label: 'Monday', placeholder: '-.--', type: 'currency' },
  tuesdayAmount: { label: 'Tuesday', placeholder: '-.--', type: 'currency' },
  wednesdayAmount: { label: 'Wednesday', placeholder: '-.--', type: 'currency' },
  thursdayAmount: { label: 'Thursday', placeholder: '-.--', type: 'currency' },
  fridayAmount: { label: 'Friday', placeholder: '-.--', type: 'currency' },
  saturdayAmount: { label: 'Saturday', placeholder: '-.--', type: 'currency' },
  sundayAmount: { label: 'Sunday', placeholder: '-.--', type: 'currency' },
  active: { label: 'Active', type: 'switch' },
  rateChargeDescription: { label: 'Rate Charge Description' },
  extraGuestFee: { label: 'Extra Guest Fee', type: 'currency'},
  extraPetFee: { label: 'Extra Pet Fee', type: 'currency' },
  includedGuests: { label: 'Included Guests', type: 'number' },
  includedPets: { label: 'Included Pets', type: 'number' },
  maxGuests: { label: 'Max Guests', type: 'number' },
  maxPets: { label: 'Max Pets', type: 'number' },
  appliesTo: { label: 'Applies To', type: 'checkboxes' }
})
.setRules({
  siteTypeIds: [{required: true}],
  name: [{required: true}],
  appliesTo: [{required: true}]
})
.build();

const mapModel = ModelBuilder.buildMapModel<Rate, RatePayload>((payload) => {
  const model = Factory.create(Rate, payload);
  model.amount = null;
  model.included = {
    discounts: Discount.Model.mapModel(payload.discounts),
  }
  return model;
})

const buildPayload = (values: Rate, parkId: string): RatePayload => {
  const payload = RatePayload.new(values);
  payload.parkId = parkId;
  payload.siteTypeIds = values.siteTypeIds || [];
  payload.discountIds = values.discountIds || [];

  return payload;
};

const initialValues: Partial<Rate> = {
  siteTypeIds: [],
  discountIds: [],
  active: true,
  overwriteDaily: false,
  includedGuests: 4,
  includedPets: 0,
  maxGuests: 4,
  maxPets: 0,
}

class Model {
  static fields = fields;
  static labels = getLabels(fields);
  static buildPayload = buildPayload;
  static mapModel = mapModel;
  static initialValues = initialValues;
  static relation = [Rate, RatePayload] as const;
}
