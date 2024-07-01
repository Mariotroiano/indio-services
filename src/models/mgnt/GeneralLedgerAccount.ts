import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { buildOptionItems } from 'utils/buildOptionItems';
import { GLAccountPayload } from 'services/payloads/GLAccountPayload';
import { Factory } from 'utils/Factory';

export class GeneralLedgerAccount {
  id: string;
  name: string;
  code: string;
  classification: string;
  active: boolean;

  static Model = setModel(this, () => Model);
}

const classificationOps = buildOptionItems([
  'asset', 'liability', 'revenue', 'expense', 'equity', 'forward', // 'debtor', 'creditor'
]);

const fields = ModelBuilder.buildFields(GeneralLedgerAccount, {
  id: null,
  name: { label: 'Name' },
  code: { label: 'Code' },
  classification: { label: 'Classification', options: classificationOps },
  active: { label: 'Active', type: 'switch' },
})
.build();

const mapModel = ModelBuilder.buildMapModel<GeneralLedgerAccount, GLAccountPayload>(payload => {
  const model = Factory.create(GeneralLedgerAccount, { ...payload });
  return model;
});

const buildPayload = (values: GeneralLedgerAccount, parkId: string): GLAccountPayload => {
  const payload = GLAccountPayload.new({ ...values, parkId });
  return payload;
};

class Model {
  static modelName = 'General Ledger Account';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
