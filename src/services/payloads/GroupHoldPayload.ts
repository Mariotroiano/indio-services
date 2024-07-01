import { GuestPayload } from './GuestPayload';
import { PayloadBase } from './PayloadBase';
import { SiteHoldPayload } from './SiteHoldPayload';

export class GroupHoldPayload extends PayloadBase {
  id: string;
  parkId: string;
  organizerId: string;
  creatorId: string;
  rateId: string;
  discountId: string;
  siteIds: string[];
  siteHolds: SiteHoldPayload[];
  organizer: GuestPayload;
  code: string;
  name: string;
  description: string;
  expiresAt: string;
  arrivalDate: string;
  departureDate: string;
  rateOverride: number;
  contactList: string[];
  createdAt: string;
  updatedAt: string;
}
