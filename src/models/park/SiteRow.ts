import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Site } from './Site';
import { Mapping } from 'interfaces/TableOptions';

export class SiteRow {
  id: string;
  siteTypeId: string;
  siteTypeName?: string;
  name: string;
  siteNumber: string;
  active: boolean;
  utilitiesField?: string[];
  amenityList: string;
  categoryList: string;
  canBookOnline: boolean;
  info?: any;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(SiteRow, {
  siteTypeId: null,
  siteTypeName: { label: 'Site Type' },
  siteNumber: { label: 'Site Number' },
  utilitiesField: { label: 'Utilities' },
  amenityList: { label: 'Amenities' },
  categoryList: { label: 'Categories' },
  canBookOnline: { label: 'Available for Online Booking' },
})
.build();

const fieldMapping: Mapping<SiteRow> = {
  siteTypeName: 'site_type.name',
  name: 'site_number',
}

class Model {
  static fields = fields;
  static fieldMapping = fieldMapping
  static mapModel: typeof Site.Model.mapModel;
}

setTimeout(() => Model.mapModel = Site.Model.mapModel);
