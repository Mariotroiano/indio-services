import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Mapping } from 'interfaces/TableOptions';
import dayjs from 'dayjs';
import { Reservation } from './Reservation';

export class ReservationRow {
  id: string;
  siteName: string;
  guestName: string;
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  nights: number;
  balance: string;
  status: string;
  confirmationNumber: string;
  discountCode: string;
  actions: Action[];

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(ReservationRow, {
  siteName: { label: 'Site' },
  guestName: { label: 'Name' },
  arrival: { label: 'Arrival', type: 'date' },
  departure: { label: 'Departure', type: 'date' },
  nights: { label: 'Nights', type: 'number' },
  confirmationNumber: { label: 'Confirmation' },
  discountCode: { label: 'Discount Code', placeholder: 'Code' },
})
.build();

const fieldMapping: Mapping<ReservationRow> = {
  guestName: 'guest_summary',
  siteName: 'site_summary',
  arrival: 'arrival_date',
  departure: 'departure_date',
  nights: 'number_of_nights',
}

type Action = 
  | 'check_in' 
  | 'check_out'
  | 'complete_reservation'
  | 'resend-confirmation-email'
  | 'print-registration-card'
  | 'unlock-site';

class Model {
  static fields = fields;
  static fieldMapping = fieldMapping;
  static mapModel = Reservation.Model.mapModel;
}
