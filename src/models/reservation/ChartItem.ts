import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { ReservationChartPayload } from 'services/payloads';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';

export class ChartItem {
  id: string;
  siteTypeId: string;
  siteId: string;
  siteNumber: string;
  parkId: string;
  type: 'Reservation' | 'SiteHold';
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  // #region Chart exclusive fields
  startTime: string;
  endTime: string;
  checkInTime: string;
  checkOutTime: string;
  // #endregion
  guestId: string;
  guestFullName: string;
  confirmationNumber: string;
  status: string;
  notes: string;
  rateType: string;
  siteLocked: boolean;

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<ChartItem, ReservationChartPayload>(payload => {
  const model = Factory.create(ChartItem, {
    ...payload,
    arrival: dayjs(payload.arrivalDate),
    departure: dayjs(payload.departureDate),
    startTime: payload.arrivalDate + `T${payload.checkInTime}:00+00:00`,
    endTime: payload.departureDate + `T${payload.checkOutTime}:00+00:00`,
  });
  return model;
});

class Model {
  static fields = null;
  static mapModel = mapModel;
  static buildPayload: (values: ChartItem) => ReservationChartPayload;
}
