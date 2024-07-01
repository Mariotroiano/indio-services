import ModelBuilder, { setModel } from 'utils/ModelBuilder';

export class Profile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(Profile, {
  firstName: { label: 'First Name' },
  middleName: { label: 'Middle Name' },
  lastName: { label: 'Last Name' },
  email: { label: 'Email', type: 'email' },
})
.build();

class Model {
  static fields = fields;
}
