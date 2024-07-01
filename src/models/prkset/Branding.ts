import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { BrandingSettingsPayload } from 'services/payloads';

export class Branding {
  id: string;
  logoUrl: string;
  logoDataUri: string;
  faviconUrl: string;
  faviconDataUri: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  font1Id: string;
  font2Id: string;
  font3Id: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Branding, {
  logoUrl: null,
  logoDataUri: { label: 'Logo', type: 'image' },
  faviconUrl: null,
  faviconDataUri: { label: 'Favicon', type: 'icon' },
  primaryColor: { label: 'Primary Color', placeholder: '#RRGGBB' },
  secondaryColor: { label: 'Secondary Color', placeholder: '#RRGGBB' },
  tertiaryColor: { label: 'Tertiary Color', placeholder: '#RRGGBB' },
  font1Id: { label: 'Font #1', placeholder: 'Select a Font' },
  font2Id: { label: 'Font #2', placeholder: 'Select a Font' },
  font3Id: { label: 'Font #3', placeholder: 'Select a Font' },
})
.build();

const mapModel = (result: BrandingSettingsPayload[]) => {
  const list = result.map<Branding>(entity => ({
    ...entity,
    logoDataUri: entity.logoUrl,
    faviconDataUri: entity.faviconUrl,
  }));
  return list;
}

const buildPayload = (branding: Branding): BrandingSettingsPayload => {
  const payload = BrandingSettingsPayload.new(branding);
  payload.logoDataUri = /^data:image/g.test(branding.logoDataUri) ? branding.logoDataUri : null;
  payload.faviconDataUri = /^data:image/g.test(branding.faviconDataUri) ? branding.faviconDataUri : null;
  return payload;
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
