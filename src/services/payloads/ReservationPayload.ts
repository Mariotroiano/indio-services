import { PayloadBase } from './PayloadBase';
import { DiscountPayload, GuestPayload, RatePayload, SitePayload, VehiclePayload } from '.';
import { SettingsPayload } from './ReservationPayload.extra';
import { Equipment } from './Equipment';

export class ReservationPayload extends PayloadBase {
  id: string
  type: 'Reservation' | 'SiteHold';
  parkId: string
  siteTypeId: string
  groupHoldId: string
  rateId: string
  discountId: string
  siteId: string
  siteName: string
  guestId: string
  guestName: string

  site: SitePayload
  guest: GuestPayload
  rate: RatePayload
  discount: DiscountPayload
  vehicleSummary: VehiclePayload

  arrivalDate: string
  departureDate: string
  numberOfNights: number
  guestCount: number
  adults: number
  children: number
  infants: number
  pets: number
  notes: string
  expiresAt: string
  source: string
  status: string
  siteStatus: string
  siteLocked: boolean
  rateType: string
  rateOverride: number
  discountCode: string
  longTerm: boolean
  longTermDays: number
  loyaltyNumber: string
  confirmationNumber: string
  number: string
  total: number
  subtotal: number
  tax: number
  deposit: number
  transactionFee: number
  balance: number
  orderTotal: number
  paymentTotal: number
  paymentMethodId: string;   //missing in backend
  // paymentMethod: PaymentMethodPayload;   //missing in backend
  arrivalTime: string;
  plannedArrivalTime: string;
  departureTime: string;
  plannedDepartureTime: string;
  checkInTime: string;
  checkOutTime: string;
  specialRequests: string;
  settingsInfo: SettingsPayload;   // read-only
  settings: SettingsPayload;       // writable

  creatorId: string
  creatorName: string
  actions: string[]
  action?: string
  createdAt: string
  updatedAt: string
}

export class ReservationEntryRequest extends PayloadBase {
  id: string;
  type: 'Reservation' | 'SiteHold';
  parkId: string;
  siteId: string;
  siteTypeId: string;
  guestId: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  pets: number;
  siteLocked: boolean;
  vehicleType: string;
  vehicleLengthRange: string;
  vehicleSlides: string[];
  vehicleTowing: string;
  vehicleElectrical: string[];
  equipment: Equipment;
  rateId: string;
  rateType: string;
  rateOverride: number;
  updateRateCharges: boolean;
  discountId: string;
  discountCode: string;
  loyaltyNumber: string;
  paymentMethodId: string;
  paymentOverride?: number;
  checkNumber?: string;
  notes: string;
  action: string;
}

export class ReservationEntryResponse extends ReservationEntryRequest {
  siteHoldId: string;
  from: string;
  to: string;
  numberOfNights: number;
  guestCount: number;
  status: string;
  confirmationNumber: string;
  actions: string[];
  createdAt: string;
  updatedAt: string;
}

export const ReservationEntryPayloadAttributes = Object.keys(ReservationEntryRequest.new());
