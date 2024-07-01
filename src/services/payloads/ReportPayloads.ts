export class ReservationReportPayload {
  id: string;
  parkId: string;
  siteId: string;
  guestId: string;
  confirmationNumber: string;
  guestFullName: string;
  guestPhone: string;
  guestFormattedPhone: string;
  siteName: string;
  status: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  total: number;
  balance: number;
  arrivalDate: string;
  departureDate: string;
  checkInTime: string;
  checkOutTime: string;
  notes: string;
  rateType: string;
  rateName: string;
  nights: string;
}

export class ReservationPartialPayload {
  id: string
  rateId: string
  siteId: string
  guestId: string
  parkId: string
  type: string
  confirmationNumber: string
  number: number
  rateName: string
  rateType: string
  siteName: string
  guestName: string
  numberOfNights: number
  total: number
  balance: number
  arrivalDate: string
  departureDate: string
  status: string
  createdAt: string
  updatedAt: string
}

export class DailyCashPayload {
  id: string
  parkId: string
  startDate: string
  glAccounts: {
    name: string
    number: string
    amounts: {
      [yyyymmdd: string]: number
    }
    total: number
  }[]
  dailyTotals: {
    [yyyymmdd: string]: number
  }
  createdAt: string
  updatedAt: string
}

export class OccupancyPayload {
  id: string;
  parkId: string;
  datePeriod: string[];
  siteTypeIds: string[];
  records: {
    id: string;
    type: string;
    name: string;
    parentName: string;
    totalArrival: number;
    totalDeparture: number;
    availNights: number;
    usedNights: number;
    occupancyRate: number;
  }[]
};

export class RevenuePayload {
  id: string;
  parkId: string;
  datePeriod: string[];
  siteTypeIds: string[];
  records: {
    id: string;
    type: string;
    name: string;
    parentName: string;
    rawRevenue: number;
  }[]
};

export class DebtorsPayload {
  id: string;
  reservationNumber: string;
  guestName: string;
  guestPhone: string;
  arrivalDate: string;
  current: number;
  days30: number;
  days60: number;
  days90: number;
}

export class InHouseGuestBalancePayload {
  id: string;
  siteId: string;
  siteTypeId: string;
  surname: string;
  rateType: string;
  confirmationNumber: string;
  siteTypeName: string;
  siteName: string;
  siteLabel: string;
  chargeAmtPaidTo: number;
  balance: number;
  lastPaymentDate: string;
  daysOverdue: number;
}
