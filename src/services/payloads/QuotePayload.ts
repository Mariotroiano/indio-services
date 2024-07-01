import { PayloadBase } from './PayloadBase';
import { RateSummary, RateTotal, DiscountDetail } from 'interfaces/RateDetails';
import { CalculationResult } from 'interfaces/Rules';
import { Equipment } from './Equipment';

export class QuotePayload extends PayloadBase {
  id?: string;
  parkId: string;
  siteTypeId: string;
  rateId: string;
  discountId: string;
  arrivalDate: string;
  departureDate: string;
  // chargeSiteLock: boolean;
  adults: number;
  children: number;
  pets: number;
  rateOverride: number;
  rateType: string;
  equipment: Equipment;
}

export class QuoteResponse {
  id: string;
  label: string;
  rate: number;
  rateSummary: RateSummary[];
  totals: RateTotal;
  numberOfNights: number;
  taxes: CalculationResult[];
  fees:  CalculationResult[];
  deposits: CalculationResult[];
  securityDeposits: CalculationResult[];
  discounts: DiscountDetail[];
  deposit: number;
  securityDeposit: number;
  equipment: Equipment;
  rateId: string;
  discountId: string;
  createdAt: string;
}
