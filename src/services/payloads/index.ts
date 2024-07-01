import { BrandingSettingsPayload } from './BrandingSettingsPayload';
import { ClientPayload } from './ClientPayload';

type uuid = string;
export * from './PolicyPayload';
export * from './ParkSettingPayload';
export * from './BrandingSettingsPayload';
export * from './DiscountPayload';
export * from './GuestPayload';
export * from './SiteTypePayload';
export * from './SitePayload';
export * from './ActivityLogPayload'
export * from './TaxRatePayload'
export * from './RatePayload'
export * from './VehiclePayload'
export { ReservationChartPayload } from './ReservationChartPayload';

export type ConversionTracking = {
    id: string,
    parkId: string,
    facebookPixel: null,
    googleAnalytics: null,
    googleAdWordsTracking: null,
    googleTagManager: null
}

export type SocialMedium = {
    id: string
    parkId: string
    appleMaps: string
    bingPlaces: string
    facebook: string
    goodSam: string
    googleBusiness: string
    instagram: string
    pinterest: string
    rvParkReviews: string
    tripAdvisor: string
    twitter: string
    yelp: string
}

export type ParkPayload = {
    id: uuid
    code: string
    active: boolean
    address: string
    address2: string
    address3: string
    address4: string
    brandingSetting: BrandingSettingsPayload
    city: string
    client: ClientPayload
    clientId: string
    country: string
    description: string
    email: string
    emailDisplayName: string
    homepageUrl: string
    lat: string
    lng: string
    name: string
    nextBookingDate: string
    phone: string
    phone2: string
    postalCode: string
    state: string
    timeZone: string
    createdAt: string
    updatedAt: string
}

type Keys = keyof ParkPayload;
export const ParkPayloadAttributes: Keys[] = [
  'id', 'active', 'name', 'code', 'description', 'address', 'address2', 'city', 'state', 'country', 'postalCode', 'email', 'phone', 'lat', 'lng', 'clientId', 'emailDisplayName', 'timeZone', 'phone2', 'homepageUrl'
];
