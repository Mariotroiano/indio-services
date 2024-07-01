import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { UniversalSiteTypesPayload } from 'services/payloads/UniversalSiteTypesPayload';
import { Factory } from 'utils/Factory';

export class UniversalSiteType extends UniversalSiteTypesPayload {

  static Model = setModel(this, () => Model);
}

const mapModel = ModelBuilder.buildMapModel<UniversalSiteType, UniversalSiteTypesPayload>(payload => {
  return Factory.create(UniversalSiteType, payload);
});

class Model {
  static mapModel = mapModel;
}
