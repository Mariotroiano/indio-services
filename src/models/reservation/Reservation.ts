import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { ReservationPayload } from 'services/payloads/ReservationPayload';
import { VehiclePayload } from 'services/payloads';
import { Rate } from 'models/prkset/Rate';
import { Discount } from 'models/prkset/Discount';
import dayjs from 'dayjs';
import { Guest } from 'models/guest';
import { BillingInfo, TimingInfo, VehicleInfo, VisitorsInfo } from './Reservation.extra';
import { RateDiscountInfo } from './RateDiscountInfo';
import { Settings } from './Settings';

export class Reservation {
  id: string;
  parkId: string;
  siteTypeId: string;
  groupHoldId: string;
  siteId: string;
  siteName: string;
  guestId: string;
  guestName: string;
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  nights: number;
  guestCount: number;
  source: string;
  siteStatus: string;
  siteLocked: boolean;
  status: string;
  confirmationNumber: string;
  guestInfo?: Guest;
  visitorsInfo?: VisitorsInfo;
  timingInfo?: TimingInfo;
  billingInfo?: BillingInfo;
  vehicleInfo?: VehicleInfo;
  rateDiscountInfo: RateDiscountInfo;
  rateType: string;
  notes: string;
  longTerm: boolean;
  longTermDays: number;
  paymentMethodId: string;
  actions: string[];
  type: 'Reservation' | 'SiteHold';
  settings: Settings;
  createdAt?: dayjs.Dayjs;

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<Reservation, ReservationPayload>((reservation) => {
  const guest = Guest.Model.mapModel(reservation.guest);
  const discount = Discount.Model.mapModel(reservation.discount);
  const rate = Rate.Model.mapModel(reservation.rate);
  const vehicle =  VehiclePayload.new(reservation.vehicleSummary);
  const settings = Settings.new(reservation.settingsInfo);

  const model = Factory.create(Reservation, {
    id: reservation.id,
    parkId: reservation.parkId,
    siteTypeId: reservation.siteTypeId,
    groupHoldId: reservation.groupHoldId,
    siteId: reservation.siteId,
    siteName: reservation.site?.name,
    guestId: reservation.guestId,
    guestName: guest?.fullName,
    arrival: dayjs(reservation.arrivalDate),
    departure: dayjs(reservation.departureDate),
    nights: reservation.numberOfNights,
    guestCount: reservation.guestCount,
    source: reservation.source,
    status: reservation.status,
    siteStatus: reservation.siteStatus,
    siteLocked: reservation.siteLocked,
    confirmationNumber: reservation.confirmationNumber,
    guestInfo: guest,
    visitorsInfo: {
      adults: reservation.adults,
      children: reservation.children,
      pets: reservation.pets,
    },
    timingInfo: {
      arrivalTime: reservation.arrivalTime,
      plannedArrivalTime: reservation.plannedArrivalTime,
      departureTime: reservation.departureTime,
      plannedDepartureTime: reservation.plannedDepartureTime,
      checkInTime: reservation.checkInTime,
      checkOutTime: reservation.checkOutTime,
    },
    billingInfo: {
      balance: reservation.balance,
      total: reservation.total,
      orderTotal: reservation.orderTotal,
      paymentTotal: reservation.paymentTotal,
    },
    vehicleInfo: {
      vehicleType: vehicle?.type,
      vehicleLengthRange: vehicle?.lengthRange,
      vehicleSlides: vehicle?.slides,
      vehicleTowing: vehicle?.towing,
      vehicleElectrical: vehicle?.electrical,
    },
    rateDiscountInfo: {
      rateId: reservation.rateId,
      rateName: rate?.name,
      rateType: reservation.rateType,
      rateOverride: reservation.rateOverride,
      rateAmounts: {
        dailyAmount: rate?.dailyAmount,
        monthly: rate?.monthlyAmount,
        yearly: rate?.yearlyAmount,
      },
      discount: discount,
      discountId: reservation.discountId,
      discountCode: reservation.discountCode,
      loyaltyNumber: reservation.loyaltyNumber,
    },
    rateType: reservation.rateType,
    notes: reservation.notes,
    longTerm: reservation.longTerm,
    longTermDays: reservation.longTermDays,
    paymentMethodId: reservation.paymentMethodId,
    actions: reservation.actions,
    type: reservation.type,
    settings: settings,
    createdAt: dayjs(reservation.createdAt),
  });
  return model;
});

class Model {
  static mapModel = mapModel;
}
