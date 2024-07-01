import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { ParkPayload } from 'services/payloads/ParkPayload';

export class Park {
  id: string;
  clientId: string;
  clientName?: string;
  logoUrl: string;
  name: string;
  code: string;
  description: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  tollFreePhone: string;
  email: string;
  emailDisplayName: string;
  homepageUrl: string;
  geoCoords: string;
  active: boolean;
  timeZone: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Park, {
  clientId: { label: 'Client' },
  clientName: { label: 'Client' },
  logoUrl: null,
  description: { label: 'Description', type: 'html' },
  address2: { label: 'Address 2' },
  state: { label: 'State', type: 'searchable' },
  postalCode: { label: 'Postal/Zip Code' },
  country: { label: 'Country', type: 'searchable' },
  phone: { label: 'Phone', type: 'tel' },
  tollFreePhone: { label: 'Toll Free Phone' },
  email: { label: 'Email', type: 'email' },
  emailDisplayName: { label: 'Email Display Name' },
  homepageUrl: { label: 'Website' },
  geoCoords: { label: 'Geo Coordinates', placeholder: 'Lat, Long' },
  timeZone: { label: 'Time Zone', type: 'searchable' },
})
.setRules({
  name: [{ required: true }, { max: 100 }],
  address: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Park, ParkPayload>(park => {
  const model = Factory.create(Park, {
    ...park,
    geoCoords: '',
    logoUrl: park?.brandingSetting?.logoUrl,
    tollFreePhone: park?.phone2
  })
  return model;
});

const buildPayload = (values: Park): ParkPayload => {
  const payload: Partial<ParkPayload> = {
    ...values,
    phone2: values.tollFreePhone,
  }
  return payload as ParkPayload;
};

class Model {
  static fields = fields;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
}
