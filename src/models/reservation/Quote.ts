import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { QuotePayload, QuoteResponse } from 'services/payloads/QuotePayload';
import { RateTotal, DiscountDetail } from 'interfaces/RateDetails';
import { CalculationResult } from 'interfaces/Rules';
import { RateSummary } from 'interfaces/RateDetails';
import { ReservationEntry } from './ReservationEntry';
import { Equipment, getEquipment } from 'models/guest/Vehicle';

export class Quote {
  id: string;
  label: string;
  rateSummary: RateSummary[];
  nights: number;
  fees: CalculationResult[];
  discounts: DiscountDetail[];
  taxes: CalculationResult[];
  deposits: CalculationResult[];
  securityDeposits: CalculationResult[];
  totals: RateTotal;
  deposit: number;
  securityDeposit: number;
  equipment: Equipment;
  rateId: string;
  discountId: string;
  createdAt: string;

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<Quote, QuoteResponse>(payload => {
  const { rateSummary, fees, taxes, deposits } = payload;

  return ({
    ...payload,
    nights: payload.numberOfNights,
    rateSummary: rateSummary,
    fees: fees,
    taxes: taxes,
    deposits: deposits
  })
});

const buildPayload = (reservation: ReservationEntry, parkId: string) => {
  const [arrival, departure] = reservation.dateRange;
  const payload = QuotePayload.new({...reservation, ...reservation.visitorsInfo});
  payload.parkId = parkId;
  payload.arrivalDate = arrival.format('YYYY-MM-DD');
  payload.departureDate = departure.format('YYYY-MM-DD');
  payload.equipment = getEquipment(reservation.vehicleInfo);

  return payload;
}

class Model {
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
