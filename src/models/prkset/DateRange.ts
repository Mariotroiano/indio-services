import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { DateRangePayload } from 'services/payloads/DateRangePayload';
import dayjs from 'dayjs';

export class DateRange {
  id: string;
  name: string;
  startDate: dayjs.Dayjs | string;
  endDate: dayjs.Dayjs | string;
  active: boolean;
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(DateRange, {
  name: { label: 'Name', info: 'Describes the date range' },
  startDate: { label: 'Start Date', type: 'date', info: 'Start of the date range.' },
  endDate: { label: 'End Date', type: 'date', info: 'End of the date range.' },
  active: { label: 'Active', type: 'switch' }
})
.setRules({
  name: [{ required: true }],
  startDate: [{ required: true }],
  endDate: [{ required: true }],
})
.build();

const buildPayload = (entity: DateRange, parkId: string): DateRangePayload => {
  const payload = {
    ...entity,
    parkId,
    startDate: dayjs(entity.startDate).toISOString(),
    endDate: dayjs(entity.endDate).toISOString(),
  }
  return payload
};

const mapModel = ModelBuilder.buildMapModel<DateRange, DateRangePayload>((payload) => {
  const model = Factory.create(DateRange, {
    ...payload,
    startDate: dayjs(payload.startDate),
    endDate: dayjs(payload.endDate),
  })
  return model;
});
export class Model {
  static modelName = 'Date Range';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
