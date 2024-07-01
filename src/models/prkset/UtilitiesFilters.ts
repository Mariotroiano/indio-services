import ModelBuilder, { setModel } from 'utils/ModelBuilder';

type Status = 'default' | 'enabled' | 'disabled'

export class UtilitiesFilters {
  search: string;
  status: Status;
  siteTypesIds: string[];

  static Model = setModel(this, () => Model);
}

const statusOps = [
  { value: 'default', label: 'Status - All' },
  { value:  'enabled', label: 'Status - Active' },
  { value: 'disabled', label: 'Status - Inactive' },
];

const fields = ModelBuilder.buildFields(UtilitiesFilters, {
  search: { label: '' },
  status: { label: '', options: statusOps },
  siteTypesIds: { label: '', type: 'multiple' },
})
.build();

const initial: Partial<UtilitiesFilters> = {
  status: 'default',
  siteTypesIds: ['default'],
};

class Model {
  static fields = fields;
  static initial = initial;
}
