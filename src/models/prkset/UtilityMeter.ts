import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { UtilityMeterPayload } from 'services/utilities/UtilityMeterPayload';
import { buildOptionItems } from 'utils/buildOptionItems';
import { UtilityReading } from './UtilityReading';

export class UtilityMeter {
  id: string;
  siteId: string;
  utilityTypeId: string;
  active: boolean;
  visible: boolean;
  rollover: number;
  lastRead: string;
  lastReadingDate: string;
  lastMeterValue: string;
  utilityTypeName: string;
  siteName: string;
  rate: number;
  unit: string;
  externalIds: string[];
  utilityTypeType: string;
  actions: ActionsMenu[];
  currentValue: string;
  total: number;
  lastReadingValue: string;
  lastReadingLabel: string;
  lastReading?: UtilityReading;
  billToReservation: boolean;

  static Model = setModel(this, () => Model);
}

export enum ActionsMenu {
  ViewHistory = 'view_history',
  ActivateMeter = 'activate_meter',
  DeactivateMeter = 'deactivate_meter',
}

const fields = ModelBuilder.buildFields(UtilityMeter, {
  siteId: { label: 'Site' },
  utilityTypeId: { label: 'Utility type', type: 'radios' },
  active: { label: 'Active', type: 'radios', options: buildOptionItems('Active', 'Inactive') },
  visible: { label: 'Visible', type: 'switch', info: 'Tooltip information' },
  rollover: { label: 'Rollover value', type: 'numeric' },
  lastRead: { label: 'Last Reading' },
  lastReadingDate: { label: 'Current Value' },
  lastMeterValue: { label: 'Last meter value' },
  utilityTypeName: { label: 'Utility type' },
  utilityTypeType: { label: 'Meter Type' },
  siteName: { label: 'Site' },
  externalIds: { label: 'External ids' },
  actions: { label: 'Action' },
  currentValue: { label: 'Current Value'},
  total: { label: 'Total (pre-tax)' },
  lastReadingValue: { label: '' },
  lastReadingLabel: { label: '' },
  billToReservation: { label: 'Bill To Reservation', type: 'switch' }
})
.build();

const buildPayload = (values: UtilityMeter): UtilityMeterPayload => {
  const payload: Partial<UtilityMeterPayload> = {
    ...values,
  }
  return payload as UtilityMeterPayload;
};

const mapModel = ModelBuilder.buildMapModel<UtilityMeter, UtilityMeterPayload>((payload) => {
  const actions: ActionsMenu[] = [ActionsMenu.ViewHistory];
  payload.active ? actions.push(ActionsMenu.DeactivateMeter) : actions.push(ActionsMenu.ActivateMeter);

  const model = Factory.create(UtilityMeter, {
    ...payload,
    total: payload?.lastReading?.total,
    actions: actions,
    billToReservation: false,
  })
  return model;
});

const initial: Partial<UtilityMeter> = {
  active: true,
} 
export class Model {
  static fields = fields;
  static initial = initial;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static relation = [UtilityMeter, UtilityMeterPayload] as const;
}
