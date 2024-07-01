import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { LocationPayload } from 'services/payloads/LocationPayload';
import { Factory } from 'utils/Factory';
import { buildOptionItems } from 'utils/buildOptionItems';

export class Location {
  id: string;
  name: string;
  type: string;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const typeOps = buildOptionItems(['pos', 'online', 'booking']);

const fields = ModelBuilder.buildFields(Location, {  
  id: null,
  name: { label: 'Location Name' },
  type: { label: 'Location Type', options: typeOps },
  active: { label: 'Active', type: 'switch' }
})
.setRules({
  name: [{ required: true }], 
})
.build();

const buildPayload = (values: Location, parkId: string): LocationPayload => {
  const payload = LocationPayload.new({
    ...values,
    parkId: parkId,
  })
  return payload;
};

const mapModel = ModelBuilder.buildMapModel<Location, LocationPayload>((location) => {
  const model = Factory.create(Location, location)
  return model;
});

class Model {
  static modelName = 'Location';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
