import ModelBuilder from 'utils/ModelBuilder';
import { ParkSettingPayload, samplePayload } from 'services/payloads';
import dayjs, { Dayjs } from 'dayjs';

export const rateTypeOptions = ['daily', 'weekly', 'monthly', 'yearly'];

type OmittedProps = Pick<ParkSettingPayload,
  | 'checkInTime'
  | 'checkOutTime'
  | 'goLiveDate'
  | 'minBookingDate'
  | 'maxBookingDate'
>;

export type ParkSettings = Omit<ParkSettingPayload, keyof OmittedProps | 'createdAt' | 'updatedAt'> & {
  checkInTime: Dayjs,
  checkOutTime: Dayjs,
  goLiveDate: Dayjs,
  minBookingDate: Dayjs,
  maxBookingDate: Dayjs,
}

const fields = ModelBuilder.Field.fieldsFromSample(samplePayload).build();
fields.leadDays.info = 'This is the period of time between when a guest makes a reservation and the actual check-in date. Simply: how far out can guests book a site?';
fields.bookingMapUrl.label = 'Booking Map';
fields.adminMapUrl.label = 'Admin Map';
fields.ratePeriodStartDay.label = 'Day of Arrival';
fields.mandrillSubaccount.label = 'Mandrill Subaccount';
fields.mandrillSubaccount.type = 'password';
fields.mandrillApiKey.label = 'Mandrill API Key';
fields.mandrillApiKey.type = 'password';
fields.rateTypes.type = 'checkboxes';
fields.goLiveDate.type = 'date';
fields.minBookingDate.type = 'date';
fields.maxBookingDate.type = 'date';

const mapModel = (payload: ParkSettingPayload): ParkSettings => ({
  ...payload,
  checkInTime: DayjsHelper.toDayjs(payload.checkInTime, 'HH:mm'),
  checkOutTime: DayjsHelper.toDayjs(payload.checkOutTime, 'HH:mm'),
  goLiveDate: DayjsHelper.toDayjs(payload.goLiveDate),
  minBookingDate: DayjsHelper.toDayjs(payload.minBookingDate),
  maxBookingDate: DayjsHelper.toDayjs(payload.maxBookingDate),
});

const buildPayload = (model: ParkSettings): ParkSettingPayload => {
  const { adminMapUrl, bookingMapUrl, ...values } = model;

  const payload: ParkSettingPayload = {
    ...values,
    checkInTime: DayjsHelper.toTimeString(model.checkInTime),
    checkOutTime: DayjsHelper.toTimeString(model.checkOutTime),
    goLiveDate: DayjsHelper.toDateString(model.goLiveDate),
    minBookingDate: DayjsHelper.toDateString(model.minBookingDate),
    maxBookingDate: DayjsHelper.toDateString(model.maxBookingDate),
    bookingMapDataUri: /^data:image/g.test(bookingMapUrl) ? bookingMapUrl : null,
    adminMapDataUri: /^data:image/g.test(adminMapUrl) ? adminMapUrl : null,
    bookingMapUrl: '',
    adminMapUrl: '',
  }
  return payload;
};

export class ParkSettingsModel {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
};

class DayjsHelper {
  static toDayjs(stringDate: string, format?: string) {
    return stringDate ? dayjs(stringDate, format) : null;
  }
  static toDateString(date: Dayjs) {
    return this.toString(date, 'YYYY-MM-DD');
  }
  static toTimeString(date: Dayjs) {
    return this.toString(date, 'HH:mm');
  }
  static toString(date: Dayjs, format?: string) {
    return date && date.format(format);
  }
}
