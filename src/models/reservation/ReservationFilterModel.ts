import ModelBuilder from 'utils/ModelBuilder';
import { OptionItem } from 'utils/getOptionItems';
import { buildOptionItems } from 'utils/buildOptionItems';

export class Filters {
  site: string[];
  siteType: string[];
  reservationType: string[];
  holdType: string[];
  source: string[];
  rateType: string[];
  statusType: ReservationStatusType[];
  [key: string]: string[];

  static new() {
    const instance = new this();
    Object.keys(instance).forEach(key => instance[key] = []);
    return instance;
  }

  static ReservationTypeOps: OptionItem[];
  static ReservationStatusOps: OptionItem[];
  static HoldTypeOps: OptionItem[];
  static SourceOps: OptionItem[];

  static Model: typeof Model;
}

const status = [
  'pending', 'quoted', 'on_hold', 'unconfirmed', 'confirmed', 'arrived', 'departed', 'cancelled', 'no_show',
] as const;

type ReservationStatusType = typeof status[number];

Filters.ReservationTypeOps = [{label: 'Reservation', value: 'Reservation'}, {label: 'Site Hold', value: 'SiteHold'}];
Filters.ReservationStatusOps = buildOptionItems(status.map(x => x.toString()));
Filters.HoldTypeOps = buildOptionItems(['default','maintenance_hold']);
Filters.SourceOps = buildOptionItems(['online', 'front_desk']);

const fields = ModelBuilder.buildFields(Filters, {
  reservationType: { label: 'Reservation Type', type: 'checkboxes' },
  statusType: { label: 'Status Type', type: 'checkboxes' },
  siteType: { label: 'Site Type', type: 'checkboxes' },
  rateType: { label: 'Rate Type', type: 'checkboxes' },
  site: { label: 'Site', type: 'checkboxes' },
  holdType: { label: 'Hold Type', type: 'checkboxes' },
  source: { label: 'Source', type: 'checkboxes' },
})
.build();

export type FilterItem = {
  id: string,
  label: string,
  count: number,
}

function getFilterList(result?: any) {
  const keys = Object.keys(filterLabels);
  const list = keys.map<FilterItem>(key => ({
    id: key,
    label: filterLabels[key],
    count: result ? result[key] : 0,
  }));
  return list;
};

const filterLabels = {
  all: 'All',
  online: 'Online',
  arriving: 'Arriving',
  checkedIn: 'Checked In',
  currentlyInPark: 'Currently In Park',
  departing: 'Departing',
  checkedOut: 'Checked Out',
  holdCurrent: 'On Hold',
  quoted: 'Quoted',
  unconfirmed: 'Unconfirmed',
  noShow: 'No Show',
  cancelled: 'Cancelled',
};

class Model {
  static fields = fields;
  static getFilterList = getFilterList;
}
Filters.Model = Model;
