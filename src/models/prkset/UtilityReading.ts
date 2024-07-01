import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { UtilityReadingPayload } from 'services/utilities/UtilityReadingPayload';
import dayjs from 'dayjs';
import { UtilityMeter } from './UtilityMeter';

export class UtilityReading {
  id: string;
  utilityMeterId: string;
  creatorId: string;
  readingDate: dayjs.Dayjs;
  readingType: string;
  unit: string;
  creatorName: string;
  source: string;
  reading: number;
  rate: number;
  changeAmount: number;
  total: number;
  dynamicRate: number;
  siteName: string;
  meterType: string;
  readingTime: dayjs.Dayjs;
  actions: string[];

  static Model = setModel(this, () => Model);
}

export type LastRead = {
  meterId: string;
  lastValue: number;
  billToReservation: boolean;
};

export type ActionsMenu = 'edit' | 'create_charge' | 'remove_charge';

const readingTypes = [{ label: 'Manual', value: 'manual' }, { label: 'Automatic', value: 'automatic' }]

const fields = ModelBuilder.buildFields(UtilityReading, {
  utilityMeterId: null,
  creatorId: null,
  readingDate: { label: 'Read At', type: 'date' },
  reading: { label: 'Reading', type: 'numeric', placeholder: '0' },
  readingType: { label: 'Reading Type', options: readingTypes },
  source: { label: 'Source' },
  rate: { label: 'Rate $', type: 'currency', placeholder: '$0.00' },
  dynamicRate: { label: 'Dynamic Rate', type: 'numeric', placeholder: '0' },
  total: { label: 'Total (pre-tax)', type: 'currency', placeholder: '$0.00' },
  siteName: { label: 'Site ' },
  meterType: { label: 'Meter Type ' },
  creatorName: { label: 'Read By' },
  changeAmount: { label: 'Change' },
  readingTime: { label: '', placeholder: 'Time' },
  actions: { label: 'Actions' },
})
.setRules({
  readingDate: [{ required: true }],
  readingTime: [{ required: true }],
})
.build();

const buildPayload = (values: UtilityReading): UtilityReadingPayload => {
  const payload: UtilityReadingPayload = {
    ...values,
    readingDate: `${values.readingDate.format('YYYY/MM/DD')} ${values.readingTime.format('HH:mm:ss')}`,
  }
  return payload;
};

const mapModel = ModelBuilder.buildMapModel<UtilityReading, UtilityReadingPayload>((payload) => {
  const model = Factory.create(UtilityReading, {
    ...payload,
    readingDate: dayjs(payload.readingDate),
    readingTime: dayjs(payload.readingDate),
    actions: ['edit', ...payload.actions]
  })

  return model;
});


const buildCharge = (meter: UtilityMeter, lastValue: number): number => {
  const change = lastValue - Number(meter?.lastReadingValue) || 0;
  const total = (change * meter?.rate);
  return total;
}

const buildQuickReading = (meter: UtilityMeter, lastValue: number): UtilityReading => {
  const now = dayjs();
  const total = buildCharge(meter, lastValue);
  const reading = {
    utilityMeterId: meter.id,
    readingDate: now,
    readingTime: now,
    reading: lastValue,
    rate: meter.rate,
    total,
  }
  return reading as UtilityReading;
}

const initial: Partial<UtilityReading> = {
  readingDate: dayjs(),
  readingTime: dayjs()
}

export class Model {
  static initial = initial;
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static buildQuickReading = buildQuickReading;
  static buildCharge = buildCharge;
  static relation = [UtilityReading, UtilityReadingPayload] as const;
}
