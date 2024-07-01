import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { GuestPayload } from 'services/payloads';
import { Vehicle } from './Vehicle';
import { Factory } from 'utils/Factory';

export class Guest {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  useMailingAsBilling: boolean;
  billingAddress: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  // Vehicle info
  vehicleType: string
  vehicleLengthRange: string
  vehicleLength: string
  vehicleSlides: string[]
  vehicleTowing: string
  vehicleElectrical: string[]
  mostRecentStay?: GuestPayload['mostRecentStay']
  outstandingBalance?: number
  lifetimeSpent?: number

  static Model = setModel(this, () => Model);
}

class Address {
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const addressFields = ModelBuilder.buildFields(Address, {
  address2: { label: 'Apt. Suite (Optional)' },
  state: { label: 'State', type: 'searchable' },
  postalCode: { label: 'Zip/Postal Code', placeholder: 'Code', type: 'text', info: 'Enter the postal/zip code to populate the city, state/province, and country.' },
  country: { label: 'Country', type: 'searchable' },
})
.build();

const billingAddressFields = ModelBuilder.buildFields(Address, {
  address: { label: 'Billing Address' },
  address2: { label: 'Billing Apt. Suite (Optional)' },
})
.addFields(addressFields)
.build();

const fields = ModelBuilder.buildFields(Guest, {
  fullName: { label: 'Name' },
  phone: { label: 'Phone', type: 'tel' },
  useMailingAsBilling: { label: 'Use Mailing Address as Billing Address' },
})
.addFields(addressFields)
.addFields(billingAddressFields, 'billing')
.addFields(Vehicle.Model.fields, 'vehicle')
.setRules({
  firstName: [{ required: true }],
  lastName: [{ required: true }],
  email: [{ type: 'email' }],
  phone: [{ max: 25, message: 'Phone number should not exceed 25 characters' }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Guest, GuestPayload>((payload) => {
  const model = Factory.create(Guest, {
    ...payload,
    phone: payload.formattedPhone,
    displayName: [payload.firstName, payload.middleName, payload.lastName].filter(x => Boolean(x)).join(' '),
  });
  return model;
})

const buildPayload = (guest: Guest, parkId: string) => {
  const payload = GuestPayload.new(guest);
  payload.parkId = parkId;
  payload.vehicleLengthRange = guest.vehicleLengthRange || null;
  return payload;
}

const mapVehicle = (guest: Guest | GuestPayload) => {
  const vehicle: Vehicle = {
    type: guest.vehicleType,
    lengthRange: guest.vehicleLengthRange,
    length: guest.vehicleLength,
    slides: guest.vehicleSlides,
    towing: guest.vehicleTowing,
    electrical: guest.vehicleElectrical,
  }
  return vehicle;
}

const buildPartialPayload = (guestId: string, vehicle: Vehicle) => {
  const payload = {
    id: guestId,
    vehicleType: vehicle.type,
    vehicleLengthRange: vehicle.lengthRange || null,
    vehicleLength: vehicle.length,
    vehicleSlides: vehicle.slides,
    vehicleTowing: vehicle.towing,
    vehicleElectrical: vehicle.electrical,
  }
  return payload as GuestPayload;
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static mapVehicle = mapVehicle;
  static buildPayload = buildPayload;
  static buildPartialPayload = buildPartialPayload;
  static relation = [Guest, GuestPayload] as const;
}
