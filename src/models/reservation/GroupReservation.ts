import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { GroupHoldPayload } from 'services/payloads/GroupHoldPayload';
import { Factory } from 'utils/Factory';
import { DateRange } from 'interfaces/DateRange';
import { Guest } from 'models/guest';
import dayjs from 'dayjs';

export class GroupReservation {
  id: string;
  siteId: string;
  siteTypeId: string;
  organizerName: string;
  totalSites: number;
  totalGuests: number;
  groupCode: string;
  name: string;
  dateRange: DateRange;
  sites: string[];
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  expireDate: dayjs.Dayjs;
  organizer: Guest;
  contactEmails: string[];
  contactList: string[];
  rateId: string;
  rateOverride: number;
  discountId: string;
  discountCode: string;
  loyaltyNumber: string;
  rateDiscountInfo: {
    rateId: string;
    rateOverride: number;
    discountId: string;
    discountCode: string;
    loyaltyNumber: string;
  }
  notes: string;

  static empty = () => Factory.create(GroupReservation);
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(GroupReservation, {
  expireDate: { label: 'Expire Date', type: 'date' },
  organizer: { label: 'Organizer Guest', placeholder: 'Search Guest', type: 'searchable' },
  rateOverride: { label: 'Rate Override', type: 'numeric' },
  sites: { label: 'Sites', type: 'multiple' },
  discountId: { label: 'Discount' },
  discountCode: { label: 'Discount Code', placeholder: 'Code' },
  loyaltyNumber: { label: 'Discount Loyalty', placeholder: 'Loyalty' },
  notes: { label: 'Notes', type: 'textarea' },
})
.setRules({
  groupCode: [{ required: true }],
  expireDate: [{ required: true }],
  organizer: [{ required: true }],
  dateRange: [{ required: true }],
  sites: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<GroupReservation, GroupHoldPayload>(payload => {
  return Factory.create(GroupReservation, {
    id: payload.id,
    groupCode: payload.code,
    totalSites: payload.siteIds.length,
    totalGuests: payload.contactList?.length ?? 0,
    contactList: payload.contactList,
    organizerName: payload.organizer.fullName,
    arrival: dayjs(payload.arrivalDate),
    departure: dayjs(payload.departureDate),
    organizer: payload.organizer,
    // notes: payload.notes,
  });
});

const buildPayload = (model: GroupReservation, parkId: string) => {
  const [arrival, departure] = model.dateRange;
  const payload = GroupHoldPayload.new({
    parkId: parkId,
    organizerId: model.organizer.id,
    siteIds: model.sites,
    rateId: null,
    discountId: null,
    code: model.groupCode,
    name: model.name ?? 'Group ' + model.groupCode,
    arrivalDate: arrival.format('YYYY-MM-DD'),
    departureDate: departure.format('YYYY-MM-DD'),
    expiresAt: model.expireDate.format('YYYY-MM-DD'),
    rateOverride: model.rateOverride,
  }, true);
  return payload;
}

const step3Fields = ModelBuilder.buildFields(class Step3 {
  addGuest: Guest
  contactEmails: string[]
})
.build();

class Model {
  static fields = fields;
  static step3Fields = step3Fields
  static buildPayload = buildPayload;
  static mapModel = mapModel;
}
