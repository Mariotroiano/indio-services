import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { ReservationEntryRequest } from 'services/payloads/ReservationPayload';
import { Guest, PaymentMethod, Vehicle } from 'models/guest';
import { DateRange } from 'interfaces/Types';
import dayjs from 'dayjs';
import { VehicleInfo, VisitorsInfo } from './Reservation.extra';
import { RateDiscountInfo } from './RateDiscountInfo';
import { Reservation } from './Reservation';
import { Equipment, getEquipment } from 'models/guest/Vehicle';

export class ReservationEntry extends RateDiscountInfo {
  id: string;
  siteId: string;
  siteTypeId: string;
  siteSelect: string;
  guest: Guest;
  guestName: string;
  dateRange: DateRange;
  siteLocked: boolean;
  chargeSiteLock?: boolean;
  visitorsInfo: VisitorsInfo;
  vehicleInfo?: VehicleInfo;
  paymentMethod: PaymentMethod;
  notes: string;
  checkNumber?: string;
  paymentOverride?: number;
  updateRateCharges?: boolean;
  equipment: Equipment;

  static Model = setModel(this, () => Model);
}

export type VehicleProps = `vehicle${Capitalize<keyof Omit<Vehicle, 'id'>>}`;

const fields = ModelBuilder.buildFields(ReservationEntry, {
  siteId: null,
  siteTypeId: null,
  siteSelect: { label: 'Site / Site Type' },
  guest: {
    label: 'Reservation Guest', placeholder: 'Search Guest', type: 'searchable',
    info: 'Search by first or last name to find a previous guest or to launch the New Guest form.'
  },
  guestName: { label: 'Reservation Guest' },
  dateRange: { label: 'Dates' },
  visitorsInfo: { label: 'Guests' },
  vehicleInfo: { label: 'Equipment details' },
  siteLocked: null,
  chargeSiteLock: null,
  paymentMethod: {
    label: 'Payment Method', placeholder: 'Select a payment method',
    info: 'Leave Payment Method blank to skip charging the first-night deposit fee',
  },
  notes: { label: 'Additional Notes', type: 'textarea' },
  checkNumber: { label: 'Check Number' },
  paymentOverride: { label: 'Payment Amount', type: 'currency' },
})
.addFields(RateDiscountInfo.fields)
.setRules({
  guest: [{ required: true }],
  dateRange: [{ required: true, type: 'array' }],
  rateId: [{ required: true }],
})
.build();

const mapModelFromReservationModel = (reservation: Reservation): ReservationEntry => {
  const guest = { id: reservation.guestId, ...reservation.guestInfo };
  const guestModel = guest as unknown as Guest;
  const paymentMethod = { id: reservation.paymentMethodId || null } as PaymentMethod;
  const entity = Factory.create(ReservationEntry, {
    ...reservation,
    ...reservation.rateDiscountInfo,
    guest: guestModel,
    guestName: guest.displayName,
    dateRange: [reservation.arrival, reservation.departure],
    paymentMethod: paymentMethod,
  });

  return entity;
}

const buildPayload = (model: ReservationEntry, parkId: string) => {
  const [arrival, departure] = model.dateRange;
  const payload = ReservationEntryRequest.new(model, true);
  Object.assign(payload, model.visitorsInfo);
  Object.assign(payload, model.vehicleInfo);
  payload.parkId = parkId;
  payload.guestId = model.guest.id;
  payload.paymentMethodId = model.paymentMethod?.id;
  payload.arrivalDate = arrival.format('YYYY-MM-DD');
  payload.departureDate = departure.format('YYYY-MM-DD');
  payload.equipment = getEquipment(model.vehicleInfo);
  payload.type = 'Reservation';

  return payload;
}

const disabledDate = (current: dayjs.Dayjs) => {
  // Can not select days before today and today
  return current && current <= dayjs().startOf('day');
}

const initialValues: Partial<ReservationEntry> = {
  visitorsInfo: { adults: 2, children: 0, pets: 0 },
  rateType: 'daily',
}

class Model {
  static fields = fields;
  static mapModelFromReservationModel = mapModelFromReservationModel;
  static buildPayload = buildPayload;
  static disabledDate = disabledDate;
  static initialValues = initialValues;
}
