import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { SiteHoldPayload } from 'services/payloads/SiteHoldPayload';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';
import { Guest } from 'models/guest';
import { Reservation } from './Reservation';

export class SiteHold {
  id: string;
  siteId: string
  siteTypeId: string
  guestId: string
  confirmationNumber: string
  type: 'SiteHold'
  holdType: HoldType
  guest: Guest;
  dateRange: dayjs.Dayjs[]
  notes: string
  siteStatus: string
  status: string
  actions: ActionsType[]

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(SiteHold, {
  guestId: null,
  type: null,
  confirmationNumber: null,
  guest: {
    label: 'Guest Name', placeholder: 'Search Guest', type: 'searchable',
    info: 'Search by first or last name to find a previous guest or to launch the New Guest form.'
  },
  siteId: { label: 'Site', placeholder: 'Select a Site', type: 'searchable' },
  siteTypeId: { label: 'Site Type', placeholder: 'Select a Site Type', type: 'searchable' },
  holdType: { label: 'Site Hold Type' },
  dateRange: { label: 'Holding Period', type: 'date' },
  notes: { label: 'Notes', type: 'textarea' },
  siteStatus: { label: 'Status' },
  actions: { label: 'Action' }
})
.setRules({
  siteId: [{ required: true }],
  dateRange: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<SiteHold, SiteHoldPayload>((payload) => {
  const { guestFirstName, guestMiddleName, guestLastName } = payload;
  const guest = {
    id: payload.guestId,
    displayName: [guestFirstName, guestMiddleName, guestLastName].filter(item => item?.length > 0).join(' '),
  };
  const model = Factory.create(SiteHold, {
    id: payload.id,
    siteId: payload.siteId,
    siteTypeId: payload.siteTypeId,
    guestId: payload.guestId,
    confirmationNumber: payload.confirmationNumber,
    type: payload.type,
    holdType: payload.holdType as HoldType,
    guest: guest as any,
    dateRange: [dayjs(payload.arrivalDate), dayjs(payload.departureDate)],
    notes: payload.notes,
    siteStatus: payload.siteStatus,
    status: payload.status,
    actions: payload.actions as ActionsType[],
  });

  return model;
});

const mapModelFromReservation = (reservation: Reservation): SiteHold => {
  const guest = { id: reservation.guestId, ...reservation.guestInfo };
  const guestModel = guest as unknown as Guest;
  const entity = Factory.create(SiteHold, {
    id: reservation.id,
    siteId: reservation.siteId,
    siteTypeId: reservation.siteTypeId,
    guestId: reservation.guestId,
    confirmationNumber: reservation.confirmationNumber,
    type: 'SiteHold',
    holdType: null,
    guest: guestModel,
    dateRange: [reservation.arrival, reservation.departure],
    siteStatus: reservation.siteStatus,
    status: reservation.status,
    notes: reservation.notes,
    actions: reservation.actions as ActionsType[]
  });

  return entity;
}

const buildPayload = (values: SiteHold, parkId: string): SiteHoldPayload => {
  const [arrival, departure] = values.dateRange;
  const payload = SiteHoldPayload.new(values);
  payload.parkId = parkId;
  payload.guestId = values.guest?.id;
  payload.arrivalDate = arrival.format('YYYY-MM-DD');
  payload.departureDate = departure.format('YYYY-MM-DD');

  return payload;
};

enum Actions {
  Cancel = 'cancel',
  CompleteReservation = 'complete_reservation',
}

type ActionsType = 'cancel' | 'complete_reservation';

type HoldType = null | 'maintenance_hold';

class Model {
  static fields = fields;
  static buildPayload = buildPayload;
  static mapModel = mapModel;
  static mapModelFromReservation = mapModelFromReservation;
  static Actions = Actions;
}
