import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { LongTermRequestPayload } from 'services/payloads/LongTermRequestPayload';
import { VisitorsInfo } from 'models';
import { Guest, Vehicle } from 'models/guest';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';

export class LongTermRequest {
  id: string;
  siteTypeId: string;
  siteTypeName: string;
  guest: Guest;
  guestName: string;
  requestNum: string;
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  dateRange?: dayjs.Dayjs[];
  guestsInfo: VisitorsInfo;
  guestCount: number;
  status: string;
  vehicleType: string;
  vehicleLengthRange: string;
  vehicleSlides: string[];
  vehicleTowing: string;
  vehicleElectrical: string[];
  actions: string[];

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(LongTermRequest, {
  siteTypeId: { label: 'Site Type', type: 'searchable' },
  siteTypeName: { label: 'Site Type Name' },
  guest: {
    label: 'Main Guest', placeholder: 'Search Guest', type: 'searchable',
    info: 'Search by first or last name to find a previous guest or to launch the New Guest form.'
  },
  guestName: { label: 'Guest Name' },
  requestNum: { label: 'Request Number' },
  arrival: { label: 'Arrival', type: 'date' },
  departure: { label: 'Departure', type: 'date' },
  dateRange: { label: 'Dates', placeholder: null },
  guestCount: { label: 'Guests', type: 'number' },
  guestsInfo: { label: 'Guests' },
  status: { label: 'Active' },
})
.addFields(Vehicle.Model.fields)
.build();

const mapModel = ModelBuilder.buildMapModel<LongTermRequest, LongTermRequestPayload>((payload) => {
  const model = Factory.create(LongTermRequest, {
    ...payload,
    guest: payload.guestSummary,
    guestName: payload.guestSummary.fullName,
    arrival: dayjs(payload.arrivalDate),
    departure: dayjs(payload.departureDate),
    guestsInfo: { adults: 0, children: 0, pets: 0 },
    guestCount: 0,
    status: 'pending',
    actions: ['action_1', 'cancel'],
  })
  return model
});

const buildPayload = (values: LongTermRequest): LongTermRequestPayload => {
  const payload = LongTermRequestPayload.new(values);
  payload.guestSummary = null;
  return payload;
};

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
