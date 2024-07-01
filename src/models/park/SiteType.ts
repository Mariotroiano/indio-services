import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { SiteTypePayload } from 'services/payloads';
import { UniversalSiteType } from 'interfaces/UniversalSiteType';
import { Factory } from 'utils/Factory';

export class SiteType {
  id: string;
  name: string;
  description: string;
  active: boolean;
  photoDataUri: string;
  rateSummary: string;
  displayOrder: number;
  type: string;
  maxAdults: number;
  maxChildren: number;
  maxPets: number;
  maxOccupancy: number;
  leadDays: number;
  minNights: number;
  maxNights: number;
  universalSiteType?: UniversalSiteType;
  yearlyGlAccountId: string;
  monthlyGlAccountId: string;
  weeklyGlAccountId: string;
  dailyGlAccountId: string;
  canBookOnline: boolean;
  defaultVehicleLength: boolean;
  utilityTypeIds: string[];
  amenityList: string;
  categoryList: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(SiteType, {
  active: { label: 'Active', type: 'switch' },
  photoDataUri: { label: 'Thumbnail', type: 'image' },
  rateSummary: { label: 'Rate Summary', type: 'textarea' },
  displayOrder: { label: 'Display Order', type: 'number' },
  maxAdults: { label: 'Max Adults', type: 'number' },
  maxChildren: { label: 'Max Children', type: 'number' },
  maxPets: { label: 'Max Pets', type: 'number' },
  leadDays: { label: 'Lead Days', type: 'number' },
  minNights: { label: 'Min Nights', type: 'number' },
  maxNights: { label: 'Max Nights', type: 'number' },
  maxOccupancy: { label: 'Max Occupancy', placeholder: 'Max Occup.', type: 'number' },
  yearlyGlAccountId: { label: 'Yearly Account', placeholder: 'Account' },
  monthlyGlAccountId: { label: 'Monthly Account', placeholder: 'Account' },
  weeklyGlAccountId: { label: 'Weekly Account', placeholder: 'Account' },
  dailyGlAccountId: { label: 'Daily Account', placeholder: 'Account' },
  canBookOnline: { label: 'Can Book Online', type: 'switch' },
  defaultVehicleLength: { label: 'Use Default Vehicle Lengths', type: 'switch'},
  utilityTypeIds: { label: 'Utility Types', type: 'multiple' },
  amenityList: { label: 'Amenities', type: 'textarea' },
  categoryList: { label: 'Categories', type: 'textarea' },
})
.setRules({
  name: [{ required: true }],
  type: [{ required: true }],
  description: [{ required: true }],
  rateSummary: [{ required: true }],
  photoDataUri: [{ required: true }]
})
.build();

const mapModel = ModelBuilder.buildMapModel<SiteType, SiteTypePayload>((payload) => {
  const model = Factory.create(SiteType, {
    ...payload,
    photoDataUri: payload.primaryPhotoUrl
  });
  return model;
});

const buildPayload = (parkId: string, values: SiteType): SiteTypePayload => {
  const payload = SiteTypePayload.new({
    ...values,
    parkId: parkId,
  });

  return payload;
};

const initialValues: Partial<SiteType> = {
  maxAdults: 2,
  maxChildren: 2,
  maxPets: 2,
  maxOccupancy: 4,
  defaultVehicleLength: true,
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static initialValues = initialValues;
}
