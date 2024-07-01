import { Guest } from 'models/guest';
import { Transaction } from 'models/transactions';
import dayjs from 'dayjs';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
}

export interface VisitorsInfo {
  adults: number;
  children: number;
  pets: number;
}

export interface TimingInfo {
  arrivalTime: string;
  plannedArrivalTime: string;
  departureTime: string;
  plannedDepartureTime: string;
  checkInTime: string;
  checkOutTime: string;
}

export type BillingInfo = {
  balance?: number;
  deposit?: number;
  orderTotal?: number;
  paymentTotal?: number;
  subtotal?: number;
  tax?: number;
  total?: number;
  transactionFee?: number;
  transactions?: Transaction[];
}

export interface VehicleInfo {
  vehicleType: string;
  vehicleLengthRange: string;
  vehicleSlides: string[];
  vehicleTowing: string;
  vehicleElectrical: string[];
}

export interface ReservationInfo {
  id: string;
  siteTypeId: string;
  siteName: string;
  guest: Guest;
  arrival: dayjs.Dayjs;
  departure: dayjs.Dayjs;
  visitorsInfo: VisitorsInfo;
}
