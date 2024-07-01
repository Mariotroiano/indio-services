import { PayloadBase } from './PayloadBase';

export class BrandingSettingsPayload extends PayloadBase {
  id: string
  logoUrl: string
  logoDataUri: string
  faviconUrl: string
  faviconDataUri: string
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  font1Id: string
  font2Id: string
  font3Id: string
}

export const BrandingSettingsPayloadAttributes = Object.keys(BrandingSettingsPayload.new());
