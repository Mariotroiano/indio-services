import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { UtilityMeter } from '../prkset/UtilityMeter';
import { SitePayload } from 'services/payloads';
import { Factory } from 'utils/Factory';
import { pick } from 'lodash';
import dayjs from 'dayjs';

export class Site {
  id: string;
  siteTypeId: string;
  siteTypeName?: string;
  label: string;
  name: string;
  siteNumber: string;
  allowVehicleElectrical: string[];
  allowVehicleSlides: string[];
  housekeeping: string;
  utilities: string;
  inspection: string;
  maxOccupants: number;
  length?: number;
  width?: number;
  height?: number;
  maxRvLength?: number;
  maxRvWidth?: number;
  maxRvHeight?: number;
  description: string;
  active: boolean;
  utilitiesField?: string[];
  amenityList: string;
  categoryList: string;
  status: string;
  siteStatus?: string;
  lastInspectedBy: string;
  inspectedAt: dayjs.Dayjs;
  mostRecentStay: SitePayload['mostRecentStay'];
  canBookOnline: boolean;
  reservationArrival?: dayjs.Dayjs;
  reservationDeparture?: dayjs.Dayjs;
  confirmationNumber?: string;
  meterTypes: string[];
  utilityMeters?: UtilityMeter[];
  currentReservationDetail?: string;
  availability?: boolean;
  actionList?: {
    inspectionActions: string[];
    housekeepingActions: string[];
    utilitiesActions: string[];
  }

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Site, {
  id: null,
  mostRecentStay: null,
  siteTypeId: { label: 'Site Type' },
  siteTypeName: { label: 'Site Type' },
  label: { label: 'Site Label' },
  siteNumber: { label: 'Site Number' },
  allowVehicleElectrical: { label: 'Available Vehicle Amps', type: 'multiple' },
  allowVehicleSlides: { label: 'Available Vehicle Slides', type: 'multiple' },
  description: { label: 'Description', type: 'textarea' },
  housekeeping: { label: 'Housekeeping'},
  utilities: { label: 'Utilities'},
  inspection: { label: 'Inspection'},
  active: { label: 'Active', type: 'switch' },
  utilitiesField: { label: 'Utilities', type: 'checkboxes' },
  amenityList: { label: 'Amenities', type: 'textarea' },
  categoryList: { label: 'Categories', type: 'textarea' },
  status: { label: 'Status' },
  length: { label: 'Length', placeholder: '0 ft', type: 'number' },
  width: { label: 'Width', placeholder: '0 ft', type: 'number' },
  height: { label: 'Height', placeholder: '0 ft', type: 'number' },
  maxRvLength: { label: 'Maximum RV Length', placeholder: '0 ft', type: 'number' },
  maxRvWidth: { label: 'Maximum RV Width', placeholder: '0 ft', type: 'number' },
  maxRvHeight: { label: 'Maximum RV Height', placeholder: '0 ft', type: 'number' },
  maxOccupants: { label: 'Occupants (Max.)' },
  lastInspectedBy: { label: 'Last Inspected By' },
  inspectedAt: { label: 'Last Inspected At' },
  canBookOnline: { label: 'Available for Online Booking', type: 'switch' },
  meterTypes: { label: ' Types' },
  currentReservationDetail: { label: ' Reservation' },

})
.setRules({
  name: [{ required: true }],
  siteTypeId: [{ required: true }],
  siteNumber: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<Site, SitePayload>((payload) => {
  const { currentReservation } = payload;
  const set = pick(payload, 'sewer', 'water', 'metered');
  set['power'] = set.metered;
  const utilitiesItems = Object.keys(set).filter(item => !!set[item]);

  const model = Factory.create(Site, {
    ...payload,
    utilitiesField: utilitiesItems,
    inspectedAt: payload.lastInspectedAt ? dayjs(payload.lastInspectedAt) : null,
    mostRecentStay: payload?.mostRecentStay,
    actionList: {
      housekeepingActions: payload.housekeepingActions,
      utilitiesActions: payload.utilitiesActions,
      inspectionActions: payload.inspectionActions,
    },
  }, true);

  if (currentReservation) {
    model.currentReservationDetail = `#${currentReservation.confirmationNumber} - ${currentReservation.guestName}`
  }

  return model;
});

const buildPayload = (site: Site): SitePayload => {
  const payload = SitePayload.new(site, true);

  const getBoolean = (...values: string[]) => {
    const utilities = site.utilitiesField || [];
    const result = utilities.some(item => values.includes(item));
    return result;
  }

  payload.sewer = getBoolean('sewer');
  payload.water = getBoolean('water');
  payload.metered = getBoolean('power', 'metered');
  return payload;
};

const initialValues: Partial<Site> = {
  active: true,
  canBookOnline: true,
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static initialValues = initialValues;
}

export const SITE_NUMBER_FIELD = {
  ...fields.siteNumber,
  label: 'Site Number / Range',
  placeholder: 'Number / Range',
};
