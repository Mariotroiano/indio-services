import { PayloadBase } from './PayloadBase';
import { ReservationPayload } from './ReservationPayload';
import { snakeCase } from 'lodash';

export class ReservationChartPayload extends PayloadBase {
  id: string;
  siteTypeId: string;
  siteId: string;
  siteNumber: string;
  parkId: string;
  type: 'Reservation' | 'SiteHold';
  holdType: string;
  arrivalDate: string;
  departureDate: string;
  number: string;
  numberOfNights: number;
  checkInTime: string;
  checkOutTime: string;
  guestFullName: string;
  confirmationNumber: string;
  status: string;
  notes: string;
  rateType: string
  siteLocked: boolean;
  createdAt: string;
  updatedAt: string;

  static fromReservation(reservation: ReservationPayload) {
    const payload = this.new(reservation);
    return fillInstance(payload, reservation);
  }

  static get fields() {
    const sample = this.new();
    const superSample = ReservationPayload.new();
    return getKeys(sample, superSample);
  }
}

function fillInstance(payload: ReservationChartPayload, reservation: ReservationPayload) {
  payload.siteNumber = reservation.site?.siteNumber;
  payload.guestFullName = reservation.guest?.fullName;
  return payload;
}

function getKeys<T, U>(sample: T, superSample: U) {
  let keys = Object.keys(sample);
  const superKeys = Object.keys(superSample);
  keys = keys.filter(key => superKeys.includes(key));
  keys = keys.map(key => snakeCase(key));
  return keys;
}
