import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { MaintenancePayload } from 'services/payloads/MaintenancePayload';
import { Mapping } from 'interfaces/TableOptions';
import { Factory } from 'utils/Factory';
import { startCase } from 'lodash';

export class Maintenance {
  id: string;
  label: string;
  housekeeping: string;
  utilities: string;
  inspection: string;
  status: string;
  siteTypeLabel: string;
  taskList: string[];
  action?: string;
  actionList?: {
    inspectionActions: string[];
    housekeepingActions: string[];
    utilitiesActions: string[];
  }

  static Model: typeof Model
}

const fields = ModelBuilder.buildFields(Maintenance, {
    label: { label: 'Site' },
    status: { label: 'Availability' },
})
.build();

const mapModel = ModelBuilder.buildMapModel<Maintenance, MaintenancePayload>(payload => {
  const model = Factory.create(Maintenance, {
    ...payload,
    housekeeping: startCase(payload.housekeeping),
    utilities: startCase(payload.utilities),
    inspection: startCase(payload.inspection),
    status: startCase(payload.status),
    actionList: {
      housekeepingActions: payload.housekeepingActions,
      utilitiesActions: payload.utilitiesActions,
      inspectionActions: payload.inspectionActions,
    },
  });
  return model;
});

const buildPayload = (values: Maintenance) => {
  const payload = MaintenancePayload.new(values);
  return payload;
};

const fieldMapping: Mapping<Maintenance> = {
  label: 'site_number',
}

class Model {
  static fields = fields;
  static fieldMapping = fieldMapping;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static relation = [Maintenance, MaintenancePayload] as const
}

Maintenance.Model = Model;
